import { memo, type FC, type ReactNode, useCallback } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import { Card } from '../Card/Card'
import { Flex } from '../Stack'
import { type FlexDirection } from '../Stack/Flex/Flex'

import cls from './Tabs.module.scss'

export interface TabItem {
  value: string
  content: ReactNode
}

interface TabsProps {
  className?: string
  tabs: TabItem[]
  value: string
  direction?: FlexDirection
  onTabClick: (tab: TabItem) => void
}

export const Tabs: FC<TabsProps> = memo(
  ({ className, tabs, value, direction = 'row', onTabClick }) => {
    const clickHandler = useCallback(
      (tab: TabItem) => {
        return () => {
          onTabClick(tab)
        }
      },
      [onTabClick],
    )

    return (
      <Flex
        className={classNames(cls.Tabs, {}, [className])}
        direction={direction}
        gap="8"
        align="start"
      >
        {tabs.map((tab) => (
          <Card
            key={tab.value}
            onClick={clickHandler(tab)}
            className={cls.tab}
            variant={tab.value === value ? 'light' : 'default'}
            border="round"
          >
            {tab.content}
          </Card>
        ))}
      </Flex>
    )
  },
)

Tabs.displayName = 'Tabs'
