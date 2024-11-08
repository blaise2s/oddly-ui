import { Operator, OperatorIds } from './types';

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
