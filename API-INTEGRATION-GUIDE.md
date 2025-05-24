
# دليل ربط المشروع بـ API - التفاصيل التقنية

## 📋 ملخص الملفات المطلوب ربطها

### 1. 🔐 **src/contexts/AuthContext.tsx**
**hooks المطلوبة:** `useAuthAPI`

**البيانات التي سيعرضها:**
- ✅ حالة تسجيل الدخول (مسجل دخول / غير مسجل)
- ✅ بيانات المستخدم الحالي (الاسم، البريد الإلكتروني، الدور)
- ✅ صورة المستخدم الشخصية
- ✅ حالة التحميل أثناء العمليات
- ✅ رسائل الأخطاء في حالة فشل العمليات

**APIs المستخدمة:**
```typescript
// استبدال localStorage بـ APIs
const { 
  user, 
  loading, 
  error, 
  handleLogin, 
  handleRegister, 
  handleLogout, 
  fetchCurrentUser 
} = useAuthAPI();
```

---

### 2. 📚 **src/pages/BookingPage.tsx**
**hooks المطلوبة:** `useBookingsAPI`, `useUsersAPI`, `useNotificationsAPI`

**البيانات التي سيعرضها:**
- ✅ تفاصيل المدرس المحدد (الاسم، التخصص، السعر)
- ✅ نموذج إنشاء حجز جديد مع التفاصيل
- ✅ تأكيد إرسال طلب الحجز
- ✅ إشعار للطالب بحالة الطلب (معلق حتى موافقة الإدارة)

**APIs المستخدمة:**
```typescript
// الحصول على بيانات المدرس
const { fetchUser } = useUsersAPI();

// إنشاء حجز جديد
const { handleCreateBooking } = useBookingsAPI();

// إرسال إشعار للطالب
const { handleCreateNotification } = useNotificationsAPI();
```

---

### 3. 👨‍🎓 **src/pages/StudentProfile.tsx**
**hooks المطلوبة:** `useBookingsAPI`, `useAttendanceAPI`, `useRatingsAPI`

**البيانات التي سيعرضها:**
- ✅ قائمة حجوزات الطالب مع حالة كل حجز
- ✅ أزرار إلغاء الحجز (للحجوزات المعلقة)
- ✅ أزرار تأكيد الحضور (للحجوزات المؤكدة)
- ✅ أزرار تقييم المدرس (للحجوزات المكتملة)
- ✅ حالة التقييم (تم التقييم / لم يتم بعد)

**APIs المستخدمة:**
```typescript
// حجوزات الطالب
const { fetchUserBookings, handleUpdateBookingStatus } = useBookingsAPI();

// تأكيد الحضور
const { handleRecordJoin } = useAttendanceAPI();

// تقييم المدرس
const { handleCreateRating, checkIfRatingExists } = useRatingsAPI();
```

---

### 4. 👨‍🏫 **src/pages/TeacherRatings.tsx**
**hooks المطلوبة:** `useBookingsAPI`, `useRatingsAPI`

**البيانات التي سيعرضها:**
- ✅ قائمة الطلاب المؤهلين للتقييم (حضروا الدروس)
- ✅ نموذج تقييم الطالب مع النجوم والتعليقات
- ✅ قائمة الطلاب الذين تم تقييمهم مسبقاً
- ✅ التقييمات المكتملة مع الدرجات والتعليقات

**APIs المستخدمة:**
```typescript
// حجوزات المدرس المكتملة
const { fetchUserBookings } = useBookingsAPI();

// تقييم الطلاب
const { handleCreateRating, checkIfRatingExists } = useRatingsAPI();
```

---

### 5. 👨‍💼 **src/pages/admin/BookingsManagement.tsx**
**hooks المطلوبة:** `useBookingsAPI`, `useNotificationsAPI`

**البيانات التي سيعرضها:**
- ✅ جميع الحجوزات في النظام مع الفلاتر
- ✅ إحصائيات الحجوزات (إجمالي، معلق، مؤكد، مكتمل)
- ✅ أزرار قبول/رفض الحجوزات
- ✅ إضافة روابط الاجتماعات للحجوزات المؤكدة
- ✅ فلترة الحجوزات حسب (التاريخ، المدرس، الطالب، الحالة)

**APIs المستخدمة:**
```typescript
// جميع الحجوزات والإحصائيات
const { fetchAllBookings, handleUpdateBookingStatus, fetchBookingStats, handleAddMeetingLink } = useBookingsAPI();

// إشعارات القبول/الرفض
const { handleCreateNotification } = useNotificationsAPI();
```

---

### 6. 🔔 **src/components/NotificationManager.tsx**
**hooks المطلوبة:** `useNotificationsAPI`

**البيانات التي سيعرضها:**
- ✅ قائمة إشعارات المستخدم (حديثة أولاً)
- ✅ عدد الإشعارات غير المقروءة في الشارة
- ✅ أنواع الإشعارات (حجز، تقييم، نظام، تذكير)
- ✅ حالة قراءة كل إشعار
- ✅ أزرار تحديد كمقروءة وحذف

