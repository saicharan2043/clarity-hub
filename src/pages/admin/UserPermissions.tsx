import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
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
  Shield,
  User,
  Lock,
  Unlock,
  Eye,
  Check,
  X,
  ShieldAlert,
  ShieldCheck,
  ShieldPlus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type Permission = 'view' | 'create' | 'edit' | 'delete';

interface ModulePermissions {
  module: string;
  inherited: Permission[];
  available: Permission[];
}

const mockUser = {
  name: 'Sai Kumar',
  email: 'sai.kumar@example.com',
  role: 'Trainer',
  avatar: '',
  userId: 'USR-00421',
};

const modulePermissions: ModulePermissions[] = [
  { module: 'Dashboard', inherited: ['view'], available: ['view'] },
  { module: 'Category Management', inherited: ['view', 'create'], available: ['view', 'create', 'edit', 'delete'] },
  { module: 'Content Hub', inherited: ['view'], available: ['view', 'create', 'edit', 'delete'] },
  { module: 'User Management', inherited: ['view'], available: ['view', 'create', 'edit', 'delete'] },
  { module: 'Events & Calendar', inherited: ['view', 'create', 'edit'], available: ['view', 'create', 'edit', 'delete'] },
  { module: 'Assessments', inherited: ['view', 'create', 'edit'], available: ['view', 'create', 'edit', 'delete'] },
  { module: 'Reports', inherited: ['view'], available: ['view', 'create', 'edit', 'delete'] },
  { module: 'Attendance', inherited: ['view', 'create', 'edit'], available: ['view', 'create', 'edit'] },
  { module: 'Feedback', inherited: ['view', 'create'], available: ['view', 'create', 'edit', 'delete'] },
  { module: 'Certificates', inherited: ['view'], available: ['view', 'create', 'edit', 'delete'] },
];

