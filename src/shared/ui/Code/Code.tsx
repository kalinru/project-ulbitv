import { memo, type FC, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Code.module.scss'
import { Button } from '../Button/Button'
import CopyIcon from 'shared/assets/icons/copy-20-20.svg'
import { Icon } from 'shared/ui/Icon/Icon'

interface CodeProps {
  className?: string
  text: string
}

export const Code: FC<CodeProps> = memo(({ className, text }) => {
  const onCopy = useCallback(() => {
    void navigator.clipboard.writeText(text)
  }, [text])

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button className={cls.copyBtn} onClick={onCopy}>
        <Icon Svg={CopyIcon} className={cls.copyIcon}/>
      </Button>
      <code>
        {text}
      </code>
    </pre>
  )
})

Code.displayName = 'Code'
