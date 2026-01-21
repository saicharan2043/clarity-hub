import { useState, useMemo } from 'react';
import { ContentHubLayout } from '@/components/content-hub/ContentHubLayout';
import { ContentFilterPanel } from '@/components/content-hub/ContentFilterPanel';
import { ContentDataTable, ContentItem } from '@/components/content-hub/ContentDataTable';
import { ContentPreviewModal } from '@/components/content-hub/ContentPreviewModal';
import { AddContentModal } from '@/components/content-hub/AddContentModal';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, FileText, Layers, FolderTree, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import {
  mockOfferTypes,
  getCategoriesByOfferType,
  getSubCategoriesByCategory,
  getModulesBySubCategory,
  getLessonsByModule,
  mockSubCategories,
  mockLessons,
} from '@/data/mock-content-hub';

const ContentHub = () => {
  // Filter state
  const [selectedOfferType, setSelectedOfferType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedCurriculum, setSelectedCurriculum] = useState('');

  // Modal state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState<ContentItem | null>(null);
  const [addContentOpen, setAddContentOpen] = useState(false);

  // Filtered data
  const categories = useMemo(
    () => (selectedOfferType ? getCategoriesByOfferType(selectedOfferType) : []),
    [selectedOfferType]
  );

  const subCategories = useMemo(
    () => (selectedCategory ? getSubCategoriesByCategory(selectedCategory) : []),
    [selectedCategory]
  );

  const curriculums = useMemo(
    () => (selectedSubCategory ? getModulesBySubCategory(selectedSubCategory) : []),
    [selectedSubCategory]
  );

  // Convert lessons to content items
  const contentItems: ContentItem[] = useMemo(() => {
    if (!selectedCurriculum) return [];
    const lessons = getLessonsByModule(selectedCurriculum);
    return lessons.map((lesson) => ({
      id: lesson.id,
      order: lesson.order,
      title: lesson.title,
      contentType: lesson.contentType,
      source: Math.random() > 0.5 ? 'upload' : 'external' as 'upload' | 'external',
      duration: lesson.duration,
      status: Math.random() > 0.3 ? 'published' : 'draft' as 'published' | 'draft',
    }));
  }, [selectedCurriculum]);

  // Handlers
  const handleOfferTypeChange = (value: string) => {
    setSelectedOfferType(value);
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSelectedCurriculum('');
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubCategory('');
    setSelectedCurriculum('');
  };

  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategory(value);
    setSelectedCurriculum('');
  };

  const handleCurriculumChange = (value: string) => {
    setSelectedCurriculum(value);
  };

  const handleApply = () => {
    toast.success('Filters applied successfully!');
  };

  const handleReset = () => {
    setSelectedOfferType('');
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSelectedCurriculum('');
    toast.info('Filters reset');
  };

  const handlePreview = (item: ContentItem) => {
    setPreviewContent(item);
    setPreviewOpen(true);
  };

  const handleEdit = (item: ContentItem) => {
    toast.info(`Edit content: ${item.title}`);
  };

  const handleDelete = (item: ContentItem) => {
    toast.error(`Delete content: ${item.title}`);
  };

  const handleAddContent = () => {
    if (!selectedCurriculum) {
      toast.warning('Please select a curriculum first');
      return;
    }
    setAddContentOpen(true);
  };

  const handleSubmitContent = (data: any) => {
    toast.success(`Content "${data.title}" added successfully!`);
  };

  // Stats - now includes 5 cards
  const stats = [
    { label: 'Offer Types', value: mockOfferTypes.length, icon: Layers },
    { label: 'Categories', value: categories.length, icon: BookOpen },
    { label: 'Sub Categories', value: subCategories.length, icon: FolderTree },
    { label: 'Curriculums', value: curriculums.length, icon: FileText },
    { label: 'Lessons', value: contentItems.length, icon: GraduationCap },
  ];

  return (
    <ContentHubLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Content Hub Manager</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your learning content hierarchy in one place
            </p>
          </div>
          <Button
            onClick={handleAddContent}
            className="bg-content-accent hover:bg-content-accent/90 gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Content
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-content-accent/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-content-accent" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="flex gap-6">
          {/* Left Filter Panel */}
          <div className="w-72 flex-shrink-0">
            <ContentFilterPanel
              offerTypes={mockOfferTypes}
              categories={categories}
              subCategories={subCategories}
              curriculums={curriculums}
              selectedOfferType={selectedOfferType}
              selectedCategory={selectedCategory}
              selectedSubCategory={selectedSubCategory}
              selectedCurriculum={selectedCurriculum}
              onOfferTypeChange={handleOfferTypeChange}
              onCategoryChange={handleCategoryChange}
              onSubCategoryChange={handleSubCategoryChange}
              onCurriculumChange={handleCurriculumChange}
              onApply={handleApply}
              onReset={handleReset}
            />
          </div>

          {/* Content Table */}
          <div className="flex-1 min-w-0">
            <ContentDataTable
              items={contentItems}
              onPreview={handlePreview}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <ContentPreviewModal
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        content={previewContent}
      />

      <AddContentModal
        open={addContentOpen}
        onOpenChange={setAddContentOpen}
        hierarchy={{
          offerType: selectedOfferType,
          category: selectedCategory,
          subCategory: selectedSubCategory,
          curriculum: selectedCurriculum,
        }}
        onSubmit={handleSubmitContent}
      />
    </ContentHubLayout>
  );
};

export default ContentHub;
