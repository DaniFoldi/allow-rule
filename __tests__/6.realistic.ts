import {applyRuleset, deleteAllRules, deleteAllRulesets, replaceRulesetStore, useBuiltinRules} from '../src/index'
import { RulesetStore } from '../src/types'

const rules: RulesetStore = {
  "auth": {
    "anyOf": [
      ["stringMatches", {"key": "path", "regex": "\\/api\\/v1\\/login"}],
      ["stringMatches", {"key": "path", "regex": "\\/api\\/v1\\/signup"}],
      ["stringEquals", {key: "method", value: "GET"}]
    ]
  },
  "betaTester": ["stringInArray", {"key": "email", "array": ["test1@example.com", "test2@example.com"]}],
  "abNewFeedback": ["consistentAB", {"key": "email", "a": 0.5, "get":"get", "set":"set"}],
}

beforeEach(() => {
  useBuiltinRules()
  replaceRulesetStore(rules)
})

afterEach(() => {
  deleteAllRulesets()
  deleteAllRules()
})

test('realistic usage', () => {
  expect(applyRuleset('auth', {path: '/api/v1/login', method: 'POST'})).resolves.toBe('allow')
  expect(applyRuleset('auth', {path: '/api/v1/friends', method: 'GET'})).resolves.toBe('deny')
  expect(applyRuleset('auth', {path: '/api/v1/signup', method: 'DELETE'})).resolves.toBe('allow')
})

test('realistic usage 2', () => {
  expect(applyRuleset('betaTester', {path: '/api/v1/login', method: 'POST', "email": "test1@example.com"})).resolves.toBe('allow')
  expect(applyRuleset('betaTester', {path: '/api/v1/login', method: 'POST', "email": "user@example.com"})).resolves.toBe('deny')
})

test('realistic usage 3', async () => {
  const store: Record<string, string> = {}
  const set = (k: string, v: string) => new Promise<void>(r => {store[k] = v; r()})
  const get = (k: string): Promise<string> => new Promise(r => r(store[k]))

  const firstResultA = await applyRuleset('abNewFeedback', {path: '/api/v1/login', method: 'POST', "email": "test1@example.com", get, set})
  expect(applyRuleset('abNewFeedback', {path: '/api/v1/login', method: 'POST', "email": "test1@example.com", get, set})).resolves.toBe(firstResultA)
  expect(applyRuleset('abNewFeedback', {path: '/api/v1/login', method: 'POST', "email": "test1@example.com", get, set})).resolves.toBe(firstResultA)
  expect(applyRuleset('abNewFeedback', {path: '/api/v1/login', method: 'POST', "email": "test1@example.com", get, set})).resolves.toBe(firstResultA)

  const firstResultB = await applyRuleset('abNewFeedback', {path: '/api/v1/login', method: 'POST', "email": "test2@example.com", get, set})
  expect(applyRuleset('abNewFeedback', {path: '/api/v1/login', method: 'POST', "email": "test2@example.com", get, set})).resolves.toBe(firstResultB)
  expect(applyRuleset('abNewFeedback', {path: '/api/v1/login', method: 'POST', "email": "test2@example.com", get, set})).resolves.toBe(firstResultB)
  expect(applyRuleset('abNewFeedback', {path: '/api/v1/login', method: 'POST', "email": "test2@example.com", get, set})).resolves.toBe(firstResultB)
})
