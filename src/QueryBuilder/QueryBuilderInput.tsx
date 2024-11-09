import { Autocomplete, Box, SxProps, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useQueryBuilderContext } from './QueryBuilderContext';
import {
  Column,
  ColumnTypes,
  InputFoci,
} from './queryBuilderTypesAndConstants';
import { getTextFieldType } from './queryBuilderUtils';

const getTextFieldOverrides = (minTextFieldWidth: string): SxProps => {
  return {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
      '& input': {
        minWidth: `${minTextFieldWidth} !important`,
      },
    },
  };
};

interface QueryBuilderInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Column<any>[];
  minTextFieldWidth?: string;
  sx?: SxProps;
}

export const QueryBuilderInput = ({
  columns,
  minTextFieldWidth = '8rem',
  sx,
}: QueryBuilderInputProps) => {
  const {
    currentlyBuildingQuery,
    setCurrentlyBuildingQuery,
    inputFocus,
    setInputFocus,
    setAddNewQuery,
    columnRef,
    operatorRef,
    valueRef,
  } = useQueryBuilderContext();

  const textFieldOverrides = getTextFieldOverrides(minTextFieldWidth);

  useEffect(() => {
    switch (inputFocus) {
      case InputFoci.Column:
        columnRef.current?.focus();
        break;

      case InputFoci.Operator:
        operatorRef.current?.focus();
        break;

      case InputFoci.Value:
        valueRef.current?.focus();
        break;
    }
  }, [inputFocus, columnRef, operatorRef, valueRef]);

  return (
    <Box sx={sx}>
      {inputFocus === InputFoci.Column && (
        <Autocomplete
          options={columns}
          getOptionLabel={(column) => column.displayText}
          getOptionKey={(column) => column.id}
          value={
            currentlyBuildingQuery?.column
              ? currentlyBuildingQuery.column
              : undefined
          }
          onChange={(_event, column) => {
            setCurrentlyBuildingQuery(() => ({
              column: column || undefined,
            }));
            if (column) {
              setInputFocus(InputFoci.Operator);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={columnRef}
              variant='outlined'
              color='info'
              placeholder='Select Column'
              sx={{ ...textFieldOverrides }}
            />
          )}
        />
      )}

      {inputFocus === InputFoci.Operator && currentlyBuildingQuery.column && (
        <Autocomplete
          options={currentlyBuildingQuery.column.operators}
          getOptionLabel={(operator) => operator.displayText}
          getOptionKey={(operator) => operator.id}
          value={
            currentlyBuildingQuery?.operator
              ? currentlyBuildingQuery.operator
              : undefined
          }
          onChange={(_event, operator) => {
            setCurrentlyBuildingQuery((previous) => ({
              ...previous,
              operator: operator || undefined,
            }));
            if (operator) {
              setInputFocus(InputFoci.Value);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={operatorRef}
              color='info'
              placeholder='Select Operator'
              // TODO: InputProps is deprecated, but slotProps did not work as expected, submit but to MUI
              InputProps={{
                ...params.InputProps,
                startAdornment: `${currentlyBuildingQuery?.column?.displayText || ''}`,
              }}
              sx={{ ...textFieldOverrides }}
            />
          )}
        />
      )}

      {inputFocus === InputFoci.Value &&
        currentlyBuildingQuery.column &&
        currentlyBuildingQuery.operator && (
          <Autocomplete
            multiple={
              currentlyBuildingQuery.column.type === ColumnTypes.Multiselect
            }
            freeSolo={
              currentlyBuildingQuery.column.type !== ColumnTypes.Multiselect
            }
            options={currentlyBuildingQuery.column.values || []}
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
                  currentlyBuildingQuery?.column?.type ===
                  ColumnTypes.Multiselect
                    ? 'Select Values'
                    : 'Enter Value'
                }
                sx={{ ...textFieldOverrides }}
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
        )}
    </Box>
  );
};
