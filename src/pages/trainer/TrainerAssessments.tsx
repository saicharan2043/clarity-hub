import { useState } from 'react';
import { Plus, FileText, Clock, Target, MoreVertical, Edit, Trash2, Eye, CheckCircle } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface Assessment {
  id: string;
  name: string;
  course: string;
  questionType: 'mcq' | 'scenario' | 'mixed';
  passingScore: number;
  maxAttempts: number;
  timeLimit: number;
  totalQuestions: number;
  status: 'active' | 'draft';
}

const mockAssessments: Assessment[] = [
  { id: '1', name: 'Safety Training Final', course: 'Safety Training 101', questionType: 'mcq', passingScore: 80, maxAttempts: 3, timeLimit: 60, totalQuestions: 50, status: 'active' },
  { id: '2', name: 'Equipment Certification', course: 'Equipment Handling', questionType: 'scenario', passingScore: 75, maxAttempts: 3, timeLimit: 45, totalQuestions: 30, status: 'active' },
  { id: '3', name: 'Fire Safety Quiz', course: 'Fire Safety Basics', questionType: 'mcq', passingScore: 85, maxAttempts: 3, timeLimit: 30, totalQuestions: 25, status: 'active' },
  { id: '4', name: 'First Aid Assessment', course: 'First Aid Essentials', questionType: 'mixed', passingScore: 80, maxAttempts: 3, timeLimit: 60, totalQuestions: 40, status: 'draft' },
];

const TrainerAssessments = () => {
  const [assessments, setAssessments] = useState<Assessment[]>(mockAssessments);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    questionType: 'mcq' as 'mcq' | 'scenario' | 'mixed',
    passingScore: 80,
    maxAttempts: 3,
    timeLimit: 60,
  });

  const handleCreate = () => {
    if (!formData.name || !formData.course) {
      toast.error('Assessment name and course are required');
      return;
    }

    const newAssessment: Assessment = {
      id: Date.now().toString(),
      ...formData,
      totalQuestions: 0,
      status: 'draft',
    };

    setAssessments([...assessments, newAssessment]);
    setFormData({ name: '', course: '', questionType: 'mcq', passingScore: 80, maxAttempts: 3, timeLimit: 60 });
    setIsCreateOpen(false);
    toast.success('Assessment created successfully');
  };

  const handleDelete = (id: string) => {
    setAssessments(assessments.filter(a => a.id !== id));
    toast.success('Assessment deleted');
  };

  const getQuestionTypeBadge = (type: string) => {
    switch (type) {
      case 'mcq':
        return <Badge variant="outline">MCQ</Badge>;
      case 'scenario':
        return <Badge variant="outline" className="border-content-accent text-content-accent">Scenario</Badge>;
      case 'mixed':
        return <Badge variant="outline">Mixed</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Assessments</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create and manage assessments for your courses
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-content-accent hover:bg-content-accent/90 gap-2">
              <Plus className="h-4 w-4" />
              Create Assessment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Assessment</DialogTitle>
              <DialogDescription>
                Configure a new assessment for a course
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="assess-name">Assessment Title *</Label>
                <Input
                  id="assess-name"
                  placeholder="Enter assessment title"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Linked Course *</Label>
                <Select value={formData.course} onValueChange={(value) => setFormData({ ...formData, course: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Safety Training 101">Safety Training 101</SelectItem>
                    <SelectItem value="Equipment Handling">Equipment Handling</SelectItem>
                    <SelectItem value="Fire Safety Basics">Fire Safety Basics</SelectItem>
                    <SelectItem value="First Aid Essentials">First Aid Essentials</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Question Type</Label>
                <Select value={formData.questionType} onValueChange={(value: 'mcq' | 'scenario' | 'mixed') => setFormData({ ...formData, questionType: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mcq">Multiple Choice (MCQ)</SelectItem>
                    <SelectItem value="scenario">Scenario Based</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passing">Passing %</Label>
                  <Input
                    id="passing"
                    type="number"
                    value={formData.passingScore}
                    onChange={(e) => setFormData({ ...formData, passingScore: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attempts">Max Attempts</Label>
                  <Input
                    id="attempts"
                    type="number"
                    value={formData.maxAttempts}
                    onChange={(e) => setFormData({ ...formData, maxAttempts: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time (min)</Label>
                  <Input
                    id="time"
                    type="number"
                    value={formData.timeLimit}
                    onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} className="bg-content-accent hover:bg-content-accent/90">
                Create Assessment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className="border-border hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{assessment.name}</h3>
                    <Badge 
                      variant={assessment.status === 'active' ? 'default' : 'secondary'}
                      className={assessment.status === 'active' ? 'bg-content-accent text-xs' : 'text-xs'}
                    >
                      {assessment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{assessment.course}</p>
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
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => handleDelete(assessment.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  {getQuestionTypeBadge(assessment.questionType)}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    Passing Score
                  </span>
                  <span className="font-medium">{assessment.passingScore}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Max Attempts
                  </span>
                  <span className="font-medium">{assessment.maxAttempts}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Time Limit
                  </span>
                  <span className="font-medium">{assessment.timeLimit} min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    Questions
                  </span>
                  <span className="font-medium">{assessment.totalQuestions}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full" size="sm">
                Manage Questions
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrainerAssessments;
