import { FC, useState } from 'react';
import { useGet } from './hooks';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button';

type Character = {
  name: string;
  species: string,
  height: string;
  mass: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
};

type PageResponse<T> = {
  count: number;
  next: string;
  previous: string;
  results: T;
};

type CharactersProps = {
  query: string;
};


const Characters: FC<CharactersProps> = ({ query }) => {
  const [page, setPage] = useState<number>(1);
  const [loadingCharacters, charactersPage] = useGet<
    PageResponse<Array<Character>>
  >('https://swapi.dev/api/people', { search: query, page: page.toString() });
  // swapi gives 10 results per page
  const totalPages =
    charactersPage && charactersPage!.count > 10
      ? Math.floor(charactersPage!.count / 10)
      : 1;

  const handlePrev = () => {
    setPage((prevPage) => {
      if (prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };

  const handleNext = () => {
    setPage((prevPage) => {
      if (prevPage < charactersPage!.count) {
        return prevPage + 1;
      }
      return prevPage;
    });
  };

  return (
    <>
      {!loadingCharacters ? (
        <>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-10'>

            {charactersPage!.results.map((character) => (

                <Card className='bg-swBlue text-white border-swYellow' key={character.name}>
                    <CardHeader>
                        <CardTitle>{character.name}</CardTitle>
                        <CardDescription>
                            Born: {character.birth_year}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-4">
                            
                        <div className="flex-1 space-y-1 text-lg">
                            <p>Gender: {character.gender}</p>
                            <p>Weight: {character.mass}</p>
                            <p>Eye colour: {character.eye_color}</p>
                            <p>Height: {character.height} cm</p>
                        </div>
                            
                    </CardContent>

                </Card>

                ))}
         </div>
          <div className='w-full flex items-center justify-center gap-4 mb-16'>
            <Button variant="paging" className='prev-button' onClick={handlePrev} disabled={page === 1}>
              Prev
            </Button>
            <span className='text-white'>
              {page} of {totalPages}
            </span>
            <Button variant="paging" className='next-button' onClick={handleNext} disabled={page === totalPages}>
              Next
            </Button>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Characters;
