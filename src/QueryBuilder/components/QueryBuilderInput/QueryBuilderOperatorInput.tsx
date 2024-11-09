import { Autocomplete, TextField } from '@mui/material';
import { InputFoci } from '../../queryBuilderTypesAndConstants';
import { useQueryBuilderContext } from '../QueryBuilderContext';
import { BaseQueryBuilderInputFieldProps } from './queryBuilderInputTypes';

export const QueryBuilderOperatorInput = ({
  textFieldOverrides,
}: BaseQueryBuilderInputFieldProps) => {
  const {
    currentlyBuildingQuery,
    setCurrentlyBuildingQuery,
    setInputFocus,
    operatorRef,
  } = useQueryBuilderContext();

  return (
    <Autocomplete
      options={currentlyBuildingQuery?.column?.operators || []}
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
          // TODO: InputProps is deprecated, but slotProps did not work as expected, submit bug to MUI
          InputProps={{
            ...params.InputProps,
            startAdornment: `${currentlyBuildingQuery?.column?.displayText || ''}`,
          }}
          sx={{ ...textFieldOverrides }}
        />
      )}
    />
  );
};
