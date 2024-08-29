import { Input } from "./ui/input";

interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <Input
      placeholder="Buscar equipamento, modelo..."
      className="rounded-full bg-muted w-full"
      value={value}
      onChange={onChange}
    />
  );
};

export default Search;