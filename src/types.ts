export type Ruleset = RuleId | {anyOf: Ruleset[]} | {allOf: Ruleset[]} | {noneOf: Ruleset[]}

export type Result = 'allow' | 'deny' | (() => ('allow' | 'deny')) | Promise<void>

export interface RuleContext {}

export type RuleId = string

export type RulesetId = string | number

export type RulesetStore = Record<RulesetId, Ruleset>
