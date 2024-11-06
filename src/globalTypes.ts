import { SxProps } from '@mui/material';

export interface Column {
  name: string;
  sx?: SxProps;
  align?: 'center' | 'left' | 'right';
}

export interface Selectable {
  selected: boolean;
}

export interface AdditionalFilter extends Selectable {
  name: string;
}
