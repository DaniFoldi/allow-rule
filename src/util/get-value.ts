import { RuleContext } from '../types'


export default function(context: RuleContext, key?: string): unknown {
  if (!key) {
    return context
  }

  const keys = key.split('.')
  let value = context

  for (const keyPart of keys) {
    if (!value[keyPart]) {
      throw new Error(`Key ${key} does not exist in context`)
    }
    value = value[keyPart] as RuleContext
  }

  return value
}
