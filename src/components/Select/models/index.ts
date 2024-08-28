import { SelectOption } from '@/@types';
import { Props as ReactSelectProps } from 'react-select';

export interface SelectProps extends ReactSelectProps {
  label?: string;
  testId?: string;
  options: SelectOption[];
}
