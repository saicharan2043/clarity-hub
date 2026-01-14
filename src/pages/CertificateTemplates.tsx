import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentHubLayout } from '@/components/content-hub/ContentHubLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import { mockCertificateTemplates, getCertificateById } from '@/data/mock-certificates';
import { CertificatePreviewModal } from '@/components/certificates/CertificatePreviewModal';
import { CertificateTemplate } from '@/types/certificate';
import { toast } from 'sonner';

const CertificateTemplates = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<CertificateTemplate[]>(mockCertificateTemplates);
  const [previewTemplate, setPreviewTemplate] = useState<CertificateTemplate | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handlePreview = (id: string) => {
    const template = getCertificateById(id);
    if (template) {
      setPreviewTemplate(template);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/certificate-templates/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    setDeleteId(null);
    toast.success('Certificate template deleted successfully');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <ContentHubLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Certificate Templates
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage certificate templates for courses and assessments
            </p>
          </div>
          <Button onClick={() => navigate('/admin/certificate-templates/create')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Certificate Template
          </Button>
        </div>

        {/* Table */}
        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Linked To</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>{template.linkedItemName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {template.linkedType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={template.status === 'active' ? 'default' : 'secondary'}
                      className={
                        template.status === 'active'
                          ? 'bg-green-100 text-green-800 hover:bg-green-100'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-100'
                      }
                    >
                      {template.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(template.createdAt)}</TableCell>
                  <TableCell>{formatDate(template.updatedAt)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePreview(template.id)}
                        title="Preview"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(template.id)}
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(template.id)}
                        title="Delete"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {templates.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No certificate templates found. Create your first template.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <CertificatePreviewModal
          open={!!previewTemplate}
          onOpenChange={(open) => !open && setPreviewTemplate(null)}
          content={previewTemplate.content}
          courseName={previewTemplate.linkedItemName}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Certificate Template?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              certificate template.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ContentHubLayout>
  );
};

export default CertificateTemplates;
