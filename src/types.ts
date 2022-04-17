export type Ruleset = Rule | {anyOf: Ruleset[]} | {allOf: Ruleset[]} | {noneOf: Ruleset[]}

export type Rule = [string, RuleOptions<unknown>?]

export type Result = 'allow' | 'deny'

export interface RuleContext {
  [key: string]: unknown
}

export type RuleOptions<T> = {
  [key in keyof T]: T[key]
}

export type RuleId = string

export type RulesetId = string

export type RulesetStore = Record<RulesetId, Ruleset>

export type RuleDefinition<T> = (context: RuleContext, options: RuleOptions<T>) => (Result | Promise<Result>)

export type RuleStore = Record<RuleId, RuleDefinition<unknown>>
