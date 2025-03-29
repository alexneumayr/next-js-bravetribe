import { expect, test } from '@jest/globals';
import levelNames from '../levelNames';

test('Return level name which corresponds to the amount of experiences', () => {
  expect(levelNames(2)).toBe('Challenge Rookie');
  expect(levelNames(100)).toBe('Challenge Guru');
});

test('Throws an error when the parameter has an invalid data type', () => {
  // @ts-expect-error Test for invalid parameter types
  expect(() => levelNames('hi')).toThrow('Parameter must be a number');
  // @ts-expect-error Test for invalid parameter types
  expect(() => levelNames({ experiencesAmount: 12 })).toThrow(
    'Parameter must be a number',
  );
  // @ts-expect-error Test for invalid parameter types
  expect(() => levelNames()).toThrow('Parameter must be a number');
});

test('Throws an error if the parameter is a negative number', () => {
  expect(() => levelNames(-1)).toThrow('Parameter must not be a negative');
});
