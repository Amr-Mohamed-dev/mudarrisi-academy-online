
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export interface TeacherProps {
  id: string;
  name: string;
  subject: string;
  rating: number;
  price: number;
  image: string;
  subjects: string[];
  available: boolean;
}

const TeacherCard = ({ id, name, subject, rating, price, image, subjects, available }: TeacherProps) => {
  return (
    <div className="card hover:border-blue-light border-2 border-transparent">
      <div className="flex flex-col h-full">
        <div className="flex items-start mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name.split(' ').map(part => part[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="mr-4 flex-1">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-gray-600 text-sm">{subject}</p>
            <div className="flex items-center mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={cn(
                    "fill-current",
                    i < Math.floor(rating) ? "text-amber" : "text-gray-300"
                  )}
                />
              ))}
              <span className="text-sm text-gray-600 mr-1">({rating})</span>
            </div>
          </div>
          <div className="text-left">
            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-500">السعر بالساعة</span>
              <span className="text-lg font-bold text-blue">{price} ريال</span>
              <Badge variant={available ? "default" : "outline"} className={cn(
                "mt-2",
                available ? "bg-green-500 hover:bg-green-600" : "text-gray-500"
              )}>
                {available ? "متاح الآن" : "غير متاح حاليًا"}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="mb-4 flex flex-wrap gap-2">
          {subjects.map((subj, i) => (
            <Badge key={i} variant="secondary" className="bg-blue-light/10 text-blue-dark hover:bg-blue-light/20">
              {subj}
            </Badge>
          ))}
        </div>
        
        <div className="mt-auto pt-4 flex gap-2">
          <Button variant="default" className="flex-1" asChild>
            <Link to={`/teachers/${id}`}>عرض الملف الشخصي</Link>
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link to={`/booking/${id}`}>حجز موعد</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
