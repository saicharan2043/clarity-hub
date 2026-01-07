import { useParams, useNavigate } from 'react-router-dom';
import { ContentHubLayout } from '@/components/content-hub/ContentHubLayout';
import { ContentBreadcrumb } from '@/components/content-hub/ContentBreadcrumb';
import { ContentTable } from '@/components/content-hub/ContentTable';
import { LevelHeader } from '@/components/content-hub/LevelHeader';
import { EmptyState } from '@/components/content-hub/EmptyState';
import { 
  getSubCategoryById,
  getCategoryById,
  getOfferTypeById,
  getModulesBySubCategory 
} from '@/data/mock-content-hub';
import { toast } from 'sonner';

const ContentHubModules = () => {
  const { subCategoryId } = useParams<{ subCategoryId: string }>();
  const navigate = useNavigate();
  
  const subCategory = getSubCategoryById(subCategoryId || '');
  const category = subCategory ? getCategoryById(subCategory.categoryId) : null;
  const offerType = category ? getOfferTypeById(category.offerTypeId) : null;
  const modules = getModulesBySubCategory(subCategoryId || '');

  const handleAddModule = () => {
    toast.info('Add Module modal would open here');
  };

  const handleEditModule = (id: string) => {
    toast.info(`Edit module: ${id}`);
  };

  const handleDeleteModule = (id: string) => {
    toast.info(`Delete module: ${id}`);
  };

  if (!subCategory || !category || !offerType) {
    return (
      <ContentHubLayout>
        <EmptyState
          title="Sub Category Not Found"
          description="The sub category you're looking for doesn't exist."
        />
      </ContentHubLayout>
    );
  }

  const breadcrumbs = [
    { label: offerType.name, path: `/content-hub/${offerType.id}/categories` },
    { label: category.name, path: `/content-hub/categories/${category.id}/sub-categories` },
    { label: subCategory.name, path: `/content-hub/sub-categories/${subCategoryId}/modules` },
  ];

  const tableItems = modules.map((m) => ({
    id: m.id,
    title: m.name,
    description: m.description,
    order: m.order,
    lessonCount: m.lessonCount,
  }));

  return (
    <ContentHubLayout>
      <ContentBreadcrumb items={breadcrumbs} />
      
      <LevelHeader
        title={`${subCategory.name} Modules`}
        subtitle={subCategory.description}
        count={modules.length}
        countLabel="Modules"
        onAdd={handleAddModule}
        addLabel="Add Module"
        showBack
      />

      {modules.length === 0 ? (
        <EmptyState
          title="No Modules Yet"
          description={`Start by adding your first module to ${subCategory.name}.`}
          onAdd={handleAddModule}
          addLabel="Add Module"
        />
      ) : (
        <div className="space-y-4">
          <ContentTable
            items={tableItems}
            type="module"
            onEdit={handleEditModule}
            onDelete={handleDeleteModule}
          />
          
          <div className="text-sm text-muted-foreground">
            Click on a module row or use the menu to manage lessons
          </div>
          
          {/* Module cards for navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => navigate(`/content-hub/modules/${module.id}/lessons`)}
                className="text-left p-4 border border-border rounded-lg hover:border-content-accent/50 hover:shadow-content-hover transition-all bg-card group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-foreground group-hover:text-content-accent transition-colors">
                    {module.name}
                  </h3>
                  <span className="text-sm text-muted-foreground">{module.lessonCount} lessons →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </ContentHubLayout>
  );
};

export default ContentHubModules;
