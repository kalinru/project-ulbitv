import { type ReactNode, type ErrorInfo, Component, Suspense } from 'react'

import { Loader } from '@/shared/ui/deprecated/Loader'
import { PageError } from '@/widgets/PageError'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo)
  }

  render(): ReactNode {
    const { hasError } = this.state
    const { children } = this.props
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <Suspense fallback={<Loader />}>
          <PageError />
        </Suspense>
      )
    }

    return children
  }
}

export default ErrorBoundary
