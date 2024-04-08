import { type MutableRefObject, useEffect } from 'react'

export interface UseInfiniteScrollOptions {
  callback?: () => void
  triggerRef: MutableRefObject<HTMLElement>
  wrapperRef?: MutableRefObject<HTMLElement>
}

// TODO проверить сценарий когда не заполняется видиая часть полность и
// не появляется скрол - возможен баг, ято нрикак не подгрузито больше элемнтов
export const useInfiniteScroll = ({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfiniteScrollOptions) => {
  useEffect(() => {
    let observer: IntersectionObserver
    const wrapperElement = wrapperRef?.current ?? null
    const triggerElement = triggerRef.current

    if (callback) {
      const options = {
        root: wrapperElement,
        rootMargin: '0px',
        threshold: 1.0,
      }

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }
      }, options)

      observer.observe(triggerElement)
    }

    return () => {
      if (observer && triggerElement) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(triggerElement)
      }
    }
  })
}
