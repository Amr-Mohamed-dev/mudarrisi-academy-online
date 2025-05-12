
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, UserX, UserCheck, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { User } from '@/contexts/AuthContext';

const StudentsManagement = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
  const [studentTeachers, setStudentTeachers] = useState<User[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const itemsPerPage = 5;
  
  useEffect(() => {
    // جلب الطلاب من التخزين المحلي
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const studentsList = users.filter((user: User) => user.role === 'student');
    setStudents(studentsList);
    setFilteredStudents(studentsList);
  }, []);
  
  useEffect(() => {
    if (searchQuery) {
      const filtered = students.filter(
        student => student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  student.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStudents(filtered);
      setCurrentPage(1);
    } else {
      setFilteredStudents(students);
    }
  }, [searchQuery, students]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleViewTeachers = (student: User) => {
    setSelectedStudent(student);
    // محاكاة جلب مدرسين الطالب
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    // ابحث عن جميع الحجوزات لهذا الطالب
    const studentBookings = bookings.filter((booking: any) => booking.studentId === student.id);
    
    // احصل على معرفات المدرسين الفريدة
    const teacherIds = [...new Set(studentBookings.map((booking: any) => booking.teacherId))];
    
    // ابحث عن معلومات المدرسين
    const teachersList = users.filter((user: User) => 
      user.role === 'teacher' && teacherIds.includes(user.id)
    );
    
    setStudentTeachers(teachersList);
  };
  
  const handleToggleStatus = (student: User) => {
    // تحديث حالة الطالب (نشط/متوقف)
    const updatedStudent = { ...student, isActive: !student.isActive };
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((user: User) => 
      user.id === student.id ? { ...user, isActive: !student.isActive } : user
    );
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // تحديث القائمة المحلية
    setStudents(prevStudents => 
      prevStudents.map(s => s.id === student.id ? updatedStudent : s)
    );
    setFilteredStudents(prevFiltered => 
      prevFiltered.map(s => s.id === student.id ? updatedStudent : s)
    );
    
    toast.success(`تم ${student.isActive ? 'إيقاف' : 'تنشيط'} الطالب بنجاح`);
  };
  
  const handleDeleteStudent = () => {
    if (!selectedStudent) return;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.filter((user: User) => user.id !== selectedStudent.id);
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // تحديث القائمة المحلية
    setStudents(prevStudents => prevStudents.filter(s => s.id !== selectedStudent.id));
    setFilteredStudents(prevFiltered => prevFiltered.filter(s => s.id !== selectedStudent.id));
    
    setIsDeleteDialogOpen(false);
    setSelectedStudent(null);
    
    toast.success('تم حذف الطالب بنجاح');
  };
  
  // التقسيم إلى صفحات
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const renderPagination = () => {
    const pages = [];
    
    // الصفحة الأولى دائمًا
    pages.push(
      <PaginationItem key="first">
        <PaginationLink 
          onClick={() => setCurrentPage(1)} 
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // إضافة علامة القطع إذا كانت الصفحة الحالية > 3
    if (currentPage > 3) {
      pages.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // الصفحات القريبة من الصفحة الحالية
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => setCurrentPage(i)} 
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // إضافة علامة القطع إذا كانت الصفحة الحالية < totalPages - 2
    if (currentPage < totalPages - 2 && totalPages > 3) {
      pages.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // الصفحة الأخيرة دائمًا إذا كان هناك أكثر من صفحة واحدة
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key="last">
          <PaginationLink 
            onClick={() => setCurrentPage(totalPages)} 
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return pages;
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة الطلاب</h1>
        
        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="بحث عن طالب..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-64 py-2 pr-10 pl-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
          />
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <span>إحصائيات الطلاب</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue/10 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">إجمالي الطلاب</p>
              <p className="text-2xl font-bold text-blue">{students.length}</p>
            </div>
            <div className="bg-green/10 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">طلاب نشطون</p>
              <p className="text-2xl font-bold text-green">{students.filter(t => t.isActive !== false).length}</p>
            </div>
            <div className="bg-red/10 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">طلاب متوقفون</p>
              <p className="text-2xl font-bold text-red">{students.filter(t => t.isActive === false).length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>الطالب</TableHead>
            <TableHead>البريد الإلكتروني</TableHead>
            <TableHead>رقم الهاتف</TableHead>
            <TableHead>تاريخ التسجيل</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>المدرسون</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentStudents.length > 0 ? (
            currentStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={student.avatar || '/placeholder.svg'} alt={student.name} />
                    <AvatarFallback>{student.name[0]}</AvatarFallback>
                  </Avatar>
                  {student.name}
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell dir="ltr">{student.phone || 'غير متوفر'}</TableCell>
                <TableCell>{new Date(student.createdAt).toLocaleDateString('ar-EG')}</TableCell>
                <TableCell>
                  <Badge variant={student.isActive === false ? "destructive" : "default"}>
                    {student.isActive === false ? "متوقف" : "نشط"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleViewTeachers(student)}>
                        <Eye className="ml-1 h-4 w-4" />
                        عرض المدرسين
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>مدرسين الطالب {student.name}</DialogTitle>
                        <DialogDescription>
                          قائمة بجميع المدرسين المرتبطين بهذا الطالب
                        </DialogDescription>
                      </DialogHeader>
                      
                      {studentTeachers.length > 0 ? (
                        <div className="max-h-96 overflow-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>المدرس</TableHead>
                                <TableHead>البريد الإلكتروني</TableHead>
                                <TableHead>رقم الهاتف</TableHead>
                                <TableHead>تاريخ الانضمام</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {studentTeachers.map(teacher => (
                                <TableRow key={teacher.id}>
                                  <TableCell className="font-medium flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={teacher.avatar || '/placeholder.svg'} alt={teacher.name} />
                                      <AvatarFallback>{teacher.name[0]}</AvatarFallback>
                                    </Avatar>
                                    {teacher.name}
                                  </TableCell>
                                  <TableCell>{teacher.email}</TableCell>
                                  <TableCell dir="ltr">{teacher.phone || 'غير متوفر'}</TableCell>
                                  <TableCell>{new Date(teacher.createdAt).toLocaleDateString('ar-EG')}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-10">
                          <p className="text-muted-foreground">لا يوجد مدرسين مرتبطين بهذا الطالب</p>
                        </div>
                      )}
                      
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">إغلاق</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant={student.isActive === false ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleToggleStatus(student)}
                    >
                      {student.isActive === false ? (
                        <>
                          <UserCheck className="ml-1 h-4 w-4" />
                          تنشيط
                        </>
                      ) : (
                        <>
                          <UserX className="ml-1 h-4 w-4" />
                          إيقاف
                        </>
                      )}
                    </Button>
                    
                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => setSelectedStudent(student)}
                        >
                          حذف
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>تأكيد حذف الطالب</DialogTitle>
                          <DialogDescription>
                            هل أنت متأكد من حذف الطالب {selectedStudent?.name}؟ هذا الإجراء لا يمكن التراجع عنه.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>إلغاء</Button>
                          <Button variant="destructive" onClick={handleDeleteStudent}>حذف</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10">
                {searchQuery ? "لا توجد نتائج مطابقة للبحث" : "لا يوجد طلاب مسجلين حاليًا"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {filteredStudents.length > itemsPerPage && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {renderPagination()}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default StudentsManagement;
