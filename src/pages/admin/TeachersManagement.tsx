import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, UserX, UserCheck, Eye, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { User } from "@/contexts/AuthContext";

const TeachersManagement = () => {
  const [teachers, setTeachers] = useState<User[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeacher, setSelectedTeacher] = useState<User | null>(null);
  const [teacherStudents, setTeacherStudents] = useState<User[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();

  const itemsPerPage = 5;

  useEffect(() => {
    // جلب المدرسين من التخزين المحلي
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const teachersList = users.filter((user: User) => user.role === "teacher");
    setTeachers(teachersList);
    setFilteredTeachers(teachersList);
  }, []);

  useEffect(() => {
    let filtered = teachers;
    
    // تطبيق البحث النصي
    if (searchQuery) {
      filtered = filtered.filter(
        (teacher) =>
          teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // تطبيق فلتر الحالة
    if (statusFilter !== "all") {
      if (statusFilter === "pending") {
        filtered = filtered.filter(teacher => teacher.isApproved === false);
      } else if (statusFilter === "approved") {
        filtered = filtered.filter(teacher => teacher.isApproved === true);
      } else if (statusFilter === "active") {
        filtered = filtered.filter(teacher => teacher.isActive === true && teacher.isApproved === true);
      } else if (statusFilter === "inactive") {
        filtered = filtered.filter(teacher => teacher.isActive === false && teacher.isApproved === true);
      }
    }
    
    setFilteredTeachers(filtered);
    setCurrentPage(1);
  }, [searchQuery, teachers, statusFilter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleViewStudents = (teacher: User) => {
    setSelectedTeacher(teacher);
    // محاكاة جلب طلاب المدرس
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    // ابحث عن جميع الحجوزات لهذا المدرس
    const teacherBookings = bookings.filter(
      (booking: { id: string; teacherId: string }) =>
        booking.teacherId === teacher.id
    );

    // احصل على معرفات الطلاب الفريدة
    const studentIds = [
      ...new Set(
        teacherBookings.map(
          (booking: { id: string; studentId: string }) => booking.studentId
        )
      ),
    ];

    // ابحث عن معلومات الطلاب
    const studentsList = users.filter(
      (user: User) => user.role === "student" && studentIds.includes(user.id)
    );

    setTeacherStudents(studentsList);
  };

  const handleToggleStatus = (teacher: User) => {
    // تحديث حالة المدرس (نشط/متوقف)
    const updatedTeacher = { ...teacher, isActive: !teacher.isActive };

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((user: User) =>
      user.id === teacher.id ? { ...user, isActive: !teacher.isActive } : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // تحديث القائمة المحلية
    setTeachers((prevTeachers) =>
      prevTeachers.map((t) => (t.id === teacher.id ? updatedTeacher : t))
    );
    setFilteredTeachers((prevFiltered) =>
      prevFiltered.map((t) => (t.id === teacher.id ? updatedTeacher : t))
    );

    toast.success(`تم ${teacher.isActive ? "إيقاف" : "تنشيط"} المدرس بنجاح`);
  };

  const handleApproveTeacher = (teacher: User) => {
    if (!teacher) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((user: User) =>
      user.id === teacher.id ? { ...user, isApproved: true } : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // تحديث القائمة المحلية
    const updatedTeacher = { ...teacher, isApproved: true };
    setTeachers((prevTeachers) =>
      prevTeachers.map((t) => (t.id === teacher.id ? updatedTeacher : t))
    );
    setFilteredTeachers((prevFiltered) =>
      prevFiltered.map((t) => (t.id === teacher.id ? updatedTeacher : t))
    );

    toast.success(`تمت الموافقة على المدرس ${teacher.name} بنجاح`);
  };

  const handleDeleteTeacher = () => {
    if (!selectedTeacher) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.filter(
      (user: User) => user.id !== selectedTeacher.id
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // تحديث القائمة المحلية
    setTeachers((prevTeachers) =>
      prevTeachers.filter((t) => t.id !== selectedTeacher.id)
    );
    setFilteredTeachers((prevFiltered) =>
      prevFiltered.filter((t) => t.id !== selectedTeacher.id)
    );

    setIsDeleteDialogOpen(false);
    setSelectedTeacher(null);

    toast.success("تم حذف المدرس بنجاح");
  };

  // الإحصائيات
  const pendingTeachers = teachers.filter(t => t.isApproved === false).length;
  const activeTeachers = teachers.filter(t => t.isActive === true && t.isApproved === true).length;
  const inactiveTeachers = teachers.filter(t => t.isActive === false && t.isApproved === true).length;
  const approvedTeachers = teachers.filter(t => t.isApproved === true).length;

  // التقسيم إلى صفحات
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const currentTeachers = filteredTeachers.slice(
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
          isActive={currentPage === 1}>
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
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => setCurrentPage(i)}
            isActive={currentPage === i}>
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
            isActive={currentPage === totalPages}>
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
        <h1 className="text-2xl font-bold">إدارة المدرسين</h1>

        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="بحث عن مدرس..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-64 py-2 pr-10 pl-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
          />
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <span>إحصائيات المدرسين</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-blue/10 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">إجمالي المدرسين</p>
              <p className="text-2xl font-bold text-blue">{teachers.length}</p>
            </div>
            <div className="bg-amber/10 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">بانتظار الموافقة</p>
              <p className="text-2xl font-bold text-amber">{pendingTeachers}</p>
            </div>
            <div className="bg-green/10 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">مدرسون نشطون</p>
              <p className="text-2xl font-bold text-green">{activeTeachers}</p>
            </div>
            <div className="bg-red/10 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">مدرسون متوقفون</p>
              <p className="text-2xl font-bold text-red">{inactiveTeachers}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* فلتر حالة المدرس */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          variant={statusFilter === "all" ? "default" : "outline"} 
          onClick={() => setStatusFilter("all")}>
          الجميع ({teachers.length})
        </Button>
        <Button 
          variant={statusFilter === "pending" ? "default" : "outline"} 
          onClick={() => setStatusFilter("pending")}>
          بانتظار الموافقة ({pendingTeachers})
        </Button>
        <Button 
          variant={statusFilter === "approved" ? "default" : "outline"} 
          onClick={() => setStatusFilter("approved")}>
          تمت الموافقة ({approvedTeachers})
        </Button>
        <Button 
          variant={statusFilter === "active" ? "default" : "outline"} 
          onClick={() => setStatusFilter("active")}>
          نشطون ({activeTeachers})
        </Button>
        <Button 
          variant={statusFilter === "inactive" ? "default" : "outline"} 
          onClick={() => setStatusFilter("inactive")}>
          متوقفون ({inactiveTeachers})
        </Button>
      </div>

      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>المدرس</TableHead>
            <TableHead>البريد الإلكتروني</TableHead>
            <TableHead>رقم الهاتف</TableHead>
            <TableHead>تاريخ التسجيل</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>الطلاب</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTeachers.length > 0 ? (
            currentTeachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={teacher.avatar || "/placeholder.svg"}
                      alt={teacher.name}
                    />
                    <AvatarFallback>{teacher.name[0]}</AvatarFallback>
                  </Avatar>
                  {teacher.name}
                </TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell dir="ltr">{teacher.phone || "غير متوفر"}</TableCell>
                <TableCell>
                  {new Date(teacher.createdAt).toLocaleDateString("ar-EG")}
                </TableCell>
                <TableCell>
                  {teacher.isApproved === false ? (
                    <Badge variant="outline" className="bg-amber text-white">بانتظار الموافقة</Badge>
                  ) : teacher.isActive === false ? (
                    <Badge variant="destructive">متوقف</Badge>
                  ) : (
                    <Badge variant="default">نشط</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewStudents(teacher)}>
                        <Eye className="ml-1 h-4 w-4" />
                        عرض الطلاب
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>طلاب المدرس {teacher.name}</DialogTitle>
                        <DialogDescription>
                          قائمة بجميع الطلاب المشتركين مع هذا المدرس
                        </DialogDescription>
                      </DialogHeader>

                      {teacherStudents.length > 0 ? (
                        <div className="max-h-96 overflow-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>الطالب</TableHead>
                                <TableHead>البريد الإلكتروني</TableHead>
                                <TableHead>رقم الهاتف</TableHead>
                                <TableHead>المرحلة الدراسية</TableHead>
                                <TableHead>تاريخ الانضمام</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {teacherStudents.map((student) => (
                                <TableRow key={student.id}>
                                  <TableCell className="font-medium flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage
                                        src={
                                          student.avatar || "/placeholder.svg"
                                        }
                                        alt={student.name}
                                      />
                                      <AvatarFallback>
                                        {student.name[0]}
                                      </AvatarFallback>
                                    </Avatar>
                                    {student.name}
                                  </TableCell>
                                  <TableCell>{student.email}</TableCell>
                                  <TableCell dir="ltr">
                                    {student.phone || "غير متوفر"}
                                  </TableCell>
                                  <TableCell>
                                    {student.educationalStage || "غير محدد"}
                                  </TableCell>
                                  <TableCell>
                                    {new Date(
                                      student.createdAt
                                    ).toLocaleDateString("ar-EG")}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-10">
                          <p className="text-muted-foreground">
                            لا يوجد طلاب مسجلين مع هذا المدرس
                          </p>
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
                    {teacher.isApproved === false ? (
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-green"
                        onClick={() => handleApproveTeacher(teacher)}>
                        <CheckCircle className="ml-1 h-4 w-4" />
                        موافقة
                      </Button>
                    ) : (
                      <Button
                        variant={
                          teacher.isActive === false ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handleToggleStatus(teacher)}>
                        {teacher.isActive === false ? (
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
                    )}

                    <Dialog
                      open={isDeleteDialogOpen}
                      onOpenChange={setIsDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setSelectedTeacher(teacher)}>
                          حذف
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>تأكيد حذف المدرس</DialogTitle>
                          <DialogDescription>
                            هل أنت متأكد من حذف المدرس {selectedTeacher?.name}؟
                            هذا الإجراء لا يمكن التراجع عنه.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}>
                            إلغاء
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={handleDeleteTeacher}>
                            حذف
                          </Button>
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
                {searchQuery
                  ? "لا توجد نتائج مطابقة للبحث"
                  : "لا يوجد مدرسين مسجلين حاليًا"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {filteredTeachers.length > itemsPerPage && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                aria-disabled={currentPage === 1}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {renderPagination()}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                aria-disabled={currentPage === totalPages}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default TeachersManagement;
