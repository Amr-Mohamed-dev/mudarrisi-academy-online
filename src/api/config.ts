
// إعدادات الـ API الأساسية

// Base URL للـ API - يجب تغييرها حسب عنوان الخادم الخاص بك
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-domain.com/api' 
  : 'http://localhost:3001/api';

// Headers افتراضية لجميع الطلبات
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// دالة للحصول على توكن المصادقة من localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// دالة لإنشاء headers مع توكن المصادقة
export const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    ...DEFAULT_HEADERS,
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// دالة عامة للتعامل مع الأخطاء
export const handleAPIError = (error: any) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // الخادم أرسل رد مع كود خطأ
    return {
      success: false,
      error: error.response.data?.message || 'حدث خطأ في الخادم',
      status: error.response.status
    };
  } else if (error.request) {
    // لا يوجد رد من الخادم
    return {
      success: false,
      error: 'لا يمكن الوصول للخادم، تحقق من اتصال الإنترنت'
    };
  } else {
    // خطأ في إعداد الطلب
    return {
      success: false,
      error: 'حدث خطأ غير متوقع'
    };
  }
};
