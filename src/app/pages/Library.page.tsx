import { AddPaperForm } from '@/features/papers/presentation/AddPaperForm.component';
import { PaperList } from '@/features/papers/presentation/PaperList.component';

export const LibraryPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Research Library</h2>
        <p className="text-slate-500 mt-1">Manage and track your reading progress.</p>
      </div>
      
      {/* The Entry Feature */}
      <AddPaperForm />
      
      {/* The List Feature */}
      <PaperList />
    </div>
  );
};