import { Autocomplete, TextField } from '@mui/material';
import {
  BaseQueryBuilderInputFieldProps,
  Column,
  FilterInputFoci,
} from '../../queryBuilderTypesAndConstants';
import { useQueryBuilderContext } from '../QueryBuilderContext';

interface QueryBuilderColumnInputProps extends BaseQueryBuilderInputFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Column<any>[];
}

export const QueryBuilderColumnInput = ({
  columns,
  textFieldOverrides,
}: QueryBuilderColumnInputProps) => {
  const {
    currentlyBuildingFilterQuery,
    setCurrentlyBuildingFilterQuery,
    setFilterInputFocus,
    columnRef,
  } = useQueryBuilderContext();

  return (
    <Autocomplete
      options={columns}
      getOptionLabel={(column) => column.displayText}
      getOptionKey={(column) => column.id}
      value={
        currentlyBuildingFilterQuery?.column
          ? currentlyBuildingFilterQuery.column
          : undefined
      }
      onChange={(_event, column) => {
        setCurrentlyBuildingFilterQuery(() => ({
          column: column || undefined,
        }));
        if (column) {
          setFilterInputFocus(FilterInputFoci.Operator);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={columnRef}
          variant='outlined'
          color='info'
          placeholder='Select Column'
          sx={textFieldOverrides}
        />
      )}
    />
  );
};
