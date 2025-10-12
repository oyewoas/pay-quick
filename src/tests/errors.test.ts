import { describe, it, expect } from 'vitest'
import { getErrorMessage } from '@/utils/errors'

describe('getErrorMessage', () => {
  it('returns Unknown error for null/undefined', () => {
    expect(getErrorMessage(undefined)).toBe('Unknown error')
    expect(getErrorMessage(null)).toBe('Unknown error')
  })

  it('returns string errors directly', () => {
    expect(getErrorMessage('oops')).toBe('oops')
  })

  it('extracts message from nested data.message', () => {
    const err = { data: { message: 'bad' } }
    expect(getErrorMessage(err)).toBe('bad')
  })

  it('extracts error or message field', () => {
    expect(getErrorMessage({ error: 'nope' })).toBe('nope')
    expect(getErrorMessage({ message: 'also' })).toBe('also')
  })

  it('falls back to JSON stringify', () => {
    const obj = { a: 1 }
    expect(getErrorMessage(obj)).toBe(JSON.stringify(obj))
  })
})
