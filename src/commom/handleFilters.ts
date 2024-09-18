import { Dispatch, SetStateAction } from 'react';

export function handleFilters<T>(
  selectedFilters: T[],
  setSelectedFilters: Dispatch<SetStateAction<T[]>>,
  filterValue: T
) {
  if (!selectedFilters.includes(filterValue)) {
    setSelectedFilters(selectedFilters => [...selectedFilters, filterValue]);
  } else {
    setSelectedFilters(selectedFilters =>
      selectedFilters.filter(item => item !== filterValue)
    );
  }
}