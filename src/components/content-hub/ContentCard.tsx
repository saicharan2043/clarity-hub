import { ChevronRight, GraduationCap, Award, BadgeCheck, FileText, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  title: string;
  description: string;
  count: number;
  countLabel: string;
  icon?: string;
  color?: string;
  to: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Award,
  BadgeCheck,
  FileText,
  BookOpen,
};

export const ContentCard = ({
  title,
  description,
  count,
  countLabel,
  icon = 'BookOpen',
  color = 'bg-content-accent',
  to,
}: ContentCardProps) => {
  const IconComponent = iconMap[icon] || BookOpen;

  return (
    <Link
      to={to}
      className="group block bg-card border border-border rounded-xl p-5 hover:shadow-content-hover hover:border-content-accent/50 transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <div className={cn('p-3 rounded-lg', color)}>
          <IconComponent className="h-5 w-5 text-white" />
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-content-accent group-hover:translate-x-1 transition-all" />
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-lg text-foreground group-hover:text-content-accent transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{count}</span> {countLabel}
        </span>
      </div>
    </Link>
  );
};
