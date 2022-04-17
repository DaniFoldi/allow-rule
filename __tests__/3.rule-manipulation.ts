import { addRule, deleteAllRules, deleteRule, getRule, useBuiltinRules } from '../src/index'
import { alwaysAllow, alwaysDeny } from '../src/rules'


beforeEach(() => {
  deleteAllRules()
})

test('adds a rule to list', () => {
  expect(() => getRule('alwaysAllow')).toThrow()
  addRule('alwaysAllow', alwaysAllow)
  expect(getRule('alwaysAllow')).toEqual(alwaysAllow)
})

test('fails to add existing rule', () => {
  expect(() => getRule('alwaysAllow')).toThrow()
  addRule('alwaysAllow', alwaysAllow)
  expect(() => addRule('alwaysAllow', alwaysAllow)).toThrow()
})

test('gets rule by id', () => {
  expect(() => getRule('alwaysAllow')).toThrow()
  addRule('alwaysAllow', alwaysAllow)
  expect(getRule('alwaysAllow')).toEqual(alwaysAllow)
})

test('fails to get nonexistent rule', () => {
  expect(() => getRule('alwaysAllow')).toThrow()
})

test('deletes a rule from list', () => {
  expect(() => getRule('alwaysAllow')).toThrow()
  addRule('alwaysAllow', alwaysAllow)
  expect(getRule('alwaysAllow')).toEqual(alwaysAllow)
  deleteRule('alwaysAllow')
  expect(() => getRule('alwaysAllow')).toThrow()
})

test('fails to delete nonexistent rule', () => {
  expect(() => getRule('alwaysAllow')).toThrow()
  expect(() => deleteRule('alwaysAllow')).toThrow()
})

test('deletes all rules from list', () => {
  expect(() => getRule('alwaysAllow')).toThrow()
  addRule('alwaysAllow', alwaysAllow)
  expect(getRule('alwaysAllow')).toEqual(alwaysAllow)
  deleteAllRules()
  expect(() => getRule('alwaysAllow')).toThrow()
})

test('uses builtin rules', () => {
  expect(() => getRule('alwaysAllow')).toThrow()
  expect(() => getRule('alwaysDeny')).toThrow()
  useBuiltinRules()
  expect(getRule('alwaysAllow')).toEqual(alwaysAllow)
  expect(getRule('alwaysDeny')).toEqual(alwaysDeny)
})

test('deletes all builtin rules', () => {
  expect(() => getRule('alwaysAllow')).toThrow()
  expect(() => getRule('alwaysDeny')).toThrow()
  useBuiltinRules()
  expect(getRule('alwaysAllow')).toEqual(alwaysAllow)
  expect(getRule('alwaysDeny')).toEqual(alwaysDeny)
  deleteAllRules()
  expect(() => getRule('alwaysAllow')).toThrow()
  expect(() => getRule('alwaysDeny')).toThrow()
})
