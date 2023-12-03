import { lazy } from 'react'

export const AboutPageAsync = lazy(async () => await new Promise((resolve) => {
  // @ts-expect-error ___
  setTimeout(() => { resolve(import('./AboutPage')) }, 1000)
}))
