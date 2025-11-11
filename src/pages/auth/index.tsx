import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useToast } from "@/hooks/useToast";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { authStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import { SITE_MAP } from "@/constants";

const AuthPage = () => {
    const { isAuthenticated } = authStore();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [searchParams] = useSearchParams();
    const defaultTab =
        searchParams.get("type") === "register" ? "register" : "login";
    const [activeTab, setActiveTab] = useState(defaultTab);

    useEffect(() => {
        if (isAuthenticated) {
            navigate(SITE_MAP.site.studentProfile.href);
        }
    }, [isAuthenticated]);

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/40">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-blue-dark dark:text-blue-light">
                            {activeTab === "login"
                                ? "تسجيل الدخول"
                                : "إنشاء حساب جديد"}
                        </h2>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            {activeTab === "login" ? (
                                <>
                                    لا تملك حساباً بعد؟{" "}
                                    <button
                                        className="font-medium text-blue hover:text-blue-dark"
                                        onClick={() => setActiveTab("register")}
                                    >
                                        إنشاء حساب جديد
                                    </button>
                                </>
                            ) : (
                                <>
                                    لديك حساب بالفعل؟{" "}
                                    <button
                                        className="font-medium text-blue hover:text-blue-dark"
                                        onClick={() => setActiveTab("login")}
                                    >
                                        تسجيل الدخول
                                    </button>
                                </>
                            )}
                        </p>
                    </div>

                    <div className="bg-card text-card-foreground border shadow rounded-lg">
                        <Tabs
                            value={activeTab}
                            onValueChange={setActiveTab}
                            className="w-full"
                        >
                            <TabsList className="w-full grid grid-cols-2 rounded-t-lg rounded-b-none">
                                <TabsTrigger value="login">
                                    تسجيل الدخول
                                </TabsTrigger>
                                <TabsTrigger value="register">
                                    إنشاء حساب
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent
                                value="login"
                                className="p-6 focus:outline-none"
                            >
                                <LoginForm toast={addToast} />
                            </TabsContent>

                            <TabsContent
                                value="register"
                                className="p-6 focus:outline-none"
                            >
                                <RegisterForm toast={addToast} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
