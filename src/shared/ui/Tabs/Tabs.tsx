import { memo, type FC, type ReactNode, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card, CardTheme } from '../Card/Card'
import cls from './Tabs.module.scss'

export interface TabItem {
  value: string
  content: ReactNode
}

interface TabsProps {
  className?: string
  tabs: TabItem[]
  value: string
  onTabClick: (tab: TabItem) => void
}

export const Tabs: FC<TabsProps> = memo(({
  className,
  tabs,
  value,
  onTabClick
}) => {
  const clickHandler = useCallback((tab: TabItem) => {
    return () => {
      onTabClick(tab)
    }
  }, [onTabClick])

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map(tab => (
        <Card key={tab.value}
              onClick={clickHandler(tab)}
              className={cls.tab}
              theme={tab.value === value ? CardTheme.DEFAULT : CardTheme.OUTLINED}>
          {tab.content}
        </Card>
      ))}
    </div>
  )
})

Tabs.displayName = 'Tabs'
