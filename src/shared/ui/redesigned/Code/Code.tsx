import { memo, type FC, useCallback } from 'react'

import CopyIcon from '@/shared/assets/icons/copy-20-20.svg'
import CopyIconNew from '@/shared/assets/icons/copy.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ToggleFeatures } from '@/shared/lib/features'

import { Button, ButtonTheme } from '../../deprecated/Button/Button'
import { Icon } from '../Icon'

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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <pre className={classNames(cls.CodeRedesigned, {}, [className])}>
          <Icon
            clickable
            onClick={onCopy}
            className={cls.copyBtn}
            Svg={CopyIconNew}
          />
          <code>{text}</code>
        </pre>
      }
      off={
        <pre className={classNames(cls.Code, {}, [className])}>
          <Button
            onClick={onCopy}
            className={cls.copyBtn}
            theme={ButtonTheme.CLEAR}
          >
            <CopyIcon className={cls.copyIcon} />
          </Button>
          <code>{text}</code>
        </pre>
      }
    />
  )
})

Code.displayName = 'Code'
