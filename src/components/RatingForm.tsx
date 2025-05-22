
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface RatingFormProps {
  bookingId: string;
  targetId: string; // المعرّف الفريد للشخص المراد تقييمه (المدرس أو الطالب)
  targetName: string; // اسم الشخص المراد تقييمه
  raterRole: 'student' | 'teacher'; // دور الشخص الذي يقوم بالتقييم
  onComplete: () => void;
}

const RatingForm = ({ bookingId, targetId, targetName, raterRole, onComplete }: RatingFormProps) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  
  const handleRatingChange = (value: number) => {
    setRating(value);
  };
  
  const handleMouseEnter = (value: number) => {
    setHoveredRating(value);
  };
  
  const handleMouseLeave = () => {
    setHoveredRating(null);
  };
  
  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('الرجاء اختيار تقييم من 1 إلى 5 نجوم');
      return;
    }
    
    // Get existing ratings or create new array
    const ratings = JSON.parse(localStorage.getItem('ratings') || '[]');
    
    // Create new rating object
    const newRating = {
      id: `rating_${Date.now()}`,
      bookingId,
      targetId,
      targetName,
      raterRole,
      raterId: raterRole === 'student' ? 
        JSON.parse(localStorage.getItem('bookings') || '[]').find((b: any) => b.id === bookingId)?.studentId :
        JSON.parse(localStorage.getItem('bookings') || '[]').find((b: any) => b.id === bookingId)?.teacherId,
      raterName: raterRole === 'student' ? 
        JSON.parse(localStorage.getItem('bookings') || '[]').find((b: any) => b.id === bookingId)?.studentName :
        JSON.parse(localStorage.getItem('bookings') || '[]').find((b: any) => b.id === bookingId)?.teacherName,
      rating,
      comment,
      createdAt: new Date().toISOString()
    };
    
    // Add to ratings array
    ratings.push(newRating);
    localStorage.setItem('ratings', JSON.stringify(ratings));
    
    // Create notification for the rated person
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    
    notifications.push({
      id: `notification_${Date.now()}`,
      userId: targetId,
      title: 'لقد تلقيت تقييماً جديداً',
      message: `قام ${newRating.raterName} بتقييمك بـ ${rating} نجوم${comment ? ` وكتب: "${comment}"` : ''}`,
      read: false,
      createdAt: new Date().toISOString()
    });
    
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    toast.success('تم إرسال التقييم بنجاح');
    onComplete();
  };
  
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">
          {raterRole === 'student' ? 'تقييم المدرس' : 'تقييم الطالب'}: {targetName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className="focus:outline-none p-1"
              onClick={() => handleRatingChange(value)}
              onMouseEnter={() => handleMouseEnter(value)}
              onMouseLeave={handleMouseLeave}
            >
              <Star
                className={`h-8 w-8 ${
                  (hoveredRating !== null ? value <= hoveredRating : value <= rating)
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500">
          {rating === 0 ? 'اضغط على النجوم لتقييم' :
            rating === 1 ? 'سيء' :
            rating === 2 ? 'مقبول' :
            rating === 3 ? 'جيد' :
            rating === 4 ? 'جيد جدا' : 'ممتاز'}
        </p>
        <div className="space-y-2">
          <label htmlFor="comment" className="block text-sm font-medium">
            تعليق (اختياري)
          </label>
          <Textarea
            id="comment"
            placeholder="اكتب تعليقك هنا..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="h-24"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          إرسال التقييم
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RatingForm;
