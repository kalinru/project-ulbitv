// eslint-disable-next-line ulbi-tv-plugin-kalinru/fsd-layer-imports
import { type UserRole } from '@/entities/User'
import { type RouteProps } from 'react-router-dom'

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
}
