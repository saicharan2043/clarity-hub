import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContentHubLayout } from '@/components/content-hub/ContentHubLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Eye, Save } from 'lucide-react';
import { CertificateLayout } from '@/components/certificates/CertificateLayout';
import { CertificatePreviewModal } from '@/components/certificates/CertificatePreviewModal';
import { CertificateContent, CourseOption } from '@/types/certificate';
import { getCertificateById, getGroupedCourseOptions } from '@/data/mock-certificates';
import { toast } from 'sonner';

const CertificateTemplateEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [templateName, setTemplateName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<CourseOption | null>(null);
  const [content, setContent] = useState<CertificateContent | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);

  const { courses, assessments } = getGroupedCourseOptions();

  useEffect(() => {
    if (id) {
      const template = getCertificateById(id);
      if (template) {
        setTemplateName(template.name);
        setContent(template.content);
        setSelectedCourse({
          id: template.linkedItemId,
          name: template.linkedItemName,
          type: template.linkedType,
        });
      } else {
        toast.error('Certificate template not found');
        navigate('/admin/certificate-templates');
      }
    }
    setLoading(false);
  }, [id, navigate]);

  const handleCourseSelect = (value: string) => {
    const allOptions = [...courses, ...assessments];
    const selected = allOptions.find((o) => o.id === value);
    setSelectedCourse(selected || null);
  };

  const handleContentChange = (field: keyof CertificateContent, value: string) => {
    setContent((prev) => prev ? { ...prev, [field]: value } : null);
  };

  const handleUpdate = () => {
    if (!templateName.trim()) {
      toast.error('Please enter a template name');
      return;
    }
    if (!selectedCourse) {
      toast.error('Please select a course or assessment');
      return;
    }

    // In a real app, this would update the backend
    toast.success('Certificate template updated successfully');
    navigate('/admin/certificate-templates');
  };

  if (loading || !content) {
    return (
      <ContentHubLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </ContentHubLayout>
    );
  }

  return (
    <ContentHubLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Edit Certificate Template
            </h1>
            <p className="text-muted-foreground mt-1">
              Modify the certificate template content
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid gap-6 max-w-xl">
          <div className="space-y-2">
            <Label htmlFor="templateName">Template Name *</Label>
            <Input
              id="templateName"
              placeholder="Enter template name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseSelect">Link to Course / Assessment *</Label>
            <Select value={selectedCourse?.id} onValueChange={handleCourseSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select a course or assessment" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectGroup>
                  <SelectLabel>Courses</SelectLabel>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Assessments</SelectLabel>
                  {assessments.map((assessment) => (
                    <SelectItem key={assessment.id} value={assessment.id}>
                      {assessment.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Certificate Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Certificate Layout Editor</h2>
            <p className="text-sm text-muted-foreground">
              Edit text content directly on the certificate
            </p>
          </div>

          <div className="border rounded-lg p-6 bg-gray-50">
            <CertificateLayout
              content={content}
              courseName={selectedCourse?.name || ''}
              isEditing={true}
              onContentChange={handleContentChange}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-4 border-t">
          <Button variant="outline" onClick={() => setShowPreview(true)}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleUpdate}>
            <Save className="h-4 w-4 mr-2" />
            Update Template
          </Button>
        </div>
      </div>

      {/* Preview Modal */}
      <CertificatePreviewModal
        open={showPreview}
        onOpenChange={setShowPreview}
        content={content}
        courseName={selectedCourse?.name || 'Course Name'}
      />
    </ContentHubLayout>
  );
};

export default CertificateTemplateEdit;
