'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useEquipment from '@/hooks/useEquipment';
import { useRouter } from '@/hooks/useRouter';
import { SearchIcon } from 'lucide-react';

interface FilterEquipmentsProps {
  selectedState: string;
  selectedModel: string;
  selectedEquipment: string;
}

function FilterEquipments({
  selectedState,
  selectedModel,
  selectedEquipment,
}: FilterEquipmentsProps) {
  const { getModels, getStates } = useEquipment();
  const { navigate } = useRouter();

  const models = getModels();
  const states = getStates();

  const equipmentSearchHandler = (value: string) => {
    navigate([{ model: 'all' }, { state: 'all' }, { equipment: value }]);
  };

  return (
    <div className="flex gap-4">
      <Select
        value={selectedState}
        onValueChange={(value) => navigate([{ state: value }])}
      >
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os estados</SelectItem>
          {states.map((state) => (
            <SelectItem key={state} value={state}>
              {state}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={selectedModel}
        onValueChange={(value) => navigate([{ model: value }])}
      >
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por modelo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os modelos</SelectItem>
          {models.map((model) => (
            <SelectItem key={model} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="w-full">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquisar equipamento por nome..."
            className="w-full rounded-md border border-input py-2 pl-10 pr-4 focus:border-primary focus:ring-primary"
            value={selectedEquipment}
            onChange={(e) => equipmentSearchHandler(e.currentTarget.value)}
          />
        </div>
      </div>
    </div>
  );
}

export { FilterEquipments };
