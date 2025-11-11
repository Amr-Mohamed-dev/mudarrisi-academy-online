import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toast } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import { useAuthServices } from "@/services/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SITE_MAP } from "@/constants";

type Props = {
    toast: (toast: Omit<Toast, "id">) => string;
};

const schema = z.object({
    phone: z
        .string()
        .min(11, "يرجى إدخال رقم هاتف صحيح")
        .max(11, "يرجى إدخال رقم هاتف صحيح"),
    password: z.string().min(6, "يرجى إدخال كلمة مرور قوية"),
});

type Schema = z.infer<typeof schema>;

function LoginForm({ toast }: Props) {
    const navigate = useNavigate();
    const { login } = useAuthServices();

    const { mutateAsync: loginMutation, isPending: isPendingLogin } = login();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Schema>({
        resolver: zodResolver(schema),
    });

    const handleLogin = async (data: Schema) => {
        loginMutation(
            {
                phone: data.phone,
                password: data.password,
            },
            {
                onSuccess: () => {
                    toast({
                        title: "تم تسجيل الدخول بنجاح",
                        message: "تم تسجيل الدخول بنجاح",
                        type: "success",
                    });
                    navigate(SITE_MAP.site.studentProfile.href);
                },
                onError: (err) => {
                    toast({
                        title: "فشل تسجيل الدخول",
                        message: err.message,
                        type: "error",
                    });
                },
            }
        );
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                    control={control}
                    name="phone"
                    type="tel"
                    placeholder="05XXXXXXXX"
                    required
                    disabled={isPendingLogin}
                />

                {errors.phone && (
                    <p className="text-red-500 text-sm">
                        {errors.phone.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">كلمة المرور</Label>
                    <Link
                        to="/forgot-password"
                        className="text-sm text-blue hover:text-blue-dark"
                    >
                        نسيت كلمة المرور؟
                    </Link>
                </div>
                <Input
                    control={control}
                    name="password"
                    type="password"
                    placeholder="كلمة المرور"
                    required
                    disabled={isPendingLogin}
                />

                {errors.password && (
                    <p className="text-red-500 text-sm">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* <div className="flex items-center">
                <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                    disabled={isPendingLogin}
                />
                <Label htmlFor="remember-me" className="mr-2">
                    تذكرني
                </Label>
            </div> */}

            <Button type="submit" className="w-full" disabled={isPendingLogin}>
                {isPendingLogin ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
        </form>
    );
}
export default LoginForm;
