import { Fragment, useMemo, type ReactNode } from 'react'

import { Listbox } from '@headlessui/react'

import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg'
import { typedMemo } from '@/shared/consts/typedMemo'
import { classNames } from '@/shared/lib/classNames/classNames'
import { type DropdownDirection } from '@/shared/types/ui'

import { HStack } from '../../../../redesigned/Stack'
import { Button } from '../../../Button/Button'
import { Icon } from '../../../Icon'
import { mapDirectionClass } from '../../styles/consts'
import popupCls from '../../styles/popup.module.scss'

import cls from './ListBox.module.scss'

export interface ListBoxItem {
  value: string

  // TODO выпилить одно из двух
  content?: ReactNode
  label?: ReactNode

  disabled?: boolean
}

interface ListBoxProps<T extends string> {
  className?: string
  items?: ListBoxItem[]
  value?: T
  defaultValue?: string
  label?: string
  readOnly?: boolean
  direction?: DropdownDirection
  onChange: (item: T) => void
}

const _ListBox = <T extends string>(props: ListBoxProps<T>) => {
  const {
    className,
    items,
    value,
    defaultValue,
    label,
    readOnly,
    direction = 'bottom right',
    onChange,
  } = props

  const optionsClasses = [
    cls.options,
    mapDirectionClass[direction],
    popupCls.menu,
  ]
  const selectedItem = useMemo(() => {
    return items?.find((item) => item.value === value)
  }, [items, value])

  const getItemContent = (item?: ListBoxItem): ReactNode => {
    return item?.content ?? item?.label
  }

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
          variant="filled"
          addonRight={<Icon Svg={ArrowIcon} />}
        >
          {getItemContent(selectedItem) ?? defaultValue}
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
                  {getItemContent(item)}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </HStack>
  )
}

export const ListBox = typedMemo(_ListBox)
