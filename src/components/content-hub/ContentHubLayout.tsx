import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  Users, 
  GraduationCap, 
  ClipboardList, 
  BookOpen,
  FileQuestion,
  Upload,
  BarChart3,
  Globe,
  UserCheck,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

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

const AppSidebar = () => {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  // Group nav items by section
  const groupedItems: { section?: string; items: typeof navItems }[] = [];
  let currentGroup: { section?: string; items: typeof navItems } = { items: [] };

  navItems.forEach((item) => {
    if ('section' in item) {
      if (currentGroup.items.length > 0) {
        groupedItems.push(currentGroup);
      }
      currentGroup = { section: item.section, items: [] };
    } else {
      currentGroup.items.push(item);
    }
  });
  if (currentGroup.items.length > 0) {
    groupedItems.push(currentGroup);
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="w-8 h-8 bg-content-accent rounded-lg flex items-center justify-center flex-shrink-0">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="font-semibold text-sidebar-foreground">LMS Admin</span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {groupedItems.map((group, groupIndex) => (
          <SidebarGroup key={groupIndex}>
            {group.section && (
              <SidebarGroupLabel>{group.section}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  if ('section' in item) return null;
                  const Icon = item.icon;
                  const isActive = location.pathname.startsWith(item.path);

                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.label}
                        className={cn(
                          isActive && 'bg-content-accent text-white hover:bg-content-accent hover:text-white'
                        )}
                      >
                        <Link to={item.path}>
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export const ContentHubLayout = ({ children }: ContentHubLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 border-b border-border flex items-center gap-4">
            <SidebarTrigger />
            
            {/* Scrolling Marquee Text */}
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap text-sm text-muted-foreground">
                <span className="inline-block px-4">🎓 Welcome to Learning Management System</span>
                <span className="inline-block px-4">•</span>
                <span className="inline-block px-4">📚 Empowering education through technology</span>
                <span className="inline-block px-4">•</span>
                <span className="inline-block px-4">🚀 Build, manage and deliver impactful learning experiences</span>
                <span className="inline-block px-4">•</span>
                <span className="inline-block px-4">✨ Create certificates, assessments, and engaging content</span>
                <span className="inline-block px-4">•</span>
                <span className="inline-block px-4">🎓 Welcome to Learning Management System</span>
                <span className="inline-block px-4">•</span>
                <span className="inline-block px-4">📚 Empowering education through technology</span>
                <span className="inline-block px-4">•</span>
                <span className="inline-block px-4">🚀 Build, manage and deliver impactful learning experiences</span>
                <span className="inline-block px-4">•</span>
                <span className="inline-block px-4">✨ Create certificates, assessments, and engaging content</span>
              </div>
            </div>
          </div>
          <div className="p-6 max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
