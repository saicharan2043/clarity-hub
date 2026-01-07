import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ContentHub from "./pages/ContentHub";
import ContentHubCategories from "./pages/ContentHubCategories";
import ContentHubSubCategories from "./pages/ContentHubSubCategories";
import ContentHubModules from "./pages/ContentHubModules";
import ContentHubLessons from "./pages/ContentHubLessons";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Content Hub Routes */}
          <Route path="/content-hub" element={<ContentHub />} />
          <Route path="/content-hub/:offerId/categories" element={<ContentHubCategories />} />
          <Route path="/content-hub/categories/:categoryId/sub-categories" element={<ContentHubSubCategories />} />
          <Route path="/content-hub/sub-categories/:subCategoryId/modules" element={<ContentHubModules />} />
          <Route path="/content-hub/modules/:moduleId/lessons" element={<ContentHubLessons />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
