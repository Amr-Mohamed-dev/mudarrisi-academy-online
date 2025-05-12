
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <section className="mb-16 text-center">
            <h1 className="text-4xl font-bold mb-6">من نحن</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              منصة المدرسين هي منصة تعليمية رائدة تهدف إلى ربط الطلاب مع أفضل المدرسين المؤهلين.
              نحن نؤمن بأن التعليم الجيد هو حق للجميع، ونسعى لتوفير تجربة تعليمية متميزة سهلة الوصول.
            </p>
          </section>
          
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-light/20 text-blue mb-4">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">الاختيار المناسب</h3>
                <p className="text-gray-600">
                  نقدم مجموعة واسعة من المدرسين المؤهلين في مختلف المواد الدراسية لتناسب احتياجاتك التعليمية.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-light/20 text-blue mb-4">
                  <Award size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">جودة عالية</h3>
                <p className="text-gray-600">
                  نضمن جودة التعليم من خلال اختيار مدرسين ذوي خبرة وكفاءة عالية وتقييم مستمر لأدائهم.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-light/20 text-blue mb-4">
                  <Check size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">سهولة الاستخدام</h3>
                <p className="text-gray-600">
                  منصة سهلة الاستخدام تمكنك من البحث عن المدرسين وحجز الدروس ومتابعة تقدمك بكل سهولة.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">رؤيتنا</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <p className="text-lg leading-relaxed mb-6">
                نطمح أن نكون الوجهة الأولى للتعليم الإلكتروني عالي الجودة في العالم العربي، 
                ونسعى لتمكين كل طالب من الوصول إلى أفضل المدرسين بغض النظر عن موقعه الجغرافي.
              </p>
              
              <p className="text-lg leading-relaxed">
                نؤمن بأن التعليم هو أساس التقدم وأن كل طالب يستحق فرصة الحصول على تعليم متميز.
                من خلال منصتنا، نسعى لجسر الفجوة بين الطلاب والمعلمين وتوفير بيئة تعليمية تفاعلية ومثمرة.
              </p>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">كيف نعمل</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="space-y-8">
                <div className="flex">
                  <div className="ml-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">ابحث عن مدرس</h3>
                    <p className="text-gray-600">
                      استكشف قائمة المدرسين المؤهلين وابحث حسب المادة أو المستوى التعليمي أو التقييمات.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="ml-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">حجز موعد</h3>
                    <p className="text-gray-600">
                      اختر المدرس المناسب وحدد الوقت المناسب لك لحجز درس خصوصي.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="ml-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">تعلم وتقدم</h3>
                    <p className="text-gray-600">
                      استفد من الدروس عالية الجودة وتابع تقدمك مع مدرسك المفضل.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="ml-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue text-white font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">قيم تجربتك</h3>
                    <p className="text-gray-600">
                      شارك رأيك حول الدرس والمدرس لمساعدة الطلاب الآخرين في اختياراتهم.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-3xl font-bold mb-6 text-center">تواصل معنا</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <p className="text-center text-lg mb-6">
                نحن هنا للإجابة على استفساراتكم ومساعدتكم في أي وقت.
              </p>
              
              <div className="max-w-md mx-auto space-y-4">
                <div className="flex justify-between">
                  <span className="font-bold">البريد الإلكتروني:</span>
                  <span className="text-blue">info@teachersplatform.com</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-bold">رقم الهاتف:</span>
                  <span>+966 123 456 789</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-bold">العنوان:</span>
                  <span>الرياض، المملكة العربية السعودية</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
