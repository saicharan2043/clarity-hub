import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary, GlobalErrorFallback } from "@/components/error-boundary";
import RouteErrorBoundary from "@/components/error-boundary/RouteErrorBoundary";
import { Toaster } from "@/components/ui/sonner";
import { RoleProvider, useRole } from "@/contexts/RoleContext";
import { ErrorInfo } from "react";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// Trainer Pages
import { TrainerLayout } from "./components/trainer/TrainerLayout";
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import TrainerGroups from "./pages/trainer/TrainerGroups";
import TrainerUsers from "./pages/trainer/TrainerUsers";
import TrainerCourses from "./pages/trainer/TrainerCourses";
import TrainerEvents from "./pages/trainer/TrainerEvents";
import TrainerAttendance from "./pages/trainer/TrainerAttendance";
import TrainerAssessments from "./pages/trainer/TrainerAssessments";
import TrainerAssessmentReports from "./pages/trainer/TrainerAssessmentReports";
import TrainerContentHub from "./pages/trainer/TrainerContentHub";
import TrainerFeedback from "./pages/trainer/TrainerFeedback";
import TrainerCertificates from "./pages/trainer/TrainerCertificates";
import TrainerSettings from "./pages/trainer/TrainerSettings";

// User Pages
import { UserLayout } from "./components/user/UserLayout";
import UserDashboard from "./pages/user/UserDashboard";
import UserTrainings from "./pages/user/UserTrainings";
import UserCalendar from "./pages/user/UserCalendar";
import UserLibrary from "./pages/user/UserLibrary";
import UserAssessments from "./pages/user/UserAssessments";
import UserCertificates from "./pages/user/UserCertificates";
import UserProfile from "./pages/user/UserProfile";

// Content Hub (Admin)
import ContentHub from "./pages/ContentHub";
import ContentHubCategories from "./pages/ContentHubCategories";
import ContentHubSubCategories from "./pages/ContentHubSubCategories";
import ContentHubModules from "./pages/ContentHubModules";
import ContentHubLessons from "./pages/ContentHubLessons";
import CertificateTemplates from "./pages/CertificateTemplates";
import CertificateTemplateCreate from "./pages/CertificateTemplateCreate";
import CertificateTemplateEdit from "./pages/CertificateTemplateEdit";
import RolePermissions from "./pages/admin/RolePermissions";
import UserPermissions from "./pages/admin/UserPermissions";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode; allowedRole: 'trainer' | 'user' }) => {
  const { role } = useRole();
  
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  
  if (role !== allowedRole) {
    return <Navigate to={role === 'trainer' ? '/trainer' : '/user'} replace />;
  }
  
  return <>{children}</>;
};

// Trainer Route Wrapper
const TrainerRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allowedRole="trainer">
    <TrainerLayout>{children}</TrainerLayout>
  </ProtectedRoute>
);

// User Route Wrapper
const UserRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allowedRole="user">
    <UserLayout>{children}</UserLayout>
  </ProtectedRoute>
);

const AppRoutes = () => {
  const { role } = useRole();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        role ? <Navigate to={role === 'trainer' ? '/trainer' : '/user'} replace /> : <Index />
      } />
      <Route path="/login" element={
        role ? <Navigate to={role === 'trainer' ? '/trainer' : '/user'} replace /> : <Login />
      } />

      {/* Trainer Routes */}
      <Route path="/trainer" element={<TrainerRoute><TrainerDashboard /></TrainerRoute>} />
      <Route path="/trainer/groups" element={<TrainerRoute><TrainerGroups /></TrainerRoute>} />
      <Route path="/trainer/users" element={<TrainerRoute><TrainerUsers /></TrainerRoute>} />
      <Route path="/trainer/courses" element={<TrainerRoute><TrainerCourses /></TrainerRoute>} />
      <Route path="/trainer/events" element={<TrainerRoute><TrainerEvents /></TrainerRoute>} />
      <Route path="/trainer/attendance" element={<TrainerRoute><TrainerAttendance /></TrainerRoute>} />
      <Route path="/trainer/assessments" element={<TrainerRoute><TrainerAssessments /></TrainerRoute>} />
      <Route path="/trainer/assessment-reports" element={<TrainerRoute><TrainerAssessmentReports /></TrainerRoute>} />
      <Route path="/trainer/content-hub" element={<TrainerRoute><TrainerContentHub /></TrainerRoute>} />
      <Route path="/trainer/feedback" element={<TrainerRoute><TrainerFeedback /></TrainerRoute>} />
      <Route path="/trainer/certificates" element={<TrainerRoute><TrainerCertificates /></TrainerRoute>} />
      <Route path="/trainer/settings" element={<TrainerRoute><TrainerSettings /></TrainerRoute>} />

      {/* User Routes */}
      <Route path="/user" element={<UserRoute><UserDashboard /></UserRoute>} />
      <Route path="/user/trainings" element={<UserRoute><UserTrainings /></UserRoute>} />
      <Route path="/user/calendar" element={<UserRoute><UserCalendar /></UserRoute>} />
      <Route path="/user/library" element={<UserRoute><UserLibrary /></UserRoute>} />
      <Route path="/user/assessments" element={<UserRoute><UserAssessments /></UserRoute>} />
      <Route path="/user/certificates" element={<UserRoute><UserCertificates /></UserRoute>} />
      <Route path="/user/profile" element={<UserRoute><UserProfile /></UserRoute>} />

      {/* Admin Content Hub Routes */}
      <Route path="/content-hub" element={<RouteErrorBoundary><ContentHub /></RouteErrorBoundary>} />
      <Route path="/content-hub/:offerId/categories" element={<RouteErrorBoundary><ContentHubCategories /></RouteErrorBoundary>} />
      <Route path="/content-hub/categories/:categoryId/sub-categories" element={<RouteErrorBoundary><ContentHubSubCategories /></RouteErrorBoundary>} />
      <Route path="/content-hub/sub-categories/:subCategoryId/modules" element={<RouteErrorBoundary><ContentHubModules /></RouteErrorBoundary>} />
      <Route path="/content-hub/modules/:moduleId/lessons" element={<RouteErrorBoundary><ContentHubLessons /></RouteErrorBoundary>} />
      
      {/* Certificate Template Routes */}
      <Route path="/admin/certificate-templates" element={<RouteErrorBoundary><CertificateTemplates /></RouteErrorBoundary>} />
      <Route path="/admin/certificate-templates/create" element={<RouteErrorBoundary><CertificateTemplateCreate /></RouteErrorBoundary>} />
      <Route path="/admin/certificate-templates/:id/edit" element={<RouteErrorBoundary><CertificateTemplateEdit /></RouteErrorBoundary>} />
      <Route path="/admin/role-permissions" element={<RouteErrorBoundary><RolePermissions /></RouteErrorBoundary>} />
      <Route path="/admin/user-permissions" element={<RouteErrorBoundary><UserPermissions /></RouteErrorBoundary>} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <ErrorBoundary
    fallback={(error: Error, errorInfo: ErrorInfo | null, resetError: () => void) => (
      <GlobalErrorFallback error={error} errorInfo={errorInfo} resetError={resetError} />
    )}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <RoleProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </RoleProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
