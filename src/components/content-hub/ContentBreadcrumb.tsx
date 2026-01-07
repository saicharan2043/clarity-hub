import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BreadcrumbItem } from '@/types/content-hub';

interface ContentBreadcrumbProps {
  items: BreadcrumbItem[];
}

export const ContentBreadcrumb = ({ items }: ContentBreadcrumbProps) => {
  return (
    <nav className="flex items-center space-x-1 text-sm mb-6">
      <Link
        to="/content-hub"
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span>Content Hub</span>
      </Link>
      {items.map((item, index) => (
        <div key={item.path} className="flex items-center">
          <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
          {index === items.length - 1 ? (
            <span className="font-medium text-foreground">{item.label}</span>
          ) : (
            <Link
              to={item.path}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};
