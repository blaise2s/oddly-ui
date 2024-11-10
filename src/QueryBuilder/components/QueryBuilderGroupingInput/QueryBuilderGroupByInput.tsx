import { Autocomplete, TextField } from '@mui/material';
import {
  BaseQueryBuilderInputFieldProps,
  Column,
  GroupingInputFoci,
} from '../../queryBuilderTypesAndConstants';
import { useQueryBuilderContext } from '../QueryBuilderContext';

interface QueryBuilderColumnInputProps extends BaseQueryBuilderInputFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Column<any>[];
}

export const QueryBuilderGroupByInput = ({
  columns,
  textFieldOverrides,
}: QueryBuilderColumnInputProps) => {
  const {
    currentlyBuildingGroupingQuery,
    setCurrentlyBuildingGroupingQuery,
    setGroupingInputFocus,
    groupByRef,
  } = useQueryBuilderContext();

  return (
    <Autocomplete
      options={columns}
      getOptionLabel={(column) => column.displayText}
      getOptionKey={(column) => column.id}
      value={
        currentlyBuildingGroupingQuery?.column
          ? currentlyBuildingGroupingQuery.column
          : undefined
      }
      onChange={(_event, column) => {
        setCurrentlyBuildingGroupingQuery(() => ({
          column: column || undefined,
        }));
        if (column) {
          setGroupingInputFocus(GroupingInputFoci.Sort);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={groupByRef}
          variant='outlined'
          color='info'
          placeholder='Group By'
          sx={textFieldOverrides}
        />
      )}
    />
  );
};
