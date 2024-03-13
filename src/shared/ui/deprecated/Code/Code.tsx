import { memo, type FC, useCallback } from 'react'

import CopyIcon from '@/shared/assets/icons/copy-20-20.svg'
import { classNames } from '@/shared/lib/classNames/classNames'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'

import cls from './Code.module.scss'

interface CodeProps {
  className?: string
  text: string
}

/**
 * @deprecated
 */
export const Code: FC<CodeProps> = memo(({ className, text }) => {
  const onCopy = useCallback(() => {
    void navigator.clipboard.writeText(text)
  }, [text])

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button className={cls.copyBtn} onClick={onCopy}>
        <Icon Svg={CopyIcon} className={cls.copyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  )
})

Code.displayName = 'Code'
