import { memo, type FC } from 'react'

import ListIcon from '@/shared/assets/icons/list-24-24.svg'
import TileIcon from '@/shared/assets/icons/tiled-24-24.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui'
import { Icon } from '@/shared/ui/Icon'

import { ArticleView } from '../../model/consts/consts'

import cls from './ArticleViewSelector.module.scss'

interface ArticleViewSelectorProps {
  className?: string
  view: ArticleView
  onViewClick: (view: ArticleView) => void
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: TileIcon
  },
  {
    view: ArticleView.BIG,
    icon: ListIcon
  }
]

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = memo(({
  className,
  view,
  onViewClick
}) => {
  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView)
  }

  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map(viewType => (
        <Button key={viewType.view}
                square={true}
                onClick={onClick(viewType.view)}>
          <Icon Svg={viewType.icon}
                className={classNames('', { [cls.notActive]: viewType.view !== view }, [])}/>
        </Button>
      ))}
    </div>
  )
})

ArticleViewSelector.displayName = 'ArticleViewSelector'
