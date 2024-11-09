# Design Document: Query Builder

### Overview

The Query Builder is a React component developed using TypeScript and Material UI. It provides a user-friendly interface for building complex queries through a combination of typeahead, dropdowns, and text inputs. The component allows users to create, navigate, and modify queries seamlessly using both the keyboard and mouse. The queries are displayed as chips once each query part is complete.

### Components and Architecture

#### Main Components

1. **QueryBuilder**

   - The main component that handles query building, input management, and rendering.
   - Manages the overall state of the query parts and the current input focus.
   - Outputs the query to the console

#### Supporting Components

1. **Material UI Components**

   - **TextField**: For rendering input fields.
   - **Autocomplete**: For typeahead functionality in selecting columns, operators, and values.
   - **Chip**: To display completed query parts.
   - **Box**: For layout and structuring.

#### Data Structures

- **Type Definitions**:

  ```typescript
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
    valueDisplayTextProp?: keyof T;
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
  ```

- **Data**:

  - Columns & Values:

    ```typescript
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
    export const AGES = Array.from({ length: END_AGE - START_AGE + 1 }, (_, index) => START_AGE + index);

    const START_YEAR = 2000;
    const END_YEAR = new Date().getFullYear();
    const YEARS = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, index) => START_YEAR + index);

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
        operators: [Equals, NotEqual],
        values: COUNTRIES,
      },
      {
        id: 'year',
        displayText: 'Year',
        type: ColumnTypes.Numeric,
        operators: [Equals, NotEqual],
      },
      {
        id: 'username',
        displayText: 'Username',
        type: ColumnTypes.Multiselect,
        operators: [Equals, NotEqual],
        valueDisplayTextProp: 'id',
        valueIdProp: 'id',
        values: USERS,
      },
    ];
    ```

  - Operators:

    ```typescript
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

    export const NumericOperators: Operator[] = [Equals, NotEqual, GreaterThan, LessThan, GreaterThanEqualTo, LessThanEqualTo];

    export const TextOperators: Operator[] = [Equals, NotEqual, Contains, NotContain];
    ```

### Functionality

#### Query Building

- Users select a column, choose an operator, and input/select a value to form a query part.
- When a complete query part is built, it is added as a chip.

#### Keyboard Navigation

- **Arrow Keys**: Navigate between the chips and input fields.
- **Delete/Backspace**: Remove a selected chip.
- **Enter**: Confirm and add the current query part.
- **Tab**: Move through input fields.

#### Handling State

- `useState` is used to manage:
  - The list of query parts.
  - The current query being built.
  - Input focus to determine which part of the form is active.
- `useRef` is used for referencing chip elements for keyboard navigation.

#### Functions

1. `handleAddQueryPart`: Validates and adds the current query part to the `queryParts` state.
2. `handleDeleteQueryPart`: Removes a chip from `queryParts` by its `id`.
3. `handleChipKeyDown`: Manages keyboard events for navigating between and deleting chips.
4. `handleKeyDown`: Navigates between the input fields using arrow keys.

### Example Workflow

1. User starts typing in the column field and selects a column (e.g., "Country").
2. User moves to the operator field (using `ArrowRight` or `Tab`) and selects an operator (e.g., "equals").
3. User inputs or selects a value (e.g., "USA").
4. User presses `Enter`, and the query part "Country = USA" is added as a chip.
5. User navigates between chips using `ArrowLeft` and `ArrowRight`.
6. User deletes a chip by selecting it and pressing `Delete` or `Backspace`.

### Edge Cases and Considerations

- Ensure that incomplete query parts cannot be added.
- Handle empty values gracefully to avoid breaking the UI.
- Provide visual feedback for active input fields for better UX.

### Future Enhancements

- Add support for more complex conditions (e.g., AND/OR logic).
- Include validation rules specific to data types (e.g., numerical validation for "Age").
- Enhance styling and add animations for smoother transitions.

### Conclusion

The Query Builder component is a versatile tool for constructing dynamic queries with ease. The use of React hooks, Material UI components, and keyboard navigation ensures an intuitive and efficient user experience.