const UserPermissions = () => {
  const [grantedExtras, setGrantedExtras] = useState<Record<string, Permission[]>>({});
  const [restricted, setRestricted] = useState<Record<string, Permission[]>>({});
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleGrant = (module: string, perm: Permission) => {
    setGrantedExtras(prev => {
      const current = prev[module] || [];
      const has = current.includes(perm);
      return { ...prev, [module]: has ? current.filter(p => p !== perm) : [...current, perm] };
    });
  };

  const toggleRestrict = (module: string, perm: Permission) => {
    setRestricted(prev => {
      const current = prev[module] || [];
      const has = current.includes(perm);
      return { ...prev, [module]: has ? current.filter(p => p !== perm) : [...current, perm] };
    });
  };

  const getEffective = (mod: ModulePermissions): Permission[] => {
    const base = mod.inherited.filter(p => !(restricted[mod.module] || []).includes(p));
    const extras = (grantedExtras[mod.module] || []).filter(p => !base.includes(p));
    return [...base, ...extras];
  };

  const handleSave = () => {
    setShowConfirm(false);
    toast.success(`Permissions updated for ${mockUser.name}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-28 space-y-6">
        {/* Header */}
        <div className="flex items-start gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-content-accent/10">
            <Shield className="h-6 w-6 text-content-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">User Permission Override</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage individual access beyond role-based permissions</p>
          </div>
        </div>

        {/* User Info Card */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={mockUser.avatar} />
                <AvatarFallback className="bg-content-accent text-content-accent-foreground text-lg font-semibold">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-semibold text-foreground">{mockUser.name}</h2>
                  <Badge variant="secondary" className="text-xs">Role-Based Access</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs capitalize">{mockUser.role}</Badge>
                  <span className="text-xs text-muted-foreground">• {mockUser.userId}</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-1.5" />
                Change Role
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Section 1: Inherited Permissions */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-content-accent" />
              <CardTitle className="text-base font-semibold">Permissions from Assigned Role</CardTitle>
            </div>
            <CardDescription>These permissions are automatically inherited from the Trainer role.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {modulePermissions.map(mod => (
                <div key={mod.module} className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{mod.module}</span>
                    <Badge variant="secondary" className="text-[10px] px-1.5">Inherited</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {mod.available.map(perm => {
                      const has = mod.inherited.includes(perm);
                      return (
                        <span
                          key={perm}
                          className={cn(
                            'inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full',
                            has
                              ? 'bg-content-accent/10 text-content-accent'
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          {has ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          <span className="capitalize">{perm}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Grant Additional Permissions */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ShieldPlus className="h-5 w-5 text-content-accent" />
              <CardTitle className="text-base font-semibold">Grant Additional Access</CardTitle>
            </div>
            <CardDescription>Provide extra permissions beyond the assigned role.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {modulePermissions.map(mod => {
                const extraPerms = mod.available.filter(p => !mod.inherited.includes(p));
                if (extraPerms.length === 0) return null;

                return (
                  <div key={mod.module} className="p-4 rounded-lg border border-border">
                    <p className="text-sm font-medium text-foreground mb-3">{mod.module}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {extraPerms.map(perm => {
                        const granted = (grantedExtras[mod.module] || []).includes(perm);
                        return (
                          <div
                            key={perm}
                            className={cn(
                              'flex items-center justify-between p-2.5 rounded-lg border transition-colors',
                              granted ? 'bg-content-accent/5 border-content-accent/20' : 'bg-muted/30 border-border'
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm capitalize text-foreground">{perm}</span>
                              {granted && (
                                <Badge className="text-[10px] px-1.5 bg-content-accent text-content-accent-foreground border-transparent">
                                  Extra Access
                                </Badge>
                              )}
                            </div>
                            <Switch
                              checked={granted}
                              onCheckedChange={() => toggleGrant(mod.module, perm)}
                              className="data-[state=checked]:bg-content-accent"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Restrict Permissions */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-destructive" />
              <CardTitle className="text-base font-semibold">Restrict Role-Based Access</CardTitle>
            </div>
            <CardDescription>Disable specific permissions inherited from the role.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {modulePermissions.map(mod => {
                if (mod.inherited.length === 0) return null;

                return (
                  <div key={mod.module} className="p-4 rounded-lg border border-border">
                    <p className="text-sm font-medium text-foreground mb-3">{mod.module}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {mod.inherited.map(perm => {
                        const isRestricted = (restricted[mod.module] || []).includes(perm);
                        return (
                          <div
                            key={perm}
                            className={cn(
                              'flex items-center justify-between p-2.5 rounded-lg border transition-colors',
                              isRestricted ? 'bg-destructive/5 border-destructive/20' : 'bg-muted/30 border-border'
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm capitalize text-foreground">{perm}</span>
                              {isRestricted && (
                                <Badge variant="destructive" className="text-[10px] px-1.5">
                                  Restricted
                                </Badge>
                              )}
                            </div>
                            <Switch
                              checked={isRestricted}
                              onCheckedChange={() => toggleRestrict(mod.module, perm)}
                              className="data-[state=checked]:bg-destructive"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Effective Summary */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-content-accent" />
              <CardTitle className="text-base font-semibold">Effective Permissions Summary</CardTitle>
            </div>
            <CardDescription>Final computed permissions for this user after all overrides.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {modulePermissions.map(mod => {
                const effective = getEffective(mod);
                if (effective.length === 0) return null;

                return (
                  <div key={mod.module} className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border">
                    <span className="text-sm font-medium text-foreground">{mod.module}</span>
                    <div className="flex flex-wrap gap-1">
                      {effective.map(perm => (
                        <Badge
                          key={perm}
                          variant="secondary"
                          className={cn(
                            'text-[10px] capitalize',
                            (grantedExtras[mod.module] || []).includes(perm) && 'bg-content-accent/10 text-content-accent border-content-accent/20'
                          )}
                        >
                          {perm}
                        </Badge>
                      ))}
                    </div>
                  </div>
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
              Are you sure you want to update access permissions for <span className="font-semibold">{mockUser.name}</span>?
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
    </div>
  );
};

export default UserPermissions;
