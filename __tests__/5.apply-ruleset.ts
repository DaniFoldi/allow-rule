import { addRuleset, applyRuleset, deleteAllRules, deleteAllRulesets, useBuiltinRules } from '../src/index'


beforeEach(() => {
  deleteAllRulesets()
  deleteAllRules()
  useBuiltinRules()
  addRuleset('notARule', [ 'hello', { 'world': 'world' }])
  addRuleset('single', [ 'alwaysAllow' ])
  addRuleset('all', { allOf: [[ 'alwaysAllow' ], [ 'alwaysDeny' ]] })
  addRuleset('any', { anyOf: [[ 'alwaysAllow' ], [ 'alwaysDeny' ]] })
  addRuleset('none', { noneOf: [[ 'alwaysAllow' ], [ 'alwaysDeny' ]] })
})

test('apply invalid ruleset', () => {
  expect(() => applyRuleset('invalid', {})).toThrow()
})

test('try invalid rule', () => {
  expect(() => applyRuleset('notARule', {})).toThrow()
})

test('apply single ruleset', async () => {
  await expect(applyRuleset('single', {})).resolves.toBe('allow')
})

test('apply all ruleset', async () => {
  await expect(applyRuleset('all', {})).resolves.toBe('deny')
})

test('apply any ruleset', async () => {
  await expect(applyRuleset('any', {})).resolves.toBe('allow')
})

test('apply none ruleset', async () => {
  await expect(applyRuleset('none', {})).resolves.toBe('deny')
})
