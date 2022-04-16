import { RulesetId, Ruleset, RulesetStore } from './types'

const rulesets: RulesetStore = {}

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
    delete rulesets[id]
  }
}
