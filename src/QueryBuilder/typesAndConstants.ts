export const ColumnTypes = {
  Numeric: 'numeric',
  Text: 'text',
  Multiselect: 'multiselect',
} as const;
export type ColumnType = (typeof ColumnTypes)[keyof typeof ColumnTypes];

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

export interface Column<T> {
  id: string;
  displayText: string;
  type: ColumnType;
  operators: Operator[];
  values: T[];
  displayTextProp?: keyof T;
}

export interface QueryPart<T> {
  id: string;
  column: Column<T>;
  operator: Operator;
  value: T;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

// Operators //
export const Equals: Operator = {
  id: OperatorIds.Equals,
  displayText: '=',
};
export const NotEqual: Operator = {
  id: OperatorIds.NotEqual,
  displayText: '!=',
};
export const GreaterThan: Operator = {
  id: OperatorIds.GreaterThan,
  displayText: '>',
};
export const LessThan: Operator = {
  id: OperatorIds.LessThan,
  displayText: '<',
};
export const GreaterThanEqualTo: Operator = {
  id: OperatorIds.GreaterThanEqualTo,
  displayText: '>=',
};
export const LessThanEqualTo: Operator = {
  id: OperatorIds.LessThanEqualTo,
  displayText: '<=',
};
export const Contains: Operator = {
  id: OperatorIds.Contains,
  displayText: 'contains',
};
export const NotContain: Operator = {
  id: OperatorIds.NotContain,
  displayText: 'does not contain',
};

export const NumericOperators: Operator[] = [
  Equals,
  NotEqual,
  GreaterThan,
  LessThan,
  GreaterThanEqualTo,
  LessThanEqualTo,
];

export const TextOperators: Operator[] = [
  Equals,
  NotEqual,
  Contains,
  NotContain,
];
// End Operators //

export const USERS: User[] = [
  { id: 'jsmith', firstName: 'John', lastName: 'Smith' },
  { id: 'jdoe', firstName: 'Jane', lastName: 'Doe' },
  { id: 'jappleseed', firstName: 'Johnny', lastName: 'Appleseed' },
  { id: 'gwashington', firstName: 'George', lastName: 'Washington' },
  { id: 'mwashington', firstName: 'Martha', lastName: 'Washington' },
  { id: 'kkringle', firstName: 'Kris', lastName: 'Kringle' },
  { id: 'ksutherland', firstName: 'Kiefer', lastName: 'Sutherland' },
];

const START_AGE = 20;
const END_AGE = 80;
export const AGES = Array.from(
  { length: END_AGE - START_AGE + 1 },
  (_, index) => START_AGE + index,
);

const START_YEAR = 2000;
const END_YEAR = new Date().getFullYear();
const YEARS = Array.from(
  { length: END_YEAR - START_YEAR + 1 },
  (_, index) => START_YEAR + index,
);

export const COUNTRIES = ['USA', 'Canada', 'Mexico', 'UK'];

type UserColumn = Column<User>;
type AgeColumn = Column<number>;
type CountryColumn = Column<string>;
type Columns = UserColumn | AgeColumn | CountryColumn;

export const COLUMNS: Columns[] = [
  {
    id: 'firstName',
    displayText: 'First Name',
    type: ColumnTypes.Text,
    operators: TextOperators,
    values: USERS,
    displayTextProp: 'firstName',
  },
  {
    id: 'lastName',
    displayText: 'Last Name',
    type: ColumnTypes.Text,
    operators: TextOperators,
    values: USERS,
    displayTextProp: 'lastName',
  },
  {
    id: 'age',
    displayText: 'Age',
    type: ColumnTypes.Multiselect,
    operators: NumericOperators,
    values: AGES,
  },
  {
    id: 'country',
    displayText: 'Country',
    type: ColumnTypes.Multiselect,
    operators: TextOperators,
    values: COUNTRIES,
  },
  {
    id: 'year',
    displayText: 'Year',
    type: ColumnTypes.Numeric,
    operators: NumericOperators,
    values: YEARS,
  },
];
