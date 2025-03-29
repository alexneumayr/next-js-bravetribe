import { expect, test } from '@jest/globals';
import { DateTime } from 'luxon';
import { getTimeAgo } from '../getTimeAgo';

const now = DateTime.now();

test('Return the passed time as a readable string', () => {
  expect(getTimeAgo(now.toJSDate())).toBe('Now');
  expect(getTimeAgo(now.minus({ hours: 1 }).toJSDate())).toBe('1 hour ago');
  expect(getTimeAgo(now.minus({ months: 2 }).toJSDate())).toBe('2 months ago');
});

test('throws an error if the parameter has an invalid datatype', () => {
  expect(() =>
    // @ts-expect-error Test for invalid parameter types
    getTimeAgo(123),
  ).toThrow('Parameter must be a DateTime object');
  expect(() =>
    // @ts-expect-error Test for invalid parameter types
    getTimeAgo('hi'),
  ).toThrow('Parameter must be a DateTime object');
});

test('throws an error when the date is in the future', () => {
  expect(() => getTimeAgo(now.plus({ seconds: 1 }).toJSDate())).toThrow(
    'Date must not be in the future',
  );
  expect(() => getTimeAgo(now.plus({ hours: 10 }).toJSDate())).toThrow(
    'Date must not be in the future',
  );
});
