import { Autocomplete, Box, TextField } from '@mui/material';
import { ColumnTypes } from '../../queryBuilderTypesAndConstants';
import { getTextFieldType } from '../../queryBuilderUtils';
import { useQueryBuilderContext } from '../QueryBuilderContext';
import { BaseQueryBuilderInputFieldProps } from './queryBuilderInputTypes';

export const QueryBuilderValueInput = ({
  textFieldOverrides,
}: BaseQueryBuilderInputFieldProps) => {
  const {
    currentlyBuildingQuery,
    setCurrentlyBuildingQuery,
    valueRef,
    setAddNewQuery,
  } = useQueryBuilderContext();

  return (
    <Autocomplete
      multiple={
        currentlyBuildingQuery?.column?.type === ColumnTypes.Multiselect
      }
      freeSolo={
        currentlyBuildingQuery?.column?.type !== ColumnTypes.Multiselect
      }
      options={currentlyBuildingQuery?.column?.values || []}
      getOptionLabel={(value) => {
        // Needed to handle freeSolo
        if (typeof value === 'string' || value instanceof String) {
          return value;
        }
        const valueDisplayTextProp =
          currentlyBuildingQuery.column?.valueDisplayTextProp;
        return valueDisplayTextProp ? value[valueDisplayTextProp] : value;
      }}
      getOptionKey={(value) => {
        const valueIdProp = currentlyBuildingQuery.column?.valueIdProp;
        return valueIdProp ? value[valueIdProp] : value;
      }}
      value={
        currentlyBuildingQuery?.value
          ? currentlyBuildingQuery.column?.valueIdProp
            ? currentlyBuildingQuery.value[
                currentlyBuildingQuery.column.valueIdProp
              ]
            : currentlyBuildingQuery.value
          : undefined
      }
      onChange={(_event, value) => {
        setCurrentlyBuildingQuery((previous) => ({
          ...previous,
          value: value || undefined,
        }));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={valueRef}
          type={getTextFieldType(currentlyBuildingQuery?.column?.type)}
          color='info'
          placeholder={
            currentlyBuildingQuery?.column?.type === ColumnTypes.Multiselect
              ? 'Select Values'
              : 'Enter Value'
          }
          sx={{ ...textFieldOverrides }}
          // TODO: InputProps is deprecated, but slotProps did not work as expected, submit but to MUI
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <Box
                  sx={{ textWrap: 'nowrap' }}
                >{`${currentlyBuildingQuery?.column?.displayText || ''} ${currentlyBuildingQuery?.operator?.displayText || ''}`}</Box>
                <>{params.InputProps.startAdornment}</>
              </>
            ),
          }}
          onKeyDown={(event) => {
            if (
              currentlyBuildingQuery?.column?.type !==
                ColumnTypes.Multiselect &&
              event.key === 'Enter'
            ) {
              setAddNewQuery(true);
              event.preventDefault();
            }
            if (
              (event.metaKey ||
                event.shiftKey ||
                event.altKey ||
                event.ctrlKey) &&
              event.key === 'Enter'
            ) {
              setAddNewQuery(true);
              event.preventDefault();
            }
          }}
        />
      )}
    />
  );
};
