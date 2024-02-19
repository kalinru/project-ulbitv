import { memo, useRef, type MutableRefObject, type UIEvent, type ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Page.module.scss'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { UIActions, getUIScrollPositionByPath } from 'features/UI'
import { useLocation } from 'react-router-dom'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppSelector } from 'app/providers/StoreProvider/config/store'
import { type StateSchema } from 'app/providers/StoreProvider'
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle'

interface PageProps {
  children?: ReactNode
  className?: string
  onScrollEnd?: () => void
}

export const Page = memo(({ className, children, onScrollEnd }: PageProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const scrollPosition = useAppSelector(
    (state: StateSchema) => getUIScrollPositionByPath(state, pathname)
  )

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd
  })

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition
  })

  const onScroll = useThrottle((event: UIEvent<HTMLDivElement>) => {
    dispatch(UIActions.setScrollPosition({
      position: event.currentTarget.scrollTop,
      path: pathname
    }))
  }, 200)

  return (
    <main ref={wrapperRef}
          className={classNames(cls.Page, {}, [className])}
          onScroll={onScroll}>
      {children}
      {onScrollEnd
        ? (
          <div ref={triggerRef}
             className={cls.trigger}/>
          )
        : null
      }
    </main>
  )
})

Page.displayName = 'Page'
