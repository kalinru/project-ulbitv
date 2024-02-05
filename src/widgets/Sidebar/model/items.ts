import { RoutePath } from 'shared/config/routerConfig/routerConfig'
import AboutIcon from 'shared/assets/icons/about.svg'
import MainIcon from 'shared/assets/icons/home.svg'
import PersonIcon from 'shared/assets/icons/person.svg'
import ArticleIcon from 'shared/assets/icons/article-20-20.svg'

export interface ISidebarItem {
  path: string
  text: string
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
  authOnly?: boolean
}

export const SidebaarItemsList: ISidebarItem[] = [
  {
    path: RoutePath.main,
    text: 'Главная',
    Icon: MainIcon
  },
  {
    path: RoutePath.about,
    text: 'О нас',
    Icon: AboutIcon
  },
  {
    path: RoutePath.profile,
    text: 'Профиль',
    Icon: PersonIcon,
    authOnly: true
  },
  {
    path: RoutePath.articles,
    text: 'Статьи',
    Icon: ArticleIcon,
    authOnly: true
  }
]
