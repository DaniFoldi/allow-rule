import { Result } from "../types"

export default async function(result: Result | Promise<Result>): Promise<Result> {
  if (result instanceof Promise) {
    return await result
  }

  return result
}