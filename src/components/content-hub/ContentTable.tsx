import { Video, FileText, Type, HelpCircle, ClipboardCheck, MoreVertical, GripVertical, Pencil, Trash2, Award, Download, Eye } from 'lucide-react';
import { ContentType } from '@/types/content-hub';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface TableItem {
  id: string;
  title: string;
  contentType?: ContentType;
  duration?: string;
  order: number;
  description?: string;
  lessonCount?: number;
  certificateTemplate?: {
    id: string;
    name: string;
  } | null;
}

interface ContentTableProps {
  items: TableItem[];
  type: 'module' | 'lesson';
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onReorder?: (id: string, direction: 'up' | 'down') => void;
  onPreviewCertificate?: (templateId: string) => void;
  onDownloadCertificate?: (templateId: string) => void;
}

const contentTypeConfig: Record<ContentType, { icon: React.ComponentType<{ className?: string }>; label: string; color: string }> = {
  video: { icon: Video, label: 'Video', color: 'text-blue-500 bg-blue-50' },
  pdf: { icon: FileText, label: 'PDF', color: 'text-red-500 bg-red-50' },
  text: { icon: Type, label: 'Text', color: 'text-gray-500 bg-gray-50' },
  quiz: { icon: HelpCircle, label: 'Quiz', color: 'text-amber-500 bg-amber-50' },
  assessment: { icon: ClipboardCheck, label: 'Assessment', color: 'text-purple-500 bg-purple-50' },
};

export const ContentTable = ({ items, type, onEdit, onDelete, onPreviewCertificate, onDownloadCertificate }: ContentTableProps) => {
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-12">#</TableHead>
            <TableHead>Title</TableHead>
            {type === 'lesson' && <TableHead className="w-32">Type</TableHead>}
            {type === 'lesson' && <TableHead className="w-24">Duration</TableHead>}
            {type === 'lesson' && <TableHead className="w-48">Certificate</TableHead>}
            {type === 'module' && <TableHead className="w-24">Lessons</TableHead>}
            <TableHead className="w-16"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const typeConfig = item.contentType ? contentTypeConfig[item.contentType] : null;
            const TypeIcon = typeConfig?.icon;

            return (
              <TableRow key={item.id} className="group hover:bg-muted/30">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 cursor-grab" />
                    <span className="text-muted-foreground">{item.order}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    {item.description && (
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                </TableCell>
                {type === 'lesson' && typeConfig && TypeIcon && (
                  <TableCell>
                    <div className={cn('inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium', typeConfig.color)}>
                      <TypeIcon className="h-3.5 w-3.5" />
                      {typeConfig.label}
                    </div>
                  </TableCell>
                )}
                {type === 'lesson' && <TableCell className="text-muted-foreground">{item.duration || '-'}</TableCell>}
                {type === 'lesson' && (
                  <TableCell>
                    {item.certificateTemplate ? (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                          <Award className="h-3.5 w-3.5" />
                          <span className="max-w-24 truncate">{item.certificateTemplate.name}</span>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => onPreviewCertificate?.(item.certificateTemplate!.id)}
                            title="Preview Certificate"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => onDownloadCertificate?.(item.certificateTemplate!.id)}
                            title="Download Certificate"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">No certificate</span>
                    )}
                  </TableCell>
                )}
                {type === 'module' && (
                  <TableCell>
                    <span className="text-muted-foreground">{item.lessonCount} lessons</span>
                  </TableCell>
                )}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit?.(item.id)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      {item.certificateTemplate && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onPreviewCertificate?.(item.certificateTemplate!.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Preview Certificate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDownloadCertificate?.(item.certificateTemplate!.id)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download Certificate
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onDelete?.(item.id)} className="text-destructive">
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
