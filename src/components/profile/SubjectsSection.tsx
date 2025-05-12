
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface Subject {
  name: string;
  level: string;
}

interface SubjectsSectionProps {
  subjects: Subject[];
  languages?: string[];
}

const SubjectsSection: React.FC<SubjectsSectionProps> = ({
  subjects,
  languages,
}) => {
  return (
    <div>
      <div className="space-y-6">
        {subjects.map((subject, i) => (
          <div key={i} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
            <h3 className="text-lg font-bold mb-2">{subject.name}</h3>
            <p className="text-gray-600 mb-3">المستويات: {subject.level}</p>
            <div className="flex flex-wrap gap-2">
              <Badge>المفاهيم الأساسية</Badge>
              <Badge>التطبيقات العملية</Badge>
              <Badge>التحضير للاختبارات</Badge>
            </div>
          </div>
        ))}
      </div>
      
      {languages && languages.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">اللغات</h3>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang, i) => (
              <Badge key={i} variant="outline" className="text-gray-700">
                {lang}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectsSection;
