import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useEquipment } from '@/hooks/useEquipment';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowUpDownIcon, CalendarIcon, ChevronDownIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StateBadge } from './state-badge';

interface StateHistorySheetProps {
  equipmentId: string;
}

function StateHistorySheet({ equipmentId }: StateHistorySheetProps) {
  const { getStateHistory, getStates } = useEquipment();
  const stateHistory = getStateHistory(equipmentId);
  const [selectedState, setSelectedState] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const states = useMemo(() => getStates(), [getStates]);

  const filteredStateHistory = useMemo(() => {
    if (!stateHistory) return [];

    const filtered = stateHistory.filter((state) => {
      const stateMatches = !selectedState || state?.name === selectedState;
      return stateMatches;
    });

    filtered.sort((a, b) => {
      const dateA = new Date(a?.date ?? '').getTime();
      const dateB = new Date(b?.date ?? '').getTime();

      if (sortOrder === 'desc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    return filtered;
  }, [stateHistory, selectedState, sortOrder]);

  return (
    <Sheet>
      <SheetTrigger className={buttonVariants({ variant: 'outline' })}>
        <CalendarIcon className="mr-2 h-4 w-4" />
        Ver histórico de estados
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Histórico de Estados</SheetTitle>
        </SheetHeader>
        <div className="grid gap-8 pt-2">
          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  {selectedState ? selectedState : 'Selecione um estado'}
                  <ChevronDownIcon className="ml-auto h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-full sm:w-auto">
                <DropdownMenuItem
                  onSelect={() => setSelectedState('')}
                  className={
                    selectedState === ''
                      ? 'bg-primary text-primary-foreground'
                      : ''
                  }
                >
                  Todos
                </DropdownMenuItem>
                {states.map((state) => (
                  <DropdownMenuItem
                    key={state}
                    onSelect={() => setSelectedState(state)}
                    className={
                      selectedState === state
                        ? 'bg-primary text-primary-foreground'
                        : ''
                    }
                  >
                    {state}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shrink-0">
                  <ArrowUpDownIcon className="mr-2 h-4 w-4" />
                  Filtrar por
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]" align="end">
                <DropdownMenuRadioGroup
                  value={sortOrder}
                  onValueChange={(value) =>
                    setSortOrder(value as 'asc' | 'desc')
                  }
                >
                  <DropdownMenuRadioItem value="asc">
                    Mais recente
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="desc">
                    Mais antigo
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid gap-6 md:gap-8" />
        </div>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid gap-4">
            {filteredStateHistory?.map((state) => (
              <div
                key={state?.date}
                className="grid grid-cols-2 gap-4 rounded-md bg-muted/50 p-4"
              >
                <div className="text-muted-foreground">
                  <span className="text-base">Estado:</span>
                </div>
                <div>
                  <StateBadge
                    stateColor={state?.color ?? '#000'}
                    stateName={state?.name ?? 'Não definido'}
                  />
                </div>
                <div className="text-muted-foreground">
                  <span className="text-base">Data: </span>
                </div>
                <div>
                  <span className="text-sm">
                    {format(state?.date ?? '', 'dd/MM/yyyy HH:mm')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export { StateHistorySheet };
