import { useState } from 'react';
import { Search, Filter, Download, UserX, UserCheck, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  group: string;
  assignedCourse: string;
  progress: number;
  lastActive: string;
  attempts: number;
  status: 'active' | 'inactive' | 'suspended';
}

const mockUsers: User[] = [
  { id: '1', name: 'John Smith', email: 'john.smith@company.com', group: 'Safety Team A', assignedCourse: 'Safety Training 101', progress: 85, lastActive: '2 hours ago', attempts: 2, status: 'active' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@company.com', group: 'New Hires Q1', assignedCourse: 'Onboarding Basics', progress: 45, lastActive: '1 day ago', attempts: 1, status: 'active' },
  { id: '3', name: 'Mike Wilson', email: 'mike.w@company.com', group: 'Maintenance Crew', assignedCourse: 'Equipment Handling', progress: 100, lastActive: '3 hours ago', attempts: 3, status: 'active' },
  { id: '4', name: 'Emily Brown', email: 'emily.b@company.com', group: 'Safety Team A', assignedCourse: 'Fire Safety', progress: 60, lastActive: '5 days ago', attempts: 1, status: 'inactive' },
  { id: '5', name: 'David Lee', email: 'david.l@company.com', group: 'New Hires Q1', assignedCourse: 'Safety Training 101', progress: 0, lastActive: 'Never', attempts: 0, status: 'suspended' },
  { id: '6', name: 'Lisa Chen', email: 'lisa.c@company.com', group: 'Management Team', assignedCourse: 'Leadership Training', progress: 92, lastActive: '1 hour ago', attempts: 2, status: 'active' },
];

const TrainerUsers = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = filterGroup === 'all' || user.group === filterGroup;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesGroup && matchesStatus;
  });

  const handleDeactivate = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'inactive' as const } : u));
    toast.success('User deactivated');
  };

  const handleReactivate = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'active' as const } : u));
    toast.success('User reactivated');
  };

  const handleDownloadReport = (userId: string) => {
    toast.success('Downloading progress report...');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-content-accent">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const uniqueGroups = [...new Set(users.map(u => u.group))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Assigned Users</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and track all assigned learners
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export All
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterGroup} onValueChange={setFilterGroup}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                {uniqueGroups.map(group => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-content-accent text-white">
                  <th className="text-left py-3 px-4 text-sm font-medium rounded-tl-lg">User Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Group</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Assigned Course</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Progress</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Last Active</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Attempts</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{user.name}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{user.group}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{user.assignedCourse}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-content-accent rounded-full" 
                            style={{ width: `${user.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{user.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{user.lastActive}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{user.attempts}</td>
                    <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {user.status === 'active' ? (
                            <DropdownMenuItem onClick={() => handleDeactivate(user.id)}>
                              <UserX className="mr-2 h-4 w-4" />
                              Deactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleReactivate(user.id)}>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Reactivate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleDownloadReport(user.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainerUsers;