**APIs المستخدمة:**
```typescript
// إدارة الإشعارات
const { 
  fetchUserNotifications, 
  fetchUnreadCount, 
  handleMarkAsRead, 
  handleMarkAllAsRead, 
  handleDeleteNotification 
} = useNotificationsAPI();
```

---

### 7. 📊 **src/components/admin/BookingStats.tsx**
**hooks المطلوبة:** `useBookingsAPI`

**البيانات التي سيعرضها:**
- ✅ إجمالي عدد الحجوزات
- ✅ عدد الحجوزات المعلقة
- ✅ عدد الحجوزات المؤكدة
- ✅ عدد الحجوزات المكتملة
- ✅ إجمالي الإيرادات
- ✅ رسوم بيانية للإحصائيات

**APIs المستخدمة:**
```typescript
// إحصائيات شاملة
const { fetchBookingStats } = useBookingsAPI();
```

---

### 8. 🎯 **src/components/AttendanceConfirmation.tsx**
**hooks المطلوبة:** `useAttendanceAPI`, `useBookingsAPI`

**البيانات التي سيعرضها:**
- ✅ نموذج تأكيد حضور الطالب
- ✅ تسجيل وقت الدخول للحصة
- ✅ تحديث حالة الحجز إلى "مكتملة"
- ✅ رسالة تأكيد الحضور

**APIs المستخدمة:**
```typescript
// تسجيل الحضور
const { handleRecordJoin } = useAttendanceAPI();

// تحديث حالة الحجز
const { handleUpdateBookingStatus } = useBookingsAPI();
```

---

### 9. ⭐ **src/components/RatingForm.tsx**
**hooks المطلوبة:** `useRatingsAPI`

**البيانات التي سيعرضها:**
- ✅ نموذج التقييم بالنجوم (1-5)
- ✅ مربع التعليقات الاختياري
- ✅ معلومات الشخص المراد تقييمه
- ✅ تأكيد إرسال التقييم

**APIs المستخدمة:**
```typescript
// إنشاء تقييم جديد
const { handleCreateRating } = useRatingsAPI();
```

---

## 🔄 خطة التحويل من localStorage إلى API

### المرحلة 1: تحديث AuthContext
```typescript
// قبل
const users = JSON.parse(localStorage.getItem('users') || '[]');

// بعد
const { handleLogin, user, loading } = useAuthAPI();
```

### المرحلة 2: تحديث صفحات الطلاب والمدرسين
```typescript
// قبل
const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

// بعد
const { fetchUserBookings, bookings, loading } = useBookingsAPI();
useEffect(() => {
  fetchUserBookings(user.id);
}, [user]);
```

### المرحلة 3: تحديث لوحة الإدارة
```typescript
// قبل
const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');

// بعد
const { fetchAllBookings, bookings, loading } = useBookingsAPI();
useEffect(() => {
  fetchAllBookings();
}, []);
```

### المرحلة 4: تحديث نظام الإشعارات
```typescript
// قبل
const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');

// بعد
const { fetchUserNotifications, notifications, unreadCount } = useNotificationsAPI();
useEffect(() => {
  fetchUserNotifications(user.id);
}, [user]);
```

---

## ⚙️ إعدادات مطلوبة قبل التشغيل

### 1. تحديث عنوان API
```typescript
// في src/api/config.ts
export const API_BASE_URL = 'https://your-backend-domain.com/api';
```

### 2. التأكد من البيانات المعروضة
جميع الـ hooks جاهزة وتعرض البيانات التالية:
- ✅ **البيانات الفعلية** من API
- ✅ **حالة التحميل** (loading)
- ✅ **رسائل الأخطاء** (error)
- ✅ **Functions للتفاعل** مع API

### 3. إزالة localStorage تدريجياً
بعد ربط كل API، يمكن إزالة استخدام localStorage من الملفات المحدثة.

---

## 🎯 النتيجة النهائية

بعد الربط الكامل، سيعرض المشروع:

### للطلاب:
- ✅ حجوزاتهم الفعلية من قاعدة البيانات
- ✅ إشعارات حقيقية عند تغيير حالة الحجوزات
- ✅ تأكيد الحضور المباشر للحصص
- ✅ تقييم المدرسين بعد انتهاء الحصص

### للمدرسين:
- ✅ حجوزاتهم وطلابهم من قاعدة البيانات
- ✅ تقييم الطلاب بعد الحصص
- ✅ إشعارات الحجوزات الجديدة

### للإدارة:
- ✅ إدارة شاملة لجميع الحجوزات
- ✅ إحصائيات حقيقية ومباشرة
- ✅ قبول/رفض الطلبات مع إشعارات تلقائية
- ✅ إضافة روابط الاجتماعات

### لجميع المستخدمين:
- ✅ نظام إشعارات فوري ومباشر
- ✅ تتبع دقيق للحضور والغياب
- ✅ نظام تقييمات متكامل
- ✅ واجهة سريعة مع معالجة أخطاء

## 🚀 جاهز للتشغيل!
المشروع الآن جاهز بالكامل لربط API وسيعمل بكفاءة عالية بمجرد إضافة عنوان الخادم في ملف الإعدادات.
