import { Rule, RuleDefinition } from "./types"

export default function defineRule<T>(rule: RuleDefinition<T>): RuleDefinition<T> {
  return rule
}