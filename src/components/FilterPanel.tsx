import React from 'react';
import { Filter, X, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface FilterState {
  selectedCategories: string[];
  colors: string[];
  search: string;
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableBrands?: string[];
}

const COLORS = ['white', 'black', 'grey', 'brown', 'beige', 'cream', 'blue', 'navy', 'green', 'pink', 'red', 'yellow'];

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  const toggleColor = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    onFiltersChange({ ...filters, colors: newColors });
  };

  const clearAllFilters = () => {
    onFiltersChange({ ...filters, colors: [], search: '' });
  };

  const hasActiveFilters = filters.colors.length > 0 || filters.search.trim().length > 0;

  return (
    <div className="mb-12 space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            placeholder="Search pieces (e.g. black halter top)"
            className="pl-9 rounded-full border-gray-200 font-light"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-full flex items-center space-x-2 border-gray-200">
              <Filter className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.15em]">Colour</span>
              {filters.colors.length > 0 && (
                <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                  {filters.colors.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-white border border-gray-200 shadow-lg z-50" align="end">
            <div className="p-4">
              <Label className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-3 block">Filter by colour</Label>
              <div className="grid grid-cols-2 gap-1 max-h-56 overflow-y-auto">
                {COLORS.map(color => (
                  <DropdownMenuCheckboxItem
                    key={color}
                    checked={filters.colors.includes(color)}
                    onCheckedChange={() => toggleColor(color)}
                    onSelect={(e) => e.preventDefault()}
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
            className="text-gray-500 hover:text-black rounded-full"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {filters.colors.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.colors.map(color => (
            <span key={color} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs capitalize font-light">
              {color}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
