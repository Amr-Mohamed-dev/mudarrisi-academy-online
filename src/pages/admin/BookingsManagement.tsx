
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { User } from '@/contexts/AuthContext';

interface Booking {
  id: string;
  teacherId: string;
  studentId: string;
  date: string;
  startTime: string;
  endTime: string;
  subject: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
}

const BookingsManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [teacherMap, setTeacherMap] = useState<Record<string, User>>({});
  const [studentMap, setStudentMap] = useState<Record<string, User>>({});
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  
  const itemsPerPage = 5;
  
  // استرجاع الحجوزات والمدرسين والطلاب من التخزين المحلي
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(storedBookings);
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // إنشاء خرائط للمدرسين والطلاب للوصول السريع
    const teachers: Record<string, User> = {};
    const students: Record<string, User> = {};
    
    users.forEach((user: User) => {
      if (user.role === 'teacher') {
        teachers[user.id] = user;
      } else if (user.role === 'student') {
        students[user.id] = user;
      }
    });
    
    setTeacherMap(teachers);
    setStudentMap(students);
  }, []);
  
  // تصفية الحجوزات حسب علامة التبويب والبحث
  useEffect(() => {
    let filtered = [...bookings];
    
    // تصفية حسب علامة التبويب
    if (currentTab !== "all") {
      filtered = filtered.filter(booking => booking.status === currentTab);
    }
    
    // تصفية حسب البحث
    if (searchQuery) {
      const lowerSearch = searchQuery.toLowerCase();
      filtered = filtered.filter(booking => {
        const teacher = teacherMap[booking.teacherId];
        const student = studentMap[booking.studentId];
        
        return (
          (teacher && teacher.name.toLowerCase().includes(lowerSearch)) ||
          (student && student.name.toLowerCase().includes(lowerSearch)) ||
          booking.subject.toLowerCase().includes(lowerSearch)
        );
      });
    }
    
    setFilteredBookings(filtered);
    setCurrentPage(1);
  }, [bookings, currentTab, searchQuery, teacherMap, studentMap]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleTabChange = (value: string) => {
    setCurrentTab(value);
  };
  
  const handleViewBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailsDialogOpen(true);
  };
  
  const handleApproveBooking = (booking: Booking) => {
    const updatedBookings = bookings.map(b => 
      b.id === booking.id ? { ...b, status: 'approved' } : b
    );
    
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    
    toast.success('تم الموافقة على الحجز بنجاح');
  };
  
  const handleRejectBooking = (booking: Booking) => {
    const updatedBookings = bookings.map(b => 
      b.id === booking.id ? { ...b, status: 'rejected' } : b
    );
    
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    
    toast.success('تم رفض الحجز بنجاح');
  };
  
  // التقسيم إلى صفحات
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const currentBookings = filteredBookings.slice(
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
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">قيد الانتظار</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">تمت الموافقة</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">مرفوض</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">مكتمل</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };
  
  // حساب الإحصائيات
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const approvedBookings = bookings.filter(b => b.status === 'approved').length;
  const rejectedBookings = bookings.filter(b => b.status === 'rejected').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة الحجوزات</h1>
        
        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="بحث في الحجوزات..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-64 py-2 pr-10 pl-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
          />
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">إحصائيات الحجوزات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">إجمالي الحجوزات</p>
              <p className="text-2xl font-bold">{totalBookings}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-sm text-yellow-700">قيد الانتظار</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingBookings}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-green-700">تمت الموافقة</p>
              <p className="text-2xl font-bold text-green-600">{approvedBookings}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <p className="text-sm text-red-700">مرفوضة</p>
              <p className="text-2xl font-bold text-red-600">{rejectedBookings}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-blue-700">مكتملة</p>
              <p className="text-2xl font-bold text-blue-600">{completedBookings}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" value={currentTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">جميع الحجوزات</TabsTrigger>
          <TabsTrigger value="pending">قيد الانتظار</TabsTrigger>
          <TabsTrigger value="approved">تمت الموافقة</TabsTrigger>
          <TabsTrigger value="rejected">مرفوضة</TabsTrigger>
          <TabsTrigger value="completed">مكتملة</TabsTrigger>
        </TabsList>
        
        <TabsContent value={currentTab}>
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead>رقم الحجز</TableHead>
                <TableHead>المدرس</TableHead>
                <TableHead>الطالب</TableHead>
                <TableHead>المادة</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الوقت</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBookings.length > 0 ? (
                currentBookings.map((booking) => {
                  const teacher = teacherMap[booking.teacherId];
                  const student = studentMap[booking.studentId];
                  
                  return (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id.slice(-6)}</TableCell>
                      <TableCell>
                        {teacher ? (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={teacher.avatar || '/placeholder.svg'} alt={teacher.name} />
                              <AvatarFallback>{teacher.name[0]}</AvatarFallback>
                            </Avatar>
                            {teacher.name}
                          </div>
                        ) : 'مدرس غير موجود'}
                      </TableCell>
                      <TableCell>
                        {student ? (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.avatar || '/placeholder.svg'} alt={student.name} />
                              <AvatarFallback>{student.name[0]}</AvatarFallback>
                            </Avatar>
                            {student.name}
                          </div>
                        ) : 'طالب غير موجود'}
                      </TableCell>
                      <TableCell>{booking.subject}</TableCell>
                      <TableCell dir="ltr">{new Date(booking.date).toLocaleDateString('ar-EG')}</TableCell>
                      <TableCell dir="ltr">{booking.startTime} - {booking.endTime}</TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewBookingDetails(booking)}
                          >
                            <Calendar className="ml-1 h-4 w-4" />
                            تفاصيل
                          </Button>
                          
                          {booking.status === 'pending' && (
                            <>
                              <Button 
                                variant="default"
                                size="sm"
                                onClick={() => handleApproveBooking(booking)}
                              >
                                <CheckCircle className="ml-1 h-4 w-4" />
                                قبول
                              </Button>
                              <Button 
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRejectBooking(booking)}
                              >
                                <XCircle className="ml-1 h-4 w-4" />
                                رفض
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    {searchQuery ? "لا توجد نتائج مطابقة للبحث" : "لا توجد حجوزات متاحة"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
      
      {filteredBookings.length > itemsPerPage && (
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
      
      {/* مربع حوار تفاصيل الحجز */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>تفاصيل الحجز</DialogTitle>
            <DialogDescription>
              معلومات مفصلة عن الحجز
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-600 mb-2">معلومات الحجز</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-500">رقم الحجز:</span>
                    <p>{selectedBooking.id}</p>
                  </div>
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-500">تاريخ الحجز:</span>
                    <p>{new Date(selectedBooking.date).toLocaleDateString('ar-EG')}</p>
                  </div>
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-500">وقت الحجز:</span>
                    <p dir="ltr">{selectedBooking.startTime} - {selectedBooking.endTime}</p>
                  </div>
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-500">المادة الدراسية:</span>
                    <p>{selectedBooking.subject}</p>
                  </div>
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-500">حالة الحجز:</span>
                    <div className="mt-1">{getStatusBadge(selectedBooking.status)}</div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">تاريخ الإنشاء:</span>
                    <p>{new Date(selectedBooking.createdAt).toLocaleString('ar-EG')}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-600 mb-2">معلومات المدرس</h3>
                  {teacherMap[selectedBooking.teacherId] ? (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                          <AvatarImage 
                            src={teacherMap[selectedBooking.teacherId].avatar || '/placeholder.svg'} 
                            alt={teacherMap[selectedBooking.teacherId].name} 
                          />
                          <AvatarFallback>{teacherMap[selectedBooking.teacherId].name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{teacherMap[selectedBooking.teacherId].name}</p>
                          <p className="text-sm text-gray-500">{teacherMap[selectedBooking.teacherId].email}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">رقم الهاتف:</span>
                        <p dir="ltr">{teacherMap[selectedBooking.teacherId].phone || 'غير متوفر'}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">معلومات المدرس غير متوفرة</p>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-600 mb-2">معلومات الطالب</h3>
                  {studentMap[selectedBooking.studentId] ? (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                          <AvatarImage 
                            src={studentMap[selectedBooking.studentId].avatar || '/placeholder.svg'} 
                            alt={studentMap[selectedBooking.studentId].name} 
                          />
                          <AvatarFallback>{studentMap[selectedBooking.studentId].name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{studentMap[selectedBooking.studentId].name}</p>
                          <p className="text-sm text-gray-500">{studentMap[selectedBooking.studentId].email}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">رقم الهاتف:</span>
                        <p dir="ltr">{studentMap[selectedBooking.studentId].phone || 'غير متوفر'}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">معلومات الطالب غير متوفرة</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2">
            {selectedBooking && selectedBooking.status === 'pending' && (
              <>
                <Button variant="default" onClick={() => {
                  handleApproveBooking(selectedBooking);
                  setIsDetailsDialogOpen(false);
                }}>
                  <CheckCircle className="ml-1 h-4 w-4" />
                  قبول الحجز
                </Button>
                <Button variant="destructive" onClick={() => {
                  handleRejectBooking(selectedBooking);
                  setIsDetailsDialogOpen(false);
                }}>
                  <XCircle className="ml-1 h-4 w-4" />
                  رفض الحجز
                </Button>
              </>
            )}
            <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingsManagement;
