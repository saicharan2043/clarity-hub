import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  Users, 
  GraduationCap, 
  ClipboardList, 
  Settings,
  BookOpen,
  FileQuestion,
  Upload,
  BarChart3,
  Globe,
  UserCheck,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentHubLayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: 'Country', icon: Globe, path: '/admin/country' },
  { label: 'Content Master', icon: FileQuestion, path: '/admin/content-master' },
  { label: 'Group Master', icon: Users, path: '/admin/group-master' },
  { section: 'USER MANAGEMENT' },
  { label: 'Users', icon: Users, path: '/admin/users' },
  { label: 'Trainers', icon: UserCheck, path: '/admin/trainers' },
  { section: 'CONTENT MANAGEMENT' },
  { label: 'Content Hub', icon: BookOpen, path: '/content-hub', active: true },
  { label: 'Certificate Templates', icon: Award, path: '/admin/certificate-templates' },
  { label: 'Assessment Engine', icon: ClipboardList, path: '/admin/assessment-engine' },
  { section: 'ASSESSMENT' },
  { label: 'Assessment Dashboard', icon: LayoutGrid, path: '/admin/assessment-dashboard' },
  { label: 'Assessments', icon: FileQuestion, path: '/admin/assessments' },
  { label: 'Question Bank', icon: FileQuestion, path: '/admin/question-bank' },
  { label: 'Bulk Upload', icon: Upload, path: '/admin/bulk-upload' },
  { label: 'Assessment Reports', icon: BarChart3, path: '/admin/assessment-reports' },
];

export const ContentHubLayout = ({ children }: ContentHubLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden lg:block">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-content-accent rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-foreground">LMS Admin</span>
          </div>
        </div>
        <nav className="p-2">
          {navItems.map((item, index) => {
            if ('section' in item) {
              return (
                <div key={index} className="px-3 py-2 mt-4 first:mt-0">
                  <span className="text-xs font-semibold text-muted-foreground tracking-wider">
                    {item.section}
                  </span>
                </div>
              );
            }

            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-content-accent text-white'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
