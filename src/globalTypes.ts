import { SxProps } from '@mui/material';

export interface Column {
  id: string;
  name: string;
  sx?: SxProps;
  align?: 'center' | 'left' | 'right';
  sortable?: boolean;
  initialSort?: Sort;
}

export interface Selectable {
  selected: boolean;
}

export interface AdditionalFilter extends Selectable {
  name: string;
}

export const Sorts = {
  Asc: 'asc',
  Desc: 'desc',
} as const;
export type Sort = (typeof Sorts)[keyof typeof Sorts];

export interface Order<T> {
  by: T;
  sort: Sort;
}
