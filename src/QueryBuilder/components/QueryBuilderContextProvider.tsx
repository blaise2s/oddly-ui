/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeyboardEvent, ReactNode, useRef, useState } from 'react';
import { v7 as uuidv7 } from 'uuid';
import {
  InputFoci,
  InputFocus,
  QueryPart,
  QueryPartType,
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
  const [inputFocus, setInputFocus] = useState<InputFocus>(InputFoci.Column);
  const [addNewNewQuery, setAddNewQueryPart] = useState<QueryPartType | null>(
    null,
  );

  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const columnRef = useRef<HTMLInputElement | null>(null);
  const operatorRef = useRef<HTMLInputElement | null>(null);
  const valueRef = useRef<HTMLInputElement | null>(null);

  const handleAddQueryPart = (
    query: Partial<QueryPart<any>>,
    type: QueryPartType,
  ) => {
    if (
      query.column &&
      ((query.operator && (query.value || query.operator.valueNotRequired)) ||
        query.sort)
    ) {
      const newPart: QueryPart<any> = {
        id: uuidv7(),
        type,
        column: query.column,
        operator: query?.operator,
        value: query?.value,
        sort: query?.sort,
      };
      setQueryParts((previousQueryParts) => {
        const newQueryParts = [...previousQueryParts, newPart];
        logQueryParts(newQueryParts);
        return newQueryParts;
      });
      setCurrentlyBuildingFilterQuery({});
      setInputFocus(InputFoci.Column);
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
        if (inputFocus === InputFoci.Operator) {
          setInputFocus(InputFoci.Column);
        } else if (inputFocus === InputFoci.Value) {
          setInputFocus(InputFoci.Operator);
        }
        break;

      case 'ArrowRight':
        if (
          inputFocus === InputFoci.Column &&
          currentlyBuildingFilterQuery.column
        ) {
          setInputFocus(InputFoci.Operator);
        } else if (
          inputFocus === InputFoci.Operator &&
          currentlyBuildingFilterQuery.operator
        ) {
          setInputFocus(InputFoci.Value);
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
    inputFocus,
    setInputFocus,
    addNewNewQuery,
    setAddNewQueryPart,
    chipRefs,
    columnRef,
    operatorRef,
    valueRef,
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
