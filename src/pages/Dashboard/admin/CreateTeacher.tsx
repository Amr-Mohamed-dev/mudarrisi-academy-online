import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, ArrowLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/useToast";
import { usersService, notificationsService } from "@/services/dataService";

// ✅ شلنا password من الـ schema
const createTeacherSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email: z.string().email("بريد إلكتروني غير صحيح"),
  phone: z.string().min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل"),
  subjects: z.array(z.string()).min(1, "يجب اختيار مادة واحدة على الأقل"),
  bio: z.string().optional(),
  hourlyRate: z.number().min(1, "السعر يجب أن يكون أكثر من 0"),
  experience: z.string().optional(),
  education: z.string().optional(),
});

type CreateTeacherFormData = z.infer<typeof createTeacherSchema>;

const subjects = [
  "الرياضيات",
  "العلوم",
  "اللغة العربية",
  "اللغة الإنجليزية",
  "الفيزياء",
  "الكيمياء",
  "الأحياء",
  "التاريخ",
  "الجغرافيا",
  "الحاسوب",
  "الفنون",
  "الموسيقى",
];

const CreateTeacher = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateTeacherFormData>({
    resolver: zodResolver(createTeacherSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subjects: [],
      bio: "",
      hourlyRate: 50,
      experience: "",
      education: "",
    },
  });

  const addSubject = (subject: string) => {
    if (!selectedSubjects.includes(subject)) {
      const newSubjects = [...selectedSubjects, subject];
      setSelectedSubjects(newSubjects);
      form.setValue("subjects", newSubjects);
    }
  };

  const removeSubject = (subject: string) => {
    const newSubjects = selectedSubjects.filter((s) => s !== subject);
    setSelectedSubjects(newSubjects);
    form.setValue("subjects", newSubjects);
  };

  const onSubmit = async (data: CreateTeacherFormData) => {
    setIsLoading(true);

    try {
      // التحقق من وجود بريد إلكتروني مسبق
      const existingUsers = await usersService.getAll();
      const existingUser = existingUsers.find((u) => u.email === data.email);

      if (existingUser) {
        addToast({
          title: "خطأ",
          message: "البريد الإلكتروني مستخدم مسبقاً",
          type: "error",
        });
        setIsLoading(false);
        return;
      }

      // ✅ شلنا password من البيانات
      const newTeacher = await usersService.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: "TEACHER",
        bio: data.bio || "",
        isActive: true,
        isVerified: false,
        gender: "",
        code: `TEACHER_${Date.now()}`,
      });

      // إرسال إشعار ترحيب للمدرس
      await notificationsService.create({
        userId: newTeacher.id,
        title: "مرحباً بك كمدرس",
        message: `تم إنشاء حسابك بنجاح. يمكنك الآن تسجيل الدخول وبدء تقديم الدروس. سيتم إرسال كلمة مرور مؤقتة على بريدك الإلكتروني.`,
        read: false,
      });

      addToast({
        title: "تم إنشاء المدرس بنجاح",
        message: `تم إنشاء حساب المدرس ${data.name}. سيتم إرسال كلمة مرور مؤقتة إلى بريده الإلكتروني.`,
        type: "success",
      });

      navigate("/admin/teachers");
    } catch (error) {
      console.error("Error creating teacher:", error);
      addToast({
        title: "خطأ في إنشاء المدرس",
        message: "حدث خطأ أثناء إنشاء حساب المدرس. حاول مرة أخرى.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold">إدارة المدرسين</h1>
          <div>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/teachers")}
              className="ml-4">
              العودة للمدرسين
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/admin")}
              className="mr-4">
              لوحة التحكم
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserPlus className="ml-2 h-5 w-5" />
            بيانات المدرس الجديد
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* البيانات الأساسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الكامل</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل الاسم الكامل" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input placeholder="05xxxxxxxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* المواد التدريسية */}
              <div className="space-y-4">
                <Label>المواد التدريسية</Label>
                <Select onValueChange={addSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المواد التدريسية" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects
                      .filter((subject) => !selectedSubjects.includes(subject))
                      .map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                {selectedSubjects.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedSubjects.map((subject) => (
                      <Badge
                        key={subject}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeSubject(subject)}>
                        {subject} ×
                      </Badge>
                    ))}
                  </div>
                )}
                {form.formState.errors.subjects && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.subjects.message}
                  </p>
                )}
              </div>

              {/* السعر */}
              <FormField
                control={form.control}
                name="hourlyRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>السعر بالساعة (ريال)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="50"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* الوصف والخبرة */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المؤهل التعليمي</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="بكالوريوس في الرياضيات"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>سنوات الخبرة</FormLabel>
                      <FormControl>
                        <Input placeholder="5 سنوات في التدريس" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نبذة شخصية</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="اكتب نبذة مختصرة عن المدرس وخبراته..."
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* أزرار الحفظ */}
              <div className="flex justify-end space-x-2 space-x-reverse">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/teachers")}
                  disabled={isLoading}>
                  إلغاء
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "جاري الإنشاء..." : "إنشاء المدرس"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTeacher;
