import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageSquare, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CalendarComponent from "@/components/Calendar";
import ProfileHeader from "@/components/profile/ProfileHeader";
import EducationExperience from "@/components/profile/EducationExperience";
import ReviewsSection from "@/components/profile/ReviewsSection";
import SubjectsSection from "@/components/profile/SubjectsSection";
import { useToast } from "@/components/ui/use-toast";

// Mock teacher data
const teacherData = {
  id: "1",
  name: "أحمد محمد",
  title: "أستاذ الرياضيات",
  rating: 4.8,
  reviewCount: 248,
  studentCount: 523,
  location: "الرياض، المملكة العربية السعودية",
  image: "/placeholder.svg",
  price: 150,
  languages: ["العربية", "الإنجليزية"],
  about: `أنا أحمد، مدرس رياضيات حاصل على درجة الماجستير في الرياضيات التطبيقية مع خبرة تدريس تزيد عن 8 سنوات. أقدم دروسًا في مختلف فروع الرياضيات بما في ذلك الجبر، الهندسة، حساب التفاضل والتكامل، والإحصاء.

أؤمن بأن كل طالب يتعلم بطريقة مختلفة، لذلك أقوم بتخصيص أسلوب التدريس ليناسب احتياجات كل طالب. أركز على بناء فهم عميق للمفاهيم الرياضية بدلاً من مجرد حفظ الصيغ والإجراءات.

لدي سجل حافل من النجاح مع الطلاب من جميع المستويات، من المدرسة المتوسطة إلى المستوى الجامعي. أنا متحمس لمساعدتك في تحقيق أهدافك الأكاديمية!`,
  education: [
    {
      degree: "ماجستير في الرياضيات التطبيقية",
      school: "جامعة الملك سعود",
      years: "2012 - 2014",
    },
    {
      degree: "بكالوريوس في الرياضيات",
      school: "جامعة الملك فهد للبترول والمعادن",
      years: "2008 - 2012",
    },
  ],
  experience: [
    {
      position: "أستاذ الرياضيات",
      organization: "مدرسة الأندلس الثانوية",
      years: "2018 - الآن",
    },
    {
      position: "مدرس مساعد",
      organization: "جامعة الملك سعود",
      years: "2014 - 2018",
    },
  ],
  subjects: [
    { name: "الجبر", level: "متوسط، ثانوي، جامعي" },
    { name: "الهندسة", level: "متوسط، ثانوي" },
    { name: "حساب التفاضل والتكامل", level: "ثانوي، جامعي" },
    { name: "الإحصاء", level: "ثانوي، جامعي" },
  ],
  certifications: [
    "شهادة تدريس الرياضيات المتقدمة",
    "شهادة تدريب المعلمين في طرق التدريس الحديثة",
  ],
  ratingDetails: {
    5: 80,
    4: 15,
    3: 3,
    2: 1,
    1: 1,
  },
  reviews: [
    {
      id: "1",
      user: "سارة أحمد",
      rating: 5,
      date: "20 أبريل 2023",
      comment:
        "أستاذ ممتاز! شرحه واضح جدًا وسهل الفهم. ساعدني كثيرًا في فهم حساب التفاضل والتكامل.",
    },
    {
      id: "2",
      user: "محمد عبدالله",
      rating: 5,
      date: "15 مارس 2023",
      comment:
        "يقدم شرحًا مفصلاً ويتأكد من فهم الطالب قبل الانتقال للنقطة التالية. أوصي به بشدة.",
    },
    {
      id: "3",
      user: "خالد العمر",
      rating: 4,
      date: "2 فبراير 2023",
      comment:
        "مدرس محترف وصبور. ساعدني في تحسين درجاتي في الرياضيات بشكل كبير.",
    },
  ],
  available: true,
};

const TeacherProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDateTime, setSelectedDateTime] = useState<{
    date: Date;
    timeSlot: string;
  } | null>(null);
  const [teacher, setTeacher] = useState(teacherData);

  // In a real app, we would fetch the teacher data based on the ID
  useEffect(() => {
    if (id) {
      // Get teacher data from localStorage or fallback to mock data
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const foundTeacher = users.find(
        (user: { id: string; role: string }) =>
          user.id === id && user.role === "teacher"
      );

      if (foundTeacher) {
        const teacherWithExtras = {
          ...teacherData,
          id: foundTeacher.id,
          name: foundTeacher.name || teacherData.name,
          image: foundTeacher.avatar || teacherData.image,
          price: foundTeacher.price || teacherData.price,
          available: foundTeacher.available !== false,
        };
        setTeacher(teacherWithExtras);
      }
    }
  }, [id]);

  const handleTimeSelected = (date: Date, timeSlot: string) => {
    setSelectedDateTime({ date, timeSlot });
    toast({
      title: "تم اختيار الموعد",
      description: `${date.toLocaleDateString("ar-SA")} - ${timeSlot}`,
    });
  };

  const handleBooking = () => {
    if (!selectedDateTime) {
      toast({
        title: "لم يتم اختيار موعد",
        description: "يرجى اختيار موعد أولاً",
        variant: "destructive",
      });
      return;
    }

    navigate(`/booking/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => window.history.back()}>
          <ArrowRight className="ml-2 h-4 w-4" /> العودة
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <ProfileHeader
              name={teacher.name}
              title={teacher.title}
              location={teacher.location}
              image={teacher.image}
              rating={teacher.rating}
              reviewCount={teacher.reviewCount}
              price={teacher.price}
              studentCount={teacher.studentCount}
              isAvailable={teacher.available}
            />

            <Tabs
              defaultValue="about"
              className="bg-card text-card-foreground rounded-lg shadow-md border">
              <TabsList className="w-full border-b">
                <TabsTrigger value="about" className="flex-1 py-3">
                  نبذة عن المدرس
                </TabsTrigger>
                <TabsTrigger value="subjects" className="flex-1 py-3">
                  المواد
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1 py-3">
                  التقييمات
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="p-6 focus:outline-none">
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">نبذة</h3>
                  <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                    {teacher.about}
                  </div>
                </div>

                <EducationExperience
                  education={teacher.education}
                  experience={teacher.experience}
                  certifications={teacher.certifications}
                />
              </TabsContent>

              <TabsContent value="subjects" className="p-6 focus:outline-none">
                <SubjectsSection
                  subjects={teacher.subjects}
                  languages={teacher.languages}
                />
              </TabsContent>

              <TabsContent value="reviews" className="p-6 focus:outline-none">
                <ReviewsSection
                  rating={teacher.rating}
                  reviewCount={teacher.reviewCount}
                  ratingDetails={teacher.ratingDetails}
                  reviews={teacher.reviews}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24">
              <div className="bg-card text-card-foreground border rounded-lg shadow-md mb-6">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-bold mb-2">احجز موعدًا</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    اختر الوقت المناسب لك
                  </p>
                  <p className="font-bold text-lg text-blue-600 dark:text-blue-light mt-2">
                    {teacher.price} ريال / ساعة
                  </p>
                  <p className="text-yellow-600 dark:text-yellow-500 text-sm mt-1">
                    * جميع الحجوزات تخضع لموافقة إدارة المنصة
                  </p>
                </div>

                <CalendarComponent onTimeSelected={handleTimeSelected} />

                <div className="p-6">
                  <Button
                    className="w-full"
                    onClick={handleBooking}
                    disabled={!selectedDateTime}>
                    تأكيد الحجز
                  </Button>
                </div>
              </div>

              <div className="bg-card text-card-foreground border rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">تواصل مع المدرس</h3>
                <Button
                  className="w-full flex items-center justify-center mb-3"
                  variant="outline">
                  <MessageSquare className="ml-2 h-5 w-5" /> مراسلة
                </Button>
                <Button
                  className="w-full flex items-center justify-center"
                  variant="outline">
                  <Calendar className="ml-2 h-5 w-5" /> طلب موعد
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default TeacherProfile;
