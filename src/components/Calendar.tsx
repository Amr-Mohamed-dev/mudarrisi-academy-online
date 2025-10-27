
import React, { useState } from "react";
import { format, startOfWeek, addDays, isSameDay, isPast, addWeeks, isToday } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { arDZ } from "date-fns/locale";

interface CalendarProps {
  className?: string;
  onTimeSelected?: (date: Date, timeSlot: string) => void;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const Calendar = ({ className, onTimeSelected }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }));
  
  // Mock time slots
  const timeSlots: { [key: number]: TimeSlot[] } = {
    0: [], // Sunday (weekend, no slots)
    1: [
      { time: "08:00", available: true },
      { time: "10:00", available: true },
      { time: "12:00", available: false },
      { time: "14:00", available: true },
      { time: "16:00", available: true },
      { time: "18:00", available: false },
      { time: "20:00", available: true },
    ],
    2: [
      { time: "09:00", available: true },
      { time: "11:00", available: false },
      { time: "13:00", available: true },
      { time: "15:00", available: true },
      { time: "17:00", available: true },
      { time: "19:00", available: false },
    ],
    3: [
      { time: "08:00", available: false },
      { time: "10:00", available: true },
      { time: "12:00", available: true },
      { time: "14:00", available: false },
      { time: "16:00", available: true },
      { time: "18:00", available: true },
    ],
    4: [
      { time: "09:00", available: true },
      { time: "11:00", available: true },
      { time: "13:00", available: false },
      { time: "15:00", available: true },
      { time: "17:00", available: false },
      { time: "19:00", available: true },
    ],
    5: [
      { time: "10:00", available: true },
      { time: "12:00", available: true },
      { time: "14:00", available: true },
      { time: "16:00", available: false },
      { time: "18:00", available: true },
    ],
    6: [], // Saturday (weekend, no slots)
  };

  const days = [...Array(7)].map((_, i) => {
    const date = addDays(currentWeekStart, i);
    return {
      date,
      dayName: format(date, "EEEEEE", { locale: arDZ }),
      dayNumber: format(date, "d"),
      isToday: isToday(date),
      isPast: isPast(date),
      slots: timeSlots[i] || [],
    };
  });

  const selectDateTime = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    
    if (onTimeSelected) {
      const [hours, minutes] = time.split(":").map(Number);
      const selectedDateTime = new Date(date);
      selectedDateTime.setHours(hours, minutes, 0, 0);
      onTimeSelected(selectedDateTime, time);
    }
  };

  const goToPreviousWeek = () => {
    setCurrentWeekStart(prev => addDays(prev, -7));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(prev => addDays(prev, 7));
  };

  const goToCurrentWeek = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 0 }));
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-md p-4", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-blue-dark">احجز موعدًا</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousWeek}
            disabled={isPast(addDays(currentWeekStart, 1))}
          >
            الأسبوع السابق
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToCurrentWeek}
          >
            الأسبوع الحالي
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextWeek}
          >
            الأسبوع القادم
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-2 min-w-[700px]">
          {days.map((day, i) => (
            <div key={i} className="text-center">
              <div
                className={cn(
                  "py-2 rounded-t-md font-bold",
                  day.isToday ? "bg-blue text-white" : "bg-gray-100"
                )}
              >
                <div className="text-xs">{day.dayName}</div>
                <div>{day.dayNumber}</div>
              </div>
              
              <div className="border border-t-0 rounded-b-md h-full">
                {day.slots.length > 0 ? (
                  <div className="p-2 space-y-2">
                    {day.slots.map((slot, j) => (
                      <Button
                        key={j}
                        variant="outline"
                        size="sm"
                        className={cn(
                          "w-full",
                          slot.available ? "hover:border-blue" : "opacity-50 cursor-not-allowed",
                          selectedDate && 
                          isSameDay(selectedDate, day.date) && 
                          selectedTime === slot.time ? 
                          "bg-blue text-white border-blue" : ""
                        )}
                        disabled={!slot.available || day.isPast}
                        onClick={() => slot.available && selectDateTime(day.date, slot.time)}
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    غير متاح
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDate && selectedTime && (
        <div className="mt-6 p-4 bg-blue-light/10 rounded-md">
          <h4 className="font-bold mb-2">الموعد المختار:</h4>
          <div className="flex items-center">
            <CalendarIcon className="ml-2 h-5 w-5 text-blue" />
            <span>
              {format(selectedDate, "EEEE d MMMM yyyy", { locale: arDZ })} - {selectedTime}
            </span>
          </div>
          <Button className="mt-4 w-full">تأكيد الحجز</Button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
