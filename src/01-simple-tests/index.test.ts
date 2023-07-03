import { simpleCalculator, Action } from './index';
describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 5, b: 7, action: Action.Add };
    const result = simpleCalculator(input);
    expect(result).toBe(12);
  });

  test('should subtract two numbers', () => {
    const input = { a: 15, b: 7, action: Action.Subtract };
    const result = simpleCalculator(input);
    expect(result).toBe(8);
  });

  test('should multiply two numbers', () => {
    const input = { a: 3, b: 7, action: Action.Multiply };
    const result = simpleCalculator(input);
    expect(result).toBe(21);
  });

  test('should divide two numbers', () => {
    const input = { a: 63, b: 7, action: Action.Divide };
    const result = simpleCalculator(input);
    expect(result).toBe(9);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Exponentiate };
    const result = simpleCalculator(input);
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const input = { a: 3, b: 7, action: '()' };
    const result = simpleCalculator(input);
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const input = { a: '3', b: '7', action: Action.Exponentiate };
    const result = simpleCalculator(input);
    expect(result).toBe(null);
  });
});
