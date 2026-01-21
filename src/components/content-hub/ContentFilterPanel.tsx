import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RotateCcw, Filter, Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  offerTypes: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  subCategories: { id: string; name: string }[];
  curriculums: { id: string; name: string }[];
  selectedOfferType: string;
  selectedCategory: string;
  selectedSubCategory: string;
  selectedCurriculum: string;
  onOfferTypeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSubCategoryChange: (value: string) => void;
  onCurriculumChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
}

interface SearchableSelectProps {
  label: string;
  placeholder: string;
  items: { id: string; name: string }[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const SearchableSelect = ({
  label,
  placeholder,
  items,
  value,
  onChange,
  disabled = false,
}: SearchableSelectProps) => {
  const [open, setOpen] = useState(false);
  const selectedItem = items.find((item) => item.id === value);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="w-full justify-between bg-background font-normal"
          >
            {selectedItem ? selectedItem.name : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 z-50" align="start">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={() => {
                      onChange(item.id);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === item.id ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const ContentFilterPanel = ({
  offerTypes,
  categories,
  subCategories,
  curriculums,
  selectedOfferType,
  selectedCategory,
  selectedSubCategory,
  selectedCurriculum,
  onOfferTypeChange,
  onCategoryChange,
  onSubCategoryChange,
  onCurriculumChange,
  onApply,
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
        <SearchableSelect
          label="Offer Type"
          placeholder="Select Offer Type"
          items={offerTypes}
          value={selectedOfferType}
          onChange={onOfferTypeChange}
        />

        {/* Category */}
        <SearchableSelect
          label="Category"
          placeholder="Select Category"
          items={categories}
          value={selectedCategory}
          onChange={onCategoryChange}
          disabled={!selectedOfferType || categories.length === 0}
        />

        {/* Sub Category */}
        <SearchableSelect
          label="Sub Category"
          placeholder="Select Sub Category"
          items={subCategories}
          value={selectedSubCategory}
          onChange={onSubCategoryChange}
          disabled={!selectedCategory || subCategories.length === 0}
        />

        {/* Curriculum */}
        <SearchableSelect
          label="Curriculum"
          placeholder="Select Curriculum"
          items={curriculums}
          value={selectedCurriculum}
          onChange={onCurriculumChange}
          disabled={!selectedSubCategory || curriculums.length === 0}
        />
      </div>

      <div className="space-y-2">
        <Button
          className="w-full gap-2 bg-content-accent hover:bg-content-accent/90"
          onClick={onApply}
        >
          Apply Filters
        </Button>
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={onReset}
        >
          <RotateCcw className="h-4 w-4" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
};
