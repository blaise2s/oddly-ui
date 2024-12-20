import { Chip } from '@mui/material';
import { KeyboardEvent, Ref } from 'react';
import { ColumnTypes, QueryPart } from '../queryBuilderTypesAndConstants';
import { QueryPartChipDisplay } from './QueryPartChipDisplay';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getChipColor = (queryPart: QueryPart<any>) => {
  if (queryPart?.sort) {
    return 'default';
  }

  switch (queryPart.column.type) {
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
  getRef: Ref<HTMLDivElement | null>;
}

export const QueryPartChip = ({
  queryPart,
  handleDeleteQueryPartChip,
  handleQueryPartChipKeyDown,
  getRef,
}: QueryPartChipProps) => {
  const color = getChipColor(queryPart);
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
