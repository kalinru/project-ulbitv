import { memo, useRef, type MutableRefObject, type UIEvent, type ReactNode } from 'react'

import { useLocation } from 'react-router-dom'

import { type StateSchema } from '@/app/providers/StoreProvider'
import { UIActions, getUIScrollPositionByPath } from '@/features/UI'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle'
import { type TestProps } from '@/shared/types/tests'

import cls from './Page.module.scss'

interface PageProps extends TestProps {
  children?: ReactNode
  className?: string
  onScrollEnd?: () => void
}

const PAGE_ID = 'PAGE_ID'

export const Page = memo(({ className, children, onScrollEnd, ...restProps }: PageProps) => {
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
          id={PAGE_ID}
          onScroll={onScroll}
          data-testid={restProps['data-testid'] ?? 'Page'}>
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
