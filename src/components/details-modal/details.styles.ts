import {
  Button as BaseButton,
  ListItem as BaseListItem,
  Typography,
  Dialog as BaseDialog,
} from '@mui/material';
import styled from 'styled-components';

export const ListItem = styled(BaseListItem).attrs({
  alignItems: 'flex-start',
})``;

export const InfoBox = styled.div`
  margin-bottom: 24px;
`;

export const Col = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const SectionTitle = styled(Typography).attrs({
  variant: 'h5',
  fontWeight: 700,
})``;

export const SectionSubtitle = styled(Typography).attrs({
  variant: 'h6',
  fontWeight: 500,
  marginTop: 2,
})``;

export const Subtitle = styled(Typography).attrs({
  variant: 'subtitle1',
})``;

export const Item = styled(Typography).attrs({
  variant: 'body2',
})``;

export const Dialog = styled(BaseDialog).attrs({
  fullWidth: true,
  maxWidth: 'md',
})``;

export const ViewHistoryButton = styled(BaseButton).attrs({
  variant: 'contained',
})``;
