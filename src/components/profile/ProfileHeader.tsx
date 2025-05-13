
import React from 'react';
import { MapPin, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ProfileHeaderProps {
  name: string;
  title?: string;
  location?: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
  price?: number;
  studentCount?: number;
  isAvailable?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  title,
  location,
  image,
  rating,
  reviewCount,
  price,
  studentCount,
  isAvailable
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row">
        <div className="mb-4 md:mb-0 md:ml-6">
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage src={image || '/placeholder.svg'} alt={name} />
            <AvatarFallback>{name?.split(' ').map(part => part[0]).join('') || 'مستخدم'}</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{name}</h1>
              {title && <p className="text-gray-600 mb-2">{title}</p>}
              
              {rating && (
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        size={18}
                        className={`fill-current ${star <= Math.floor(rating) ? "text-amber-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="font-bold mx-2">{rating}</span>
                  <span className="text-gray-600">({reviewCount} تقييم)</span>
                </div>
              )}
              
              {location && (
                <div className="flex flex-wrap items-center text-gray-600 mb-2">
                  <MapPin size={16} className="ml-1" />
                  <span>{location}</span>
                </div>
              )}
              
              {studentCount !== undefined && (
                <div className="flex flex-wrap items-center text-gray-600">
                  <User size={16} className="ml-1" />
                  <span>{studentCount} طالب</span>
                </div>
              )}

              {isAvailable !== undefined && (
                <div className="mt-2">
                  <Badge variant={isAvailable ? "default" : "outline"} className={isAvailable ? "bg-green-500 hover:bg-green-600" : "text-gray-500"}>
                    {isAvailable ? "متاح الآن" : "غير متاح حاليًا"}
                  </Badge>
                </div>
              )}
            </div>
            
            {price !== undefined && (
              <div className="mt-4 md:mt-0">
                <div className="text-left md:text-right">
                  <p className="text-sm text-gray-500">السعر بالساعة</p>
                  <p className="text-2xl font-bold text-blue-600">{price} ريال</p>
                </div>
              </div>
            )}
          </div>
        </div>
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

export default ProfileHeader;
