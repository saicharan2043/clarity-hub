import { useParams } from 'react-router-dom';
import { ContentHubLayout } from '@/components/content-hub/ContentHubLayout';
import { ContentBreadcrumb } from '@/components/content-hub/ContentBreadcrumb';
import { ContentTable } from '@/components/content-hub/ContentTable';
import { LevelHeader } from '@/components/content-hub/LevelHeader';
import { EmptyState } from '@/components/content-hub/EmptyState';
import { 
  getModuleById,
  getSubCategoryById,
  getCategoryById,
  getOfferTypeById,
  getLessonsByModule 
} from '@/data/mock-content-hub';
import { toast } from 'sonner';

const ContentHubLessons = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  
  const module = getModuleById(moduleId || '');
  const subCategory = module ? getSubCategoryById(module.subCategoryId) : null;
  const category = subCategory ? getCategoryById(subCategory.categoryId) : null;
  const offerType = category ? getOfferTypeById(category.offerTypeId) : null;
  const lessons = getLessonsByModule(moduleId || '');

  const handleAddLesson = () => {
    toast.info('Add Lesson modal would open here');
  };

  const handleEditLesson = (id: string) => {
    toast.info(`Edit lesson: ${id}`);
  };

  const handleDeleteLesson = (id: string) => {
    toast.info(`Delete lesson: ${id}`);
  };

  if (!module || !subCategory || !category || !offerType) {
    return (
      <ContentHubLayout>
        <EmptyState
          title="Module Not Found"
          description="The module you're looking for doesn't exist."
        />
      </ContentHubLayout>
    );
  }

  const breadcrumbs = [
    { label: offerType.name, path: `/content-hub/${offerType.id}/categories` },
    { label: category.name, path: `/content-hub/categories/${category.id}/sub-categories` },
    { label: subCategory.name, path: `/content-hub/sub-categories/${subCategory.id}/modules` },
    { label: module.name, path: `/content-hub/modules/${moduleId}/lessons` },
  ];

  const tableItems = lessons.map((l) => ({
    id: l.id,
    title: l.title,
    contentType: l.contentType,
    duration: l.duration,
    order: l.order,
  }));

  return (
    <ContentHubLayout>
      <ContentBreadcrumb items={breadcrumbs} />
      
      <LevelHeader
        title={`${module.name} Lessons`}
        subtitle={module.description}
        count={lessons.length}
        countLabel="Lessons"
        onAdd={handleAddLesson}
        addLabel="Add Lesson"
        showBack
      />

      {lessons.length === 0 ? (
        <EmptyState
          title="No Lessons Yet"
          description={`Start by adding your first lesson to ${module.name}.`}
          onAdd={handleAddLesson}
          addLabel="Add Lesson"
        />
      ) : (
        <ContentTable
          items={tableItems}
          type="lesson"
          onEdit={handleEditLesson}
          onDelete={handleDeleteLesson}
        />
      )}

      {/* Content Type Legend */}
      <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Supported Content Types</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Video (Upload or Link)
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            PDF
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-gray-500"></span>
            Text
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Quiz
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            Assessment
          </div>
        </div>
      </div>
    </ContentHubLayout>
  );
};

export default ContentHubLessons;
