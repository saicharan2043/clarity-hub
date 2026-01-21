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
  Award,
  Bell,
  ChevronDown
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
                <span className="inline-block px-4">📋 Admin Portal: Manage users, content, and assessments</span>
                <span className="inline-block px-4">•</span>
                <span className="inline-block px-4">📊 Track learner progress and generate reports</span>
                <span className="inline-block px-4">•</span>
                <span className="inline-block px-4">🎓 Create and assign certificates to courses</span>
                <span className="inline-block px-4">•</span>
                <span className="inline-block px-4">📝 Build assessments and manage question banks</span>
                <span className="inline-block px-4">•</span>
                <span className="inline-block px-4">📋 Admin Portal: Manage users, content, and assessments</span>
                <span className="inline-block px-4">•</span>
                <span className="inline-block px-4">📊 Track learner progress and generate reports</span>
                <span className="inline-block px-4">•</span>
                <span className="inline-block px-4">🎓 Create and assign certificates to courses</span>
                <span className="inline-block px-4">•</span>
                <span className="inline-block px-4">📝 Build assessments and manage question banks</span>
              </div>
            </div>

            {/* Right side: Language, Notifications, Profile */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Globe className="h-4 w-4" />
                  <span>EN</span>
                  <ChevronDown className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>English</DropdownMenuItem>
                  <DropdownMenuItem>Hindi</DropdownMenuItem>
                  <DropdownMenuItem>Spanish</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </button>

              {/* Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar className="h-8 w-8 bg-content-accent">
                    <AvatarFallback className="bg-content-accent text-white text-sm">AD</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">Admin</p>
                    <p className="text-xs text-muted-foreground">Administrator</p>
                  </div>
                  <ChevronDown className="h-3 w-3 text-muted-foreground hidden md:block" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
