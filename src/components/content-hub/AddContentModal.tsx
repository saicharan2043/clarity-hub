import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Video,
  FileText,
  Type,
  HelpCircle,
  ClipboardCheck,
  Upload,
  Link as LinkIcon,
} from 'lucide-react';
import { ContentType } from '@/types/content-hub';

interface AddContentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hierarchy: {
    offerType?: string;
    category?: string;
    subCategory?: string;
    curriculum?: string;
  };
  onSubmit: (data: {
    title: string;
    description: string;
    contentType: ContentType;
    source: 'upload' | 'external';
    url?: string;
  }) => void;
}

const contentTypes: { value: ContentType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: 'video', label: 'Video', icon: Video },
  { value: 'pdf', label: 'PDF', icon: FileText },
  { value: 'text', label: 'Text', icon: Type },
  { value: 'quiz', label: 'Quiz', icon: HelpCircle },
  { value: 'assessment', label: 'Assessment', icon: ClipboardCheck },
];

export const AddContentModal = ({
  open,
  onOpenChange,
  hierarchy,
  onSubmit,
}: AddContentModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentType, setContentType] = useState<ContentType>('video');
  const [source, setSource] = useState<'upload' | 'external'>('upload');
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    onSubmit({
      title,
      description,
      contentType,
      source,
      url: source === 'external' ? url : undefined,
    });
    // Reset form
    setTitle('');
    setDescription('');
    setContentType('video');
    setSource('upload');
    setUrl('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Content</DialogTitle>
          {hierarchy.curriculum && (
            <p className="text-sm text-muted-foreground mt-1">
              Adding to selected curriculum
            </p>
          )}
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Content Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Content Title *</Label>
            <Input
              id="title"
              placeholder="Enter content title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the content"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Content Type */}
          <div className="space-y-2">
            <Label>Content Type *</Label>
            <div className="grid grid-cols-5 gap-2">
              {contentTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setContentType(type.value)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all ${
                      contentType === type.value
                        ? 'border-content-accent bg-content-accent/10'
                        : 'border-border hover:border-muted-foreground/30'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${contentType === type.value ? 'text-content-accent' : 'text-muted-foreground'}`} />
                    <span className={`text-xs ${contentType === type.value ? 'text-content-accent font-medium' : 'text-muted-foreground'}`}>
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Source */}
          <div className="space-y-2">
            <Label>Source *</Label>
            <RadioGroup
              value={source}
              onValueChange={(value) => setSource(value as 'upload' | 'external')}
              className="flex gap-4"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="upload" />
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Upload File</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="external" />
                <LinkIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">External Link</span>
              </label>
            </RadioGroup>
          </div>

          {/* File Upload or URL */}
          {source === 'upload' ? (
            <div className="space-y-2">
              <Label>Upload File</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drag and drop or click to upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Max file size: 100MB
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="url">External URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/content"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title || !contentType}
            className="bg-content-accent hover:bg-content-accent/90"
          >
            Add Content
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
