import {
  memo,
  type FC,
  type ImgHTMLAttributes,
  useState,
  useLayoutEffect,
  type ReactElement,
} from 'react'

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
  fallback?: ReactElement
  errorFallback?: ReactElement
}

export const AppImage: FC<AppImageProps> = memo(
  ({ className, src, alt = '', fallback, errorFallback, ...restProps }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(true)

    useLayoutEffect(() => {
      const img = new Image()
      img.src = src ?? ''

      img.onload = () => {
        setIsLoading(false)
      }

      img.onerror = () => {
        setIsLoading(false)
        setHasError(true)
      }
    }, [src])

    if (isLoading && fallback) {
      return fallback
    }

    if (hasError && errorFallback) {
      return errorFallback
    }

    return <img className={className} src={src} alt={alt} {...restProps} />
  },
)

AppImage.displayName = 'AppImage'
