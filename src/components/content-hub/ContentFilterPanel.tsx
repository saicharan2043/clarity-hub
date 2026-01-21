import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RotateCcw, Filter } from 'lucide-react';

interface FilterPanelProps {
  offerTypes: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  subCategories: { id: string; name: string }[];
  modules: { id: string; name: string }[];
  selectedOfferType: string;
  selectedCategory: string;
  selectedSubCategory: string;
  selectedModule: string;
  onOfferTypeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSubCategoryChange: (value: string) => void;
  onModuleChange: (value: string) => void;
  onReset: () => void;
}

export const ContentFilterPanel = ({
  offerTypes,
  categories,
  subCategories,
  modules,
  selectedOfferType,
  selectedCategory,
  selectedSubCategory,
  selectedModule,
  onOfferTypeChange,
  onCategoryChange,
  onSubCategoryChange,
  onModuleChange,
  onReset,
}: FilterPanelProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-5">
      <div className="flex items-center gap-2 pb-3 border-b border-border">
        <Filter className="h-5 w-5 text-content-accent" />
        <h3 className="font-semibold text-foreground">Filters</h3>
      </div>

      <div className="space-y-4">
        {/* Offer Type */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Offer Type</Label>
          <Select value={selectedOfferType} onValueChange={onOfferTypeChange}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Select Offer Type" />
            </SelectTrigger>
            <SelectContent>
              {offerTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Category</Label>
          <Select
            value={selectedCategory}
            onValueChange={onCategoryChange}
            disabled={!selectedOfferType || categories.length === 0}
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sub Category */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Sub Category</Label>
          <Select
            value={selectedSubCategory}
            onValueChange={onSubCategoryChange}
            disabled={!selectedCategory || subCategories.length === 0}
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Select Sub Category" />
            </SelectTrigger>
            <SelectContent>
              {subCategories.map((subCat) => (
                <SelectItem key={subCat.id} value={subCat.id}>
                  {subCat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Module */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Module</Label>
          <Select
            value={selectedModule}
            onValueChange={onModuleChange}
            disabled={!selectedSubCategory || modules.length === 0}
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Select Module" />
            </SelectTrigger>
            <SelectContent>
              {modules.map((mod) => (
                <SelectItem key={mod.id} value={mod.id}>
                  {mod.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full gap-2"
        onClick={onReset}
      >
        <RotateCcw className="h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  );
};
