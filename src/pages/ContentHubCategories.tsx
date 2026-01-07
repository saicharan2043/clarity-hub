import { useParams } from 'react-router-dom';
import { ContentHubLayout } from '@/components/content-hub/ContentHubLayout';
import { ContentBreadcrumb } from '@/components/content-hub/ContentBreadcrumb';
import { ContentCard } from '@/components/content-hub/ContentCard';
import { LevelHeader } from '@/components/content-hub/LevelHeader';
import { EmptyState } from '@/components/content-hub/EmptyState';
import { getOfferTypeById, getCategoriesByOfferType } from '@/data/mock-content-hub';
import { toast } from 'sonner';

const ContentHubCategories = () => {
  const { offerId } = useParams<{ offerId: string }>();
  const offerType = getOfferTypeById(offerId || '');
  const categories = getCategoriesByOfferType(offerId || '');

  const handleAddCategory = () => {
    toast.info('Add Category modal would open here');
  };

  if (!offerType) {
    return (
      <ContentHubLayout>
        <EmptyState
          title="Offer Type Not Found"
          description="The offer type you're looking for doesn't exist."
        />
      </ContentHubLayout>
    );
  }

  const breadcrumbs = [
    { label: offerType.name, path: `/content-hub/${offerId}/categories` },
  ];

  return (
    <ContentHubLayout>
      <ContentBreadcrumb items={breadcrumbs} />
      
      <LevelHeader
        title={`${offerType.name} Categories`}
        subtitle={offerType.description}
        count={categories.length}
        countLabel="Categories"
        onAdd={handleAddCategory}
        addLabel="Add Category"
        showBack
      />

      {categories.length === 0 ? (
        <EmptyState
          title="No Categories Yet"
          description={`Start by adding your first category to ${offerType.name}.`}
          onAdd={handleAddCategory}
          addLabel="Add Category"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <ContentCard
              key={category.id}
              title={category.name}
              description={category.description}
              count={category.subCategoryCount}
              countLabel="Sub Categories"
              to={`/content-hub/categories/${category.id}/sub-categories`}
            />
          ))}
        </div>
      )}
    </ContentHubLayout>
  );
};

export default ContentHubCategories;
