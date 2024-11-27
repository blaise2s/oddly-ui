import { Autocomplete, TextField } from '@mui/material';
import {
  BaseQueryBuilderInputFieldProps,
  QueryPartTypes,
  SORTS,
} from '../../queryBuilderTypesAndConstants';
import { useQueryBuilderContext } from '../QueryBuilderContext';

export const QueryBuilderSortInput = ({
  textFieldOverrides,
}: BaseQueryBuilderInputFieldProps) => {
  const {
    currentlyBuildingGroupingQuery,
    setCurrentlyBuildingGroupingQuery,
    sortRef,
    setAddNewQueryPart,
  } = useQueryBuilderContext();

  return (
    <Autocomplete
      options={SORTS}
      getOptionLabel={(sort) => sort.displayText}
      getOptionKey={(sort) => sort.id}
      value={
        currentlyBuildingGroupingQuery?.sort
          ? currentlyBuildingGroupingQuery.sort
          : undefined
      }
      onChange={(_event, sort) => {
        setCurrentlyBuildingGroupingQuery((previous) => ({
          ...previous,
          sort: sort || undefined,
        }));
        if (sort) {
          setAddNewQueryPart(QueryPartTypes.Grouping);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={sortRef}
          color='info'
          placeholder='Select Sort'
          // TODO: InputProps is deprecated, but slotProps did not work as expected, submit bug to MUI
          InputProps={{
            ...params.InputProps,
            startAdornment: `${currentlyBuildingGroupingQuery?.column?.displayText || ''}`,
          }}
          sx={{ ...textFieldOverrides }}
        />
      )}
    />
  );
};
