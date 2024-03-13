import { type CSSProperties, useMemo } from 'react'

import AvatarIcon from '@/shared/assets/icons/user-filled.svg'
import { classNames } from '@/shared/lib/classNames/classNames'

import { AppImage } from '../AppImage'
import { Icon } from '../Icon'
import { Skeleton } from '../Skeleton'

import cls from './Avatar.module.scss'

interface AvatarProps {
  className?: string
  src?: string
  size?: number
  alt?: string
  fallbackInverted?: boolean
}

const DEFAULT_SIZE = 100

/**
 * @deprecated
 */
export const Avatar = ({
  className,
  src,
  size = DEFAULT_SIZE,
  alt,
  fallbackInverted,
}: AvatarProps) => {
  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size],
  )

  const fallback = <Skeleton width={size} height={size} border="50%" />
  const errorFallback = (
    <Icon
      Svg={AvatarIcon}
      width={size}
      height={size}
      inverted={fallbackInverted}
    />
  )

  return (
    <AppImage
      src={src}
      style={styles}
      alt={alt}
      errorFallback={errorFallback}
      fallback={fallback}
      className={classNames(cls.Avatar, {}, [className])}
    />
  )
}
