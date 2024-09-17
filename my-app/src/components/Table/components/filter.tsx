import React, { useMemo, useState } from 'react';
import styles from './Filter.module.css';
import CheckboxComponent from '@/components/Checkbox';
import { MagnifyingGlass } from 'react-loader-spinner';
import { formatToUpperCaseFirtsLetter } from '@/functions/formatToUpperCaseFirtsLetter';
import RadioGroup from '@/components/RadioGroup';

interface Props {
  options: Array<{ value: string | number; label: string }> | undefined;
  optionsSelected: Array<string | number> | undefined;
  setFilter?(arg: Array<number | string>): void;
  isMulti?: boolean;
}

const Filter: React.FC<Props> = ({
  options,
  optionsSelected = [],
  setFilter,
  isMulti,
}) => {
  const [search, setSearch] = useState('');
  const [filtersSelected, setFiltersSelected] = useState<
    Array<number | string>
  >([...optionsSelected]);

  const handleSetFilterIsMulti = (name: number | string, checked: boolean) => {
    if (checked) {
      setFiltersSelected((old) => [...old, name]);
      return;
    }
    setFiltersSelected((old) => old.filter((item) => item !== name));
  };

  const handleSetFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFiltersSelected([value]);
  };

  const optionsFiltered = useMemo(() => {
    return options
      ?.filter((item) =>
        item.label.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      )
      ?.map((item) => {
        return {
          label: formatToUpperCaseFirtsLetter(item.label),
          value: item?.value,
        };
      });
  }, [options, search]);

  const clearFilter = () => {
    setFilter!([]);
    setFiltersSelected([]);
  };

  return (
    <div className={styles.wrapperFilter}>
      <div className={styles.wrapperSearch}>
        <input
          aria-label="Buscar nos filtros"
          type="text"
          placeholder="Buscar nos filtros"
          onChange={(e) => setSearch(e.target.value)}
        />
        <MagnifyingGlass />
      </div>
      <div className={styles.wrapperOptions}>
        {isMulti ? (
          <>
            {optionsFiltered?.map((item, idx) => (
              <CheckboxComponent
                id={`checkbox-${idx}`}
                key={idx}
                label={item?.label}
                checked={filtersSelected?.includes(item.value)}
                onChecked={(checked) =>
                  handleSetFilterIsMulti(item?.value, checked)
                }
              />
            ))}
          </>
        ) : (
          <RadioGroup
            direction="column"
            sizeRadio={20}
            values={optionsFiltered!}
            selectedValue={filtersSelected[0]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSetFilter(e)
            }
          />
        )}
      </div>
      <div className={styles.wrapperButtons}>
        {setFilter && (
          <>
            <button
              aria-label="Limpar filtros"
              className={styles.buttonClearFilter}
              onClick={clearFilter}
            >
              Limpar
            </button>
            <button
              aria-label="Aplicar filtros"
              className={styles.buttonSetFilter}
              onClick={() => setFilter(filtersSelected)}
            >
              Filtrar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Filter;