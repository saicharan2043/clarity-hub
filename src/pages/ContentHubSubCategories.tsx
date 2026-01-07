import { useParams } from 'react-router-dom';
import { ContentHubLayout } from '@/components/content-hub/ContentHubLayout';
import { ContentBreadcrumb } from '@/components/content-hub/ContentBreadcrumb';
import { ContentCard } from '@/components/content-hub/ContentCard';
import { LevelHeader } from '@/components/content-hub/LevelHeader';
import { EmptyState } from '@/components/content-hub/EmptyState';
import { 
  getCategoryById, 
  getSubCategoriesByCategory,
  getOfferTypeById 
} from '@/data/mock-content-hub';
import { toast } from 'sonner';

const ContentHubSubCategories = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = getCategoryById(categoryId || '');
  const offerType = category ? getOfferTypeById(category.offerTypeId) : null;
  const subCategories = getSubCategoriesByCategory(categoryId || '');

  const handleAddSubCategory = () => {
    toast.info('Add Sub Category modal would open here');
  };

  if (!category || !offerType) {
    return (
      <ContentHubLayout>
        <EmptyState
          title="Category Not Found"
          description="The category you're looking for doesn't exist."
        />
      </ContentHubLayout>
    );
  }

  const breadcrumbs = [
    { label: offerType.name, path: `/content-hub/${offerType.id}/categories` },
    { label: category.name, path: `/content-hub/categories/${categoryId}/sub-categories` },
  ];

  return (
    <ContentHubLayout>
      <ContentBreadcrumb items={breadcrumbs} />
      
      <LevelHeader
        title={`${category.name} Sub Categories`}
        subtitle={category.description}
        count={subCategories.length}
        countLabel="Sub Categories"
        onAdd={handleAddSubCategory}
        addLabel="Add Sub Category"
        showBack
      />

      {subCategories.length === 0 ? (
        <EmptyState
          title="No Sub Categories Yet"
          description={`Start by adding your first sub category to ${category.name}.`}
          onAdd={handleAddSubCategory}
          addLabel="Add Sub Category"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subCategories.map((subCategory) => (
            <ContentCard
              key={subCategory.id}
              title={subCategory.name}
              description={subCategory.description}
              count={subCategory.moduleCount}
              countLabel="Modules"
              to={`/content-hub/sub-categories/${subCategory.id}/modules`}
            />
          ))}
        </div>
      )}
    </ContentHubLayout>
  );
};

export default ContentHubSubCategories;
