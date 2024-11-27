/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeyboardEvent, ReactNode, useRef, useState } from 'react';
import { v7 as uuidv7 } from 'uuid';
import {
  FilterInputFoci,
  FilterInputFocus,
  GroupingInputFoci,
  GroupingInputFocus,
  QueryPart,
  QueryPartType,
  QueryPartTypes,
} from '../queryBuilderTypesAndConstants';
import { logQueryParts } from '../queryBuilderUtils';
import {
  QueryBuilderContext,
  QueryBuilderContextType,
} from './QueryBuilderContext';

interface QueryBuilderContextProviderProps {
  children: ReactNode;
}

export const QueryBuilderContextProvider = ({
  children,
}: QueryBuilderContextProviderProps) => {
  const [queryParts, setQueryParts] = useState<QueryPart<any>[]>([]);
  const [currentlyBuildingFilterQuery, setCurrentlyBuildingFilterQuery] =
    useState<Partial<QueryPart<any>>>({});
  const [currentlyBuildingGroupingQuery, setCurrentlyBuildingGroupingQuery] =
    useState<Partial<QueryPart<any>>>({});
  const [filterInputFocus, setFilterInputFocus] = useState<FilterInputFocus>(
    FilterInputFoci.Column,
  );
  const [groupingInputFocus, setGroupingInputFocus] =
    useState<GroupingInputFocus | null>(null);
  const [addNewNewQuery, setAddNewQueryPart] = useState<QueryPartType | null>(
    null,
  );

  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const columnRef = useRef<HTMLInputElement | null>(null);
  const operatorRef = useRef<HTMLInputElement | null>(null);
  const valueRef = useRef<HTMLInputElement | null>(null);
  const groupByRef = useRef<HTMLInputElement | null>(null);
  const sortRef = useRef<HTMLInputElement | null>(null);

  const addQueryPart = (queryPart: QueryPart<any>) => {
    setQueryParts((previousQueryParts) => {
      const newQueryParts = [...previousQueryParts, queryPart];
      logQueryParts(newQueryParts);
      return newQueryParts;
    });
  };

  const handleAddQueryPart = (
    query: Partial<QueryPart<any>>,
    type: QueryPartType,
  ) => {
    if (
      type === QueryPartTypes.Filter &&
      query.column &&
      query.operator &&
      (query.value || query.operator.valueNotRequired)
    ) {
      const newPart: QueryPart<any> = {
        id: uuidv7(),
        type,
        column: query.column,
        operator: query?.operator,
        value: query?.value,
      };
      addQueryPart(newPart);
      setCurrentlyBuildingFilterQuery({});
      setFilterInputFocus(FilterInputFoci.Column);
    }

    if (type === QueryPartTypes.Grouping && query.column && query.sort) {
      const newPart: QueryPart<any> = {
        id: uuidv7(),
        type,
        column: query.column,
        sort: query?.sort,
      };
      addQueryPart(newPart);
      setCurrentlyBuildingGroupingQuery({});
      setGroupingInputFocus(GroupingInputFoci.GroupBy);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const currentChipRefs = chipRefs.current;
    const chipIsInFocus = currentChipRefs.some((chipRef) => {
      return chipRef === document.activeElement;
    });

    if (chipIsInFocus) {
      return;
    }

    switch (event.key) {
      case 'ArrowLeft':
        if (filterInputFocus === FilterInputFoci.Operator) {
          setFilterInputFocus(FilterInputFoci.Column);
        } else if (filterInputFocus === FilterInputFoci.Value) {
          setFilterInputFocus(FilterInputFoci.Operator);
        } else if (groupingInputFocus === GroupingInputFoci.Sort) {
          setGroupingInputFocus(GroupingInputFoci.GroupBy);
        }
        break;

      case 'ArrowRight':
        if (
          filterInputFocus === FilterInputFoci.Column &&
          currentlyBuildingFilterQuery.column
        ) {
          setFilterInputFocus(FilterInputFoci.Operator);
        } else if (
          filterInputFocus === FilterInputFoci.Operator &&
          currentlyBuildingFilterQuery.operator
        ) {
          setFilterInputFocus(FilterInputFoci.Value);
        } else if (
          groupingInputFocus === GroupingInputFoci.GroupBy &&
          currentlyBuildingGroupingQuery.column
        ) {
          setGroupingInputFocus(GroupingInputFoci.Sort);
        }
        break;

      default:
        break;
    }
  };

  const handleQueryPartChipKeyDown = (event: KeyboardEvent, index: number) => {
    switch (event.key) {
      case 'ArrowLeft':
        if (index > 0) {
          chipRefs.current[index - 1]?.focus();
        }
        break;

      case 'ArrowRight':
        if (index < queryParts.length - 1) {
          chipRefs.current[index + 1]?.focus();
        }
        break;

      default:
        break;
    }
  };

  const handleDeleteQueryPartChip = (id: string) => {
    const updatedQueryParts = queryParts.filter(
      (queryPart) => queryPart.id !== id,
    );
    setQueryParts(updatedQueryParts);
    logQueryParts(updatedQueryParts);
  };

  const queryBuilderContext: QueryBuilderContextType = {
    queryParts,
    setQueryParts,
    currentlyBuildingFilterQuery,
    setCurrentlyBuildingFilterQuery,
    currentlyBuildingGroupingQuery,
    setCurrentlyBuildingGroupingQuery,
    filterInputFocus,
    setFilterInputFocus,
    groupingInputFocus,
    setGroupingInputFocus,
    addNewNewQuery,
    setAddNewQueryPart,
    chipRefs,
    columnRef,
    operatorRef,
    valueRef,
    groupByRef,
    sortRef,
    handleAddQueryPart,
    handleKeyDown,
    handleDeleteQueryPartChip,
    handleQueryPartChipKeyDown,
  };

  return (
    <QueryBuilderContext.Provider value={queryBuilderContext}>
      {children}
    </QueryBuilderContext.Provider>
  );
};
