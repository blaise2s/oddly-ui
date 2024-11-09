/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, SxProps } from '@mui/material';
import { useEffect } from 'react';
import { useQueryBuilderContext } from './QueryBuilderContext';
import { QueryBuilderInput } from './QueryBuilderInput';
import { Column } from './queryBuilderTypesAndConstants';
import { QueryPartChip } from './QueryPartChip';

interface QueryBuilderProps {
  columns: Column<any>[];
  inline?: boolean;
  minTextFieldWidth?: string;
  sx?: SxProps;
}

export const QueryBuilder = ({
  columns,
  inline,
  minTextFieldWidth,
  sx: queryBuilderSx,
}: QueryBuilderProps) => {
  const {
    queryParts,
    currentlyBuildingQuery,
    addNewQuery,
    setAddNewQuery,
    chipRefs,
    handleAddQueryPart,
    handleKeyDown,
    handleDeleteQueryPartChip,
    handleQueryPartChipKeyDown,
  } = useQueryBuilderContext();

  useEffect(() => {
    if (addNewQuery) {
      handleAddQueryPart(currentlyBuildingQuery);
      setAddNewQuery(false);
    }
  }, [addNewQuery, handleAddQueryPart, currentlyBuildingQuery, setAddNewQuery]);

  return (
    <Box onKeyDown={handleKeyDown} tabIndex={-1} sx={queryBuilderSx}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0.5,
          alignItems: 'center',
        }}
      >
        {queryParts.map((queryPart, index) => {
          return (
            <QueryPartChip
              key={queryPart.id}
              queryPart={queryPart}
              handleDeleteQueryPartChip={handleDeleteQueryPartChip}
              handleQueryPartChipKeyDown={(event) =>
                handleQueryPartChipKeyDown(event, index)
              }
              getRef={(element) => (chipRefs.current[index] = element)}
            />
          );
        })}
        {inline && (
          <QueryBuilderInput
            columns={columns}
            minTextFieldWidth={minTextFieldWidth}
          />
        )}
      </Box>
      {!inline && (
        <QueryBuilderInput
          columns={columns}
          minTextFieldWidth={minTextFieldWidth}
        />
      )}
    </Box>
  );
};
