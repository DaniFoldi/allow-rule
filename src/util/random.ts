import { randomBytes } from 'node:crypto'

// Based on https://gist.github.com/helloimalastair/9143e9d43f4a641b23ebddfa11cefeff

function xmur3(str: string) {
  let h = 1779033703 ^ str.length
  for (const char of str) {
    h = Math.imul(h ^ char.codePointAt(0) as number, 3432918353)
    h = h << 13 | h >>> 19
  }

  return function() {
    h = Math.imul(h ^ h >>> 16, 2246822507)
    h = Math.imul(h ^ h >>> 13, 3266489909)
    return (h ^= h >>> 16) >>> 0
  }
}

function xoshiro128(a: number, b: number, c: number, d: number) {
  return function() {
    const t = b << 9
    let r = a * 5
    r = (r << 7 | r >>> 25) * 9
    c ^= a
    d ^= b
    b ^= c
    a ^= d
    c ^= t
    d = d << 11 | d >>> 21
    return (r >>> 0) / 4294967296
  }
}

// TODO simplify usage, seed internally
export async function out(s: number): Promise<() => number> {
  const data = await fetch('https://drand.cloudflare.com/public/latest')
  const body = await data.json()
  const seed = xmur3((s === undefined ? null : s.toString()) + randomBytes(10).toString() + body.signature + Date.now())
  return xoshiro128(seed(), seed(), seed(), seed())
}

export default out
