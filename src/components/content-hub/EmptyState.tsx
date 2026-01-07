import { FolderOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  onAdd?: () => void;
  addLabel?: string;
}

export const EmptyState = ({ title, description, onAdd, addLabel = 'Add New' }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-border rounded-xl bg-muted/20">
      <div className="p-4 rounded-full bg-muted mb-4">
        <FolderOpen className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-1">{title}</h3>
      <p className="text-muted-foreground text-center max-w-sm mb-6">{description}</p>
      {onAdd && (
        <Button onClick={onAdd} className="bg-content-accent hover:bg-content-accent/90">
          <Plus className="h-4 w-4 mr-2" />
          {addLabel}
        </Button>
      )}
    </div>
  );
};
