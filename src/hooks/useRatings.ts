
import { useState } from 'react';
import { 
  createRating, 
  getUserRatings, 
  getRatingsGivenByUser,
  getRating,
  updateRating,
  deleteRating,
  checkRatingExists,
  getRatingStats
} from '@/api';
import { Rating } from '@/api/types';

export const useRatingsAPI = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // إنشاء تقييم جديد
  const handleCreateRating = async (ratingData: {
    bookingId: string;
    targetId: string;
    rating: number;
    comment?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    const result = await createRating(ratingData);
    
    if (result.success) {
      setLoading(false);
      return { success: true, rating: result.data };
    } else {
      setError(result.error || 'فشل في إنشاء التقييم');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // الحصول على تقييمات المستخدم (المستلمة)
  const fetchUserRatings = async (userId: string) => {
    setLoading(true);
    setError(null);
    
    const result = await getUserRatings(userId);
    
    if (result.success) {
      setRatings(result.data?.ratings || []);
      setLoading(false);
      return { 
        success: true, 
        ratings: result.data?.ratings,
        averageRating: result.data?.averageRating,
        totalRatings: result.data?.totalRatings
      };
    } else {
      setError(result.error || 'فشل في الحصول على التقييمات');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // الحصول على التقييمات المرسلة من المستخدم
  const fetchRatingsGivenByUser = async (userId: string) => {
    setLoading(true);
    setError(null);
    
    const result = await getRatingsGivenByUser(userId);
    
    if (result.success) {
      setLoading(false);
      return { success: true, ratings: result.data };
    } else {
      setError(result.error || 'فشل في الحصول على التقييمات المرسلة');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // الحصول على تقييم معين
  const fetchRating = async (ratingId: string) => {
    setLoading(true);
    setError(null);
    
    const result = await getRating(ratingId);
    
    if (result.success) {
      setLoading(false);
      return { success: true, rating: result.data };
    } else {
      setError(result.error || 'فشل في الحصول على التقييم');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // تحديث التقييم
  const handleUpdateRating = async (ratingId: string, ratingData: {
    rating?: number;
    comment?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    const result = await updateRating(ratingId, ratingData);
    
    if (result.success) {
      // تحديث التقييم في القائمة المحلية
      setRatings(prev => prev.map(rating => 
        rating.id === ratingId 
          ? { ...rating, ...ratingData }
          : rating
      ));
      
      setLoading(false);
      return { success: true, rating: result.data };
    } else {
      setError(result.error || 'فشل في تحديث التقييم');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // حذف التقييم
  const handleDeleteRating = async (ratingId: string) => {
    setLoading(true);
    setError(null);
    
    const result = await deleteRating(ratingId);
    
    if (result.success) {
      // إزالة التقييم من القائمة المحلية
      setRatings(prev => prev.filter(rating => rating.id !== ratingId));
      
      setLoading(false);
      return { success: true };
    } else {
      setError(result.error || 'فشل في حذف التقييم');
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  // التحقق من وجود تقييم للحجز
  const checkIfRatingExists = async (bookingId: string, raterRole: 'student' | 'teacher') => {
    setLoading(true);
    setError(null);
    
    const result = await checkRatingExists(bookingId, raterRole);
    
    setLoading(false);
    
    if (result.success) {
      return { 
        success: true, 
        exists: result.data?.exists,
        rating: result.data?.rating
      };
    } else {
      setError(result.error || 'فشل في التحقق من التقييم');
      return { success: false, error: result.error };
    }
  };

  // الحصول على إحصائيات التقييمات
  const fetchRatingStats = async (userId: string) => {
    setLoading(true);
    setError(null);
    
    const result = await getRatingStats(userId);
    
    setLoading(false);
    
    if (result.success) {
      return { 
        success: true, 
        averageRating: result.data?.averageRating,
        totalRatings: result.data?.totalRatings,
        ratingDistribution: result.data?.ratingDistribution
      };
    } else {
      setError(result.error || 'فشل في الحصول على إحصائيات التقييمات');
      return { success: false, error: result.error };
    }
  };

  return {
    ratings,
    loading,
    error,
    handleCreateRating,
    fetchUserRatings,
    fetchRatingsGivenByUser,
    fetchRating,
    handleUpdateRating,
    handleDeleteRating,
    checkIfRatingExists,
    fetchRatingStats,
  };
};
