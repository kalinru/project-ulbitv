import { createSelector } from '@reduxjs/toolkit'

import { getUserAuthData } from '@/entities/User'
import AboutIcon from '@/shared/assets/icons/about.svg'
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg'
import MainIcon from '@/shared/assets/icons/home.svg'
import PersonIcon from '@/shared/assets/icons/person.svg'
import { RoutePath } from '@/shared/consts/router'

import { type ISidebarItem } from '../types/sidebar'

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const items: ISidebarItem[] = [
      {
        path: RoutePath.main(),
        text: 'Главная',
        Icon: MainIcon
      },
      {
        path: RoutePath.about(),
        text: 'О нас',
        Icon: AboutIcon
      }
    ]

    if (userData) {
      items.push(
        {
          path: RoutePath.articles(),
          text: 'Статьи',
          Icon: ArticleIcon,
          authOnly: true
        },
        {
          path: RoutePath.profile(userData?.id),
          text: 'Профиль',
          Icon: PersonIcon,
          authOnly: true
        }
      )
    }

    return items
  }
)
