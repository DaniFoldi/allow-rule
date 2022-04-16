export type Ruleset = RuleId | {anyOf: Ruleset[]} | {allOf: Ruleset[]} | {noneOf: Ruleset[]}

export type Result = 'allow' | 'deny'

export interface RuleContext {}

export type RuleOptions<T> = {
  [key in keyof T]: T[key]
}

export type RuleId = string

export type RulesetId = string | number

export type RulesetStore = Record<RulesetId, Ruleset>

export type Rule<T> = (context: RuleContext, options: RuleOptions<T>) => Result