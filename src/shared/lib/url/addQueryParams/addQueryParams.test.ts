import { getQueryParams } from './addQueryParams'

describe('addQueryParams.test', function () {
  test('one param', () => {
    const params = getQueryParams({
      test: 'value',
    })
    expect(params).toBe('?test=value')
  })
  test('multiple param', () => {
    const params = getQueryParams({
      test: 'value',
      test2: 'value2',
    })
    expect(params).toBe('?test=value&test2=value2')
  })
  test('undefined param', () => {
    const params = getQueryParams({
      test: 'value',
      test2: undefined,
    })
    expect(params).toBe('?test=value')
  })
})
