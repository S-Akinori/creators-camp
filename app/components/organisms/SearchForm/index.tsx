import { Button } from '@mui/material';
import React, { useState, FormEvent } from 'react';
import Input from '../../Form/Input';
import Select from '../../Form/Select';

interface SearchFormProps {
  onSearch: (query: string, type: string) => void;
  typeSelect? : boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, typeSelect = false }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('materials');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query, type);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <Input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="キーワードを入力"
        className='mr-4'
      />
      {typeSelect && (
        <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value='materials'>素材</option>
            <option value='users'>ユーザー</option>
        </Select>
      )}
    <Button variant='contained' type='submit'>検索</Button>
    </form>
  );
};

export default SearchForm;
