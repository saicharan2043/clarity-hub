import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ChevronDown,
  Info,
  Shield,
  Plus,
  LayoutDashboard,
  FolderOpen,
  BookOpen,
  Users,
  Calendar,
  FileText,
  MessageSquare,
  Award,
  ClipboardCheck,
  BarChart3,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type Permission = 'view' | 'create' | 'edit' | 'delete';

interface Module {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  permissions: Permission[];
}

const allModules: Module[] = [
  { id: 'dashboard', name: 'Dashboard', description: 'Access to dashboard overview and analytics.', icon: LayoutDashboard, permissions: ['view'] },
  { id: 'category', name: 'Category Management', description: 'Manage categories and organize content structure.', icon: FolderOpen, permissions: ['view', 'create', 'edit', 'delete'] },
  { id: 'content-hub', name: 'Content Hub', description: 'Upload and manage training content and materials.', icon: BookOpen, permissions: ['view', 'create', 'edit', 'delete'] },
  { id: 'users', name: 'User Management', description: 'Manage user accounts, roles, and profiles.', icon: Users, permissions: ['view', 'create', 'edit', 'delete'] },
  { id: 'events', name: 'Events & Calendar', description: 'Schedule and manage training events.', icon: Calendar, permissions: ['view', 'create', 'edit', 'delete'] },
  { id: 'assessments', name: 'Assessments', description: 'Create and manage quizzes and assessments.', icon: FileText, permissions: ['view', 'create', 'edit', 'delete'] },
  { id: 'reports', name: 'Reports & Analytics', description: 'View and export performance reports.', icon: BarChart3, permissions: ['view', 'create', 'edit', 'delete'] },
  { id: 'attendance', name: 'Attendance Tracking', description: 'Track and manage attendance records.', icon: ClipboardCheck, permissions: ['view', 'create', 'edit'] },
  { id: 'feedback', name: 'Feedback', description: 'Manage feedback forms and responses.', icon: MessageSquare, permissions: ['view', 'create', 'edit', 'delete'] },
  { id: 'certificates', name: 'Certificates', description: 'Create and issue completion certificates.', icon: Award, permissions: ['view', 'create', 'edit', 'delete'] },
  { id: 'settings', name: 'Settings', description: 'Manage system settings and configurations.', icon: Settings, permissions: ['view', 'edit'] },
];

const permissionInfo: Record<Permission, string> = {
  view: 'Allow viewing and browsing this module',
  create: 'Allow creating new items in this module',
  edit: 'Allow editing existing items in this module',
  delete: 'Allow permanently deleting items from this module',
};

const defaultRolePermissions: Record<string, Record<string, Permission[]>> = {
  admin: Object.fromEntries(allModules.map(m => [m.id, [...m.permissions]])),
  trainer: {
    dashboard: ['view'],
    'content-hub': ['view'],
    users: ['view'],
    events: ['view', 'create', 'edit'],
    assessments: ['view', 'create', 'edit'],
    reports: ['view'],
    attendance: ['view', 'create', 'edit'],
    feedback: ['view', 'create'],
    certificates: ['view'],
    category: ['view'],
    settings: ['view'],
  },
  user: {
    dashboard: ['view'],
    'content-hub': ['view'],
    events: ['view'],
    assessments: ['view'],
    certificates: ['view'],
    feedback: ['view', 'create'],
    category: [],
    users: [],
    reports: [],
    attendance: [],
    settings: [],
  },
};

