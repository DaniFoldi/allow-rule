import {Rule, RuleId, Ruleset } from './types'


const rules: Record<RuleId, Ruleset> = {}


export function addRuleset(id: RuleId, ruleset: Ruleset) {
  if (rules[id]) {
    throw new Error(`Rule with id ${id} already exists`)
  }

  rules[id] = ruleset
}

export function getRuleset(id: RuleId) {
  if (!rules[id]) {
    throw new Error(`Rule with id ${id} does not exist`)
  }

  return rules[id]
}

export function deleteRuleset(id: RuleId) {
  if (!rules[id]) {
    throw new Error(`Rule with id ${id} does not exist`)
  }

  delete rules[id]
}

export function deleteAllRules() {
  for (const id in rules) {
    delete rules[id]
  }
}

export function applyRuleset() {

}

export function apply() {

}