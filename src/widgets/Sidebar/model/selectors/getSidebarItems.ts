/* eslint-disable import/order */
import { createSelector } from '@reduxjs/toolkit'

import { getUserAuthData } from '@/entities/User'

import AboutIconDeprecated from '@/shared/assets/icons/about-20-20.svg'
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg'
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg'
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg'

import ArticleIcon from '@/shared/assets/icons/article.svg'
import ProfileIcon from '@/shared/assets/icons/avatar.svg'
import MainIcon from '@/shared/assets/icons/home.svg'
import AboutIcon from '@/shared/assets/icons/Info.svg'

import { RoutePath } from '@/shared/consts/router'
import { toggleFeatures } from '@/shared/lib/features'

import { type ISidebarItem } from '../types/sidebar'

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const items: ISidebarItem[] = [
    {
      path: RoutePath.main(),
      text: 'Главная',
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        off: () => MainIconDeprecated,
        on: () => MainIcon,
      }),
    },
    {
      path: RoutePath.about(),
      text: 'О нас',
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        off: () => AboutIconDeprecated,
        on: () => AboutIcon,
      }),
    },
  ]

  if (userData) {
    items.push(
      {
        path: RoutePath.articles(),
        text: 'Статьи',
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          off: () => ArticleIconDeprecated,
          on: () => ArticleIcon,
        }),
        authOnly: true,
      },
      {
        path: RoutePath.profile(userData?.id),
        text: 'Профиль',
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          off: () => ProfileIconDeprecated,
          on: () => ProfileIcon,
        }),
        authOnly: true,
      },
    )
  }

  return items
})
