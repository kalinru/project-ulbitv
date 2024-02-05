import { lazy } from 'react'

export const ArticlesPageAsync = lazy(async () => await new Promise((resolve) => {
  // @ts-expect-error ___
  setTimeout(() => { resolve(import('./ArticlesPage')) }, 1000)
}))
