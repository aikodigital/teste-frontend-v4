import { Button as BaseButton, Typography } from '@mui/material';
import { Popup as BasePopUp } from 'react-leaflet';
import styled from 'styled-components';

export const Button = styled(BaseButton).attrs({
  variant: 'contained',
})``;

export const Popup = styled(BasePopUp).attrs({
  minWidth: 180,
})``;

export const Name = styled(Typography).attrs({
  variant: 'h6',
})``;

export const Model = styled(Typography).attrs({
  variant: 'subtitle2',
  marginBottom: 4,
})``;
