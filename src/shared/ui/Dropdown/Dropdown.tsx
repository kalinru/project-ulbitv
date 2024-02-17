import { memo, type FC, Fragment, type ReactNode } from 'react'
import { Menu } from '@headlessui/react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Dropdown.module.scss'
import { type DropdownDirection } from 'shared/types/ui'
import { AppLink } from '../AppLink/AppLink'

export interface DropdownItem {
  disabled?: boolean
  content?: ReactNode
  onClick?: () => void
  href?: string
}

interface DropdownProps {
  className?: string
  items: DropdownItem[]
  trigger: ReactNode
  direction?: DropdownDirection
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top left': cls.optionsTopLeft,
  'top right': cls.optionsTopRight
}

export const Dropdown: FC<DropdownProps> = memo(({
  className,
  trigger,
  items,
  direction = 'bottom right'
}) => {
  const menuClasses = [mapDirectionClass[direction]]

  return (
    <Menu as='div' className={classNames(cls.Dropdown, {}, [className])}>
      <Menu.Button className={cls.button}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
        {items.map(({ content, disabled, href, onClick }, idx) => {
          const item = ({ active }: { active: boolean }) => (
            <button className={classNames(cls.item, { [cls.active]: active }, [])}
                    disabled={disabled}
                    type='button'
                    onClick={onClick}>
              {content}
            </button>
          )

          if (href) {
            return (
              <Menu.Item as={AppLink} to={href} key={idx} disabled={disabled}>
                {item}
              </Menu.Item>
            )
          }

          return (
            <Menu.Item as={Fragment} key={idx} disabled={disabled}>
              {item}
            </Menu.Item>
          )
        })}
      </Menu.Items>
    </Menu>
  )
})

Dropdown.displayName = 'Dropdown'
