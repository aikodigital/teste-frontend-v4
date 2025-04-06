import styled from 'styled-components';
import {
  TextField as BaseTextField,
  Button as BaseButton,
} from '@mui/material';
import { palette } from '~/styles/colors';

export const FiltersWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 32px;
  padding: 32px 16px;
  align-items: center;
  position: absolute;
  z-index: 1000;
  bottom: 0;
  background-color: ${palette.neutral.lightest};
`;

export const TextField = styled(BaseTextField).attrs({
  variant: 'outlined',
  size: 'small',
  sx: {
    minWidth: '150px',
    marginBottom: '16px',
  },
})``;

export const Button = styled(BaseButton).attrs({
  variant: 'outlined',
})``;
