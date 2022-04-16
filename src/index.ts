import { RulesetId, Ruleset, RulesetStore, RuleStore, RuleId, RuleDefinition, RuleContext, RuleOptions, Result } from './types'
import { __builtInRules } from './rules'
import waitForResult from './util/waitForResult'
import { isAnyOf, isAllOf, isNoneOf, isRule } from './util/isType'

const rulesets: RulesetStore = {}
const rules: RuleStore = {}

function applyAllRules(ruleset: Ruleset, context: RuleContext): Promise<Result> {
  if (isRule(ruleset)) {
    if (!rules[ruleset[0]]) {
      throw new Error(`Rule ${ruleset[0]} not found`)
    }
  
    return waitForResult(rules[ruleset[0]](context, ruleset[1] ?? {}))
  } else if (isAnyOf(ruleset)) {
    return Promise.all(ruleset.anyOf.map(ruleset => applyAllRules(ruleset, context)))
      .then(results => results.includes('allow') ? 'allow' : 'deny')
  } else if (isAllOf(ruleset)) {
    return Promise.all(ruleset.allOf.map(ruleset => applyAllRules(ruleset, context)))
      .then(results => results.includes('deny') ? 'deny' : 'allow')
  } else if (isNoneOf(ruleset)) {
    return Promise.all(ruleset.noneOf.map(ruleset => applyAllRules(ruleset, context)))
      .then(results => results.includes('allow') ? 'deny' : 'allow')
  }
}

export function applyRuleset(id: RulesetId, context: RuleContext): Promise<Result> {
  if (!rulesets[id]) {
    throw new Error(`Ruleset with id ${id} does not exist`)
  }

  return applyAllRules(rulesets[id], context)
}

export function addRuleset(id: RulesetId, ruleset: Ruleset) {
  if (rulesets[id]) {
    throw new Error(`Ruleset with id ${id} already exists`)
  }

  rulesets[id] = ruleset
}

export function getRuleset(id: RulesetId): Ruleset {
  if (!rulesets[id]) {
    throw new Error(`Ruleset with id ${id} does not exist`)
  }

  return rulesets[id]
}

export function deleteRuleset(id: RulesetId) {
  if (!rulesets[id]) {
    throw new Error(`Ruleset with id ${id} does not exist`)
  }

  delete rulesets[id]
}

export function deleteAllRulesets() {
  for (const id in rulesets) {
    deleteRuleset(id)
  }
}

export function replaceRulesetStore(withStore: RulesetStore) {
  deleteAllRulesets()

  for (const id in withStore) {
    addRuleset(id, withStore[id])
  }
}

export function addRule(id: RuleId, rule: RuleDefinition<any>) {
  if (rules[id]) {
    throw new Error(`Rule with id ${id} already exists`)
  }

  rules[id] = rule
}

export function useBuiltinRules() {
  Object.entries(__builtInRules).forEach((entry: [string, RuleDefinition<any>]) => {
    addRule(entry[0], entry[1])
  })
}

export function getRule(id: RuleId): RuleDefinition<any> {
  if (!rules[id]) {
    throw new Error(`Rule with id ${id} does not exist`)
  }

  return rules[id]
}

export function deleteRule(id: RuleId) {
  if (!rules[id]) {
    throw new Error(`Rule with id ${id} does not exist`)
  }

  delete rules[id]
}

export function deleteAllRules() {
  for (const id in rules) {
    deleteRule(id)
  }
}