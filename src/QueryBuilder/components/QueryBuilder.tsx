/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, SxProps } from '@mui/material';
import { useEffect } from 'react';
import { Column, QueryPartTypes } from '../queryBuilderTypesAndConstants';
import { sortGroupingsToTheEnd } from '../queryBuilderUtils';
import { useQueryBuilderContext } from './QueryBuilderContext';
import { QueryBuilderFilterInput } from './QueryBuilderFilterInput/QueryBuilderFilterInput';
import { QueryBuilderGroupingInput } from './QueryBuilderGroupingInput/QueryBuilderGroupingInput';
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
    currentlyBuildingFilterQuery,
    currentlyBuildingGroupingQuery,
    addNewNewQuery,
    setAddNewQueryPart,
    chipRefs,
    handleAddQueryPart,
    handleKeyDown,
    handleDeleteQueryPartChip,
    handleQueryPartChipKeyDown,
  } = useQueryBuilderContext();

  useEffect(() => {
    if (addNewNewQuery !== null) {
      switch (addNewNewQuery) {
        case QueryPartTypes.Filter:
          handleAddQueryPart(currentlyBuildingFilterQuery, addNewNewQuery);
          break;

        case QueryPartTypes.Grouping:
          handleAddQueryPart(currentlyBuildingGroupingQuery, addNewNewQuery);
          break;
      }
      setAddNewQueryPart(null);
    }
  }, [
    addNewNewQuery,
    handleAddQueryPart,
    currentlyBuildingFilterQuery,
    currentlyBuildingGroupingQuery,
    setAddNewQueryPart,
  ]);

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
        {queryParts.sort(sortGroupingsToTheEnd).map((queryPart, index) => {
          return (
            <QueryPartChip
              key={queryPart.id}
              queryPart={queryPart}
              handleDeleteQueryPartChip={handleDeleteQueryPartChip}
              handleQueryPartChipKeyDown={(event) =>
                handleQueryPartChipKeyDown(event, index)
              }
              getRef={(element) => {
                chipRefs.current[index] = element;
              }}
            />
          );
        })}
        {inline && (
          <>
            <QueryBuilderFilterInput
              columns={columns}
              minTextFieldWidth={minTextFieldWidth}
            />
            <QueryBuilderGroupingInput
              columns={columns}
              minTextFieldWidth={minTextFieldWidth}
            />
          </>
        )}
      </Box>
      {!inline && (
        <>
          <QueryBuilderFilterInput
            columns={columns}
            minTextFieldWidth={minTextFieldWidth}
          />
          <QueryBuilderGroupingInput
            columns={columns}
            minTextFieldWidth={minTextFieldWidth}
          />
        </>
      )}
    </Box>
  );
};
