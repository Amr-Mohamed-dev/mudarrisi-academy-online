
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeacherCard from '@/components/TeacherCard';
import SubjectFilter from '@/components/SubjectFilter';
import { User } from '@/contexts/AuthContext';

interface Teacher {
  id: string;
  name: string;
  subject: string;
  rating: number;
  price: number;
  image: string;
  subjects: string[];
  available: boolean;
  isActive?: boolean;
  isApproved?: boolean;
}

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [allSubjects, setAllSubjects] = useState<string[]>([]);
  
  // استرجاع بيانات المدرسين من التخزين المحلي
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // فلترة المدرسين: فقط المعتمدين والنشطين
    const teachersData = users.filter((user: User) => 
      user.role === 'teacher' && 
      user.isActive !== false && 
      user.isApproved === true
    );
    
    // إعداد البيانات للعرض
    const formattedTeachers: Teacher[] = teachersData.map((teacher: any) => ({
      id: teacher.id,
      name: teacher.name || 'مدرس',
      subject: teacher.mainSubject || 'متعدد المواد',
      rating: teacher.rating || 4.5,
      price: teacher.price || 150,
      image: teacher.image || '/placeholder.svg',
      subjects: teacher.subjects || ['الرياضيات', 'الفيزياء'],
      available: teacher.available !== false,
      isActive: teacher.isActive,
      isApproved: teacher.isApproved
    }));
    
    setTeachers(formattedTeachers);
    setFilteredTeachers(formattedTeachers);
    
    // استخراج جميع المواد الفريدة
    const subjects = new Set<string>();
    formattedTeachers.forEach(teacher => {
      teacher.subjects.forEach(subject => subjects.add(subject));
    });
    
    setAllSubjects(Array.from(subjects));
  }, []);
  
  // تحديث المدرسين المعروضين عند تغيير معايير البحث
  useEffect(() => {
    let filtered = teachers;
    
    // تطبيق البحث النصي
    if (searchTerm) {
      filtered = filtered.filter(teacher => 
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subjects.some(subj => subj.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // تطبيق تصفية المواد
    if (selectedSubjects.length > 0) {
      filtered = filtered.filter(teacher =>
        teacher.subjects.some(subject => selectedSubjects.includes(subject))
      );
    }
    
    setFilteredTeachers(filtered);
  }, [searchTerm, selectedSubjects, teachers]);
  
  // إضافة أو إزالة موضوع من المواضيع المحددة
  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };
  
  // إذا لم يكن هناك بيانات، عرض بيانات وهمية
  useEffect(() => {
    if (teachers.length === 0) {
      const dummyTeachers: Teacher[] = [
        {
          id: '1',
          name: 'أحمد محمد',
          subject: 'الرياضيات',
          rating: 4.8,
          price: 150,
          image: '/placeholder.svg',
          subjects: ['الجبر', 'الهندسة', 'التفاضل'],
          available: true,
          isActive: true,
          isApproved: true
        },
        {
          id: '2',
          name: 'سارة علي',
          subject: 'اللغة الإنجليزية',
          rating: 4.9,
          price: 170,
          image: '/placeholder.svg',
          subjects: ['القواعد', 'المحادثة', 'الكتابة'],
          available: false,
          isActive: true,
          isApproved: true
        },
        {
          id: '3',
          name: 'محمد خالد',
          subject: 'الفيزياء',
          rating: 4.7,
          price: 160,
          image: '/placeholder.svg',
          subjects: ['الميكانيكا', 'الكهرباء', 'الديناميكا'],
          available: true,
          isActive: true,
          isApproved: true
        },
        {
          id: '4',
          name: 'فاطمة أحمد',
          subject: 'الكيمياء',
          rating: 4.6,
          price: 155,
          image: '/placeholder.svg',
          subjects: ['العضوية', 'غير العضوية', 'التحليلية'],
          available: true,
          isActive: true,
          isApproved: true
        }
      ];
      
      setTeachers(dummyTeachers);
      setFilteredTeachers(dummyTeachers);
      
      // استخراج المواد الفريدة من البيانات الوهمية
      const subjects = new Set<string>();
      dummyTeachers.forEach(teacher => {
        teacher.subjects.forEach(subject => subjects.add(subject));
      });
      
      setAllSubjects(Array.from(subjects));
    }
  }, [teachers]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">المدرسين المتميزين</h1>
            <p className="text-gray-600">
              ابحث عن أفضل المدرسين في مختلف المواد واحجز دروسك الآن
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-1/4">
              <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="font-bold text-lg mb-4">تصفية البحث</h2>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">المواد</label>
                  <SubjectFilter 
                    subjects={allSubjects}
                    selectedSubjects={selectedSubjects}
                    onChange={toggleSubject}
                  />
                </div>
                
                <Button variant="outline" className="w-full" onClick={() => setSelectedSubjects([])}>
                  إعادة ضبط التصفية
                </Button>
              </div>
            </div>
            
            <div className="md:w-3/4">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    className="px-10 pl-4"
                    placeholder="ابحث عن مدرس أو مادة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher) => (
                    <TeacherCard key={teacher.id} {...teacher} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-xl text-gray-500">لم يتم العثور على مدرسين مطابقين لمعايير البحث</p>
                    <Button 
                      variant="link" 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedSubjects([]);
                      }}
                    >
                      إعادة ضبط البحث
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Teachers;
