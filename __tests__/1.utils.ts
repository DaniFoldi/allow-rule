import getValue from '../src/util/get-value'
import hash from '../src/util/hash'
import waitForResult from '../src/util/wait-for-result'
import { isRule, isAllOf, isAnyOf, isNoneOf } from '../src/util/is-type'
import { Ruleset } from '../src/types'


test('get context', () => {
  const data = {
    foo: 'bar'
  }
  expect(getValue(data)).toEqual(data)
})

test('get top level property', () => {
  const data = {
    foo: 'bar'
  }
  expect(getValue(data, 'foo')).toBe('bar')
})

test('get nonexistent property', () => {
  const data = {
    foo: 'bar'
  }
  expect(() => getValue(data, 'bar')).toThrow()
})

test('get nested property', () => {
  const data = {
    foo: {
      bar: 'baz'
    }
  }
  expect(getValue(data, 'foo.bar')).toBe('baz')
})

test('get hash of string', () => {
  expect(hash('foo')).toBe('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae')
  expect(hash('foo2')).toBe('4963bd713a7eb1bce458868b0c8472bdc8bc5929a7892a92dd24344aea92093d')
})

test('is single rule', () => {
  const rule: Ruleset = [
    'foo', {
      bar: 'baz'
    }
  ]
  expect(isRule(rule)).toBe(true)
  expect(isAllOf(rule)).toBe(false)
  expect(isAnyOf(rule)).toBe(false)
  expect(isNoneOf(rule)).toBe(false)
})

test('is allOf rule', () => {
  const rule: Ruleset = [
    'foo', {
      bar: 'baz'
    }
  ]
  const combined: Ruleset = { allOf: [ rule ] }
  expect(isRule(combined)).toBe(false)
  expect(isAllOf(combined)).toBe(true)
  expect(isAnyOf(combined)).toBe(false)
  expect(isNoneOf(combined)).toBe(false)
})

test('is anyOf rule', () => {
  const rule: Ruleset = [
    'foo', {
      bar: 'baz'
    }
  ]
  const combined: Ruleset = { anyOf: [ rule ] }
  expect(isRule(combined)).toBe(false)
  expect(isAllOf(combined)).toBe(false)
  expect(isAnyOf(combined)).toBe(true)
  expect(isNoneOf(combined)).toBe(false)
})

test('is noneOf rule', () => {
  const rule: Ruleset = [
    'foo', {
      bar: 'baz'
    }
  ]
  const combined: Ruleset = { noneOf: [ rule ] }
  expect(isRule(combined)).toBe(false)
  expect(isAllOf(combined)).toBe(false)
  expect(isAnyOf(combined)).toBe(false)
  expect(isNoneOf(combined)).toBe(true)
})

test('wait for sync result', async () => {
  await expect(waitForResult('allow')).resolves.toBe('allow')
})

test('wait for async result', async () => {
  await expect(waitForResult(new Promise(r => r('allow')))).resolves.toBe('allow')
})
