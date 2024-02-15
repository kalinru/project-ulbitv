import { memo, type FC, Fragment, type ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ListBox.module.scss'
import { Listbox } from '@headlessui/react'
import { Button, ButtonTheme } from '../Button/Button'
import { HStack } from '../Stack'

export interface ListBoxItem {
  value: string
  content: ReactNode
  disabled?: boolean
}

type DropdownDirection = 'top' | 'bottom'

interface ListBoxProps {
  className?: string
  items?: ListBoxItem[]
  value?: string
  defaultValue?: string
  label?: string
  readOnly?: boolean
  direction?: DropdownDirection
  onChange: <T = string>(item: T) => void
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  bottom: cls.optionsBottom,
  top: cls.optionsTop
}

export const ListBox: FC<ListBoxProps> = memo(({
  className,
  items,
  value,
  defaultValue,
  label,
  readOnly,
  direction = 'bottom',
  onChange
}) => {
  const optionsClasses = [
    cls.options,
    mapDirectionClass[direction]
  ]

  return (<HStack gap='4'>
    {label && <span>{label}: </span>}
    <Listbox value={value}
             onChange={onChange}
             disabled={readOnly}
             as='div'
             className={classNames(cls.ListBox, {}, [className])}>
      <Listbox.Button className={cls.buttonWrapper} disabled={readOnly}>
        <Button className={cls.button} theme={ButtonTheme.OUTLINE} disabled={readOnly}>
          {value ?? defaultValue}
        </Button>
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
              <li className={classNames(cls.option, {
                [cls.active]: active,
                [cls.selected]: selected,
                [cls.disabled]: item.disabled
              })}>
                {item.content}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  </HStack>)
})

ListBox.displayName = 'ListBox'
