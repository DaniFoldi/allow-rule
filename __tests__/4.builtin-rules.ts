import { alwaysAllow, alwaysDeny, arrayContains, arrayDoesNotContain, arrayIsEmpty, arrayIsNotEmpty, booleanEquals, consistentAB, hashAB, numberEquals, numberGreaterThan, numberGreaterThanEqual, numberLessThan, numberLessThanEqual, stringContains, stringEndsWith, stringEquals, stringInArray, stringMatches, stringStartsWith, testAB, __builtInRules } from '../src/rules'
import * as rules from '../src/rules'


test('always allow rule', () => {
  expect(alwaysAllow({}, {})).toBe('allow')
  expect(alwaysAllow({}, {})).toBe('allow')
  expect(alwaysAllow({}, {})).toBe('allow')
})

test('always deny rule', () => {
  expect(alwaysDeny({}, {})).toBe('deny')
  expect(alwaysDeny({}, {})).toBe('deny')
  expect(alwaysDeny({}, {})).toBe('deny')
})

test('ab test rule with a=0', () => {
  expect(testAB({}, { a: 0 })).toBe('deny')
  expect(testAB({}, { a: 0 })).toBe('deny')
  expect(testAB({}, { a: 0 })).toBe('deny')
})

test('ab test rule with a=1', () => {
  expect(testAB({}, { a: 1 })).toBe('allow')
  expect(testAB({}, { a: 1 })).toBe('allow')
  expect(testAB({}, { a: 1 })).toBe('allow')
})

test('consistent ab rule with a=0', async () => {
  const store: Record<string, string> = {}
  const set = (k: string, v: string) => new Promise<void>(r => {
    store[k] = v; r()
  })
  const get = (k: string): Promise<string> => new Promise(r => r(store[k]))
  const data = { foo: 'bar', get, set }

  expect(await consistentAB(data, { a: 0, get: 'get', key: 'foo', set: 'set' })).toBe('deny')
  expect(await consistentAB(data, { a: 0, get: 'get', key: 'foo', set: 'set' })).toBe('deny')
  expect(await consistentAB(data, { a: 0, get: 'get', key: 'foo', set: 'set' })).toBe('deny')
})

test('consistent ab rule with a=1', async () => {
  const store: Record<string, string> = {}
  const set = (k: string, v: string) => new Promise<void>(r => {
    store[k] = v; r()
  })
  const get = (k: string): Promise<string> => new Promise(r => r(store[k]))
  const data = { foo: 'bar', get, set }

  expect(await consistentAB(data, { a: 1, get: 'get', key: 'foo', set: 'set' })).toBe('allow')
  expect(await consistentAB(data, { a: 1, get: 'get', key: 'foo', set: 'set' })).toBe('allow')
  expect(await consistentAB(data, { a: 1, get: 'get', key: 'foo', set: 'set' })).toBe('allow')
})

test('hash ab rule with a=0', () => {
  const data = { foo: 'bar' }
  expect(hashAB(data, { a: 0, key: 'foo' })).toBe('deny')
  expect(hashAB(data, { a: 0, key: 'foo' })).toBe('deny')
  expect(hashAB(data, { a: 0, key: 'foo' })).toBe('deny')
})

test('hash ab rule with a=1', () => {
  const data = { foo: 'bar' }
  expect(hashAB(data, { a: 1, key: 'foo' })).toBe('allow')
  expect(hashAB(data, { a: 1, key: 'foo' })).toBe('allow')
  expect(hashAB(data, { a: 1, key: 'foo' })).toBe('allow')
})

test('hash ab rule with a=0.5', () => {
  const data1 = { foo: 'bar' }
  const data2 = { foo: 'barx' }

  expect(hashAB(data1, { a: 0.5, key: 'foo' })).toBe('deny')
  expect(hashAB(data1, { a: 0.5, key: 'foo' })).toBe('deny')
  expect(hashAB(data1, { a: 0.5, key: 'foo' })).toBe('deny')

  expect(hashAB(data2, { a: 0.5, key: 'foo' })).toBe('allow')
  expect(hashAB(data2, { a: 0.5, key: 'foo' })).toBe('allow')
  expect(hashAB(data2, { a: 0.5, key: 'foo' })).toBe('allow')
})

test('number less than rule', () => {
  const data = { a: 5 }

  expect(numberLessThan(data, { key: 'a', number: 6 })).toBe('allow')
  expect(numberLessThan(data, { key: 'a', number: 5 })).toBe('deny')
  expect(numberLessThan(data, { key: 'a', number: 4 })).toBe('deny')
})

test('number less than equal rule', () => {
  const data = { a: 5 }

  expect(numberLessThanEqual(data, { key: 'a', number: 6 })).toBe('allow')
  expect(numberLessThanEqual(data, { key: 'a', number: 5 })).toBe('allow')
  expect(numberLessThanEqual(data, { key: 'a', number: 4 })).toBe('deny')
})

test('number greater than rule', () => {
  const data = { a: 5 }

  expect(numberGreaterThan(data, { key: 'a', number: 6 })).toBe('deny')
  expect(numberGreaterThan(data, { key: 'a', number: 5 })).toBe('deny')
  expect(numberGreaterThan(data, { key: 'a', number: 4 })).toBe('allow')
})

