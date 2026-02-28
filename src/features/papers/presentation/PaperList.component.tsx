import { useState } from 'react';
import { usePapers } from '../application/usePapers.hook';
import { PaperCard } from './PaperCard.component';
import { FilterBar } from './FilterBar.component';
import { filterPapers, type FilterCriteria } from '@/features/papers/domain/usecases/filterPapers.usecase';
import { Loader2, FileText } from 'lucide-react';

export const PaperList = () => {
  // 1. Fetch Data
  const { data: papers, isLoading, isError } = usePapers();

  // 2. Local State for Filters
  const [criteria, setCriteria] = useState<FilterCriteria>({
    searchQuery: '',
    stages: [],
    domains: [],
    impacts: [],
    dateRange: 'All Time'
  });

  // 3. Apply Domain Logic
  const filteredPapers = papers ? filterPapers(papers, criteria) : [];

  // 4. Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p>Loading your library...</p>
      </div>
    );
  }

  // 5. Error State
  if (isError) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md border border-red-100">
        Failed to load papers. Please check your connection.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* The Filter Section */}
      <FilterBar criteria={criteria} onUpdate={setCriteria} />

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Your Library
        </h2>
        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {filteredPapers.length} Papers
        </span>
      </div>

      {/* The Grid of Cards */}
      {filteredPapers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPapers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-20 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
          <p className="text-slate-500 font-medium">No papers match your filters.</p>
          <p className="text-sm text-slate-400 mt-1">Try resetting filters or add a new paper.</p>
        </div>
      )}
    </div>
  );
};