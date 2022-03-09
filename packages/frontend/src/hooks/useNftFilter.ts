import { useState } from 'react';

interface Props {
  data: Record<string, any>;
  isSelected?: boolean;
}

const useNftFilter = ({ data, isSelected }: Props) => {
  const [currentFilter, setCurrentFilter] = useState<string>(isSelected ? data[0].value : '');

  const filterSelection = data.map(s => ({
    ...s,
    onSelect: () => {
      if (!isSelected && s.value === currentFilter) {
        setCurrentFilter('');
      } else {
        setCurrentFilter(s.value);
      }
    },
  }));

  const currentFilterText = data.find(s => s.value === currentFilter)?.text;

  return { currentFilter, filterSelection, currentFilterText };
};

export default useNftFilter;
