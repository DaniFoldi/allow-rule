import { RulesetId, Ruleset, RulesetStore, RuleStore, RuleId, RuleDefinition } from './types'

const rulesets: RulesetStore = {}
const rules: RuleStore = {}

export function addRuleset(id: RulesetId, ruleset: Ruleset) {
  if (rulesets[id]) {
    throw new Error(`Rule with id ${id} already exists`)
  }

  rulesets[id] = ruleset
}

export function getRuleset(id: RulesetId): Ruleset {
  if (!rulesets[id]) {
    throw new Error(`Rule with id ${id} does not exist`)
  }

  return rulesets[id]
}

export function deleteRuleset(id: RulesetId) {
  if (!rulesets[id]) {
    throw new Error(`Rule with id ${id} does not exist`)
  }

  delete rulesets[id]
}

export function deleteAllRulesets() {
  for (const id in rulesets) {
    deleteRuleset(id)
  }
}

export function addRule(id: RuleId, rule: RuleDefinition<any>) {
  if (rules[id]) {
    throw new Error(`Rule with id ${id} already exists`)
  }

  rules[id] = rule
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
