import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { useState } from 'react'
import { Button, ThemeSwitcher } from 'shared/ui'
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapced, setCollapced] = useState(false)

  const onToggle = () => {
    setCollapced(value => !value)
  }

  return (
    <div className={classNames(cls.Sidebar, { [cls.collapced]: collapced }, [className])}>
      <Button onClick={onToggle}>toogle</Button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </div>
  )
}
