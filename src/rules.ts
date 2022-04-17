import defineRule from './define-rule'
import hash from './util/hash'
import getValue from './util/get-value'
import waitForResult from './util/wait-for-result'


export const alwaysAllow = defineRule(() => {
  return 'allow'
})

export const alwaysDeny = defineRule(() => {
  return 'deny'
})

export const testAB = defineRule<{a: number}>((_context, options) => {
  return Math.random() < options.a ? 'allow' : 'deny'
})

export const consistentAB = defineRule<{a: number; key: string; get: string; set: string}>(async (context, options) => {
  const value = getValue(context, options.key) as string
  const getMethod = getValue(context, options.get) as (key: string) => string
  const setMethod = getValue(context, options.set) as (key: string, value: string) => void
  const storedValue = await getMethod(value)

  if (storedValue === 'allow') {
    return 'allow'
  } else if (storedValue === 'deny') {
    return 'deny'
  }

  const newValue = await waitForResult(testAB(context, options))
  await setMethod(value, newValue)
  return newValue
})

export const hashAB = defineRule<{a: number; key: string; max?: number; offset?: number}>((context, options) => {
  const max = options.max ?? 12
  const maxValue = Math.pow(16, max)
  const offset = options.offset ?? 0
  const value = getValue(context, options.key) as string
  const hashValue = Number.parseInt(hash(value).slice(0, Math.max(0, max)), 16)

  if (hashValue >= offset && hashValue < (offset + options.a * (maxValue - 1)) % maxValue) {
    return 'allow'
  }

  return 'deny'
})

export const numberLessThan = defineRule<{key: string; number: number}>((context, options) => {
  const value = getValue(context, options.key) as number
  return value < options.number ? 'allow' : 'deny'
})

export const numberLessThanEqual = defineRule<{key: string; number: number}>((context, options) => {
  const value = getValue(context, options.key) as number
  return value <= options.number ? 'allow' : 'deny'
})

export const numberGreaterThan = defineRule<{key: string; number: number}>((context, options) => {
  const value = getValue(context, options.key) as number
  return value > options.number ? 'allow' : 'deny'
})

export const numberGreaterThanEqual = defineRule<{key: string; number: number}>((context, options) => {
  const value = getValue(context, options.key) as number
  return value >= options.number ? 'allow' : 'deny'
})

export const numberEquals = defineRule<{key: string; number: number}>((context, options) => {
  const value = getValue(context, options.key)
  return value === options.number ? 'allow' : 'deny'
})

export const stringEquals = defineRule<{key: string; string: string}>((context, options) => {
  const value = getValue(context, options.key)
  return value === options.string ? 'allow' : 'deny'
})

export const stringContains = defineRule<{key: string; string: string}>((context, options) => {
  const value = getValue(context, options.key) as string
  return value.includes(options.string) ? 'allow' : 'deny'
})

export const stringStartsWith = defineRule<{key: string; string: string}>((context, options) => {
  const value = getValue(context, options.key) as string
  return value.startsWith(options.string) ? 'allow' : 'deny'
})

export const stringEndsWith = defineRule<{key: string; string: string}>((context, options) => {
  const value = getValue(context, options.key) as string
  return value.endsWith(options.string) ? 'allow' : 'deny'
})

export const stringMatches = defineRule<{key: string; regex: string}>((context, options) => {
  const value = getValue(context, options.key) as string
  const regex = new RegExp(options.regex)
  return regex.test(value) ? 'allow' : 'deny'
})

export const stringInArray = defineRule<{key: string; array: string[]}>((context, options) => {
  const value = getValue(context, options.key) as string
  return options.array.includes(value) ? 'allow' : 'deny'
})

export const booleanEquals = defineRule<{key: string; boolean: boolean}>((context, options) => {
  const value = getValue(context, options.key)
  return value === options.boolean ? 'allow' : 'deny'
})

export const arrayIsEmpty = defineRule<{key: string}>((context, options) => {
  const value = getValue(context, options.key) as unknown[]
  return value.length === 0 ? 'allow' : 'deny'
})

export const arrayIsNotEmpty = defineRule<{key: string}>((context, options) => {
  const value = getValue(context, options.key) as unknown[]
  return value.length > 0 ? 'allow' : 'deny'
})

export const arrayContains = defineRule<{key: string; element: unknown}>((context, options) => {
  const value = getValue(context, options.key) as unknown[]
  return value.includes(options.element) ? 'allow' : 'deny'
})

export const arrayDoesNotContain = defineRule<{key: string; element: unknown}>((context, options) => {
  const value = getValue(context, options.key) as unknown[]
  return !value.includes(options.element) ? 'allow' : 'deny'
})


export const __builtInRules = {
  alwaysAllow,
  alwaysDeny,
  arrayContains,
  arrayDoesNotContain,
  arrayIsEmpty,
  arrayIsNotEmpty,
  booleanEquals,
  consistentAB,
  hashAB,
  numberEquals,
  numberGreaterThan,
  numberGreaterThanEqual,
  numberLessThan,
  numberLessThanEqual,
  stringContains,
  stringEndsWith,
  stringEquals,
  stringInArray,
  stringMatches,
  stringStartsWith,
  testAB
}
