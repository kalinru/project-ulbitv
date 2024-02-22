import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Avatar.module.scss'
import { type CSSProperties, useMemo } from 'react'

interface AvatarProps {
  className?: string
  src?: string
  size?: number
  alt?: string
}

const DEFAULT_SIZE = 100

export const Avatar = ({ className, src, size, alt }: AvatarProps) => {
  const styles = useMemo<CSSProperties>(() => ({
    width: size ?? DEFAULT_SIZE,
    height: size ?? DEFAULT_SIZE
  }), [size])

  return (
    <img src={src}
         style={styles}
         alt={alt}
         className={classNames(cls.Avatar, {}, [className])}/>
  )
}
