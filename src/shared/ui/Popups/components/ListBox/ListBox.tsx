import { memo, type FC, Fragment, type ReactNode } from 'react'

import { Listbox } from '@headlessui/react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { type DropdownDirection } from '@/shared/types/ui'

import { Button, ButtonTheme } from '../../../Button/Button'
import { HStack } from '../../../Stack'
import { mapDirectionClass } from '../../styles/consts'
import popupCls from '../../styles/popup.module.scss'

import cls from './ListBox.module.scss'

export interface ListBoxItem {
  value: string
  content: ReactNode
  disabled?: boolean
}

interface ListBoxProps {
  className?: string
  items?: ListBoxItem[]
  value?: string
  defaultValue?: string
  label?: string
  readOnly?: boolean
  direction?: DropdownDirection
  onChange: (item: string) => void
}

export const ListBox: FC<ListBoxProps> = memo(
  ({
    className,
    items,
    value,
    defaultValue,
    label,
    readOnly,
    direction = 'bottom right',
    onChange,
  }) => {
    const optionsClasses = [cls.options, mapDirectionClass[direction]]

    return (
      <HStack gap="4">
        {label && <span>{label}: </span>}
        <Listbox
          value={value}
          onChange={onChange}
          disabled={readOnly}
          as="div"
          className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
        >
          <Listbox.Button
            as={Button}
            className={cls.buttonWrapper}
            disabled={readOnly}
            theme={ButtonTheme.OUTLINE}
          >
            {value ?? defaultValue}
          </Listbox.Button>
          <Listbox.Options className={classNames('', {}, optionsClasses)}>
            {items?.map((item) => (
              <Listbox.Option
                key={item.value}
                value={item.value}
                disabled={item.disabled}
                as={Fragment}
              >
                {({ active, selected }) => (
                  <li
                    className={classNames(cls.option, {
                      [popupCls.active]: active,
                      [popupCls.selected]: selected,
                      [popupCls.disabled]: item.disabled,
                    })}
                  >
                    {item.content}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </HStack>
    )
  },
)

ListBox.displayName = 'ListBox'
