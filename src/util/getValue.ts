import { RuleContext } from "../types";

export default function(context: RuleContext, key: string): any {
  if (!key) {
    return context
  }

  const keys = key.split('.')
  let value = context

  for (let i = 0; i < keys.length; i++) {
    if (!value[keys[i]]) {
      return value
    }
    value = value[keys[i]]
  }

  return value
}