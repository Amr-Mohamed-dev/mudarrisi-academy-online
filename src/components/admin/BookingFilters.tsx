
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BookingFiltersProps {
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

const BookingFilters = ({ statusFilter, onStatusFilterChange }: BookingFiltersProps) => {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <div className="flex items-center space-x-2 space-x-reverse">
        <label htmlFor="status-filter" className="text-sm font-medium">
          فلترة حسب الحالة:
        </label>
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="اختر الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="pending">قيد الانتظار</SelectItem>
            <SelectItem value="approved">مقبول</SelectItem>
            <SelectItem value="rejected">مرفوض</SelectItem>
            <SelectItem value="completed">مكتمل</SelectItem>
            <SelectItem value="cancelled">ملغي</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BookingFilters;
