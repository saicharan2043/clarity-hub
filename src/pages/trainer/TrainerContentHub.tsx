import { useState } from 'react';
import { Plus, Video, FileText, Box, Layers, Clock, MoreVertical, Edit, Trash2, Upload } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

type ContentType = 'video' | 'pdf' | 'xr' | 'scorm';

interface Content {
  id: string;
  name: string;
  type: ContentType;
  duration: string;
  assignedCourses: string[];
  resumeEnabled: boolean;
  size: string;
}

const mockContent: Content[] = [
  { id: '1', name: 'Safety Introduction Video', type: 'video', duration: '15 min', assignedCourses: ['Safety Training 101'], resumeEnabled: true, size: '250 MB' },
  { id: '2', name: 'Equipment Manual', type: 'pdf', duration: '20 min', assignedCourses: ['Equipment Handling'], resumeEnabled: false, size: '5 MB' },
  { id: '3', name: 'Fire Extinguisher VR Training', type: 'xr', duration: '30 min', assignedCourses: ['Fire Safety Basics'], resumeEnabled: true, size: '1.2 GB' },
  { id: '4', name: 'First Aid SCORM Module', type: 'scorm', duration: '45 min', assignedCourses: ['First Aid Essentials'], resumeEnabled: true, size: '150 MB' },
  { id: '5', name: 'Workplace Hazards Overview', type: 'video', duration: '10 min', assignedCourses: ['Safety Training 101', 'Fire Safety Basics'], resumeEnabled: true, size: '180 MB' },
];

const contentTypeConfig: Record<ContentType, { icon: typeof Video; label: string; color: string }> = {
  video: { icon: Video, label: 'Video', color: 'bg-blue-100 text-blue-700' },
  pdf: { icon: FileText, label: 'PDF', color: 'bg-red-100 text-red-700' },
  xr: { icon: Box, label: 'XR/VR', color: 'bg-purple-100 text-purple-700' },
  scorm: { icon: Layers, label: 'SCORM', color: 'bg-orange-100 text-orange-700' },
};

const TrainerContentHub = () => {
  const [contents, setContents] = useState<Content[]>(mockContent);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'video' as ContentType,
    resumeEnabled: true,
  });

  const handleUpload = () => {
    if (!formData.name) {
      toast.error('Content title is required');
      return;
    }

    const newContent: Content = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      duration: '0 min',
      assignedCourses: [],
      resumeEnabled: formData.resumeEnabled,
      size: '0 MB',
    };

    setContents([...contents, newContent]);
    setFormData({ name: '', type: 'video', resumeEnabled: true });
    setIsUploadOpen(false);
    toast.success('Content uploaded successfully');
  };

  const handleDelete = (id: string) => {
    setContents(contents.filter(c => c.id !== id));
    toast.success('Content deleted');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Content Hub</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Central repository for all training content
          </p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-content-accent hover:bg-content-accent/90 gap-2">
              <Upload className="h-4 w-4" />
              Upload Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Upload New Content</DialogTitle>
              <DialogDescription>
                Add new training content to the repository
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="content-name">Content Title *</Label>
                <Input
                  id="content-name"
                  placeholder="Enter content title"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Content Type</Label>
                <Select value={formData.type} onValueChange={(value: ContentType) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="xr">XR/VR Content</SelectItem>
                    <SelectItem value="scorm">SCORM Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>File Upload</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop or click to upload
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Browse Files
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="resume">Resume Enabled</Label>
                <Switch
                  id="resume"
                  checked={formData.resumeEnabled}
                  onCheckedChange={(checked) => setFormData({ ...formData, resumeEnabled: checked })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsUploadOpen(false)}>Cancel</Button>
              <Button onClick={handleUpload} className="bg-content-accent hover:bg-content-accent/90">
                Upload
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contents.map((content) => {
          const typeConfig = contentTypeConfig[content.type];
          const Icon = typeConfig.icon;

          return (
            <Card key={content.id} className="border-border hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeConfig.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{content.name}</h3>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {typeConfig.label}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDelete(content.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Duration
                    </span>
                    <span className="font-medium">{content.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Size</span>
                    <span className="font-medium">{content.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Resume</span>
                    <Badge variant={content.resumeEnabled ? 'default' : 'secondary'} className={content.resumeEnabled ? 'bg-content-accent' : ''}>
                      {content.resumeEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </div>

                {content.assignedCourses.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-1">Assigned to:</p>
                    <div className="flex flex-wrap gap-1">
                      {content.assignedCourses.map((course) => (
                        <Badge key={course} variant="secondary" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TrainerContentHub;
