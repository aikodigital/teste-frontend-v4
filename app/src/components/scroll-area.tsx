import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IEquipment } from '@/zustand/interface';
import { Accordion } from '@/components/ui/accordion';
import ExpansibleCard from './expansible-card';
import { Input } from './ui/input';

interface Props {
  equipments: IEquipment[];
  setActiveId: (value: string) => void;
  activeId: string;
}

const ScrollAreaComponent = ({ equipments, setActiveId, activeId }: Props) => {
  const [search, setSearch] = useState('');
  const searchedList = search
    ? equipments.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase())
      )
    : equipments;
  return (
    <ScrollArea className="h-[500px] w-[35%] rounded-md border">
      <div className="p-4 space-y-4">
        <Input
          placeholder="Buscar equipamento..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Accordion type="single" collapsible className="w-full">
          {searchedList.map(equipment => (
            <ExpansibleCard
              key={equipment.id}
              equipment={equipment}
              setActiveId={setActiveId}
              activeId={activeId}
            />
          ))}
        </Accordion>
      </div>
    </ScrollArea>
  );
};

export default ScrollAreaComponent;
