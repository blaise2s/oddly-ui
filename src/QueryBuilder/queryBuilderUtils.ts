/* eslint-disable @typescript-eslint/no-explicit-any */
import { SxProps } from '@mui/material';
import { HTMLInputTypeAttribute } from 'react';
import {
  ColumnType,
  ColumnTypes,
  QueryPart,
  QueryPartTypes,
} from './queryBuilderTypesAndConstants';

export const logQueryParts = (queryParts: QueryPart<any>[]) => {
  console.log('QueryParts:', queryParts);
};

export const getDisplayValue = (queryPart: QueryPart<any>): string => {
  if (!queryPart.value) {
    return '';
  }

  const queryPartValue = queryPart.value;
  if (typeof queryPartValue === 'string' || queryPartValue instanceof String) {
    return queryPartValue.toString();
  }

  const valueDisplayTextProp = queryPart.column.valueDisplayTextProp;
  const displayValue = queryPartValue.length
    ? queryPartValue
        .map((v: any) => (valueDisplayTextProp ? v[valueDisplayTextProp] : v))
        .join(' or ')
    : valueDisplayTextProp
      ? queryPartValue[valueDisplayTextProp]
      : queryPartValue;
  return displayValue;
};

export const getTextFieldType = (
  columnType?: ColumnType,
): HTMLInputTypeAttribute | undefined => {
  if (!columnType) {
    return undefined;
  }

  switch (columnType) {
    case ColumnTypes.Text:
      return 'text';
    case ColumnTypes.Numeric:
      return 'number';
    case ColumnTypes.Date:
      return 'date';
    case ColumnTypes.Multiselect:
    default:
      return undefined;
  }
};

export const getTextFieldOverrides = (minTextFieldWidth?: string): SxProps => {
  return {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
      '& input': {
        ...(minTextFieldWidth && {
          minWidth: `${minTextFieldWidth} !important`,
        }),
      },
    },
  };
};

export const sortGroupingsToTheEnd = (
  queryPart1: QueryPart<any>,
  queryPart2: QueryPart<any>,
) => {
  if (
    queryPart1.type === QueryPartTypes.Grouping &&
    queryPart2.type !== QueryPartTypes.Grouping
  ) {
    return 1;
  } else if (
    queryPart1.type !== QueryPartTypes.Grouping &&
    queryPart2.type === QueryPartTypes.Grouping
  ) {
    return -1;
  } else {
    return 0;
  }
};
