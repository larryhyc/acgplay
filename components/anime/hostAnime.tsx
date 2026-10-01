// 'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { AnimeHost } from '@/types/animeCalendar';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import Autoplay from 'embla-carousel-autoplay';

const HostAnime = () => {
  const [calendarData, setCalendarData] = useState<AnimeHost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/animehost');
        const result = await res.json();
        setCalendarData(result);
      } catch (error) {
        setError(`${error}加载失败`);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, []);

  console.log(calendarData);

  if (error) return <div className="text-red-500">错误: {error}</div>;

  return (
    <div className="mt-6">
      <Carousel
        className="w-full relative"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5"
                >
                  <Card
                    key={index}
                    className="p-0 border-0 overflow-hidden mb-6"
                  >
                    <Skeleton className="aspect-4/4 w-full rounded-sm" />
                  </Card>
                </CarouselItem>
              ))
            : calendarData.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5"
                >
                  <Card className="h-60 relative overflow-hidden group p-0 border-0">
                    <CardContent className="p-0 w-full h-full relative">
                      <Image
                        src={item.image.large}
                      alt={item.name}
                      fill
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/80 via-black/40 to-transparent text-white text-sm font-medium line-clamp-2">
                        {item.name}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 z-10" />
        <CarouselNext className="right-2 z-10" />
      </Carousel>
    </div>
  );
};

export default HostAnime;
