
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Award, Book, MessageSquare, Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CalendarComponent from '@/components/Calendar';

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
      years: "2012 - 2014"
    },
    {
      degree: "بكالوريوس في الرياضيات",
      school: "جامعة الملك فهد للبترول والمعادن",
      years: "2008 - 2012"
    }
  ],
  experience: [
    {
      position: "أستاذ الرياضيات",
      organization: "مدرسة الأندلس الثانوية",
      years: "2018 - الآن"
    },
    {
      position: "مدرس مساعد",
      organization: "جامعة الملك سعود",
      years: "2014 - 2018"
    }
  ],
  subjects: [
    { name: "الجبر", level: "متوسط، ثانوي، جامعي" },
    { name: "الهندسة", level: "متوسط، ثانوي" },
    { name: "حساب التفاضل والتكامل", level: "ثانوي، جامعي" },
    { name: "الإحصاء", level: "ثانوي، جامعي" }
  ],
  certifications: [
    "شهادة تدريس الرياضيات المتقدمة",
    "شهادة تدريب المعلمين في طرق التدريس الحديثة"
  ],
  ratingDetails: {
    5: 80,
    4: 15,
    3: 3,
    2: 1,
    1: 1
  },
  reviews: [
    {
      id: "1",
      user: "سارة أحمد",
      rating: 5,
      date: "20 أبريل 2023",
      comment: "أستاذ ممتاز! شرحه واضح جدًا وسهل الفهم. ساعدني كثيرًا في فهم حساب التفاضل والتكامل."
    },
    {
      id: "2",
      user: "محمد عبدالله",
      rating: 5,
      date: "15 مارس 2023",
      comment: "يقدم شرحًا مفصلاً ويتأكد من فهم الطالب قبل الانتقال للنقطة التالية. أوصي به بشدة."
    },
    {
      id: "3",
      user: "خالد العمر",
      rating: 4,
      date: "2 فبراير 2023",
      comment: "مدرس محترف وصبور. ساعدني في تحسين درجاتي في الرياضيات بشكل كبير."
    }
  ]
};

const TeacherProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: Date; timeSlot: string } | null>(null);
  
  // In a real app, we would fetch the teacher data based on the ID
  const teacher = teacherData;
  
  const handleTimeSelected = (date: Date, timeSlot: string) => {
    setSelectedDateTime({ date, timeSlot });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" className="mb-6" onClick={() => window.history.back()}>
          <ArrowRight className="ml-2 h-4 w-4" /> العودة
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Teacher Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row">
                <div className="mb-4 md:mb-0 md:ml-6">
                  <Avatar className="h-24 w-24 md:h-32 md:w-32">
                    <AvatarImage src={teacher.image} alt={teacher.name} />
                    <AvatarFallback>{teacher.name.split(' ').map(part => part[0]).join('')}</AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold">{teacher.name}</h1>
                      <p className="text-gray-600 mb-2">{teacher.title}</p>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              size={18}
                              className={`fill-current ${star <= Math.floor(teacher.rating) ? "text-amber" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="font-bold mx-2">{teacher.rating}</span>
                        <span className="text-gray-600">({teacher.reviewCount} تقييم)</span>
                      </div>
                      
                      <div className="flex flex-wrap items-center text-gray-600 mb-2">
                        <MapPin size={16} className="ml-1" />
                        <span>{teacher.location}</span>
                      </div>
                      
                      <div className="flex flex-wrap items-center text-gray-600">
                        <User size={16} className="ml-1" />
                        <span>{teacher.studentCount} طالب</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      <div className="text-left md:text-right">
                        <p className="text-sm text-gray-500">السعر بالساعة</p>
                        <p className="text-2xl font-bold text-blue">{teacher.price} ريال</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <Tabs defaultValue="about" className="bg-white rounded-lg shadow-md">
              <TabsList className="w-full border-b">
                <TabsTrigger value="about" className="flex-1 py-3">نبذة عن المدرس</TabsTrigger>
                <TabsTrigger value="subjects" className="flex-1 py-3">المواد</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1 py-3">التقييمات</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="p-6 focus:outline-none">
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">نبذة</h3>
                  <div className="whitespace-pre-line text-gray-700">
                    {teacher.about}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">التعليم</h3>
                  <div className="space-y-4">
                    {teacher.education.map((edu, i) => (
                      <div key={i} className="flex">
                        <div className="ml-4 text-blue">
                          <Book size={20} />
                        </div>
                        <div>
                          <p className="font-bold">{edu.degree}</p>
                          <p className="text-gray-600">{edu.school}</p>
                          <p className="text-gray-500 text-sm">{edu.years}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">الخبرة</h3>
                  <div className="space-y-4">
                    {teacher.experience.map((exp, i) => (
                      <div key={i} className="flex">
                        <div className="ml-4 text-teal">
                          <Award size={20} />
                        </div>
                        <div>
                          <p className="font-bold">{exp.position}</p>
                          <p className="text-gray-600">{exp.organization}</p>
                          <p className="text-gray-500 text-sm">{exp.years}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">الشهادات</h3>
                  <div className="space-y-2">
                    {teacher.certifications.map((cert, i) => (
                      <div key={i} className="flex items-center">
                        <div className="ml-2 text-blue">
                          <Award size={16} />
                        </div>
                        <p>{cert}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="subjects" className="p-6 focus:outline-none">
                <div className="space-y-6">
                  {teacher.subjects.map((subject, i) => (
                    <div key={i} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <h3 className="text-lg font-bold mb-2">{subject.name}</h3>
                      <p className="text-gray-600 mb-3">المستويات: {subject.level}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge>المفاهيم الأساسية</Badge>
                        <Badge>التطبيقات العملية</Badge>
                        <Badge>التحضير للاختبارات</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">اللغات</h3>
                  <div className="flex flex-wrap gap-3">
                    {teacher.languages.map((lang, i) => (
                      <Badge key={i} variant="outline" className="text-gray-700">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="p-6 focus:outline-none">
                <div className="mb-8 flex flex-col md:flex-row items-center gap-8">
                  <div className="text-center mb-4 md:mb-0">
                    <div className="text-4xl font-bold text-blue mb-1">{teacher.rating}</div>
                    <div className="flex mb-1 justify-center">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          size={18}
                          className={`fill-current ${star <= Math.floor(teacher.rating) ? "text-amber" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <div className="text-gray-600">{teacher.reviewCount} تقييم</div>
                  </div>
                  
                  <div className="flex-1 w-full md:w-auto">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center mb-2">
                        <div className="w-8 text-sm text-gray-600">{rating}</div>
                        <div className="mx-2 flex-1">
                          <Progress value={teacher.ratingDetails[rating]} className="h-2" />
                        </div>
                        <div className="w-8 text-sm text-gray-600">{teacher.ratingDetails[rating]}%</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">آراء الطلاب</h3>
                  <div className="space-y-6">
                    {teacher.reviews.map(review => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                        <div className="flex justify-between mb-2">
                          <div className="font-bold">{review.user}</div>
                          <div className="text-gray-500 text-sm">{review.date}</div>
                        </div>
                        <div className="flex mb-2">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              size={16}
                              className={`fill-current ${star <= review.rating ? "text-amber" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-bold mb-2">احجز موعدًا</h3>
                  <p className="text-gray-600">اختر الوقت المناسب لك</p>
                </div>
                
                <CalendarComponent onTimeSelected={handleTimeSelected} />
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">تواصل مع المدرس</h3>
                <Button className="w-full flex items-center justify-center mb-3" variant="outline">
                  <MessageSquare className="ml-2 h-5 w-5" /> مراسلة
                </Button>
                <Button className="w-full flex items-center justify-center" variant="outline">
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
