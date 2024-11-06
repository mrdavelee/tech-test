import { FC, FormEvent, useState } from 'react';
import { useTimeout } from './hooks';

type SearchFormProps = {
  onSubmit: (search: string) => void;
};

const SearchForm: FC<SearchFormProps> = ({ onSubmit }) => {
  const [search, setSearch] = useState<string>('');

  useTimeout(
    () => {
      onSubmit(search);
    },
    1000,
    [search]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(search);
  };

  return (
    <form className='flex justify-center' onSubmit={handleSubmit}>
      
        <input className='border w-96 px-4 py-2 mb-10 text-center border-spacing-2 rounded-[2rem]' type="search" placeholder="Start your search" value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
      
    </form>
  );
};

export default SearchForm;
