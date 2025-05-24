
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

interface Booking {
  id: string;
  status: string;
  attended?: boolean;
}

interface BookingActionsProps {
  booking: Booking;
  onApprove: (bookingId: string) => void;
  onReject: (bookingId: string) => void;
}

const BookingActions = ({ booking, onApprove, onReject }: BookingActionsProps) => {
  if (booking.status === 'pending') {
    return (
      <div className="flex gap-2 mt-4">
        <Button 
          size="sm" 
          onClick={() => onApprove(booking.id)}
          className="flex-1"
        >
          <CheckCircle className="h-4 w-4 ml-1" />
          قبول
        </Button>
        <Button 
          size="sm" 
          variant="destructive" 
          onClick={() => onReject(booking.id)}
          className="flex-1"
        >
          <XCircle className="h-4 w-4 ml-1" />
          رفض
        </Button>
      </div>
    );
  }
  
  return null;
};

export default BookingActions;
