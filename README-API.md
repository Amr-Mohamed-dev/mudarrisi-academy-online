
# دليل ربط المشروع بال API

## نظرة عامة
هذا المشروع جاهز للربط مع Backend API لإدارة منصة التعليم عبر الإنترنت. تم إنشاء جميع ملفات API المطلوبة مع التوثيق الكامل.

## هيكل ملفات API

### 📁 `src/api/`
```
src/api/
├── config.ts           # إعدادات API الأساسية
├── types.ts           # تعريف الأنواع المشتركة
├── authApi.ts         # API المصادقة وإدارة المستخدمين
├── bookingsApi.ts     # API إدارة الحجوزات
├── notificationsApi.ts # API إدارة الإشعارات
├── ratingsApi.ts      # API إدارة التقييمات
├── usersApi.ts        # API إدارة المستخدمين
├── attendanceApi.ts   # API إدارة الحضور والغياب
└── index.ts           # تصدير جميع APIs
```

## الملفات المطلوب ربطها بال API

### 1. 🔐 **src/contexts/AuthContext.tsx**
**ما يعرضه:** حالة تسجيل الدخول، بيانات المستخدم، أذونات المستخدم
**APIs المرتبطة:**
- `authApi.login()` - تسجيل الدخول
- `authApi.register()` - تسجيل مستخدم جديد
- `authApi.logout()` - تسجيل الخروج
- `authApi.getCurrentUser()` - الحصول على بيانات المستخدم الحالي

### 2. 📚 **src/pages/BookingPage.tsx**
**ما يعرضه:** نموذج إنشاء حجز جديد، تفاصيل المدرس، تأكيد الحجز
**APIs المرتبطة:**
- `bookingsApi.createBooking()` - إنشاء حجز جديد
- `usersApi.getUser()` - الحصول على بيانات المدرس
- `notificationsApi.createNotification()` - إرسال إشعار إنشاء الحجز

### 3. 👨‍🎓 **src/pages/StudentProfile.tsx**
**ما يعرضه:** حجوزات الطالب، حالة الحجوزات، تأكيد الحضور، تقييم المدرسين
**APIs المرتبطة:**
- `bookingsApi.getUserBookings()` - حجوزات الطالب
- `bookingsApi.updateBookingStatus()` - إلغاء الحجز
- `attendanceApi.recordAttendanceJoin()` - تأكيد الحضور
- `ratingsApi.createRating()` - تقييم المدرس
- `ratingsApi.checkRatingExists()` - التحقق من وجود تقييم

### 4. 👨‍🏫 **src/pages/TeacherRatings.tsx**
**ما يعرضه:** قائمة الطلاب للتقييم، نموذج تقييم الطالب، التقييمات المكتملة
**APIs المرتبطة:**
- `bookingsApi.getUserBookings()` - حجوزات المدرس المكتملة
- `ratingsApi.createRating()` - تقييم الطالب
- `ratingsApi.checkRatingExists()` - التحقق من التقييمات الموجودة

### 5. 👨‍💼 **src/pages/admin/BookingsManagement.tsx**
**ما يعرضه:** جميع الحجوزات، فلترة الحجوزات، قبول/رفض الحجوزات، إحصائيات
**APIs المرتبطة:**
- `bookingsApi.getAllBookings()` - جميع الحجوزات
- `bookingsApi.updateBookingStatus()` - قبول/رفض الحجوزات
- `bookingsApi.getBookingStats()` - إحصائيات الحجوزات
- `notificationsApi.createNotification()` - إشعارات قبول/رفض

### 6. 🔔 **src/components/NotificationManager.tsx**
**ما يعرضه:** قائمة الإشعارات، عدد الإشعارات غير المقروءة، تحديد كمقروءة
**APIs المرتبطة:**
- `notificationsApi.getUserNotifications()` - إشعارات المستخدم
- `notificationsApi.getUnreadNotificationsCount()` - عدد الإشعارات غير المقروءة
- `notificationsApi.markNotificationAsRead()` - تحديد كمقروءة
- `notificationsApi.markAllNotificationsAsRead()` - تحديد الكل كمقروءة

### 7. 📊 **src/components/admin/BookingStats.tsx**
**ما يعرضه:** إحصائيات الحجوزات، الإيرادات، عدد الحجوزات حسب الحالة
**APIs المرتبطة:**
- `bookingsApi.getBookingStats()` - إحصائيات شاملة للحجوزات

### 8. 🎯 **src/components/AttendanceConfirmation.tsx**
**ما يعرضه:** نموذج تأكيد الحضور للطالب
**APIs المرتبطة:**
- `attendanceApi.recordAttendanceJoin()` - تسجيل الحضور
- `bookingsApi.updateBookingStatus()` - تحديث حالة الحجز لمكتملة

### 9. ⭐ **src/components/RatingForm.tsx**
**ما يعرضه:** نموذج التقييم للطلاب والمدرسين
**APIs المرتبطة:**
- `ratingsApi.createRating()` - إنشاء تقييم جديد

## خطوات الربط

### 1. تحديث إعدادات API
```typescript
// في src/api/config.ts
export const API_BASE_URL = 'https://your-backend-domain.com/api';
```

### 2. تحديث AuthContext
```typescript
// استبدال localStorage بـ API calls
const login = async (email: string, password: string) => {
  const result = await authApi.login(email, password);
  if (result.success) {
    setUser(result.data.user);
    return true;
  }
  return false;
};
```

### 3. تحديث كل صفحة بشكل تدريجي
- استبدال `localStorage` بـ API calls
- إضافة معالجة الأخطاء
- إضافة حالات التحميل

## مثال على التحديث

### قبل (localStorage):
```typescript
const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
```

### بعد (API):
```typescript
const [bookings, setBookings] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadBookings = async () => {
    const result = await getUserBookings(user.id);
    if (result.success) {
      setBookings(result.data);
    }
    setLoading(false);
  };
  loadBookings();
}, []);
```

## البيانات التي سيعرضها كل API

### 🔐 Authentication API
- حالة تسجيل الدخول
- بيانات المستخدم (الاسم، البريد، الدور)
- توكن المصادقة

### 📅 Bookings API  
- تفاصيل الحجوزات (التاريخ، الوقت، المادة)
- معلومات المدرس والطالب
- حالة الحجز وسعر الحصة
- روابط الاجتماعات

### 🔔 Notifications API
- عنوان ومحتوى الإشعار
- نوع الإشعار وحالة القراءة
- عدد الإشعارات غير المقروءة

### ⭐ Ratings API
- درجة التقييم (1-5 نجوم)
- تعليقات التقييم
- متوسط التقييمات وعددها

### 👥 Users API
- قائمة المدرسين والطلاب
- معلومات المستخدمين وحالة التفعيل
- إحصائيات المستخدمين

### 📊 Attendance API
- سجل الحضور والغياب
- وقت الدخول والمغادرة
- مدة الحضور الفعلي
- معدل الحضور

## ملاحظات مهمة
1. جميع APIs تدعم معالجة الأخطاء
2. يتم حفظ توكن المصادقة تلقائياً
3. جميع التواريخ بصيغة ISO
4. يمكن فلترة البيانات حسب المعايير المختلفة
5. جميع APIs تعيد نفس صيغة الاستجابة `APIResponse<T>`

بهذا التصميم، المشروع جاهز بالكامل للربط مع أي Backend API ويمكن التبديل من localStorage إلى API بسهولة.
