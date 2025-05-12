
import React from 'react';
import { Book, Award } from 'lucide-react';

interface Education {
  degree: string;
  school: string;
  years: string;
}

interface Experience {
  position: string;
  organization: string;
  years: string;
}

interface EducationExperienceProps {
  education?: Education[];
  experience?: Experience[];
  certifications?: string[];
}

const EducationExperience: React.FC<EducationExperienceProps> = ({
  education,
  experience,
  certifications,
}) => {
  return (
    <div className="space-y-8">
      {education && education.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">التعليم</h3>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <div key={i} className="flex">
                <div className="ml-4 text-blue">
                  <Book size={20} />
                </div>
                <div>
                  <p className="font-bold">{edu.degree}</p>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-gray-500 text-sm">{edu.years}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {experience && experience.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">الخبرة</h3>
          <div className="space-y-4">
            {experience.map((exp, i) => (
              <div key={i} className="flex">
                <div className="ml-4 text-teal">
                  <Award size={20} />
                </div>
                <div>
                  <p className="font-bold">{exp.position}</p>
                  <p className="text-gray-600">{exp.organization}</p>
                  <p className="text-gray-500 text-sm">{exp.years}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {certifications && certifications.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">الشهادات</h3>
          <div className="space-y-2">
            {certifications.map((cert, i) => (
              <div key={i} className="flex items-center">
                <div className="ml-2 text-blue">
                  <Award size={16} />
                </div>
                <p>{cert}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationExperience;
