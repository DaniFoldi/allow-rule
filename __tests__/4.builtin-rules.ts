import { alwaysAllow, alwaysDeny, arrayContains, arrayDoesNotContain, arrayIsEmpty, arrayIsNotEmpty, booleanEquals, consistentAB, hashAB, numberEquals, numberGreaterThan, numberGreaterThanEqual, numberLessThan, numberLessThanEqual, stringContains, stringEndsWith, stringEquals, stringInArray, stringMatches, stringStartsWith, testAB, __builtInRules } from "../src/rules"
import * as rules from '../src/rules'


test('always allow rule', () => {
  expect(alwaysAllow({}, {})).toEqual('allow')
  expect(alwaysAllow({}, {})).toEqual('allow')
  expect(alwaysAllow({}, {})).toEqual('allow')
})

test('always deny rule', () => {
  expect(alwaysDeny({}, {})).toEqual('deny')
  expect(alwaysDeny({}, {})).toEqual('deny')
  expect(alwaysDeny({}, {})).toEqual('deny')
})

test('ab test rule with a=0', () => {
  expect(testAB({}, {a:0})).toEqual('deny')
  expect(testAB({}, {a:0})).toEqual('deny')
  expect(testAB({}, {a:0})).toEqual('deny')
})

test('ab test rule with a=1', () => {
  expect(testAB({}, {a:1})).toEqual('allow')
  expect(testAB({}, {a:1})).toEqual('allow')
  expect(testAB({}, {a:1})).toEqual('allow')
})

test('consistent ab rule with a=0', async() => {
  const store: Record<string, string> = {}
  const set = (k: string, v: string) => new Promise<void>(r => {store[k] = v; r()})
  const get = (k: string): Promise<string> => new Promise(r => r(store[k]))
  const data = {foo: 'bar'}

  expect(await consistentAB(data, {a: 0, key: 'foo', get, set})).toEqual('deny')
  expect(await consistentAB(data, {a: 0, key: 'foo', get, set})).toEqual('deny')
  expect(await consistentAB(data, {a: 0, key: 'foo', get, set})).toEqual('deny')
})

test('consistent ab rule with a=1', async () => {
  const store: Record<string, string> = {}
  const set = (k: string, v: string) => new Promise<void>(r => {store[k] = v; r()})
  const get = (k: string): Promise<string> => new Promise(r => r(store[k]))
  const data = {foo: 'bar'}

  expect(await consistentAB(data, {a: 1, key: 'foo', get, set})).toEqual('allow')
  expect(await consistentAB(data, {a: 1, key: 'foo', get, set})).toEqual('allow')
  expect(await consistentAB(data, {a: 1, key: 'foo', get, set})).toEqual('allow')
})

test('hash ab rule with a=0', () => {
  const data = {foo: 'bar'}
  expect(hashAB(data, {a:0, key: 'foo'})).toEqual('deny')
  expect(hashAB(data, {a:0, key: 'foo'})).toEqual('deny')
  expect(hashAB(data, {a:0, key: 'foo'})).toEqual('deny')
})

test('hash ab rule with a=1', () => {
  const data = {foo: 'bar'}
  expect(hashAB(data, {a: 1, key: 'foo'})).toEqual('allow')
  expect(hashAB(data, {a: 1, key: 'foo'})).toEqual('allow')
  expect(hashAB(data, {a: 1, key: 'foo'})).toEqual('allow')
})

test('hash ab rule with a=0.5', () => {
  const store: Record<string, string> = {}
  const set = (k: string, v: string) => store[k] = v
  const get = (k: string): string => store[k]
  const data1 = {foo: 'bar'}
  const data2 = {foo: 'barx'}

  expect(hashAB(data1, {a: 0.5, key: 'foo'})).toEqual('deny')
  expect(hashAB(data1, {a: 0.5, key: 'foo'})).toEqual('deny')
  expect(hashAB(data1, {a: 0.5, key: 'foo'})).toEqual('deny')

  expect(hashAB(data2, {a: 0.5, key: 'foo'})).toEqual('allow')
  expect(hashAB(data2, {a: 0.5, key: 'foo'})).toEqual('allow')
  expect(hashAB(data2, {a: 0.5, key: 'foo'})).toEqual('allow')
})

test('number less than rule', () => {
  const data = {a: 5}

  expect(numberLessThan(data, {key: 'a', number: 6})).toEqual('allow')
  expect(numberLessThan(data, {key: 'a', number: 5})).toEqual('deny')
  expect(numberLessThan(data, {key: 'a', number: 4})).toEqual('deny')
})

test('number less than equal rule', () => {
  const data = {a: 5}

  expect(numberLessThanEqual(data, {key: 'a', number: 6})).toEqual('allow')
  expect(numberLessThanEqual(data, {key: 'a', number: 5})).toEqual('allow')
  expect(numberLessThanEqual(data, {key: 'a', number: 4})).toEqual('deny')
})

test('number greater than rule', () => {
  const data = {a: 5}

  expect(numberGreaterThan(data, {key: 'a', number: 6})).toEqual('deny')
  expect(numberGreaterThan(data, {key: 'a', number: 5})).toEqual('deny')
  expect(numberGreaterThan(data, {key: 'a', number: 4})).toEqual('allow')
})

