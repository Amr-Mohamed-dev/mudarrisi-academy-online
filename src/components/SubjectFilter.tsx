
import React from 'react';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SubjectFilterProps {
  subjects: string[];
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
}

const SubjectFilter = ({ subjects, selectedSubject, onSubjectChange }: SubjectFilterProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-700 mb-3">المواد الدراسية</h4>
      <div className="space-y-2">
        {subjects.map((subject) => (
          <div
            key={subject}
            className={`cursor-pointer p-2 rounded-md transition-colors ${
              selectedSubject === subject
                ? "bg-blue text-white"
                : "bg-gray-50 hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => onSubjectChange(subject)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm">{subject}</span>
              {selectedSubject === subject && (
                <Check className="h-4 w-4" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectFilter;
