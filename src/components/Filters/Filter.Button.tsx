import React from 'react';

interface FilterButtonProps {
  active: boolean;
  currentId: string;
  currentChoice: string;
  children: React.ReactNode;
  setCurrentChoice: (value: string) => void;
}

function FilterButton({
  children,
  active,
  currentId,
  currentChoice,
  setCurrentChoice,
}: FilterButtonProps) {
  const updateStateFilter = (id: string) => {
    const cleanFilter = '';

    if (id === currentChoice) return setCurrentChoice(cleanFilter);
    return setCurrentChoice(id);
  };

  return (
    <button
      onClick={() => updateStateFilter(currentId)}
      className={`
        px-4
        py-2
        shadow-md
        font-medium
        rounded-full
        hover:bg-blue-400
        ${active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}
      `}
    >
      {children}
    </button>
  );
}

export default FilterButton;
