import { memo, type FC, useState } from 'react'

import StarIcon from '@/shared/assets/icons/star.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features'

import { Icon } from '../../redesigned/Icon'
import { Icon as IconDeprecated } from '../Icon/Icon'

import cls from './StarRating.module.scss'

interface StarRatingProps {
  className?: string
  size?: number
  selectedStars?: number
  onSelect?: (stars: number) => void
}

const stars = [1, 2, 3, 4, 5]

// TODO move to redesigned folder
/**
 * @deprecated
 */
export const StarRating: FC<StarRatingProps> = memo(
  ({ className, size = 30, selectedStars = 0, onSelect }) => {
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
      <div
        className={classNames(
          toggleFeatures({
            name: 'isAppRedesigned',
            off: () => cls.StarRating,
            on: () => cls.StarRatingRedesigned,
          }),
          {},
          [className],
        )}
      >
        {stars.map((starNumber) => {
          const commonProps = {
            className: classNames(
              cls.starIcon,
              { [cls.selected]: isSelected },
              [currentStartCount >= starNumber ? cls.hovered : cls.normal],
            ),
            Svg: StarIcon,
            key: starNumber,
            width: size,
            height: size,
            onMouseLeave: onLeave,
            onMouseEnter: onHover(starNumber),
            onClick: onClick(starNumber),
            'data-testid': `StarRating.${starNumber}`,
            'data-selected': currentStartCount >= starNumber,
          }
          return (
            <ToggleFeatures
              key={starNumber}
              feature="isAppRedesigned"
              on={<Icon clickable={!isSelected} {...commonProps} />}
              off={<IconDeprecated {...commonProps} />}
            />
          )
        })}
      </div>
    )
  },
)

StarRating.displayName = 'StarRating'