const RolePermissions = () => {
  const [selectedRole, setSelectedRole] = useState('admin');
  const [permissions, setPermissions] = useState<Record<string, Permission[]>>(
    defaultRolePermissions.admin
  );
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setPermissions({ ...(defaultRolePermissions[role] || {}) });
  };

  const togglePermission = (moduleId: string, perm: Permission) => {
    setPermissions(prev => {
      const current = prev[moduleId] || [];
      const has = current.includes(perm);
      return {
        ...prev,
        [moduleId]: has ? current.filter(p => p !== perm) : [...current, perm],
      };
    });
  };

  const toggleModule = (moduleId: string) => {
    setOpenModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const getEnabledCount = (moduleId: string) => {
    return (permissions[moduleId] || []).length;
  };

  const handleSave = () => {
    setShowConfirm(false);
    toast.success(`Permissions updated for ${selectedRole} role`);
  };

  const handleCreateRole = () => {
    if (!newRoleName.trim()) return;
    toast.success(`Role "${newRoleName}" created successfully`);
    setNewRoleName('');
    setShowCreateRole(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-28">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-content-accent/10">
              <Shield className="h-6 w-6 text-content-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Role Permission Management</h1>
              <p className="text-sm text-muted-foreground mt-1">Control what each role can access in the system</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedRole} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-44 bg-card">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="trainer">Trainer</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setShowCreateRole(true)} className="bg-content-accent hover:bg-content-accent/90 text-content-accent-foreground">
              <Plus className="h-4 w-4 mr-1.5" />
              Create New Role
            </Button>
          </div>
        </div>

        {/* Role Badge */}
        <div className="mb-6">
          <Badge variant="secondary" className="text-sm px-3 py-1 capitalize">
            Editing: {selectedRole} Role
          </Badge>
        </div>

        {/* Module Access Control */}
        <Card className="shadow-sm border-border/60">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Module Access Control</CardTitle>
            <CardDescription>Configure permissions for each module in the system</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {allModules.map((mod) => {
                const Icon = mod.icon;
                const isOpen = openModules[mod.id] ?? false;
                const enabledCount = getEnabledCount(mod.id);
                const totalPerms = mod.permissions.length;

                return (
                  <Collapsible key={mod.id} open={isOpen} onOpenChange={() => toggleModule(mod.id)}>
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between px-6 py-4 hover:bg-muted/40 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-muted">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-sm text-foreground">{mod.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{mod.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={enabledCount === totalPerms ? 'default' : enabledCount > 0 ? 'secondary' : 'outline'}
                            className={cn(
                              'text-xs',
                              enabledCount === totalPerms && 'bg-content-accent text-content-accent-foreground border-transparent'
                            )}
                          >
                            {enabledCount}/{totalPerms}
                          </Badge>
                          <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', isOpen && 'rotate-180')} />
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-5 pt-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ml-11">
                          {mod.permissions.map((perm) => {
                            const enabled = (permissions[mod.id] || []).includes(perm);
                            return (
                              <div
                                key={perm}
                                className={cn(
                                  'flex items-center justify-between p-3 rounded-lg border transition-colors',
                                  enabled ? 'bg-content-accent/5 border-content-accent/20' : 'bg-muted/30 border-border'
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium capitalize text-foreground">{perm}</span>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="max-w-[200px] text-xs">
                                      {permissionInfo[perm]}
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                                <Switch
                                  checked={enabled}
                                  onCheckedChange={() => togglePermission(mod.id, perm)}
                                  className="data-[state=checked]:bg-content-accent"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button onClick={() => setShowConfirm(true)} className="bg-content-accent hover:bg-content-accent/90 text-content-accent-foreground">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Confirm Dialog */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Permission Update</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to update permissions for the <span className="font-semibold capitalize">{selectedRole}</span> role? This will affect all users with this role.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave} className="bg-content-accent hover:bg-content-accent/90 text-content-accent-foreground">
              Confirm Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create Role Dialog */}
      <Dialog open={showCreateRole} onOpenChange={setShowCreateRole}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>Enter a name for the new role. You can configure permissions after creation.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="roleName">Role Name</Label>
            <Input
              id="roleName"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              placeholder="e.g. Manager, Supervisor..."
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateRole(false)}>Cancel</Button>
            <Button onClick={handleCreateRole} className="bg-content-accent hover:bg-content-accent/90 text-content-accent-foreground">
              Create Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RolePermissions;
