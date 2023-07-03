import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 13, action: Action.Subtract, expected: -10 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: -5, b: 9, action: Action.Multiply, expected: -45 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 1, b: 1, action: Action.Divide, expected: 1 },
  { a: 1, b: 0, action: Action.Divide, expected: Infinity },
  { a: 1, b: 10, action: Action.Exponentiate, expected: 1 },
  { a: -5, b: 3, action: Action.Exponentiate, expected: -125 },
  { a: 3, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: '3', b: 2, action: Action.Exponentiate, expected: null },
  { a: 3, b: null, action: Action.Add, expected: null },
  { a: 3, b: 2, action: '*/', expected: null },
  { a: 3, b: 2, action: '+-', expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach((testItem) => {
    const { a, b, action, expected } = testItem;
    test(`should execute ${action} operation with ${a} and ${b} and return ${expected}`, () => {
      const rawInput = { a, b, action };
      const result = simpleCalculator(rawInput);
      expect(result).toBe(expected);
    });
  });
});
