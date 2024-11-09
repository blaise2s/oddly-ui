/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  Dispatch,
  KeyboardEvent,
  MutableRefObject,
  SetStateAction,
  useContext,
} from 'react';
import { InputFocus, QueryPart } from './queryBuilderTypesAndConstants';

export interface QueryBuilderContextType {
  queryParts: QueryPart<any>[];
  setQueryParts: Dispatch<SetStateAction<QueryPart<any>[]>>;
  currentlyBuildingQuery: Partial<QueryPart<any>>;
  setCurrentlyBuildingQuery: Dispatch<SetStateAction<Partial<QueryPart<any>>>>;
  inputFocus: InputFocus;
  setInputFocus: Dispatch<SetStateAction<InputFocus>>;
  addNewQuery: boolean;
  setAddNewQuery: Dispatch<SetStateAction<boolean>>;
  chipRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  columnRef: MutableRefObject<HTMLDivElement | null>;
  operatorRef: MutableRefObject<HTMLDivElement | null>;
  valueRef: MutableRefObject<HTMLDivElement | null>;

  handleAddQueryPart: (query: Partial<QueryPart<any>>) => void;
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