test('number greater than equal rule', () => {
  const data = { a: 5 }

  expect(numberGreaterThanEqual(data, { key: 'a', number: 6 })).toBe('deny')
  expect(numberGreaterThanEqual(data, { key: 'a', number: 5 })).toBe('allow')
  expect(numberGreaterThanEqual(data, { key: 'a', number: 4 })).toBe('allow')
})

test('number equals rule', () => {
  const data = { a: 5 }

  expect(numberEquals(data, { key: 'a', number: 6 })).toBe('deny')
  expect(numberEquals(data, { key: 'a', number: 5 })).toBe('allow')
  expect(numberEquals(data, { key: 'a', number: 4 })).toBe('deny')
})

test('string equals rule', () => {
  const data = { foo: 'bar' }

  expect(stringEquals(data, { key: 'foo', string: 'bar' })).toBe('allow')
  expect(stringEquals(data, { key: 'foo', string: 'baz' })).toBe('deny')
})

test('string contains rule', () => {
  const data = { foo: 'bar' }

  expect(stringContains(data, { key: 'foo', string: 'ba' })).toBe('allow')
  expect(stringContains(data, { key: 'foo', string: 'a' })).toBe('allow')
  expect(stringContains(data, { key: 'foo', string: 'bar' })).toBe('allow')
  expect(stringContains(data, { key: 'foo', string: 'barx' })).toBe('deny')
  expect(stringContains(data, { key: 'foo', string: 'x' })).toBe('deny')
})

test('string starts with rule', () => {
  const data = { foo: 'bar' }

  expect(stringStartsWith(data, { key: 'foo', string: 'bar' })).toBe('allow')
  expect(stringStartsWith(data, { key: 'foo', string: 'b' })).toBe('allow')
  expect(stringStartsWith(data, { key: 'foo', string: 'baz' })).toBe('deny')
  expect(stringStartsWith(data, { key: 'foo', string: 'z' })).toBe('deny')
})

test('string ends with rule', () => {
  const data = { foo: 'bar' }

  expect(stringEndsWith(data, { key: 'foo', string: 'bar' })).toBe('allow')
  expect(stringEndsWith(data, { key: 'foo', string: 'ar' })).toBe('allow')
  expect(stringEndsWith(data, { key: 'foo', string: 'ba' })).toBe('deny')
  expect(stringEndsWith(data, { key: 'foo', string: 'z' })).toBe('deny')
})

test('string matches rule', () => {
  const data = { foo: 'bar' }

  expect(stringMatches(data, { key: 'foo', regex: 'bar' })).toBe('allow')
  expect(stringMatches(data, { key: 'foo', regex: 'b?a?r?' })).toBe('allow')
  expect(stringMatches(data, { key: 'foo', regex: 'b*a*r*' })).toBe('allow')
  expect(stringMatches(data, { key: 'foo', regex: '\\d+' })).toBe('deny')
  expect(stringMatches(data, { key: 'foo', regex: '\\sbar' })).toBe('deny')
})

test('string in array rule', () => {
  const data = { foo: 'bar' }

  expect(stringInArray(data, { array: [ 'bar' ], key: 'foo' })).toBe('allow')
  expect(stringInArray(data, { array: [ 'ar', 'bar' ], key: 'foo' })).toBe('allow')
  expect(stringInArray(data, { array: [ 'ba' ], key: 'foo' })).toBe('deny')
  expect(stringInArray(data, { array: [ 'z' ], key: 'foo' })).toBe('deny')
  expect(stringInArray(data, { array: [], key: 'foo' })).toBe('deny')
})

test('boolean equals rule', () => {
  const data = { foo: true }

  expect(booleanEquals(data, { boolean: true, key: 'foo' })).toBe('deny')
  expect(booleanEquals(data, { boolean: false, key: 'foo' })).toBe('allow')
})

test('array is empty rule', () => {
  const data1 = { foo: [] }
  const data2 = { foo: [ 'bar' ] }

  expect(arrayIsEmpty(data1, { key: 'foo' })).toBe('allow')
  expect(arrayIsEmpty(data2, { key: 'foo' })).toBe('deny')
})

test('array is not empty rule', () => {
  const data1 = { foo: [] }
  const data2 = { foo: [ 'bar' ] }

  expect(arrayIsNotEmpty(data1, { key: 'foo' })).toBe('deny')
  expect(arrayIsNotEmpty(data2, { key: 'foo' })).toBe('allow')
})

test('array contains rule', () => {
  const data1 = { foo: [] }
  const data2 = { foo: [ 'bar' ] }

  expect(arrayContains(data1, { element: 'bar', key: 'foo' })).toBe('deny')
  expect(arrayContains(data2, { element: 'bar', key: 'foo' })).toBe('allow')
})

test('array does not contain rule', () => {
  const data1 = { foo: [] }
  const data2 = { foo: [ 'bar' ] }

  expect(arrayDoesNotContain(data1, { element: 'bar', key: 'foo' })).toBe('allow')
  expect(arrayDoesNotContain(data2, { element: 'bar', key: 'foo' })).toBe('deny')
})

test('all builtin rules are in __builtInRules', () => {
  for (const key of Object.keys(rules).filter(key => key !== '__builtInRules')) {
    expect(__builtInRules).toHaveProperty(key)
  }
})
