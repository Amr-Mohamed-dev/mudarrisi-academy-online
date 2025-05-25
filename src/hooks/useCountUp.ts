
import { useState, useEffect } from 'react';

export const useCountUp = (end: number, duration: number = 2000, delay: number = 0) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    const startValue = 0;
    
    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // استخدام easing function للحصول على حركة أكثر سلاسة
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(startValue + (end - startValue) * easedProgress);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [end, duration, hasStarted]);

  return count;
};
