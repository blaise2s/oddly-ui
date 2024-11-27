import { Autocomplete, Box, TextField } from '@mui/material';
import {
  ColumnTypes,
  QueryPart,
  QueryPartTypes,
} from '../../queryBuilderTypesAndConstants';
import { getTextFieldType } from '../../queryBuilderUtils';
import { useQueryBuilderContext } from '../QueryBuilderContext';
import { BaseQueryBuilderInputFieldProps } from './queryBuilderInputTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getValue = (queryPart?: Partial<QueryPart<any>>) => {
  if (queryPart?.column && queryPart?.value) {
    const valueIdProp = queryPart.column?.valueIdProp;
    const value = queryPart.value;
    if (valueIdProp) {
      return value[valueIdProp];
    }
    return value;
  }
  return undefined;
};

export const QueryBuilderValueInput = ({
  textFieldOverrides,
}: BaseQueryBuilderInputFieldProps) => {
  const {
    currentlyBuildingFilterQuery,
    setCurrentlyBuildingFilterQuery,
    valueRef,
    setAddNewQueryPart,
  } = useQueryBuilderContext();

  const columnType = currentlyBuildingFilterQuery?.column?.type;
  const valueDisplayTextProp =
    currentlyBuildingFilterQuery.column?.valueDisplayTextProp;
  const valueIdProp = currentlyBuildingFilterQuery.column?.valueIdProp;

  return (
    <Autocomplete
      multiple={columnType === ColumnTypes.Multiselect}
      freeSolo={columnType !== ColumnTypes.Multiselect}
      options={currentlyBuildingFilterQuery?.column?.values || []}
      getOptionLabel={(value) => {
        // Needed to handle freeSolo
        if (typeof value === 'string' || value instanceof String) {
          return value;
        }
        return valueDisplayTextProp ? value[valueDisplayTextProp] : value;
      }}
      getOptionKey={(value) => (valueIdProp ? value[valueIdProp] : value)}
      value={getValue(currentlyBuildingFilterQuery)}
      onChange={(_event, value) => {
        setCurrentlyBuildingFilterQuery((previous) => ({
          ...previous,
          value: value || undefined,
        }));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={valueRef}
          type={getTextFieldType(columnType)}
          color='info'
          placeholder={
            columnType === ColumnTypes.Multiselect
              ? 'Select Values'
              : 'Enter Value'
          }
          sx={{ ...textFieldOverrides }}
          // TODO: InputProps is deprecated, but slotProps did not work as expected, submit bug to MUI
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <Box
                  sx={{ textWrap: 'nowrap' }}
                >{`${currentlyBuildingFilterQuery?.column?.displayText || ''} ${currentlyBuildingFilterQuery?.operator?.displayText || ''}`}</Box>
                <>{params.InputProps.startAdornment}</>
              </>
            ),
          }}
          onKeyDown={(event) => {
            if (
              columnType !== ColumnTypes.Multiselect &&
              event.key === 'Enter'
            ) {
              setAddNewQueryPart(QueryPartTypes.Filter);
              event.preventDefault();
            }
            if (
              (event.metaKey ||
                event.shiftKey ||
                event.altKey ||
                event.ctrlKey) &&
              event.key === 'Enter'
            ) {
              setAddNewQueryPart(QueryPartTypes.Filter);
              event.preventDefault();
            }
          }}
        />
      )}
    />
  );
};
