import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary, GlobalErrorFallback } from "@/components/error-boundary";
import RouteErrorBoundary from "@/components/error-boundary/RouteErrorBoundary";
import { Toaster } from "@/components/ui/sonner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ContentHub from "./pages/ContentHub";
import ContentHubCategories from "./pages/ContentHubCategories";
import ContentHubSubCategories from "./pages/ContentHubSubCategories";
import ContentHubModules from "./pages/ContentHubModules";
import ContentHubLessons from "./pages/ContentHubLessons";
import { ErrorInfo } from "react";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary
    fallback={(error: Error, errorInfo: ErrorInfo | null, resetError: () => void) => (
      <GlobalErrorFallback error={error} errorInfo={errorInfo} resetError={resetError} />
    )}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <RouteErrorBoundary>
                <Index />
              </RouteErrorBoundary>
            } />
            
            {/* Content Hub Routes */}
            <Route path="/content-hub" element={
              <RouteErrorBoundary>
                <ContentHub />
              </RouteErrorBoundary>
            } />
            <Route path="/content-hub/:offerId/categories" element={
              <RouteErrorBoundary>
                <ContentHubCategories />
              </RouteErrorBoundary>
            } />
            <Route path="/content-hub/categories/:categoryId/sub-categories" element={
              <RouteErrorBoundary>
                <ContentHubSubCategories />
              </RouteErrorBoundary>
            } />
            <Route path="/content-hub/sub-categories/:subCategoryId/modules" element={
              <RouteErrorBoundary>
                <ContentHubModules />
              </RouteErrorBoundary>
            } />
            <Route path="/content-hub/modules/:moduleId/lessons" element={
              <RouteErrorBoundary>
                <ContentHubLessons />
              </RouteErrorBoundary>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
