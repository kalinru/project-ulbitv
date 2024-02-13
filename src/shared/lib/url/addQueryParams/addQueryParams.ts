/**
 * Объединяет параметры строки запроса и переданные параметры
 * @param params
 */
export const getQueryParams = (params: OptionalRecord<string, string>) => {
  const searchParams = new URLSearchParams(window.location.search)
  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined) {
      searchParams.set(name, value)
    }
  })
  return '?' + searchParams.toString()
}

/**
 * Добавляет параметры строки запроса в URL
 * @param params
 */
export const addQueryParams = (params: OptionalRecord<string, string>) => {
  window.history.pushState(null, '', getQueryParams(params))
}
