
import { Json } from '@/integrations/supabase/types';

// Helper function to safely convert Json to string array
export const jsonToStringArray = (jsonValue: Json | null): string[] => {
  if (!jsonValue) return [];
  if (Array.isArray(jsonValue)) {
    return jsonValue.filter((item): item is string => typeof item === 'string');
  }
  return [];
};

export const useWorkExperienceData = () => {
  const formatDateRange = (startDate: string, endDate: string | null, isCurrent: boolean | null) => {
    const start = new Date(startDate).toLocaleDateString();
    if (isCurrent) {
      return `${start} - Present`;
    }
    if (endDate) {
      const end = new Date(endDate).toLocaleDateString();
      return `${start} - ${end}`;
    }
    return start;
  };

  return {
    jsonToStringArray,
    formatDateRange,
  };
};
