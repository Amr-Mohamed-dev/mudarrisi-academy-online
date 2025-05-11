
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SubjectFilterProps {
  onFilterChange: (subjects: string[]) => void;
}

const SubjectFilter = ({ onFilterChange }: SubjectFilterProps) => {
  const subjects = [
    { id: 'math', name: 'الرياضيات' },
    { id: 'physics', name: 'الفيزياء' },
    { id: 'chemistry', name: 'الكيمياء' },
    { id: 'biology', name: 'الأحياء' },
    { id: 'arabic', name: 'اللغة العربية' },
    { id: 'english', name: 'اللغة الإنجليزية' },
    { id: 'social', name: 'الدراسات الاجتماعية' },
    { id: 'religion', name: 'التربية الإسلامية' },
    { id: 'computer', name: 'الحاسب الآلي' },
  ];
  
  const stages = [
    { id: 'elementary', name: 'المرحلة الابتدائية' },
    { id: 'middle', name: 'المرحلة المتوسطة' },
    { id: 'high', name: 'المرحلة الثانوية' },
    { id: 'university', name: 'المرحلة الجامعية' },
  ];
  
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  
  const handleSubjectToggle = (id: string) => {
    setSelectedSubjects(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };
  
  const handleStageToggle = (id: string) => {
    setSelectedStages(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };
  
  const applyFilters = () => {
    onFilterChange(selectedSubjects);
    // In a real app, we'd also handle stages, price ranges, etc.
  };
  
  const clearFilters = () => {
    setSelectedSubjects([]);
    setSelectedStages([]);
    onFilterChange([]);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h3 className="text-xl font-bold mb-4 text-blue-dark">تصفية النتائج</h3>
      
      {/* Subjects */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 text-gray-700">المواد الدراسية</h4>
        <div className="flex flex-wrap gap-2">
          {subjects.map(subject => (
            <Badge
              key={subject.id}
              variant={selectedSubjects.includes(subject.id) ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedSubjects.includes(subject.id)
                  ? "bg-blue text-white"
                  : "text-gray-700 hover:text-blue"
              }`}
              onClick={() => handleSubjectToggle(subject.id)}
            >
              {selectedSubjects.includes(subject.id) && (
                <Check className="ml-1 h-3 w-3" />
              )}
              {subject.name}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Educational Stages */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 text-gray-700">المراحل الدراسية</h4>
        <div className="flex flex-wrap gap-2">
          {stages.map(stage => (
            <Badge
              key={stage.id}
              variant={selectedStages.includes(stage.id) ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedStages.includes(stage.id)
                  ? "bg-teal text-white"
                  : "text-gray-700 hover:text-teal"
              }`}
              onClick={() => handleStageToggle(stage.id)}
            >
              {selectedStages.includes(stage.id) && (
                <Check className="ml-1 h-3 w-3" />
              )}
              {stage.name}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 text-gray-700">نطاق السعر (ريال / ساعة)</h4>
        <div className="flex items-center">
          <input 
            type="range"
            min="50"
            max="500"
            step="50"
            defaultValue="250"
            className="w-full"
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-500">50 ريال</span>
          <span className="text-sm text-gray-500">500 ريال</span>
        </div>
      </div>
      
      {/* Availability */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 text-gray-700">التوفر</h4>
        <div className="flex items-center mb-2">
          <input 
            type="checkbox"
            id="available-now" 
            className="ml-2 h-4 w-4 text-blue border-gray-300 rounded"
          />
          <label htmlFor="available-now" className="text-sm text-gray-700">متاحين الآن</label>
        </div>
        <div className="flex items-center">
          <input 
            type="checkbox"
            id="weekend" 
            className="ml-2 h-4 w-4 text-blue border-gray-300 rounded"
          />
          <label htmlFor="weekend" className="text-sm text-gray-700">متاحين في عطلة نهاية الأسبوع</label>
        </div>
      </div>
      
      {/* Ratings */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 text-gray-700">التقييم</h4>
        {[5, 4, 3, 2, 1].map(rating => (
          <div key={rating} className="flex items-center mb-2">
            <input 
              type="checkbox"
              id={`rating-${rating}`} 
              className="ml-2 h-4 w-4 text-blue border-gray-300 rounded"
            />
            <label htmlFor={`rating-${rating}`} className="text-sm text-gray-700 flex items-center">
              {Array.from({ length: rating }).map((_, i) => (
                <Star key={i} size={16} className="fill-amber text-amber" />
              ))}
              {Array.from({ length: 5 - rating }).map((_, i) => (
                <Star key={i} size={16} className="text-gray-300" />
              ))}
            </label>
          </div>
        ))}
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button 
          variant="default" 
          className="flex-1"
          onClick={applyFilters}
        >
          تطبيق
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={clearFilters}
        >
          مسح الكل
        </Button>
      </div>
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
