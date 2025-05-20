
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// تعريف أنواع المستخدمين
export type UserRole = "student" | "teacher" | "admin";

// تعريف المراحل الدراسية للطلاب
export type EducationalStage = 
  | "أولى ابتدائي"
  | "ثانية ابتدائي"
  | "ثالثة ابتدائي"
  | "رابعة ابتدائي"
  | "خامسة ابتدائي"
  | "سادسة ابتدائي"
  | "أولى إعدادي"
  | "ثانية إعدادي"
  | "ثالثة إعدادي"
  | "أولى ثانوي"
  | "ثانية ثانوي"
  | "ثالثة ثانوي";

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
  isApproved?: boolean; // للمدرسين: تم الموافقة عليه أم لا
  educationalStage?: EducationalStage; // المرحلة الدراسية للطلاب
}

// بيانات المسؤول الثابتة
const ADMIN_EMAIL = "admin@admin.com";
const ADMIN_PASSWORD = "admin123456";

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
    throw new Error("يجب استخدام useAuth داخل AuthProvider");
  }
  return context;
};

// مكون مزود سياق المصادقة
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // التحقق من حالة تسجيل الدخول عند تحميل التطبيق
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("خطأ في تحميل بيانات المستخدم:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);

    // إنشاء حساب مسؤول افتراضي إذا لم يكن موجودًا
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const adminExists = users.some((u: { email: string }) => u.email === ADMIN_EMAIL);

    if (!adminExists) {
      const adminUser = {
        id: "admin_" + Date.now(),
        name: "مسؤول النظام",
        email: ADMIN_EMAIL,
        role: "admin",
        isActive: true,
        isApproved: true,
        createdAt: new Date().toISOString(),
        password: ADMIN_PASSWORD, // في الواقع يجب تشفير كلمات المرور
      };

      localStorage.setItem("users", JSON.stringify([...users, adminUser]));
      console.log("تم إنشاء حساب المسؤول الافتراضي");
    }

    // إنشاء مصفوفة للحجوزات إذا لم تكن موجودة
    if (!localStorage.getItem("bookings")) {
      localStorage.setItem("bookings", JSON.stringify([]));
    }
  }, []);

  // وظيفة تسجيل الدخول
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // محاكاة تأخير الاتصال بالخادم
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // التحقق من بيانات المستخدم
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      // للمدير - التحقق من الإيميل والباسورد الثابتين
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const adminUser = users.find((u: { email: string }) => u.email === ADMIN_EMAIL);
        if (adminUser) {
          const { password: _, ...userWithoutPassword } = adminUser;
          setUser(userWithoutPassword);
          localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          setIsLoading(false);
          return true;
        }
      }
      
      // للمستخدمين الآخرين
      const foundUser = users.find(
        (u: { email: string; password: string }) =>
          u.email === email && u.password === password
      );

      if (foundUser) {
        // التحقق من أن المستخدم نشط
        if (foundUser.isActive === false) {
          setIsLoading(false);
          return false; // المستخدم تم إيقافه
        }
        
        // التحقق من الموافقة للمدرسين
        if (foundUser.role === "teacher" && foundUser.isApproved === false) {
          setIsLoading(false);
          return false; // المدرس لم تتم الموافقة عليه بعد
        }

        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("خطأ في تسجيل الدخول:", error);
      setIsLoading(false);
      return false;
    }
  };

  // وظيفة إنشاء حساب جديد
  const register = async (
    userData: Partial<User>,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      // محاكاة تأخير الاتصال بالخادم
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // التحقق من عدم تكرار البريد الإلكتروني
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.some((u: { email: string }) => u.email === userData.email)) {
        setIsLoading(false);
        return false; // البريد الإلكتروني مستخدم بالفعل
      }

      // إنشاء مستخدم جديد
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone,
        role: userData.role || "student",
        createdAt: new Date().toISOString(),
        avatar: userData.avatar,
        isActive: true, // المستخدم نشط افتراضيًا
        isApproved: userData.role === "teacher" ? false : true, // المدرسون يحتاجون للموافقة، بينما الطلاب لا يحتاجون
        educationalStage: userData.educationalStage, // إضافة المرحلة الدراسية للطلاب
      };

      // حفظ المستخدم مع كلمة المرور في التخزين المحلي
      users.push({ ...newUser, password });
      localStorage.setItem("users", JSON.stringify(users));

      // للطلاب والمسؤول: تسجيل الدخول تلقائيًا بعد التسجيل
      // للمدرسين: لا يتم تسجيل الدخول حتى تتم الموافقة
      if (newUser.role !== "teacher") {
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
      }

      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("خطأ في إنشاء الحساب:", error);
      setIsLoading(false);
      return false;
    }
  };

  // وظيفة تسجيل الخروج
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
