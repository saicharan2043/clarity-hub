import { ContentHubLayout } from '@/components/content-hub/ContentHubLayout';
import { ContentCard } from '@/components/content-hub/ContentCard';
import { LevelHeader } from '@/components/content-hub/LevelHeader';
import { mockOfferTypes } from '@/data/mock-content-hub';
import { toast } from 'sonner';

const ContentHub = () => {
  const handleAddOfferType = () => {
    toast.info('Add Offer Type modal would open here');
  };

  return (
    <ContentHubLayout>
      <LevelHeader
        title="Content Hub"
        subtitle="Manage your learning content hierarchy"
        count={mockOfferTypes.length}
        countLabel="Offer Types"
        onAdd={handleAddOfferType}
        addLabel="Add Offer Type"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockOfferTypes.map((offerType) => (
          <ContentCard
            key={offerType.id}
            title={offerType.name}
            description={offerType.description}
            count={offerType.categoryCount}
            countLabel="Categories"
            icon={offerType.icon}
            color={offerType.color}
            to={`/content-hub/${offerType.id}/categories`}
          />
        ))}
      </div>
    </ContentHubLayout>
  );
};

export default ContentHub;
