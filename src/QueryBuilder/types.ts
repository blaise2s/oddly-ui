export const ColumnTypes = {
  Numeric: 'numeric',
  Text: 'text',
  Multiselect: 'multiselect',
} as const;
export type ColumnType = (typeof ColumnTypes)[keyof typeof ColumnTypes];

export interface Column<T> {
  id: string;
  displayText: string;
  type: ColumnType;
  operators: Operator[];
  values: T[];
  displayTextProp?: keyof T;
}

export const OperatorIds = {
  Equals: 'equals',
  NotEqual: 'notEqual',
  GreaterThan: 'greaterThan',
  LessThan: 'lessThan',
  GreaterThanEqualTo: 'greaterThanEqualTo',
  LessThanEqualTo: 'lessThanEqualTo',
  Contains: 'contains',
  NotContain: 'notContains',
} as const;
export type OperatorId = (typeof OperatorIds)[keyof typeof OperatorIds];

export interface Operator {
  id: OperatorId;
  displayText: string;
}

export interface QueryPart<T> {
  id: string;
  column: Column<T>;
  operator: Operator;
  value: T;
}
