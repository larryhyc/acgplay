'use client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import CalendarComponent from '@/components/anime/calendarComponent';

const AnimeCalendar = () => {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="flex gap-4 items-center">
        <Button onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <span className="text-xl">新番时间表</span>
      </div>
      <CalendarComponent />
    </div>
  );
};

export default AnimeCalendar;
