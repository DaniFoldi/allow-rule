import { RulesetId, Ruleset, RulesetStore, Result } from './types'


const rules: RulesetStore = {}
const ruleOrder: RulesetId[] = []


export function addRuleset(id: RulesetId, ruleset: Ruleset) {
  if (rules[id]) {
    throw new Error(`Rule with id ${id} already exists`)
  }

  rules[id] = ruleset
  ruleOrder.push(id)
}

export function getRuleset(id: RulesetId): Ruleset {
  if (!rules[id]) {
    throw new Error(`Rule with id ${id} does not exist`)
  }

  return rules[id]
}

export function deleteRuleset(id: RulesetId) {
  if (!rules[id]) {
    throw new Error(`Rule with id ${id} does not exist`)
  }

  delete rules[id]
  ruleOrder.splice(ruleOrder.indexOf(id), 1)
}

export function deleteAllRules() {
  for (const id in rules) {
    delete rules[id]
    ruleOrder.splice(ruleOrder.indexOf(id), 1)
  }
}

export function applyRuleset(id: RulesetId): Result {
  const ruleset = getRuleset(id)

  return 'allow'
}

export function apply() {
  for (const ruleid of ruleOrder) {
    applyRuleset(ruleid)
  }
}