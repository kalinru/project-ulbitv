import { type ReactNode, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Popover.module.scss'
import popupCls from '../../styles/popup.module.scss'
import { Popover as HPopover } from '@headlessui/react'
import { mapDirectionClass } from '../../styles/consts'
import { type DropdownDirection } from '@/shared/types/ui'

interface PopoverProps {
  children: ReactNode
  className?: string
  trigger: ReactNode
  direction?: DropdownDirection
}

export const Popover = memo(({
  children,
  className,
  trigger,
  direction = 'bottom right'
}: PopoverProps) => {
  const menuClasses = [mapDirectionClass[direction]]

  return (
    <HPopover className={classNames(cls.Popover, {}, [className, popupCls.popup])}>
      <HPopover.Button className={popupCls.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)} unmount={false}>
        {children}
      </HPopover.Panel>
    </HPopover>
  )
})

Popover.displayName = 'Popover'
