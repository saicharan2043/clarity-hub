import { Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface LevelHeaderProps {
  title: string;
  subtitle?: string;
  count?: number;
  countLabel?: string;
  onAdd?: () => void;
  addLabel?: string;
  showBack?: boolean;
}

export const LevelHeader = ({
  title,
  subtitle,
  count,
  countLabel,
  onAdd,
  addLabel = 'Add New',
  showBack = false,
}: LevelHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-0.5">{subtitle}</p>}
          {count !== undefined && countLabel && (
            <p className="text-sm text-muted-foreground mt-1">
              {count} {countLabel}
            </p>
          )}
        </div>
      </div>
      {onAdd && (
        <Button onClick={onAdd} className="bg-content-accent hover:bg-content-accent/90">
          <Plus className="h-4 w-4 mr-2" />
          {addLabel}
        </Button>
      )}
    </div>
  );
};
