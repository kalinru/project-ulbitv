import { memo, useCallback } from 'react'

import CircleIcon from '@/shared/assets/icons/circle-up.svg'
import { Icon } from '@/shared/ui/redesigned/Icon'

interface ScrollToTopButtonProps {
  className?: string
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
  const { className } = props

  const onClick = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <Icon
      className={className}
      Svg={CircleIcon}
      width={32}
      height={32}
      clickable
      onClick={onClick}
    />
  )
})

ScrollToTopButton.displayName = 'ScrollToTopButton'
