import { ContentType } from '@/types/content-hub';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Video,
  FileText,
  Type,
  HelpCircle,
  ClipboardCheck,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Upload,
  Link as LinkIcon,
  Clock,
  GripVertical,
} from 'lucide-react';

export interface ContentItem {
  id: string;
  order: number;
  title: string;
  contentType: ContentType;
  source: 'upload' | 'external';
  duration?: string;
  status: 'published' | 'draft' | 'archived';
}

interface ContentDataTableProps {
  items: ContentItem[];
  onPreview: (item: ContentItem) => void;
  onEdit: (item: ContentItem) => void;
  onDelete: (item: ContentItem) => void;
}

const contentTypeConfig: Record<ContentType, { icon: React.ComponentType<{ className?: string }>; label: string; color: string }> = {
  video: { icon: Video, label: 'Video', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  pdf: { icon: FileText, label: 'PDF', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  text: { icon: Type, label: 'Text', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  quiz: { icon: HelpCircle, label: 'Quiz', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  assessment: { icon: ClipboardCheck, label: 'Assessment', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
};

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  published: { label: 'Published', variant: 'default' },
  draft: { label: 'Draft', variant: 'secondary' },
  archived: { label: 'Archived', variant: 'outline' },
};

export const ContentDataTable = ({
  items,
  onPreview,
  onEdit,
  onDelete,
}: ContentDataTableProps) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">No Content Found</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Select a module from the filters to view content, or add new content to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-content-accent hover:bg-content-accent">
            <TableHead className="w-12 text-white"></TableHead>
            <TableHead className="w-16 text-white font-medium">Order</TableHead>
            <TableHead className="text-white font-medium">Content Title</TableHead>
            <TableHead className="w-32 text-white font-medium">Content Type</TableHead>
            <TableHead className="w-28 text-white font-medium">Source</TableHead>
            <TableHead className="w-24 text-white font-medium">Duration</TableHead>
            <TableHead className="w-28 text-white font-medium">Status</TableHead>
            <TableHead className="w-20 text-right text-white font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const typeConfig = contentTypeConfig[item.contentType];
            const TypeIcon = typeConfig.icon;
            const status = statusConfig[item.status];

            return (
              <TableRow key={item.id} className="group">
                <TableCell>
                  <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab" />
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-muted rounded-full text-sm font-medium">
                    {item.order}
                  </span>
                </TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${typeConfig.color}`}>
                    <TypeIcon className="h-3.5 w-3.5" />
                    {typeConfig.label}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    {item.source === 'upload' ? (
                      <>
                        <Upload className="h-3.5 w-3.5" />
                        Upload
                      </>
                    ) : (
                      <>
                        <LinkIcon className="h-3.5 w-3.5" />
                        External
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {item.duration ? (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {item.duration}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover">
                      <DropdownMenuItem onClick={() => onPreview(item)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(item)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(item)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
