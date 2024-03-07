import { type Theme } from '@/shared/consts/theme'

export interface Settings {
  theme?: Theme
  isFirstVisit?: boolean
  isArticlesPageWasOpened?: boolean
}
