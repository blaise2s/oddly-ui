/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  Dispatch,
  KeyboardEvent,
  MutableRefObject,
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
  chipRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  columnRef: MutableRefObject<HTMLDivElement | null>;
  operatorRef: MutableRefObject<HTMLDivElement | null>;
  valueRef: MutableRefObject<HTMLDivElement | null>;
  groupByRef: MutableRefObject<HTMLDivElement | null>;
  sortRef: MutableRefObject<HTMLDivElement | null>;

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
