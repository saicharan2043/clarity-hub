import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <div className="w-16 h-16 bg-content-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
          <BookOpen className="h-8 w-8 text-white" />
        </div>
        <h1 className="mb-4 text-3xl font-bold text-foreground">LMS Admin Panel</h1>
        <p className="text-muted-foreground mb-8">
          Manage your learning content with a clean, hierarchical navigation system.
        </p>
        <Link to="/content-hub">
          <Button className="bg-content-accent hover:bg-content-accent/90">
            Open Content Hub
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
