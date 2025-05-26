
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("يجب استخدام useTheme داخل ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // تحميل إعداد الـ Dark Mode عند تحميل التطبيق
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    const userTheme = user ? localStorage.getItem(`darkMode_${user.id}`) : null;
    
    // إذا كان المستخدم مسجل دخول، استخدم إعداده الشخصي
    if (user && userTheme !== null) {
      setIsDarkMode(userTheme === "true");
    } else if (savedTheme !== null) {
      // إذا لم يكن مسجل دخول، استخدم الإعداد العام
      setIsDarkMode(savedTheme === "true");
    } else {
      // افتراضياً استخدم النظام
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, [user]);

  // تطبيق الـ Dark Mode على العنصر الجذر
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // حفظ الإعداد
    if (user) {
      // حفظ خاص بالمستخدم
      localStorage.setItem(`darkMode_${user.id}`, newMode.toString());
    } else {
      // حفظ عام
      localStorage.setItem("darkMode", newMode.toString());
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
