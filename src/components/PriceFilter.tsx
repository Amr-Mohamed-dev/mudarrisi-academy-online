
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  selectedRange: [number, number];
  onChange: (range: [number, number]) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice,
  maxPrice,
  selectedRange,
  onChange
}) => {
  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">نطاق السعر (ريال/ساعة)</Label>
      
      <div className="px-2">
        <Slider
          value={selectedRange}
          onValueChange={(value) => onChange(value as [number, number])}
          min={minPrice}
          max={maxPrice}
          step={10}
          className="w-full"
        />
      </div>
      
      <div className="flex justify-between text-sm text-gray-600">
        <span>{selectedRange[0]} ريال</span>
        <span>{selectedRange[1]} ريال</span>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>الحد الأدنى: {minPrice}</span>
        <span>الحد الأقصى: {maxPrice}</span>
      </div>
    </div>
  );
};

export default PriceFilter;
