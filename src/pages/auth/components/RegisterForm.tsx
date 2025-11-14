import { Toast } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useAuthServices } from "@/services/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
    toast: (toast: Omit<Toast, "id">) => string;
};

const schema = z.object({
    name: z
        .string()
        .min(3, "يرجى إدخال اسم صحيح")
        .max(50, "يرجى إدخال اسم صحيح"),
    email: z
        .string()
        .email("يرجى إدخال بريد إلكتروني صحيح")
        .min(5, "يرجى إدخال بريد إلكتروني صحيح")
        .max(100, "يرجى إدخال بريد إلكتروني صحيح"),
    phone: z
        .string()
        .min(11, "يرجى إدخال رقم هاتف صحيح")
        .max(11, "يرجى إدخال رقم هاتف صحيح"),
    password: z
        .string()
        .min(6, "يرجى إدخال كلمة مرور قوية")
        .max(50, "يرجى إدخال كلمة مرور قوية"),
    confirmPassword: z
        .string()
        .min(6, "يرجى إدخال كلمة مرور قوية")
        .max(50, "يرجى إدخال كلمة مرور قوية"),
    bio: z.string().min(10, "يرجى إدخال ملخص قصير").optional(),
});

type Schema = z.infer<typeof schema>;

function RegisterForm({ toast }: Props) {
    const { register } = useAuthServices();

    const { mutateAsync: registerMutation, isPending: isPendingRegister } =
        register.student();

    const { control, handleSubmit } = useForm<Schema>({
        resolver: zodResolver(schema),
    });

    const handleRegister = async (data: Schema) => {
        registerMutation(
            {
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password,
                role: "STUDENT",
                bio: data.bio || "",
            },
            {
                onSuccess: () => {
                    toast({
                        title: "تم التسجيل بنجاح",
                        message: "تم التسجيل بنجاح",
                        type: "success",
                    });
                },
                onError: (err:any) => {
                    toast({
                        title: "فشل التسجيل",
                        message: err.error,
                        type: "error",
                    });
                },
            }
        );
    };

    return (
        <form
            onSubmit={handleSubmit(handleRegister)}
            className="space-y-6"
            dir="rtl"
        >
            <div className="space-y-2">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input
                    control={control}
                    name="name"
                    id="name"
                    placeholder="الاسم الكامل"
                    required
                    disabled={isPendingRegister}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                    control={control}
                    name="email"
                    id="email"
                    type="email"
                    placeholder="البريد الإلكتروني"
                    required
                    disabled={isPendingRegister}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                    control={control}
                    name="phone"
                    id="phone"
                    type="tel"
                    placeholder="05XXXXXXXX"
                    required
                    disabled={isPendingRegister}
                />
            </div>

            {/* {userType === "student" && (
                <div className="space-y-2">
                    <Label htmlFor="educational-stage">المرحلة الدراسية</Label>
                    <Select
                        value={educationalStage}
                        onValueChange={(value: EducationalStage | "") =>
                            setEducationalStage(value)
                        }
                        disabled={isPendingRegister}
                    >
                        <SelectTrigger id="educational-stage">
                            <SelectValue placeholder="اختر المرحلة الدراسية" />
                        </SelectTrigger>
                        <SelectContent>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <h4 className="font-bold mb-1 px-2">
                                        المرحلة الابتدائية
                                    </h4>
                                    {educationalStages
                                        .slice(0, 6)
                                        .map((stage) => (
                                            <SelectItem
                                                key={stage}
                                                value={stage}
                                            >
                                                {stage}
                                            </SelectItem>
                                        ))}
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1 px-2">
                                        المرحلة الإعدادية
                                    </h4>
                                    {educationalStages
                                        .slice(6, 9)
                                        .map((stage) => (
                                            <SelectItem
                                                key={stage}
                                                value={stage}
                                            >
                                                {stage}
                                            </SelectItem>
                                        ))}
                                    <h4 className="font-bold mb-1 mt-2 px-2">
                                        المرحلة الثانوية
                                    </h4>
                                    {educationalStages
                                        .slice(9, 12)
                                        .map((stage) => (
                                            <SelectItem
                                                key={stage}
                                                value={stage}
                                            >
                                                {stage}
                                            </SelectItem>
                                        ))}
                                </div>
                            </div>
                        </SelectContent>
                    </Select>
                </div>
            )} */}

            <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                    control={control}
                    name="password"
                    id="password"
                    type="password"
                    placeholder="كلمة المرور (8 أحرف على الأقل)"
                    required
                    minLength={8}
                    disabled={isPendingRegister}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                <Input
                    control={control}
                    name="confirmPassword"
                    id="confirm-password"
                    type="password"
                    placeholder="تأكيد كلمة المرور"
                    required
                    minLength={8}
                    disabled={isPendingRegister}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="bio">نبذة شخصية</Label>
                <Input
                    control={control}
                    name="bio"
                    id="bio"
                    type="text"
                    placeholder="نبذة شخصية"
                    required
                    minLength={8}
                    disabled={isPendingRegister}
                />
            </div>

            {/* <div className="flex items-center">
                <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                    required
                    disabled={isPendingRegister}
                />
                <Label htmlFor="terms" className="mr-2">
                    أوافق على{" "}
                    <Link
                        to="/terms"
                        className="text-blue hover:text-blue-dark"
                    >
                        شروط الاستخدام
                    </Link>{" "}
                    و{" "}
                    <Link
                        to="/privacy"
                        className="text-blue hover:text-blue-dark"
                    >
                        سياسة الخصوصية
                    </Link>
                </Label>
            </div> */}

            <Button
                type="submit"
                className="w-full"
                disabled={isPendingRegister}
            >
                {isPendingRegister ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
            </Button>
        </form>
    );
}
export default RegisterForm;
