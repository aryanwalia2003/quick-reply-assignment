import { useState } from 'react';
import { useAddPaper } from '../application/useAddPaper.hook';
import { 
  RESEARCH_DOMAINS, 
  READING_STAGES, 
  IMPACT_SCORES 
} from '@/shared/constants/paperOptions.constant';
import type { 
  ResearchDomain, 
  ReadingStage, 
  ImpactScore 
} from '@/shared/types/supabase.type';

// Shared UI
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/atoms/Card.component';
import { Button } from '@/shared/ui/atoms/Button.component';
import { Input } from '@/shared/ui/atoms/Input.component';
import { Select } from '@/shared/ui/atoms/Select.component';
import { PlusCircle } from 'lucide-react';

export const AddPaperForm = () => {
  // 1. Connect to the Application Layer
  const { mutate: addPaper, isPending } = useAddPaper();

  // 2. Local State for the Form
  const [formData, setFormData] = useState({
    title: '',
    firstAuthor: '',
    citationCount: 0,
    domain: RESEARCH_DOMAINS[0], // Default to first option
    readingStage: READING_STAGES[0],
    impactScore: IMPACT_SCORES[3], // Default to 'Unknown'
  });

  // 3. Handle Input Changes
  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 4. Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Call the Mutation (Application Layer)
    addPaper({
      title: formData.title,
      firstAuthor: formData.firstAuthor,
      citationCount: Number(formData.citationCount),
      domain: formData.domain as ResearchDomain,
      readingStage: formData.readingStage as ReadingStage,
      impactScore: formData.impactScore as ImpactScore,
    }, {
      onSuccess: () => {
        // Reset form on success
        setFormData({
          title: '',
          firstAuthor: '',
          citationCount: 0,
          domain: RESEARCH_DOMAINS[0],
          readingStage: READING_STAGES[0],
          impactScore: IMPACT_SCORES[3],
        });
      }
    });
  };

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          Add New Research Paper
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Identity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Paper Title</label>
              <Input 
                placeholder="e.g. Attention is All You Need" 
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">First Author</label>
              <Input 
                placeholder="e.g. Vaswani et al." 
                value={formData.firstAuthor}
                onChange={(e) => handleChange('firstAuthor', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Row 2: Categorization */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Domain</label>
              <Select 
                options={RESEARCH_DOMAINS}
                value={formData.domain}
                onChange={(e) => handleChange('domain', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Stage</label>
              <Select 
                options={READING_STAGES}
                value={formData.readingStage}
                onChange={(e) => handleChange('readingStage', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Impact Score</label>
              <Select 
                options={IMPACT_SCORES}
                value={formData.impactScore}
                onChange={(e) => handleChange('impactScore', e.target.value)}
              />
            </div>
          </div>

          {/* Row 3: Metrics & Action */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Citation Count</label>
              <Input 
                type="number" 
                min="0"
                value={formData.citationCount}
                onChange={(e) => handleChange('citationCount', e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              isLoading={isPending}
            >
              Add to Library
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};