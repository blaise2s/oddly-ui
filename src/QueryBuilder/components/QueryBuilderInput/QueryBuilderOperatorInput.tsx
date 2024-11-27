import { Autocomplete, TextField } from '@mui/material';
import { InputFoci, QueryPartTypes } from '../../queryBuilderTypesAndConstants';
import { useQueryBuilderContext } from '../QueryBuilderContext';
import { BaseQueryBuilderInputFieldProps } from './queryBuilderInputTypes';

export const QueryBuilderOperatorInput = ({
  textFieldOverrides,
}: BaseQueryBuilderInputFieldProps) => {
  const {
    currentlyBuildingFilterQuery,
    setCurrentlyBuildingFilterQuery,
    setInputFocus,
    operatorRef,
    setAddNewQueryPart,
  } = useQueryBuilderContext();

  return (
    <Autocomplete
      options={currentlyBuildingFilterQuery?.column?.operators || []}
      getOptionLabel={(operator) => operator.displayText}
      getOptionKey={(operator) => operator.id}
      value={
        currentlyBuildingFilterQuery?.operator
          ? currentlyBuildingFilterQuery.operator
          : undefined
      }
      onChange={(_event, operator) => {
        setCurrentlyBuildingFilterQuery((previous) => ({
          ...previous,
          operator: operator || undefined,
        }));
        if (operator && !operator.valueNotRequired) {
          setInputFocus(InputFoci.Value);
        } else if (operator) {
          setAddNewQueryPart(QueryPartTypes.Filter);
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
            startAdornment: `${currentlyBuildingFilterQuery?.column?.displayText || ''}`,
          }}
          sx={{ ...textFieldOverrides }}
        />
      )}
    />
  );
};
