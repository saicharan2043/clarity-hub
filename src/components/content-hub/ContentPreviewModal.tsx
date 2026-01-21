import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ContentItem } from './ContentDataTable';
import {
  Video,
  FileText,
  Type,
  HelpCircle,
  ClipboardCheck,
  Play,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentType } from '@/types/content-hub';

interface ContentPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: ContentItem | null;
}

const contentTypeConfig: Record<ContentType, { icon: React.ComponentType<{ className?: string }>; label: string; color: string }> = {
  video: { icon: Video, label: 'Video', color: 'bg-blue-100 text-blue-700' },
  pdf: { icon: FileText, label: 'PDF', color: 'bg-red-100 text-red-700' },
  text: { icon: Type, label: 'Text', color: 'bg-green-100 text-green-700' },
  quiz: { icon: HelpCircle, label: 'Quiz', color: 'bg-purple-100 text-purple-700' },
  assessment: { icon: ClipboardCheck, label: 'Assessment', color: 'bg-amber-100 text-amber-700' },
};

export const ContentPreviewModal = ({
  open,
  onOpenChange,
  content,
}: ContentPreviewModalProps) => {
  if (!content) return null;

  const typeConfig = contentTypeConfig[content.contentType];
  const TypeIcon = typeConfig.icon;

  const renderPreviewContent = () => {
    switch (content.contentType) {
      case 'video':
        return (
          <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Play className="h-10 w-10 text-primary ml-1" />
            </div>
            <p className="text-sm text-muted-foreground">Video Preview</p>
            <p className="text-xs text-muted-foreground mt-1">Duration: {content.duration || 'N/A'}</p>
          </div>
        );
      case 'pdf':
        return (
          <div className="aspect-[3/4] bg-muted rounded-lg flex flex-col items-center justify-center max-h-[400px]">
            <FileText className="h-16 w-16 text-destructive mb-4" />
            <p className="text-sm text-muted-foreground">PDF Document</p>
            <Button variant="outline" className="mt-4 gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        );
      case 'text':
        return (
          <div className="bg-muted rounded-lg p-6 min-h-[200px]">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>
        );
      case 'quiz':
        return (
          <div className="bg-muted rounded-lg p-6">
            <div className="space-y-4">
              <div className="bg-background rounded-lg p-4">
                <p className="font-medium mb-3">Sample Question 1</p>
                <div className="space-y-2">
                  {['Option A', 'Option B', 'Option C', 'Option D'].map((opt, i) => (
                    <label key={i} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                      <span className="w-5 h-5 border border-border rounded-full flex items-center justify-center text-xs">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">This is a preview. Start the quiz to answer questions.</p>
            </div>
          </div>
        );
      case 'assessment':
        return (
          <div className="bg-muted rounded-lg p-6 text-center">
            <ClipboardCheck className="h-16 w-16 text-warning mx-auto mb-4" />
            <h4 className="font-medium mb-2">Assessment Preview</h4>
            <p className="text-sm text-muted-foreground mb-4">
              This assessment contains multiple sections to evaluate your knowledge.
            </p>
            <Button variant="outline" className="gap-2">
              <Play className="h-4 w-4" />
              Start Assessment
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${typeConfig.color}`}>
              <TypeIcon className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg">{content.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {typeConfig.label}
                </Badge>
                {content.duration && (
                  <span className="text-xs text-muted-foreground">{content.duration}</span>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4">
          {renderPreviewContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
