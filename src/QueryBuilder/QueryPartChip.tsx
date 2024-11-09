import { Chip } from '@mui/material';
import { KeyboardEvent } from 'react';
import { QueryPartChipDisplay } from './QueryPartChipDisplay';
import {
  ColumnType,
  ColumnTypes,
  QueryPart,
} from './queryBuilderTypesAndConstants';

const getChipColor = (columnType: ColumnType) => {
  switch (columnType) {
    case ColumnTypes.Text:
      return 'info';
    case ColumnTypes.Numeric:
      return 'success';
    case ColumnTypes.Date:
      return 'primary';
    case ColumnTypes.Multiselect:
      return 'warning';
    default:
      return 'default';
  }
};

interface QueryPartChipProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryPart: QueryPart<any>;
  handleDeleteQueryPartChip: (id: string) => void;
  handleQueryPartChipKeyDown: (event: KeyboardEvent) => void;
  getRef: (element: HTMLDivElement | null) => HTMLDivElement | null;
}

export const QueryPartChip = ({
  queryPart,
  handleDeleteQueryPartChip,
  handleQueryPartChipKeyDown,
  getRef,
}: QueryPartChipProps) => {
  const color = getChipColor(queryPart.column.type);
  return (
    <Chip
      color={color}
      key={queryPart.id}
      tabIndex={0}
      label={<QueryPartChipDisplay queryPart={queryPart} />}
      onDelete={() => handleDeleteQueryPartChip(queryPart.id)}
      onKeyDown={(event) => handleQueryPartChipKeyDown(event)}
      ref={getRef}
    />
  );
};
