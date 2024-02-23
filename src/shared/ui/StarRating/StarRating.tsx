import { memo, type FC, useState } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import StarIcon from '../../assets/icons/star.svg'
import { Icon } from '../Icon/Icon'

import cls from './StarRating.module.scss'

interface StarRatingProps {
  className?: string
  size?: number
  selectedStars?: number
  onSelect?: (stars: number) => void
}

const stars = [1, 2, 3, 4, 5]

export const StarRating: FC<StarRatingProps> = memo(({
  className,
  size = 30,
  selectedStars = 0,
  onSelect
}) => {
  const [currentStartCount, setCurrentStartCount] = useState(selectedStars)
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars))

  const onHover = (startCount: number) => () => {
    if (!isSelected) {
      setCurrentStartCount(startCount)
    }
  }

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStartCount(0)
    }
  }

  const onClick = (startCount: number) => () => {
    if (!isSelected) {
      onSelect?.(startCount)
      setCurrentStartCount(startCount)
      setIsSelected(true)
    }
  }

  return (
    <div className={classNames(cls.StarRating, {}, [className])}>
      {stars.map(starsCount => (
        <Icon key={starsCount}
              Svg={StarIcon}
              className={classNames(cls.starIcon, {
                [cls.hovered]: currentStartCount >= starsCount,
                [cls.normal]: currentStartCount < starsCount,
                [cls.isSelected]: isSelected
              }, [])}
              height={size}
              width={size}
              onClick={onClick(starsCount)}
              onMouseLeave={onLeave}
              onMouseEnter={onHover(starsCount)}/>
      ))}
    </div>
  )
})

StarRating.displayName = 'StarRating'
