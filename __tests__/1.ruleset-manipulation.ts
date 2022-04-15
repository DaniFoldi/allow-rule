import { Ruleset } from '../src/types'
import { addRuleset, deleteAllRules, deleteRuleset, getRuleset } from '../src/index'

const ruleset1: Ruleset = 'allow'

beforeEach(() => {
  deleteAllRules()
})

test('adds a rule to list', () => {
  expect(() => getRuleset('rule')).toThrow()
  addRuleset('rule', ruleset1)
  expect(getRuleset('rule')).toEqual(ruleset1)
})

test('fails to add existing rule', () => {
  expect(() => getRuleset('rule')).toThrow()
  addRuleset('rule', ruleset1)
  expect(() => addRuleset('rule', ruleset1)).toThrow()
})

test('gets rule by id', () => {
  expect(() => getRuleset('rule')).toThrow()
  addRuleset('rule', ruleset1)
  expect(getRuleset('rule')).toEqual(ruleset1)
})

test('fails to get nonexistent rule', () => {
  expect(() => getRuleset('rule')).toThrow()
})

test('deletes a rule from list', () => {
  expect(() => getRuleset('rule')).toThrow()
  addRuleset('rule', ruleset1)
  expect(getRuleset('rule')).toEqual(ruleset1)
  deleteRuleset('rule')
  expect(() => getRuleset('rule')).toThrow()
})

test('fails to delete nonexistent rule', () => {
  expect(() => getRuleset('rule')).toThrow()
  expect(() => deleteRuleset('rule')).toThrow()
})

test('deletes all rules from list', () => {
  expect(() => getRuleset('rule')).toThrow()
  addRuleset('rule', ruleset1)
  expect(getRuleset('rule')).toEqual(ruleset1)
  deleteAllRules()
  expect(() => getRuleset('rule')).toThrow()
})