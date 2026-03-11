import { useState } from 'react';
import {
  Plus, Search, Filter, SortAsc, FileText, Clock, Percent, Eye, Pencil, Trash2,
  BarChart3, CheckCircle2, FileEdit, ListChecks
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Tooltip, TooltipContent, TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Assessment {
  id: string;
  title: string;
  description: string;
  type: string;
  subCategory: string;
  questions: number;
  duration: number;
  passPercent: number;
  status: 'active' | 'draft' | 'archived';
}

const mockAssessments: Assessment[] = [
  { id: '1', title: 'React Fundamentals Quiz', description: 'Test knowledge of React basics including hooks, state, and props.', type: 'Quiz', subCategory: 'Frontend', questions: 25, duration: 30, passPercent: 70, status: 'active' },
  { id: '2', title: 'Safety Compliance Test', description: 'Annual safety compliance assessment for all employees.', type: 'Test', subCategory: 'Compliance', questions: 40, duration: 60, passPercent: 80, status: 'active' },
  { id: '3', title: 'Leadership Assessment', description: 'Evaluate leadership skills and decision-making capabilities.', type: 'Assessment', subCategory: 'Soft Skills', questions: 30, duration: 45, passPercent: 65, status: 'draft' },
  { id: '4', title: 'Python Basics', description: 'Introduction to Python programming language fundamentals.', type: 'Quiz', subCategory: 'Backend', questions: 20, duration: 25, passPercent: 60, status: 'active' },
  { id: '5', title: 'Project Management', description: 'Assess project management knowledge and methodologies.', type: 'Test', subCategory: 'Management', questions: 35, duration: 50, passPercent: 75, status: 'draft' },
  { id: '6', title: 'Data Analytics Fundamentals', description: 'Core data analytics concepts and tools proficiency.', type: 'Assessment', subCategory: 'Data', questions: 28, duration: 40, passPercent: 70, status: 'active' },
];

const statusConfig = {
  active: { label: 'Active', className: 'bg-content-accent/10 text-content-accent border-content-accent/20' },
  draft: { label: 'Draft', className: 'bg-muted text-muted-foreground border-border' },
  archived: { label: 'Archived', className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

const Assessments = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = mockAssessments
    .filter(a => {
      if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeFilter !== 'all' && a.type !== typeFilter) return false;
      if (statusFilter !== 'all' && a.status !== statusFilter) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'questions') return b.questions - a.questions;
      if (sortBy === 'duration') return b.duration - a.duration;
      return 0;
    });

  const stats = [
    { label: 'Total Assessments', value: mockAssessments.length, icon: ListChecks, color: 'text-foreground' },
    { label: 'Active', value: mockAssessments.filter(a => a.status === 'active').length, icon: CheckCircle2, color: 'text-content-accent' },
    { label: 'Draft', value: mockAssessments.filter(a => a.status === 'draft').length, icon: FileEdit, color: 'text-muted-foreground' },
    { label: 'Avg Pass %', value: `${Math.round(mockAssessments.reduce((s, a) => s + a.passPercent, 0) / mockAssessments.length)}%`, icon: BarChart3, color: 'text-user-accent' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Assessments</h1>
          <p className="text-muted-foreground mt-1">Create, manage and schedule assessments</p>
        </div>
        <Button className="bg-content-accent hover:bg-content-accent/90 text-content-accent-foreground gap-2">
          <Plus className="h-4 w-4" />
          Create
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assessments..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Quiz">Quiz</SelectItem>
                <SelectItem value="Test">Test</SelectItem>
                <SelectItem value="Assessment">Assessment</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SortAsc className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="questions">Questions</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((a) => {
          const sc = statusConfig[a.status];
          return (
            <Card
              key={a.id}
              className="shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 relative group"
            >
              <CardContent className="p-5">
                {/* Status chip */}
                <Badge variant="outline" className={`absolute top-4 right-4 text-[10px] ${sc.className}`}>
                  {sc.label}
                </Badge>

                <h3 className="font-semibold text-foreground pr-20 line-clamp-1">{a.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">{a.description}</p>

                {/* Stats row */}
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    {a.questions} Qs
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {a.duration} min
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Percent className="h-3.5 w-3.5" />
                    {a.passPercent}%
                  </span>
                </div>

                {/* Labels */}
                <div className="flex gap-2 mt-3">
                  <Badge variant="secondary" className="text-[10px] font-normal">{a.type}</Badge>
                  <Badge variant="secondary" className="text-[10px] font-normal">{a.subCategory}</Badge>
                </div>

                {/* Actions */}
                <div className="flex gap-1 mt-4 pt-3 border-t border-border">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteId(a.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete</TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <Card className="shadow-sm">
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground/40" />
            <h3 className="mt-4 text-lg font-medium text-foreground">No assessments found</h3>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or create a new assessment.</p>
          </CardContent>
        </Card>
      )}

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Assessment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this assessment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => setDeleteId(null)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Assessments;
