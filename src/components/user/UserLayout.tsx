import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Library, 
  FileText, 
  Award, 
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Globe,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRole } from '@/contexts/RoleContext';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface UserLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { section: 'MAIN' },
  { title: 'Dashboard', path: '/user', icon: LayoutDashboard },
  { section: 'LEARNING' },
  { title: 'My Trainings', path: '/user/trainings', icon: BookOpen },
  { title: 'Calendar', path: '/user/calendar', icon: Calendar },
  { title: 'Library', path: '/user/library', icon: Library },
  { section: 'PROGRESS' },
  { title: 'Assessments', path: '/user/assessments', icon: FileText },
  { title: 'Certificates', path: '/user/certificates', icon: Award },
  { section: 'ACCOUNT' },
  { title: 'Profile', path: '/user/profile', icon: User },
];

export const UserLayout = ({ children }: UserLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setRole, userName } = useRole();

  const handleLogout = () => {
    setRole(null);
    navigate('/login');
  };

  const handleSwitchToTrainer = () => {
    setRole('trainer');
    navigate('/trainer');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 flex flex-col',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-user-accent flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-foreground">LMS Learner</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {menuItems.map((item, index) => {
            if ('section' in item && item.section) {
              if (collapsed) return null;
              return (
                <div
                  key={`section-${index}`}
                  className="px-3 py-2 mt-4 first:mt-0 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  {item.section}
                </div>
              );
            }

            const Icon = item.icon!;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path!}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all',
                  isActive
                    ? 'bg-user-accent text-white'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn(
              'w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10',
              collapsed && 'justify-center'
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn('flex-1 transition-all duration-300', collapsed ? 'ml-16' : 'ml-64')}>
        {/* Top Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            {/* Marquee */}
            <div className="hidden lg:flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 overflow-hidden max-w-md">
              <span className="text-xs text-user-accent font-medium whitespace-nowrap">📚</span>
              <div className="overflow-hidden">
                <p className="text-xs text-muted-foreground whitespace-nowrap animate-marquee">
                  Welcome to LMS Learner Portal • Continue your learning journey • Complete your pending assessments
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="w-64 pl-9 h-9 bg-muted border-0"
              />
            </div>

            {/* Language */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>हिंदी</DropdownMenuItem>
                <DropdownMenuItem>Español</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-xs">
                2
              </Badge>
            </Button>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 h-9 px-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-user-accent text-white text-xs">
                      {userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {!collapsed && (
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium">{userName}</p>
                      <p className="text-xs text-muted-foreground">Learner</p>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate('/user/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSwitchToTrainer}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Switch to Trainer View
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
