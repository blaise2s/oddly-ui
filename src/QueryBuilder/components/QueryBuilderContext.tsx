/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  Dispatch,
  KeyboardEvent,
  RefObject,
  SetStateAction,
  useContext,
} from 'react';
import {
  FilterInputFocus,
  GroupingInputFocus,
  QueryPart,
  QueryPartType,
} from '../queryBuilderTypesAndConstants';

export interface QueryBuilderContextType {
  queryParts: QueryPart<any>[];
  setQueryParts: Dispatch<SetStateAction<QueryPart<any>[]>>;
  currentlyBuildingFilterQuery: Partial<QueryPart<any>>;
  setCurrentlyBuildingFilterQuery: Dispatch<
    SetStateAction<Partial<QueryPart<any>>>
  >;
  currentlyBuildingGroupingQuery: Partial<QueryPart<any>>;
  setCurrentlyBuildingGroupingQuery: Dispatch<
    SetStateAction<Partial<QueryPart<any>>>
  >;
  filterInputFocus: FilterInputFocus;
  setFilterInputFocus: Dispatch<SetStateAction<FilterInputFocus>>;
  groupingInputFocus: GroupingInputFocus | null;
  setGroupingInputFocus: Dispatch<SetStateAction<GroupingInputFocus | null>>;
  addNewNewQuery: QueryPartType | null;
  setAddNewQueryPart: Dispatch<SetStateAction<QueryPartType | null>>;
  chipRefs: RefObject<(HTMLDivElement | null)[]>;
  columnRef: RefObject<HTMLDivElement | null>;
  operatorRef: RefObject<HTMLDivElement | null>;
  valueRef: RefObject<HTMLDivElement | null>;
  groupByRef: RefObject<HTMLDivElement | null>;
  sortRef: RefObject<HTMLDivElement | null>;

  handleAddQueryPart: (
    query: Partial<QueryPart<any>>,
    type: QueryPartType,
  ) => void;
  handleKeyDown: (event: KeyboardEvent) => void;
  handleDeleteQueryPartChip: (id: string) => void;
  handleQueryPartChipKeyDown: (event: KeyboardEvent, index: number) => void;
}

export const QueryBuilderContext =
  createContext<QueryBuilderContextType | null>(null);

export const useQueryBuilderContext = () => {
  const context = useContext(QueryBuilderContext);
  if (!context) {
    throw new Error(
      'useQueryBuilderContext must be used within a <QueryBuilderContext />',
    );
  }
  return context;
};
