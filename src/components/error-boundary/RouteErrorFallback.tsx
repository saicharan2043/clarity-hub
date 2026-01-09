import { ErrorInfo } from 'react';
import { AlertCircle, RefreshCw, ArrowLeft, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface RouteErrorFallbackProps {
  error: Error;
  errorInfo: ErrorInfo | null;
  resetError: () => void;
}

const isDevelopment = import.meta.env.DEV;

const RouteErrorFallback = ({ error, errorInfo, resetError }: RouteErrorFallbackProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
    resetError();
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-amber-500/50 shadow-md">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mb-3">
            <AlertCircle className="w-7 h-7 text-amber-500" />
          </div>
          <CardTitle className="text-xl text-amber-600">
            {isDevelopment ? 'Route Error' : 'Page Error'}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {isDevelopment
              ? 'An error occurred while rendering this page.'
              : 'This page encountered an issue. Please try again.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isDevelopment && (
            <div className="space-y-3">
              <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Bug className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold text-sm text-amber-600">Error</span>
                </div>
                <code className="text-sm text-foreground break-all block">
                  {error.message}
                </code>
              </div>
              
              {error.stack && (
                <div className="p-3 bg-muted/50 border border-border rounded-lg">
                  <span className="font-semibold text-sm text-muted-foreground block mb-2">Stack Trace</span>
                  <pre className="text-xs text-muted-foreground overflow-auto max-h-32 whitespace-pre-wrap">
                    {error.stack}
                  </pre>
                </div>
              )}

              {errorInfo?.componentStack && (
                <div className="p-3 bg-muted/50 border border-border rounded-lg">
                  <span className="font-semibold text-sm text-muted-foreground block mb-2">Component Stack</span>
                  <pre className="text-xs text-muted-foreground overflow-auto max-h-32 whitespace-pre-wrap">
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
              Retry
            </Button>
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteErrorFallback;
