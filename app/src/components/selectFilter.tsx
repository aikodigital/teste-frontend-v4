import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectFilter = ({
  placeholder,
  options,
  handleChange,
}: {
  placeholder: string;
  options: {
    id: string;
    name: string;
  }[];
  handleChange: (value: string) => void;
}) => {
  if (!options.length) return null;

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full md:w-[180px] ">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem key={"Todos"} value="Todos">
          {placeholder}
        </SelectItem>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
