import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elements = [1];
    const expectedLinkedList = {
      value: 1,
      next: {
        value: null,
        next: null,
      },
    };

    const generatedLinkedList = generateLinkedList(elements);
    expect(generatedLinkedList).toStrictEqual(expectedLinkedList);
  });

  const elements = [1, 2, 3, 4, 5];
  const expectedLinkedList = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: {
            value: 5,
            next: {
              value: null,
              next: null,
            },
          },
        },
      },
    },
  };

  const generatedLinkedList = generateLinkedList(elements);
  expect(generatedLinkedList).toStrictEqual(expectedLinkedList);

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elements = [10, 20, 30];
    const generatedLinkedList = generateLinkedList(elements);
    expect(generatedLinkedList).toMatchSnapshot();
  });
});
