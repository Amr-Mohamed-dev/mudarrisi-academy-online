
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeacherCard from '@/components/TeacherCard';

// Mock data for teachers
const featuredTeachers = [
  {
    id: "1",
    name: "أحمد محمد",
    subject: "أستاذ الرياضيات",
    rating: 4.8,
    price: 150,
    image: "/placeholder.svg",
    subjects: ["الرياضيات", "الإحصاء", "الجبر"],
    available: true
  },
  {
    id: "2",
    name: "سارة علي",
    subject: "أستاذة اللغة الإنجليزية",
    rating: 4.5,
    price: 120,
    image: "/placeholder.svg",
    subjects: ["اللغة الإنجليزية", "المحادثة", "القواعد"],
    available: false
  },
  {
    id: "3",
    name: "محمد خالد",
    subject: "أستاذ الفيزياء",
    rating: 4.9,
    price: 170,
    image: "/placeholder.svg",
    subjects: ["الفيزياء", "الميكانيكا", "الكهرباء"],
    available: true
  },
  {
    id: "4",
    name: "نورة عبدالله",
    subject: "أستاذة الكيمياء",
    rating: 4.7,
    price: 160,
    image: "/placeholder.svg",
    subjects: ["الكيمياء", "الكيمياء العضوية", "الكيمياء التحليلية"],
    available: true
  }
];

// Mock data for subjects
const subjects = [
  { id: "math", name: "الرياضيات", count: 42, image: "/placeholder.svg" },
  { id: "english", name: "اللغة الإنجليزية", count: 38, image: "/placeholder.svg" },
  { id: "physics", name: "الفيزياء", count: 24, image: "/placeholder.svg" },
  { id: "chemistry", name: "الكيمياء", count: 18, image: "/placeholder.svg" },
  { id: "biology", name: "الأحياء", count: 15, image: "/placeholder.svg" },
  { id: "arabic", name: "اللغة العربية", count: 35, image: "/placeholder.svg" }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue to-blue-dark text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            ابحث عن أفضل المدرسين <span className="text-amber">لجميع المواد الدراسية</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            منصة المدرسين تساعدك في العثور على المدرسين المتخصصين في مختلف المواد وحجز مواعيد الدروس بسهولة
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-2 max-w-3xl mx-auto flex flex-col md:flex-row">
            <div className="flex-1 px-2 mb-2 md:mb-0">
              <input
                type="text"
                placeholder="ابحث عن مادة أو مدرس..."
                className="w-full p-3 text-gray-800 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-blue"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="bg-blue px-6 py-3">
              <Search className="ml-2 h-5 w-5" /> بحث
            </Button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <span className="text-gray-200">بحث سريع:</span>
            {["الرياضيات", "اللغة العربية", "اللغة الإنجليزية", "العلوم", "الفيزياء", "الكيمياء"].map((term, i) => (
              <button
                key={i}
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
                onClick={() => setSearchTerm(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* How it Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-dark">كيف تعمل المنصة</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-blue/10 rounded-full p-4 h-20 w-20 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-10 w-10 text-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">ابحث عن مدرس</h3>
              <p className="text-gray-600">ابحث عن المدرسين حسب المادة أو المرحلة الدراسية</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-blue/10 rounded-full p-4 h-20 w-20 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">راجع الملفات الشخصية</h3>
              <p className="text-gray-600">اطلع على تقييمات الطلاب ومؤهلات المدرسين وخبراتهم</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-blue/10 rounded-full p-4 h-20 w-20 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="h-10 w-10 text-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">احجز موعدًا</h3>
              <p className="text-gray-600">اختر الوقت المناسب لك واحجز درسك الأول بسهولة</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-blue/10 rounded-full p-4 h-20 w-20 mx-auto mb-4 flex items-center justify-center">
                <MessageSquare className="h-10 w-10 text-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">ابدأ بالتعلم</h3>
              <p className="text-gray-600">استمتع بالدروس واترك تقييمًا للمدرس بعد الانتهاء</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Teachers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-blue-dark">أفضل المدرسين</h2>
            <Link to="/teachers">
              <Button variant="outline">عرض الكل</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTeachers.map(teacher => (
              <TeacherCard key={teacher.id} {...teacher} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Browse by Subject */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-dark">تصفح حسب المادة</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {subjects.map(subject => (
              <Link
                key={subject.id}
                to={`/subjects/${subject.id}`}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-center"
              >
                <div className="mb-3 h-16 w-16 mx-auto">
                  <img
                    src={subject.image}
                    alt={subject.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold mb-1">{subject.name}</h3>
                <p className="text-gray-500 text-sm">{subject.count} مدرس</p>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/subjects">
              <Button>عرض جميع المواد</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-blue text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">ماذا يقول طلابنا</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <p className="mb-4 text-gray-100">
                "وجدت مدرس الرياضيات المثالي من خلال المنصة. شرحه واضح وبسيط، وساعدني كثيرًا في تحسين درجاتي."
              </p>
              <div className="flex items-center">
                <div className="ml-3 h-10 w-10 rounded-full bg-blue-dark"></div>
                <div>
                  <p className="font-bold">أحمد خالد</p>
                  <p className="text-sm text-gray-200">طالب في المرحلة الثانوية</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <p className="mb-4 text-gray-100">
                "منصة رائعة وسهلة الاستخدام. حجزت عدة دروس في اللغة الإنجليزية، والنتائج كانت مذهلة!"
              </p>
              <div className="flex items-center">
                <div className="ml-3 h-10 w-10 rounded-full bg-blue-dark"></div>
                <div>
                  <p className="font-bold">سارة محمد</p>
                  <p className="text-sm text-gray-200">طالبة جامعية</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <p className="mb-4 text-gray-100">
                "كأب، أقدر حقًا جودة المدرسين على المنصة وسهولة جدولة الدروس لأطفالي. توفر الكثير من الوقت والجهد."
              </p>
              <div className="flex items-center">
                <div className="ml-3 h-10 w-10 rounded-full bg-blue-dark"></div>
                <div>
                  <p className="font-bold">فهد عبدالله</p>
                  <p className="text-sm text-gray-200">ولي أمر</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-dark">هل أنت مستعد لبدء رحلة التعلم؟</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            انضم إلى الآلاف من الطلاب الذين يستفيدون من منصتنا للوصول إلى أفضل المدرسين
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth?type=register">
              <Button className="text-lg px-8 py-6">إنشاء حساب مجاني</Button>
            </Link>
            <Link to="/teachers">
              <Button variant="outline" className="text-lg px-8 py-6">تصفح المدرسين</Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
