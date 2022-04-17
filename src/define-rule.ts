import { RuleDefinition } from './types'


export default function<T>(rule: RuleDefinition<T>): RuleDefinition<T> {
  return rule
}
