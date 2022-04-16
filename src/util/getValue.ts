import { RuleContext } from "../types";

export default function(context: RuleContext, key?: string): any {
  if (!key) {
    return context
  }

  const keys = key.split('.')
  let value = context

  for (let i = 0; i < keys.length; i++) {
    if (!value[keys[i]]) {
      throw new Error(`Key ${key} does not exist in context`)
    }
    value = value[keys[i]]
  }

  return value
}