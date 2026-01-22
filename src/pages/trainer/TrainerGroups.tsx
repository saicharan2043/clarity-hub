import { useState } from 'react';
import { Plus, Users, BookOpen, TrendingUp, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface Group {
  id: string;
  name: string;
  description: string;
  totalUsers: number;
  coursesAssigned: number;
  completion: number;
  status: 'active' | 'inactive';
}

const mockGroups: Group[] = [
  { id: '1', name: 'Safety Team A', description: 'Primary safety training group', totalUsers: 25, coursesAssigned: 5, completion: 78, status: 'active' },
  { id: '2', name: 'New Hires Q1', description: 'Onboarding batch January', totalUsers: 18, coursesAssigned: 8, completion: 45, status: 'active' },
  { id: '3', name: 'Maintenance Crew', description: 'Technical maintenance team', totalUsers: 12, coursesAssigned: 4, completion: 92, status: 'active' },
  { id: '4', name: 'Management Team', description: 'Senior management training', totalUsers: 8, coursesAssigned: 3, completion: 100, status: 'active' },
  { id: '5', name: 'Legacy Group', description: 'Archived training group', totalUsers: 30, coursesAssigned: 6, completion: 67, status: 'inactive' },
];

const TrainerGroups = () => {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: true,
  });

  const handleCreate = () => {
    if (!formData.name) {
      toast.error('Group name is required');
      return;
    }

    const newGroup: Group = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      totalUsers: 0,
      coursesAssigned: 0,
      completion: 0,
      status: formData.status ? 'active' : 'inactive',
    };

    setGroups([...groups, newGroup]);
    setFormData({ name: '', description: '', status: true });
    setIsCreateOpen(false);
    toast.success('Group created successfully');
  };

  const handleDelete = (id: string) => {
    setGroups(groups.filter(g => g.id !== id));
    toast.success('Group deleted');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">My Groups</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage training groups and their assignments
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-content-accent hover:bg-content-accent/90 gap-2">
              <Plus className="h-4 w-4" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
              <DialogDescription>
                Add a new training group to organize your learners
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Group Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter group name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter group description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="status">Active Status</Label>
                <Switch
                  id="status"
                  checked={formData.status}
                  onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} className="bg-content-accent hover:bg-content-accent/90">
                Create Group
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <Card key={group.id} className="border-border hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">{group.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Group
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => handleDelete(group.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Group
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 bg-muted rounded-lg">
                  <Users className="h-4 w-4 mx-auto mb-1 text-content-accent" />
                  <p className="text-lg font-semibold">{group.totalUsers}</p>
                  <p className="text-xs text-muted-foreground">Users</p>
                </div>
                <div className="text-center p-2 bg-muted rounded-lg">
                  <BookOpen className="h-4 w-4 mx-auto mb-1 text-content-accent" />
                  <p className="text-lg font-semibold">{group.coursesAssigned}</p>
                  <p className="text-xs text-muted-foreground">Courses</p>
                </div>
                <div className="text-center p-2 bg-muted rounded-lg">
                  <TrendingUp className="h-4 w-4 mx-auto mb-1 text-content-accent" />
                  <p className="text-lg font-semibold">{group.completion}%</p>
                  <p className="text-xs text-muted-foreground">Complete</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge 
                  variant={group.status === 'active' ? 'default' : 'secondary'}
                  className={group.status === 'active' ? 'bg-content-accent' : ''}
                >
                  {group.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrainerGroups;
