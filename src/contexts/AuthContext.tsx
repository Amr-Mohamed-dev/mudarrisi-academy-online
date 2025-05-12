
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// تعريف أنواع المستخدمين
export type UserRole = 'student' | 'teacher' | 'admin';

// تعريف نموذج بيانات المستخدم
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  isActive?: boolean;
}

// تعريف نموذج بيانات سياق المصادقة
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>, password: string) => Promise<boolean>;
  logout: () => void;
}

// إنشاء السياق
const AuthContext = createContext<AuthContextType | null>(null);

// هوك مساعد لاستخدام سياق المصادقة
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('يجب استخدام useAuth داخل AuthProvider');
  }
  return context;
};

// مكون مزود سياق المصادقة
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // التحقق من حالة تسجيل الدخول عند تحميل التطبيق
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('خطأ في تحميل بيانات المستخدم:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
    
    // إنشاء حساب مسؤول افتراضي إذا لم يكن موجودًا
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const adminExists = users.some((u: any) => u.role === 'admin');
    
    if (!adminExists) {
      const adminUser = {
        id: 'admin_' + Date.now(),
        name: 'مسؤول النظام',
        email: 'admin@example.com',
        role: 'admin',
        isActive: true,
        createdAt: new Date().toISOString(),
        password: 'admin123' // في الواقع يجب تشفير كلمات المرور
      };
      
      localStorage.setItem('users', JSON.stringify([...users, adminUser]));
      console.log('تم إنشاء حساب المسؤول الافتراضي');
    }
    
    // إنشاء مصفوفة للحجوزات إذا لم تكن موجودة
    if (!localStorage.getItem('bookings')) {
      localStorage.setItem('bookings', JSON.stringify([]));
    }
  }, []);

  // وظيفة تسجيل الدخول
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // محاكاة تأخير الاتصال بالخادم
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // في تطبيق حقيقي، هنا سيتم الاتصال بـ API للتحقق من بيانات المستخدم
      // هذا مجرد تطبيق مؤقت للاختبار
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        // التحقق من أن المستخدم نشط
        if (foundUser.isActive === false) {
          setIsLoading(false);
          return false; // المستخدم تم إيقافه
        }
        
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('خطأ في تسجيل الدخول:', error);
      setIsLoading(false);
      return false;
    }
  };

  // وظيفة إنشاء حساب جديد
  const register = async (userData: Partial<User>, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // محاكاة تأخير الاتصال بالخادم
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // التحقق من عدم تكرار البريد الإلكتروني
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.some((u: any) => u.email === userData.email)) {
        setIsLoading(false);
        return false; // البريد الإلكتروني مستخدم بالفعل
      }
      
      // إنشاء مستخدم جديد
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone,
        role: userData.role || 'student',
        createdAt: new Date().toISOString(),
        avatar: userData.avatar,
        isActive: true, // المستخدم نشط افتراضيًا
      };
      
      // حفظ المستخدم مع كلمة المرور في التخزين المحلي
      users.push({ ...newUser, password });
      localStorage.setItem('users', JSON.stringify(users));
      
      // تسجيل الدخول تلقائياً بعد التسجيل
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('خطأ في إنشاء الحساب:', error);
      setIsLoading(false);
      return false;
    }
  };

  // وظيفة تسجيل الخروج
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // توفير السياق للمكونات الفرعية
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
