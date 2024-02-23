import { type RouteProps } from 'react-router-dom'

// eslint-disable-next-line ulbi-tv-plugin-kalinru/fsd-layer-imports
import { type UserRole } from '@/entities/User'

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
}
