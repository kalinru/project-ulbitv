import { memo, type FC } from 'react'

import { ArticleView } from '@/entities/Article'
import ListIcon from '@/shared/assets/icons/burger.svg'
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg'
import TileIcon from '@/shared/assets/icons/tile.svg'
import TileIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features'
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button/Button'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { Card } from '@/shared/ui/redesigned/Card'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { HStack } from '@/shared/ui/redesigned/Stack'

import cls from './ArticleViewSelector.module.scss'

interface ArticleViewSelectorProps {
  className?: string
  view: ArticleView
  onViewClick: (view: ArticleView) => void
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => TileIcon,
      off: () => TileIconDeprecated,
    }),
  },
  {
    view: ArticleView.BIG,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => ListIcon,
      off: () => ListIconDeprecated,
    }),
  },
]

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = memo(
  ({ className, view, onViewClick }) => {
    const onClick = (newView: ArticleView) => () => {
      onViewClick?.(newView)
    }

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Card
            className={classNames(cls.ArticleViewSelectorRedesigned, {}, [
              className,
            ])}
            border="round"
          >
            <HStack gap="8">
              {viewTypes.map((viewType) => (
                <Icon
                  key={viewType.view}
                  clickable
                  onClick={onClick(viewType.view)}
                  Svg={viewType.icon}
                  width={24}
                  height={24}
                  className={classNames(
                    '',
                    { [cls.notActive]: viewType.view !== view },
                    [],
                  )}
                />
              ))}
            </HStack>
          </Card>
        }
        off={
          <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => (
              <ButtonDeprecated
                key={viewType.view}
                square={true}
                onClick={onClick(viewType.view)}
              >
                <IconDeprecated
                  Svg={viewType.icon}
                  width={24}
                  height={24}
                  className={classNames(
                    '',
                    { [cls.notActive]: viewType.view !== view },
                    [],
                  )}
                />
              </ButtonDeprecated>
            ))}
          </div>
        }
      />
    )
  },
)

ArticleViewSelector.displayName = 'ArticleViewSelector'
