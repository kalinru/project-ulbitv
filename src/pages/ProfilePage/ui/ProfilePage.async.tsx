import { lazy } from 'react'

export const ProfilePageAsync = lazy(async () => await new Promise((resolve) => {
  // @ts-expect-error ___
  setTimeout(() => { resolve(import('./ProfilePage')) }, 1000)
}))
