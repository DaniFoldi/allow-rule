import { Ruleset, Rule } from '../types'


export function isRule(ruleset: Ruleset): ruleset is Rule {
  return Array.isArray(ruleset) && ruleset.length > 0
}

export function isAnyOf(ruleset: Ruleset): ruleset is {anyOf: Ruleset[]} {
  return Object.hasOwn(ruleset, 'anyOf')
}

export function isAllOf(ruleset: Ruleset): ruleset is {allOf: Ruleset[]} {
  return Object.hasOwn(ruleset, 'allOf')
}

export function isNoneOf(ruleset: Ruleset): ruleset is {noneOf: Ruleset[]} {
  return Object.hasOwn(ruleset, 'noneOf')
}
