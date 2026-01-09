import { ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface GlobalErrorFallbackProps {
  error: Error;
  errorInfo: ErrorInfo | null;
  resetError: () => void;
}

const isDevelopment = import.meta.env.DEV;

const GlobalErrorFallback = ({ error, errorInfo, resetError }: GlobalErrorFallbackProps) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-destructive/50 shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl text-destructive">
            {isDevelopment ? 'Application Error' : 'Something went wrong'}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {isDevelopment
              ? 'An unexpected error occurred in the application.'
              : "We're sorry, but something unexpected happened. Please try again."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isDevelopment && (
            <div className="space-y-3">
              <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Bug className="w-4 h-4 text-destructive" />
                  <span className="font-semibold text-sm text-destructive">Error Message</span>
                </div>
                <code className="text-sm text-foreground break-all block">
                  {error.message}
                </code>
              </div>
              
              {error.stack && (
                <div className="p-3 bg-muted/50 border border-border rounded-lg">
                  <span className="font-semibold text-sm text-muted-foreground block mb-2">Stack Trace</span>
                  <pre className="text-xs text-muted-foreground overflow-auto max-h-40 whitespace-pre-wrap">
                    {error.stack}
                  </pre>
                </div>
              )}

              {errorInfo?.componentStack && (
                <div className="p-3 bg-muted/50 border border-border rounded-lg">
                  <span className="font-semibold text-sm text-muted-foreground block mb-2">Component Stack</span>
                  <pre className="text-xs text-muted-foreground overflow-auto max-h-40 whitespace-pre-wrap">
                    {errorInfo.componentStack}
                  </pre>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={resetError}
              variant="default"
              className="flex-1"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button
              onClick={handleGoHome}
              variant="outline"
              className="flex-1"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>

          {!isDevelopment && (
            <p className="text-xs text-center text-muted-foreground pt-2">
              If this problem persists, please contact support.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalErrorFallback;
