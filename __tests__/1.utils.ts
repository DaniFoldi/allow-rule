import getValue from "../src/util/getValue"
import hash from "../src/util/hash"
import waitForResult from '../src/util/waitForResult'

test('get context', () => {
  const data = {
    foo: 'bar',
  }
  expect(getValue(data)).toEqual(data)
})

test('get top level property', () => {
  const data = {
    foo: 'bar',
  }
  expect(getValue(data, 'foo')).toEqual('bar')
})

test('get nonexistent property', () => {
  const data = {
    foo: 'bar',
  }
  expect(() => getValue(data, 'bar')).toThrow()
})

test('get nested property', () => {
  const data = {
    foo: {
      bar: 'baz',
    }
  }
  expect(getValue(data, 'foo.bar')).toEqual('baz')
})

test('get hash of string', () => {
  expect(hash('foo')).toEqual('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae')
  expect(hash('foo2')).toEqual('4963bd713a7eb1bce458868b0c8472bdc8bc5929a7892a92dd24344aea92093d')
})

test('wait for sync result', () => {
  expect(waitForResult('allow')).resolves.toEqual('allow')
})

test('wait for async result', () => {
  expect(waitForResult(new Promise(r => r('allow')))).resolves.toEqual('allow')
})