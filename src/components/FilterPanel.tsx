
import React from 'react';
import { Filter, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export interface FilterState {
  selectedCategories: string[];
  colors: string[];
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableBrands: string[];
}

const ALL_CATEGORIES = ['womens-tops', 'womens-bottoms', 'mens-tops', 'mens-bottoms'];
const CATEGORY_LABELS: Record<string, string> = {
  'womens-tops': "Women's Tops",
  'womens-bottoms': "Women's Bottoms",
  'mens-tops': "Men's Tops",
  'mens-bottoms': "Men's Bottoms",
};

const COLORS = ['white', 'black', 'red', 'blue', 'navy', 'grey', 'brown', 'green', 'pink', 'yellow'];

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange, availableBrands }) => {
  const toggleSelectedCategory = (category: string) => {
    const newSelectedCategories = filters.selectedCategories.includes(category)
      ? filters.selectedCategories.filter(c => c !== category)
      : [...filters.selectedCategories, category];
    onFiltersChange({ ...filters, selectedCategories: newSelectedCategories });
  };

  const toggleColor = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    onFiltersChange({ ...filters, colors: newColors });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      selectedCategories: [...ALL_CATEGORIES],
      colors: []
    });
  };

  const hasActiveFilters = filters.colors.length > 0;

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h3 className="text-lg font-medium text-neutral-900 mb-4">Select Categories to Display</h3>
        <p className="text-sm text-neutral-600 mb-4">Choose which clothing categories you want to see in your wardrobe</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ALL_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => toggleSelectedCategory(category)}
              className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                filters.selectedCategories.includes(category)
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
              }`}
            >
              {CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>

      </div>

      {/* Filter Panel */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter by Color</span>
                {hasActiveFilters && (
                  <span className="bg-neutral-900 text-white text-xs px-2 py-1 rounded-full">
                    Active
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-64 bg-white border border-neutral-200 shadow-lg z-50" 
              align="start"
              side="bottom"
              sideOffset={4}
            >
              {/* Colors */}
              <div className="p-4">
                <Label className="text-sm font-medium text-neutral-900 mb-3 block">Filter by Colors</Label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {COLORS.map(color => (
                    <DropdownMenuCheckboxItem
                      key={color}
                      checked={filters.colors.includes(color)}
                      onCheckedChange={() => toggleColor(color)}
                      className="capitalize"
                    >
                      {color}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-neutral-600 hover:text-neutral-900"
            >
              <X className="w-4 h-4 mr-1" />
              Clear filters
            </Button>
          )}
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {filters.colors.map(color => (
              <span key={color} className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs capitalize">
                {color}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
