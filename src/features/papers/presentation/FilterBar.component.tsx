import type { FilterCriteria, DateFilter } from '@/features/papers/domain/usecases/filterPapers.usecase';
import { READING_STAGES, RESEARCH_DOMAINS } from '@/shared/constants/paperOptions.constant';
import { Button } from '@/shared/ui/atoms/Button.component';
import { Input } from '@/shared/ui/atoms/Input.component';
import { Select } from '@/shared/ui/atoms/Select.component';
import { cn } from '@/shared/utils/cn.util';
import { Search, FilterX } from 'lucide-react';

interface FilterBarProps {
  criteria: FilterCriteria;
  onUpdate: (newCriteria: FilterCriteria) => void;
}

export const FilterBar = ({ criteria, onUpdate }: FilterBarProps) => {

  // Helper to toggle items in an array
  const toggleItem = <T extends string>(list: T[], item: T): T[] => {
    return list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
  };

  const resetFilters = () => {
    onUpdate({
      searchQuery: '',
      stages: [],
      domains: [],
      impacts: [],
      dateRange: 'All Time'
    });
  };

  return (
    <div className="space-y-6 bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-6">
      
      {/* Top Row: Search & Date & Reset */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search title or author..." 
            className="pl-9"
            value={criteria.searchQuery}
            onChange={(e) => onUpdate({ ...criteria, searchQuery: e.target.value })}
          />
        </div>
        
        <div className="flex gap-2">
          <Select 
            className="w-48"
            value={criteria.dateRange}
            onChange={(e) => onUpdate({ ...criteria, dateRange: e.target.value as DateFilter })}
            options={['All Time', 'This Week', 'This Month', 'Last 3 Months']}
          />
          <Button variant="outline" onClick={resetFilters} title="Reset Filters">
            <FilterX className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filter Groups */}
      <div className="space-y-4">
        
        {/* Domain Filter Chips */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Filter by Domain</h4>
          <div className="flex flex-wrap gap-2">
            {RESEARCH_DOMAINS.map((domain) => (
              <button
                key={domain}
                onClick={() => onUpdate({ ...criteria, domains: toggleItem(criteria.domains, domain) })}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                  criteria.domains.includes(domain)
                    ? "bg-indigo-100 text-indigo-800 border-indigo-200 ring-2 ring-indigo-500 ring-offset-1"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                )}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* Reading Stage Chips */}
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Filter by Stage</h4>
          <div className="flex flex-wrap gap-2">
            {READING_STAGES.map((stage) => (
              <button
                key={stage}
                onClick={() => onUpdate({ ...criteria, stages: toggleItem(criteria.stages, stage) })}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                  criteria.stages.includes(stage)
                    ? "bg-emerald-100 text-emerald-800 border-emerald-200 ring-2 ring-emerald-500 ring-offset-1"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                )}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};