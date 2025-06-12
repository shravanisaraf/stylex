
import React from 'react';
import { Filter, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export interface FilterState {
  selectedCategories: string[];
  categories: string[];
  colors: string[];
  brands: string[];
  priceRange: { min: number; max: number };
  seasons: string[];
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableBrands: string[];
}

const ALL_CATEGORIES = ['tops', 'bottoms', 'jackets', 'dresses', 'accessories', 'shoes'];
const COLORS = ['white', 'black', 'red', 'blue', 'navy', 'grey', 'brown', 'green', 'pink', 'yellow'];
const SEASONS = ['spring', 'summer', 'autumn', 'winter', 'rainy'];

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange, availableBrands }) => {
  const toggleSelectedCategory = (category: string) => {
    const newSelectedCategories = filters.selectedCategories.includes(category)
      ? filters.selectedCategories.filter(c => c !== category)
      : [...filters.selectedCategories, category];
    onFiltersChange({ ...filters, selectedCategories: newSelectedCategories });
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const toggleColor = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    onFiltersChange({ ...filters, colors: newColors });
  };

  const toggleBrand = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const toggleSeason = (season: string) => {
    const newSeasons = filters.seasons.includes(season)
      ? filters.seasons.filter(s => s !== season)
      : [...filters.seasons, season];
    onFiltersChange({ ...filters, seasons: newSeasons });
  };

  const updatePriceRange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    onFiltersChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [type]: numValue
      }
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      selectedCategories: [...ALL_CATEGORIES],
      categories: [],
      colors: [],
      brands: [],
      priceRange: { min: 0, max: 10000 },
      seasons: []
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || filters.colors.length > 0 || 
    filters.brands.length > 0 || filters.seasons.length > 0 || 
    filters.priceRange.min > 0 || filters.priceRange.max < 10000;

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h3 className="text-lg font-medium text-neutral-900 mb-4">Select Categories to Display</h3>
        <p className="text-sm text-neutral-600 mb-4">Choose which clothing categories you want to see in your wardrobe</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ALL_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => toggleSelectedCategory(category)}
              className={`px-4 py-3 rounded-lg border text-sm font-medium capitalize transition-colors ${
                filters.selectedCategories.includes(category)
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
              }`}
            >
              {category}
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
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="bg-neutral-900 text-white text-xs px-2 py-1 rounded-full">
                    Active
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 bg-white border border-neutral-200" align="start">
              {/* Sub-Categories */}
              <div className="p-3">
                <Label className="text-sm font-medium text-neutral-900 mb-2 block">Filter by Categories</Label>
                <div className="grid grid-cols-2 gap-2">
                  {filters.selectedCategories.map(category => (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                      className="capitalize"
                    >
                      {category}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Colors */}
              <div className="p-3">
                <Label className="text-sm font-medium text-neutral-900 mb-2 block">Colors</Label>
                <div className="grid grid-cols-3 gap-2">
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

              <DropdownMenuSeparator />

              {/* Brands */}
              <div className="p-3">
                <Label className="text-sm font-medium text-neutral-900 mb-2 block">Brands</Label>
                <div className="grid grid-cols-1 gap-1 max-h-32 overflow-y-auto">
                  {availableBrands.map(brand => (
                    <DropdownMenuCheckboxItem
                      key={brand}
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={() => toggleBrand(brand)}
                    >
                      {brand}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Price Range */}
              <div className="p-3">
                <Label className="text-sm font-medium text-neutral-900 mb-2 block">Price Range (Rs.)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange.min || ''}
                    onChange={(e) => updatePriceRange('min', e.target.value)}
                    className="w-20"
                  />
                  <span className="text-neutral-400">-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange.max === 10000 ? '' : filters.priceRange.max || ''}
                    onChange={(e) => updatePriceRange('max', e.target.value)}
                    className="w-20"
                  />
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Seasons */}
              <div className="p-3">
                <Label className="text-sm font-medium text-neutral-900 mb-2 block">Season/Weather</Label>
                <div className="grid grid-cols-2 gap-2">
                  {SEASONS.map(season => (
                    <DropdownMenuCheckboxItem
                      key={season}
                      checked={filters.seasons.includes(season)}
                      onCheckedChange={() => toggleSeason(season)}
                      className="capitalize"
                    >
                      {season}
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
              Clear all
            </Button>
          )}
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {filters.categories.map(category => (
              <span key={category} className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs capitalize">
                {category}
              </span>
            ))}
            {filters.colors.map(color => (
              <span key={color} className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs capitalize">
                {color}
              </span>
            ))}
            {filters.brands.map(brand => (
              <span key={brand} className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs">
                {brand}
              </span>
            ))}
            {filters.seasons.map(season => (
              <span key={season} className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs capitalize">
                {season}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
