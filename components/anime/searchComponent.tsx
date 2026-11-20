import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchComponent = () => {
  return (
    <div>
      <Search />
      <Input placeholder="search Anime" title="search Anime" />
    </div>
  );
};

export default SearchComponent;
