
import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useAuth, EducationalStage } from "@/contexts/AuthContext";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const defaultTab =
    searchParams.get("type") === "register" ? "register" : "login";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useAuth();

  // إعادة التوجيه إذا كان المستخدم مسجل الدخول بالفعل
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Register form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [userType, setUserType] = useState("student");
  const [educationalStage, setEducationalStage] = useState<EducationalStage | "">("");
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  // المراحل الدراسية المتاحة
  const educationalStages: EducationalStage[] = [
    "أولى ابتدائي", "ثانية ابتدائي", "ثالثة ابتدائي", 
    "رابعة ابتدائي", "خامسة ابتدائي", "سادسة ابتدائي",
    "أولى إعدادي", "ثانية إعدادي", "ثالثة إعدادي",
    "أولى ثانوي", "ثانية ثانوي", "ثالثة ثانوي"
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      toast.error("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    setIsLoginLoading(true);
    const success = await login(loginEmail, loginPassword);
    setIsLoginLoading(false);

    if (success) {
      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/");
    } else {
      toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة أو الحساب غير نشط");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // التحقق من البيانات المدخلة
    if (!name || !email || !password) {
      toast.error("يرجى إكمال جميع الحقول المطلوبة");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("كلمات المرور غير متطابقة");
      return;
    }

    if (!termsAccepted) {
      toast.error("يرجى الموافقة على الشروط والأحكام");
      return;
    }
    
    // التحقق من اختيار المرحلة الدراسية للطلاب
    if (userType === "student" && !educationalStage) {
      toast.error("يرجى تحديد المرحلة الدراسية");
      return;
    }

    setIsRegisterLoading(true);
    const userData = {
      name,
      email,
      phone,
      role: userType as "student" | "teacher",
      educationalStage: userType === "student" ? educationalStage as EducationalStage : undefined,
    };

    const success = await register(userData, password);
    setIsRegisterLoading(false);

    if (success) {
      if (userType === "teacher") {
        toast.success("تم إنشاء الحساب بنجاح! بانتظار موافقة المدير.");
        setActiveTab("login");
      } else {
        toast.success("تم إنشاء الحساب بنجاح!");
        navigate("/");
      }
    } else {
      toast.error("البريد الإلكتروني مستخدم بالفعل أو حدث خطأ");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-blue-dark">
              {activeTab === "login" ? "تسجيل الدخول" : "إنشاء حساب جديد"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {activeTab === "login" ? (
                <>
                  لا تملك حساباً بعد؟{" "}
                  <button
                    className="font-medium text-blue hover:text-blue-dark"
                    onClick={() => setActiveTab("register")}>
                    إنشاء حساب جديد
                  </button>
                </>
              ) : (
                <>
                  لديك حساب بالفعل؟{" "}
                  <button
                    className="font-medium text-blue hover:text-blue-dark"
                    onClick={() => setActiveTab("login")}>
                    تسجيل الدخول
                  </button>
                </>
              )}
            </p>
          </div>

          <div className="bg-white shadow rounded-lg">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full">
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
                      disabled={isLoginLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">كلمة المرور</Label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-blue hover:text-blue-dark">
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
                      disabled={isLoginLoading}
                    />
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(!!checked)}
                      disabled={isLoginLoading}
                    />
                    <Label htmlFor="remember-me" className="mr-2">
                      تذكرني
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoginLoading}>
                    {isLoginLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
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
                      disabled={isRegisterLoading}
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
                      disabled={isRegisterLoading}
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
                      disabled={isRegisterLoading}
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
                          checked={userType === "student"}
                          onChange={() => setUserType("student")}
                          className="ml-2 h-4 w-4 text-blue border-gray-300"
                          disabled={isRegisterLoading}
                        />
                        <Label htmlFor="student">طالب</Label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="teacher"
                          type="radio"
                          name="user-type"
                          value="teacher"
                          checked={userType === "teacher"}
                          onChange={() => setUserType("teacher")}
                          className="ml-2 h-4 w-4 text-blue border-gray-300"
                          disabled={isRegisterLoading}
                        />
                        <Label htmlFor="teacher">مدرس</Label>
                      </div>
                    </div>
                  </div>

                  {userType === "student" && (
                    <div className="space-y-2">
                      <Label htmlFor="educational-stage">المرحلة الدراسية</Label>
                      <Select
                        value={educationalStage}
                        onValueChange={setEducationalStage}
                        disabled={isRegisterLoading}>
                        <SelectTrigger id="educational-stage">
                          <SelectValue placeholder="اختر المرحلة الدراسية" />
                        </SelectTrigger>
                        <SelectContent>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <h4 className="font-bold mb-1 px-2">المرحلة الابتدائية</h4>
                              {educationalStages.slice(0, 6).map((stage) => (
                                <SelectItem key={stage} value={stage}>
                                  {stage}
                                </SelectItem>
                              ))}
                            </div>
                            <div>
                              <h4 className="font-bold mb-1 px-2">المرحلة الإعدادية</h4>
                              {educationalStages.slice(6, 9).map((stage) => (
                                <SelectItem key={stage} value={stage}>
                                  {stage}
                                </SelectItem>
                              ))}
                              <h4 className="font-bold mb-1 mt-2 px-2">المرحلة الثانوية</h4>
                              {educationalStages.slice(9, 12).map((stage) => (
                                <SelectItem key={stage} value={stage}>
                                  {stage}
                                </SelectItem>
                              ))}
                            </div>
                          </div>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

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
                      disabled={isRegisterLoading}
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
                      disabled={isRegisterLoading}
                    />
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                      required
                      disabled={isRegisterLoading}
                    />
                    <Label htmlFor="terms" className="mr-2">
                      أوافق على{" "}
                      <Link
                        to="/terms"
                        className="text-blue hover:text-blue-dark">
                        شروط الاستخدام
                      </Link>{" "}
                      و{" "}
                      <Link
                        to="/privacy"
                        className="text-blue hover:text-blue-dark">
                        سياسة الخصوصية
                      </Link>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isRegisterLoading}>
                    {isRegisterLoading
                      ? "جاري إنشاء الحساب..."
                      : "إنشاء الحساب"}
                  </Button>

                  {userType === "teacher" && (
                    <div className="mt-4 text-center text-sm text-amber">
                      <p>ملاحظة: حسابات المدرسين تتطلب موافقة الإدارة قبل التفعيل</p>
                    </div>
                  )}
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
