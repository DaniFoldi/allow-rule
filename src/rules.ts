import defineRule from "./defineRule"
import hash from "./util/hash"
import getValue from "./util/getValue"
import waitForResult from "./util/waitForResult"


export const alwaysAllow = defineRule((context, options) =>{
  return 'allow'
})

export const alwaysDeny = defineRule((context, options) => {
  return 'deny'
})

export const testAB = defineRule<{a: number}>((context, options) => {
  return Math.random() < options.a ? 'allow' : 'deny'
})

export const consistentAB = defineRule<{a: number, key: string, get(k: string): Promise<string>, set(k: string, v: string): Promise<void>}>(async (context, options) => {
  const value = getValue(context, options.key)
  const storedValue = await options.get(value)

  if (storedValue === 'allow') {
    return 'allow'
  } else if (storedValue === 'deny') {
    return 'deny'
  }

  const newValue = await waitForResult(testAB(context, options))
  await options.set(value, newValue)
  return newValue
})

export const hashAB = defineRule<{a: number, key: string, max?: number, offset?: number}>((context, options) => {
  const max = options.max ?? 12
  const maxValue = Math.pow(16, max)
  const offset = options.offset ?? 0
  const value = getValue(context, options.key)
  const hashValue = parseInt(hash(value).substring(0, max), 16)

  if (hashValue >= offset && hashValue < (offset + options.a * (maxValue - 1)) % maxValue) {
    return 'allow'
  }

  return 'deny'
})

export const numberLessThan = defineRule<{key: string, number: number}>((context, options) => {
  const value = getValue(context, options.key)
  return value < options.number ? 'allow' : 'deny'
})

export const numberLessThanEqual = defineRule<{key: string, number: number}>((context, options) => {
  const value = getValue(context, options.key)
  return value <= options.number ? 'allow' : 'deny'
})

export const numberGreaterThan = defineRule<{key: string, number: number}>((context, options) => {
  const value = getValue(context, options.key)
  return value > options.number ? 'allow' : 'deny'
})

export const numberGreaterThanEqual = defineRule<{key: string, number: number}>((context, options) => {
  const value = getValue(context, options.key)
  return value >= options.number ? 'allow' : 'deny'
})

export const numberEquals = defineRule<{key: string, number: number}>((context, options) => {
  const value = getValue(context, options.key)
  return value === options.number ? 'allow' : 'deny'
})

export const stringEquals = defineRule<{key: string, string: string}>((context, options) => {
  const value = getValue(context, options.key)
  return value === options.string ? 'allow' : 'deny'
})

export const stringContains = defineRule<{key: string, string: string}>((context, options) => {
  const value = getValue(context, options.key)
  return value.includes(options.string) ? 'allow' : 'deny'
})

export const stringStartsWith = defineRule<{key: string, string: string}>((context, options) => {
  const value = getValue(context, options.key)
  return value.startsWith(options.string) ? 'allow' : 'deny'
})

export const stringEndsWith = defineRule<{key: string, string: string}>((context, options) => {
  const value = getValue(context, options.key)
  return value.endsWith(options.string) ? 'allow' : 'deny'
})

export const stringMatches = defineRule<{key: string, regex: string}>((context, options) => {
  const value = getValue(context, options.key)
  const regex = new RegExp(options.regex)
  return regex.test(value) ? 'allow' : 'deny'
})

export const stringInArray = defineRule<{key: string, array: string[]}>((context, options) => {
  const value = getValue(context, options.key)
  return options.array.includes(value) ? 'allow' : 'deny'
})

export const booleanEquals = defineRule<{key: string, boolean: boolean}>((context, options) => {
  const value = getValue(context, options.key)
  return value === options.boolean ? 'allow' : 'deny'
})

export const arrayIsEmpty = defineRule<{key: string}>((context, options) => {
  const value = getValue(context, options.key)
  return value.length === 0 ? 'allow' : 'deny'
})

export const arrayIsNotEmpty = defineRule<{key: string}>((context, options) => {
  const value = getValue(context, options.key)
  return value.length > 0 ? 'allow' : 'deny'
})

export const arrayContains = defineRule<{key: string, element: any}>((context, options) => {
  const value = getValue(context, options.key)
  return value.includes(options.element) ? 'allow' : 'deny'
})

export const arrayDoesNotContain = defineRule<{key: string, element: any}>((context, options) => {
  const value = getValue(context, options.key)
  return !value.includes(options.element) ? 'allow' : 'deny'
})


export const __builtInRules = {
  alwaysAllow,
  alwaysDeny,
  testAB,
  consistentAB,
  hashAB,
  numberLessThan,
  numberLessThanEqual,
  numberGreaterThan,
  numberGreaterThanEqual,
  numberEquals,
  stringEquals,
  stringContains,
  stringStartsWith,
  stringEndsWith,
  stringMatches,
  stringInArray,
  booleanEquals,
  arrayIsEmpty,
  arrayIsNotEmpty,
  arrayContains,
  arrayDoesNotContain
}