export const ColumnTypes = {
  Numeric: 'numeric',
  Text: 'text',
  Date: 'date',
  Multiselect: 'multiselect',
} as const;
export type ColumnType = (typeof ColumnTypes)[keyof typeof ColumnTypes];

export const OperatorIds = {
  EqualsText: 'equalsText',
  EqualsSymbol: 'equalsSymbol',
  NotEqualText: 'notEqualText',
  NotEqualSymbol: 'notEqualSymbol',
  GreaterThanText: 'greaterThanText',
  GreaterThanSymbol: 'greaterThanSymbol',
  LessThanText: 'lessThanText',
  LessThanSymbol: 'lessThanSymbol',
  GreaterThanEqualToText: 'greaterThanEqualToText',
  GreaterThanEqualToSymbol: 'greaterThanEqualToSymbol',
  LessThanEqualToText: 'lessThanEqualToText',
  LessThanEqualToSymbol: 'lessThanEqualToSymbol',
  Is: 'is',
  IsNot: 'isNot',
  Contains: 'contains',
  NotContain: 'notContains',
} as const;
export type OperatorId = (typeof OperatorIds)[keyof typeof OperatorIds];

export interface Operator {
  id: OperatorId;
  displayText: string;
  chipDisplayText?: string;
}

export interface Column<T> {
  id: string;
  displayText: string;
  type: ColumnType;
  operators: Operator[];
  values?: T[];
  valueDisplayTextProp?: keyof T;
  valueIdProp?: keyof T;
}

export interface QueryPart<T> {
  id: string;
  column: Column<T>;
  operator: Operator;
  value: T | T[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export const InputFoci = {
  Column: 'column',
  Operator: 'operator',
  Value: 'value',
} as const;
export type InputFocus = (typeof InputFoci)[keyof typeof InputFoci];

// Operators //
export const EqualsText: Operator = {
  id: OperatorIds.EqualsText,
  displayText: 'equals',
  chipDisplayText: '=',
};
export const EqualsSymbol: Operator = {
  id: OperatorIds.EqualsSymbol,
  displayText: '=',
};
export const NotEqualText: Operator = {
  id: OperatorIds.NotEqualText,
  displayText: 'does not equal',
  chipDisplayText: '!=',
};
export const NotEqualSymbol: Operator = {
  id: OperatorIds.NotEqualSymbol,
  displayText: '!=',
};
export const GreaterThanText: Operator = {
  id: OperatorIds.GreaterThanText,
  displayText: 'greater than',
  chipDisplayText: '>',
};
export const GreaterThanSymbol: Operator = {
  id: OperatorIds.GreaterThanSymbol,
  displayText: '>',
};
export const LessThanText: Operator = {
  id: OperatorIds.LessThanText,
  displayText: 'less than',
  chipDisplayText: '<',
};
export const LessThanSymbol: Operator = {
  id: OperatorIds.LessThanSymbol,
  displayText: '<',
};
export const GreaterThanEqualToText: Operator = {
  id: OperatorIds.GreaterThanEqualToText,
  displayText: 'greater than or equal to',
  chipDisplayText: '>=',
};
export const GreaterThanEqualToSymbol: Operator = {
  id: OperatorIds.GreaterThanEqualToSymbol,
  displayText: '>=',
};
export const LessThanEqualToText: Operator = {
  id: OperatorIds.LessThanEqualToText,
  displayText: 'less than or equal to',
  chipDisplayText: '<=',
};
export const LessThanEqualToSymbol: Operator = {
  id: OperatorIds.LessThanEqualToSymbol,
  displayText: '<=',
};
export const Is: Operator = {
  id: OperatorIds.Is,
  displayText: 'is',
  chipDisplayText: '=',
};
export const IsNot: Operator = {
  id: OperatorIds.IsNot,
  displayText: 'is not',
  chipDisplayText: '!=',
};
export const Contains: Operator = {
  id: OperatorIds.Contains,
  displayText: 'contains',
};
export const NotContain: Operator = {
  id: OperatorIds.NotContain,
  displayText: 'does not contain',
};

export const DefaultNumericOperators: Operator[] = [
  EqualsText,
  NotEqualText,
  GreaterThanText,
  LessThanText,
  GreaterThanEqualToText,
  LessThanEqualToText,
  EqualsSymbol,
  NotEqualSymbol,
  GreaterThanSymbol,
  LessThanSymbol,
  GreaterThanEqualToSymbol,
  LessThanEqualToSymbol,
  Is,
  IsNot,
];

export const DefaultTextOperators: Operator[] = [
  EqualsText,
  NotEqualText,
  EqualsSymbol,
  NotEqualSymbol,
  Is,
  IsNot,
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

export const COUNTRIES = ['USA', 'Canada', 'Mexico', 'UK'];

type UserColumn = Column<User>;
type AgeColumn = Column<number>;
type CountryColumn = Column<string>;
export type Columns = UserColumn | AgeColumn | CountryColumn;

export const COLUMNS: Columns[] = [
  {
    id: 'firstName',
    displayText: 'First Name',
    type: ColumnTypes.Text,
    operators: DefaultTextOperators,
    valueDisplayTextProp: 'firstName',
    valueIdProp: 'id',
  },
  {
    id: 'lastName',
    displayText: 'Last Name',
    type: ColumnTypes.Text,
    operators: DefaultTextOperators,
    valueDisplayTextProp: 'lastName',
    valueIdProp: 'id',
  },
  {
    id: 'age',
    displayText: 'Age',
    type: ColumnTypes.Numeric,
    operators: DefaultNumericOperators,
  },
  {
    id: 'country',
    displayText: 'Country',
    type: ColumnTypes.Multiselect,
    operators: [EqualsText, NotEqualText, EqualsSymbol, NotEqualSymbol],
    values: COUNTRIES,
  },
  {
    id: 'year',
    displayText: 'Year',
    type: ColumnTypes.Numeric,
    operators: DefaultNumericOperators,
  },
  {
    id: 'username',
    displayText: 'Username',
    type: ColumnTypes.Multiselect,
    operators: [EqualsText, NotEqualText, EqualsSymbol, NotEqualSymbol],
    valueDisplayTextProp: 'id',
    valueIdProp: 'id',
    values: USERS,
  },
  {
    id: 'dateOfBirth',
    displayText: 'Date of Birth',
    type: ColumnTypes.Date,
    operators: DefaultNumericOperators,
  },
];
