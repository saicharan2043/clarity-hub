import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CertificateLayout } from './CertificateLayout';
import { CertificateContent } from '@/types/certificate';

interface CertificatePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: CertificateContent;
  courseName: string;
}

export const CertificatePreviewModal = ({
  open,
  onOpenChange,
  content,
  courseName,
}: CertificatePreviewModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] w-full max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Certificate Preview</DialogTitle>
        </DialogHeader>
        <div className="p-4 bg-gray-100 rounded-lg">
          <CertificateLayout
            content={content}
            courseName={courseName}
            isEditing={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
