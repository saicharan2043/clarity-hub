import { useState } from 'react';
import { Plus, BookOpen, Clock, FileText, Award, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
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

interface Course {
  id: string;
  name: string;
  description: string;
  modules: number;
  duration: string;
  assessmentRequired: boolean;
  certificateAvailable: boolean;
  status: 'published' | 'draft';
  enrolledUsers: number;
}

const mockCourses: Course[] = [
  { id: '1', name: 'Safety Training 101', description: 'Comprehensive workplace safety training', modules: 8, duration: '4 hours', assessmentRequired: true, certificateAvailable: true, status: 'published', enrolledUsers: 125 },
  { id: '2', name: 'Equipment Handling', description: 'Proper handling of industrial equipment', modules: 5, duration: '2.5 hours', assessmentRequired: true, certificateAvailable: true, status: 'published', enrolledUsers: 78 },
  { id: '3', name: 'Fire Safety Basics', description: 'Fire prevention and emergency response', modules: 4, duration: '1.5 hours', assessmentRequired: true, certificateAvailable: true, status: 'published', enrolledUsers: 200 },
  { id: '4', name: 'First Aid Essentials', description: 'Basic first aid and CPR training', modules: 6, duration: '3 hours', assessmentRequired: true, certificateAvailable: true, status: 'draft', enrolledUsers: 0 },
  { id: '5', name: 'Leadership Training', description: 'Management and leadership skills', modules: 10, duration: '6 hours', assessmentRequired: false, certificateAvailable: true, status: 'published', enrolledUsers: 45 },
];

const TrainerCourses = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    assessmentRequired: true,
    certificateAvailable: true,
    completionGap: 15,
  });

  const handleCreate = () => {
    if (!formData.name) {
      toast.error('Course title is required');
      return;
    }

    const newCourse: Course = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      modules: 0,
      duration: '0 hours',
      assessmentRequired: formData.assessmentRequired,
      certificateAvailable: formData.certificateAvailable,
      status: 'draft',
      enrolledUsers: 0,
    };

    setCourses([...courses, newCourse]);
    setFormData({ name: '', description: '', assessmentRequired: true, certificateAvailable: true, completionGap: 15 });
    setIsCreateOpen(false);
    toast.success('Course created successfully');
  };

  const handleDelete = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
    toast.success('Course deleted');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Course Library</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your training courses and modules
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-content-accent hover:bg-content-accent/90 gap-2">
              <Plus className="h-4 w-4" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>
                Add a new training course to your library
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Course Title *</Label>
                <Input
                  id="name"
                  placeholder="Enter course title"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter course description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gap">Completion Gap (days)</Label>
                <Input
                  id="gap"
                  type="number"
                  placeholder="15"
                  value={formData.completionGap}
                  onChange={(e) => setFormData({ ...formData, completionGap: parseInt(e.target.value) })}
                />
                <p className="text-xs text-muted-foreground">Days required after training completion for certificate</p>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="assessment">Assessment Required</Label>
                <Switch
                  id="assessment"
                  checked={formData.assessmentRequired}
                  onCheckedChange={(checked) => setFormData({ ...formData, assessmentRequired: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="certificate">Certificate Available</Label>
                <Switch
                  id="certificate"
                  checked={formData.certificateAvailable}
                  onCheckedChange={(checked) => setFormData({ ...formData, certificateAvailable: checked })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} className="bg-content-accent hover:bg-content-accent/90">
                Create Course
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="border-border hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{course.name}</h3>
                    <Badge 
                      variant={course.status === 'published' ? 'default' : 'secondary'}
                      className={course.status === 'published' ? 'bg-content-accent text-xs' : 'text-xs'}
                    >
                      {course.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
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
                      Edit Course
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => handleDelete(course.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Course
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 text-content-accent" />
                  <span>{course.modules} Modules</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-content-accent" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4 text-content-accent" />
                  <span>{course.assessmentRequired ? 'Assessment' : 'No Assessment'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="h-4 w-4 text-content-accent" />
                  <span>{course.certificateAvailable ? 'Certificate' : 'No Certificate'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-sm text-muted-foreground">
                  {course.enrolledUsers} enrolled
                </span>
                <Button variant="outline" size="sm">
                  Manage Modules
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrainerCourses;
