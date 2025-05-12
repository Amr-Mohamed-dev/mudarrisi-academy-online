
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SubjectFilterProps {
  subjects: string[];
  selectedSubjects: string[];
  onChange: (subject: string) => void;
}

const SubjectFilter = ({ subjects, selectedSubjects, onChange }: SubjectFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {subjects.map((subject) => (
        <Badge
          key={subject}
          variant={selectedSubjects.includes(subject) ? "default" : "outline"}
          className={`cursor-pointer ${
            selectedSubjects.includes(subject)
              ? "bg-blue text-white"
              : "text-gray-700 hover:text-blue"
          }`}
          onClick={() => onChange(subject)}
        >
          {selectedSubjects.includes(subject) && (
            <Check className="ml-1 h-3 w-3" />
          )}
          {subject}
        </Badge>
      ))}
    </div>
  );
};

const Star = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default SubjectFilter;
