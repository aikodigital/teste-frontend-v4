'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from '@/hooks/useRouter';
import { ArrowUpDownIcon } from 'lucide-react';

interface FilterPositionsProps {
  sortOrder: 'asc' | 'desc';
}

function FilterPositions({ sortOrder }: FilterPositionsProps) {
  const { navigate } = useRouter();

  return (
    <div className="grid gap-8 px-2 pt-2">
      <div className="flex flex-col items-start gap-4 sm:flex-row">
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
              onValueChange={(value) => navigate([{ sortOrder: value }])}
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
  );
}

export { FilterPositions };