test('number greater than equal rule', () => {
  const data = {a: 5}

  expect(numberGreaterThanEqual(data, {key: 'a', number: 6})).toEqual('deny')
  expect(numberGreaterThanEqual(data, {key: 'a', number: 5})).toEqual('allow')
  expect(numberGreaterThanEqual(data, {key: 'a', number: 4})).toEqual('allow')
})

test('number equals rule', () => {
  const data = {a: 5}

  expect(numberEquals(data, {key: 'a', number: 6})).toEqual('deny')
  expect(numberEquals(data, {key: 'a', number: 5})).toEqual('allow')
  expect(numberEquals(data, {key: 'a', number: 4})).toEqual('deny')
})

test('string equals rule', () => {
  const data = {foo:'bar'}

  expect(stringEquals(data, {key: 'foo', string: 'bar'})).toEqual('allow')
  expect(stringEquals(data, {key: 'foo', string: 'baz'})).toEqual('deny')
})

test('string contains rule', () => {
  const data = {foo:'bar'}

  expect(stringContains(data, {key: 'foo', string: 'ba'})).toEqual('allow')
  expect(stringContains(data, {key: 'foo', string: 'a'})).toEqual('allow')
  expect(stringContains(data, {key: 'foo', string: 'bar'})).toEqual('allow')
  expect(stringContains(data, {key: 'foo', string: 'barx'})).toEqual('deny')
  expect(stringContains(data, {key: 'foo', string: 'x'})).toEqual('deny')
})

test('string starts with rule', () => {
  const data = {foo:'bar'}

  expect(stringStartsWith(data, {key: 'foo', string: 'bar'})).toEqual('allow')
  expect(stringStartsWith(data, {key: 'foo', string: 'b'})).toEqual('allow')
  expect(stringStartsWith(data, {key: 'foo', string: 'baz'})).toEqual('deny')
  expect(stringStartsWith(data, {key: 'foo', string: 'z'})).toEqual('deny')
})

test('string ends with rule', () => {
  const data = {foo:'bar'}

  expect(stringEndsWith(data, {key: 'foo', string: 'bar'})).toEqual('allow')
  expect(stringEndsWith(data, {key: 'foo', string: 'ar'})).toEqual('allow')
  expect(stringEndsWith(data, {key: 'foo', string: 'ba'})).toEqual('deny')
  expect(stringEndsWith(data, {key: 'foo', string: 'z'})).toEqual('deny')
})

test('string matches rule', () => {
  const data = {foo:'bar'}

  expect(stringMatches(data, {key: 'foo', regex: 'bar'})).toEqual('allow')
  expect(stringMatches(data, {key: 'foo', regex: 'b?a?r?'})).toEqual('allow')
  expect(stringMatches(data, {key: 'foo', regex: 'b*a*r*'})).toEqual('allow')
  expect(stringMatches(data, {key: 'foo', regex: '\\d+'})).toEqual('deny')
  expect(stringMatches(data, {key: 'foo', regex: '\\sbar'})).toEqual('deny')
})

test('string in array rule', () => {
  const data = {foo:'bar'}

  expect(stringInArray(data, {key: 'foo', array: ['bar']})).toEqual('allow')
  expect(stringInArray(data, {key: 'foo', array: ['ar', 'bar']})).toEqual('allow')
  expect(stringInArray(data, {key: 'foo', array: ['ba']})).toEqual('deny')
  expect(stringInArray(data, {key: 'foo', array: ['z']})).toEqual('deny')
  expect(stringInArray(data, {key: 'foo', array: []})).toEqual('deny')
})

test('boolean equals rule', () => {
  const data = {foo:true}

  expect(booleanEquals(data, {key: 'foo', boolean: true})).toEqual('allow')
  expect(booleanEquals(data, {key: 'foo', boolean: false})).toEqual('deny')
})

test('array is empty rule', () => {
  const data1 = {foo:[]}
  const data2 = {foo:['bar']}

  expect(arrayIsEmpty(data1, {key: 'foo'})).toEqual('allow')
  expect(arrayIsEmpty(data2, {key: 'foo'})).toEqual('deny')
})

test('array is not empty rule', () => {
  const data1 = {foo:[]}
  const data2 = {foo:['bar']}

  expect(arrayIsNotEmpty(data1, {key: 'foo'})).toEqual('deny')
  expect(arrayIsNotEmpty(data2, {key: 'foo'})).toEqual('allow')
})

test('array contains rule', () => {
  const data1 = {foo:[]}
  const data2 = {foo:['bar']}

  expect(arrayContains(data1, {key: 'foo', element: 'bar'})).toEqual('deny')
  expect(arrayContains(data2, {key: 'foo', element: 'bar'})).toEqual('allow')
})

test('array contains rule', () => {
  const data1 = {foo:[]}
  const data2 = {foo:['bar']}

  expect(arrayDoesNotContain(data1, {key: 'foo', element: 'bar'})).toEqual('allow')
  expect(arrayDoesNotContain(data2, {key: 'foo', element: 'bar'})).toEqual('deny')
})

test('all builtin rules are in __builtInRules', () => {
  Object.keys(rules).filter(key => key !== '__builtInRules').forEach(key => {
    expect(__builtInRules).toHaveProperty(key)
  })
})