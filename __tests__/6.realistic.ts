import { applyRuleset, deleteAllRules, deleteAllRulesets, replaceRulesetStore, useBuiltinRules } from '../src/index'
import { RulesetStore } from '../src/types'


const rules: RulesetStore = {
  'abNewFeedback': [ 'consistentAB', { a: 0.5, get: 'get', key: 'email', set: 'set' }],
  'auth': {
    'anyOf': [
      [ 'stringMatches', { key: 'path', regex: '\\/api\\/v1\\/login' }],
      [ 'stringMatches', { key: 'path', regex: '\\/api\\/v1\\/signup' }],
      [ 'stringEquals', { key: 'method', value: 'GET' }]
    ]
  },
  'betaTester': [ 'stringInArray', { array: [ 'test1@example.com', 'test2@example.com' ], key: 'email'  }]
}

beforeEach(() => {
  useBuiltinRules()
  replaceRulesetStore(rules)
})

afterEach(() => {
  deleteAllRulesets()
  deleteAllRules()
})

test('realistic usage', async () => {
  await expect(applyRuleset('auth', { method: 'POST', path: '/api/v1/login' })).resolves.toBe('allow')
  await expect(applyRuleset('auth', { method: 'GET', path: '/api/v1/friends' })).resolves.toBe('deny')
  await expect(applyRuleset('auth', { method: 'DELETE', path: '/api/v1/signup' })).resolves.toBe('allow')
})

test('realistic usage 2', async () => {
  await expect(applyRuleset('betaTester', { email: 'test1@example.com', method: 'POST', path: '/api/v1/login' })).resolves.toBe('allow')
  await expect(applyRuleset('betaTester', { email: 'user@example.com', method: 'POST', path: '/api/v1/login' })).resolves.toBe('deny')
})

test('realistic usage 3', async () => {
  const store: Record<string, string> = {}
  const set = (k: string, v: string) => new Promise<void>(r => {
    store[k] = v; r()
  })
  const get = (k: string): Promise<string> => new Promise(r => r(store[k]))

  const firstResultA = await applyRuleset('abNewFeedback', { email: 'test1@example.com', get, method: 'POST', path: '/api/v1/login', set })
  await expect(applyRuleset('abNewFeedback', { email: 'test1@example.com', get, method: 'POST', path: '/api/v1/login', set })).resolves.toBe(firstResultA)
  await expect(applyRuleset('abNewFeedback', { email: 'test1@example.com', get, method: 'POST', path: '/api/v1/login', set })).resolves.toBe(firstResultA)
  await expect(applyRuleset('abNewFeedback', { email: 'test1@example.com', get, method: 'POST', path: '/api/v1/login', set })).resolves.toBe(firstResultA)

  const firstResultB = await applyRuleset('abNewFeedback', {  email: 'test2@example.com', get, method: 'POST', path: '/api/v1/login',  set })
  await expect(applyRuleset('abNewFeedback', { email: 'test2@example.com', get, method: 'POST', path: '/api/v1/login', set })).resolves.toBe(firstResultB)
  await expect(applyRuleset('abNewFeedback', { email: 'test2@example.com', get, method: 'POST', path: '/api/v1/login', set })).resolves.toBe(firstResultB)
  await expect(applyRuleset('abNewFeedback', { email: 'test2@example.com', get, method: 'POST', path: '/api/v1/login', set })).resolves.toBe(firstResultB)
})
