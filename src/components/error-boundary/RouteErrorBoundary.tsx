import { ReactNode, ErrorInfo } from 'react';
import { ErrorBoundary, RouteErrorFallback } from '@/components/error-boundary';

interface RouteErrorBoundaryProps {
  children: ReactNode;
}

const RouteErrorBoundary = ({ children }: RouteErrorBoundaryProps) => {
  return (
    <ErrorBoundary
      fallback={(error: Error, errorInfo: ErrorInfo | null, resetError: () => void) => (
        <RouteErrorFallback error={error} errorInfo={errorInfo} resetError={resetError} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default RouteErrorBoundary;
