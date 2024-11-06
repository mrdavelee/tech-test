'use client'

import { useState } from 'react';
import Characters from './api/characters';
import SearchForm from './api/search';

const App = () => {
  const [query, setQuery] = useState<string>('');
  return (
    <div className='w-3/4 mx-auto'>
      <SearchForm onSubmit={(search) => setQuery(search)}></SearchForm>
      <Characters query={query}></Characters>
    </div>
  );
};

export default App;




