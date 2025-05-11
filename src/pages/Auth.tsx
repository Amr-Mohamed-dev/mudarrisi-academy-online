
import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('type') === 'register' ? 'register' : 'login';
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Register form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [userType, setUserType] = useState('student');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API endpoint to authenticate the user
    console.log('Login with:', { loginEmail, loginPassword, rememberMe });
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API endpoint to register the user
    console.log('Register with:', { name, email, phone, password, userType, termsAccepted });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-blue-dark">
              {activeTab === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {activeTab === 'login' ? (
                <>
                  لا تملك حساباً بعد؟{' '}
                  <button
                    className="font-medium text-blue hover:text-blue-dark"
                    onClick={() => setActiveTab('register')}
                  >
                    إنشاء حساب جديد
                  </button>
                </>
              ) : (
                <>
                  لديك حساب بالفعل؟{' '}
                  <button
                    className="font-medium text-blue hover:text-blue-dark"
                    onClick={() => setActiveTab('login')}
                  >
                    تسجيل الدخول
                  </button>
                </>
              )}
            </p>
          </div>
          
          <div className="bg-white shadow rounded-lg">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-2 rounded-t-lg rounded-b-none">
                <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
                <TabsTrigger value="register">إنشاء حساب</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="p-6 focus:outline-none">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">البريد الإلكتروني</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="البريد الإلكتروني"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">كلمة المرور</Label>
                      <Link to="/forgot-password" className="text-sm text-blue hover:text-blue-dark">
                        نسيت كلمة المرور؟
                      </Link>
                    </div>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="كلمة المرور"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(!!checked)}
                    />
                    <Label htmlFor="remember-me" className="mr-2">
                      تذكرني
                    </Label>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    تسجيل الدخول
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="p-6 focus:outline-none">
                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input
                      id="name"
                      placeholder="الاسم الكامل"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="البريد الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="05XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">كلمة المرور</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="كلمة المرور (8 أحرف على الأقل)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="تأكيد كلمة المرور"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>نوع الحساب</Label>
                    <div className="flex space-x-4 space-x-reverse">
                      <div className="flex items-center">
                        <input
                          id="student"
                          type="radio"
                          name="user-type"
                          value="student"
                          checked={userType === 'student'}
                          onChange={() => setUserType('student')}
                          className="ml-2 h-4 w-4 text-blue border-gray-300"
                        />
                        <Label htmlFor="student">طالب</Label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="teacher"
                          type="radio"
                          name="user-type"
                          value="teacher"
                          checked={userType === 'teacher'}
                          onChange={() => setUserType('teacher')}
                          className="ml-2 h-4 w-4 text-blue border-gray-300"
                        />
                        <Label htmlFor="teacher">مدرس</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                      required
                    />
                    <Label htmlFor="terms" className="mr-2">
                      أوافق على{' '}
                      <Link to="/terms" className="text-blue hover:text-blue-dark">
                        شروط الاستخدام
                      </Link>{' '}
                      و{' '}
                      <Link to="/privacy" className="text-blue hover:text-blue-dark">
                        سياسة الخصوصية
                      </Link>
                    </Label>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    إنشاء الحساب
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Auth;
