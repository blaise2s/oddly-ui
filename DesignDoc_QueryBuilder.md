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
  const OperatorIds = {
    Equals: 'equals',
    NotEqual: 'notEqual',
    GreaterThan: 'greaterThan',
    LessThan: 'lessThan',
    GreaterThanEqualTo: 'greaterThanEqualTo',
    LessThanEqualTo: 'lessThanEqualTo',
    Contains: 'contains',
    NotContain: 'notContains',
  } as const;
  type OperatorId = (typeof OperatorIds)[keyof typeof OperatorIds];

  interface Operator {
    id: OperatorId;
    displayText: string;
  }

  interface QueryPart {
    id: string;
    operator: Operator;
    column: string;
    value: string;
  }
  ```

- **Data**:

  - Columns: `['First', 'Last', 'Age', 'Country', ...]`
  - Operators: `['=', '!=', '>', '<', '>=', '<=', 'contains', 'does not contain']`
  - Values by Column:
    ```typescript
    const valuesByColumn: { [key: string]: string[] } = {
      First: ['John', 'Jane', 'Johnny', 'George', 'Martha', 'Kris', 'Kiefer'],
      Last: ['Smith', 'Doe', 'Appleseed', 'Washington', 'Kringle', 'Sutherland'],
      Age: ['20', '21', '22', '...', '78', '79', '80'],
      Country: ['USA', 'Canada', 'Mexico', 'UK'],
    };
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
