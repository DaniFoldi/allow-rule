import { createHash } from 'crypto'

export default function hash(data: string): string {
  return createHash('sha256').update(data).digest('hex')
}