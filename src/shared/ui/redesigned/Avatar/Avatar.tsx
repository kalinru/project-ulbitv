import { type CSSProperties, useMemo } from 'react'

import AvatarIcon from '@/shared/assets/icons/user-filled.svg'
import { classNames } from '@/shared/lib/classNames/classNames'

import { AppImage } from '../../redesigned/AppImage'
import { Icon } from '../Icon'
import { Skeleton } from '../Skeleton'

import cls from './Avatar.module.scss'

interface AvatarProps {
  className?: string
  src?: string
  size?: number
  alt?: string
}

const DEFAULT_SIZE = 100

export const Avatar = ({
  className,
  src,
  size = DEFAULT_SIZE,
  alt,
}: AvatarProps) => {
  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size],
  )

  const fallback = <Skeleton width={size} height={size} border="50%" />
  const errorFallback = <Icon Svg={AvatarIcon} width={size} height={size} />

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
