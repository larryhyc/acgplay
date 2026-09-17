'use cilent';
import { useEffect, useState } from 'react';
import { AnimeCalendar } from '@/types/animeCalendar';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

const Days = [
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
  '星期日',
];

const CalendarComponent = () => {
  const [calendarData, setCalendarData] = useState<AnimeCalendar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/animecalendar');
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

  // console.log(calendarData);
  calendarData.map((item, i) => {
    console.log('key', i);
    console.log('item', item);
  });

  if (error) return <div className="text-red-500">错误: {error}</div>;

  return (
    <div className="grid grid-cols-7 gap-4 w-full">
      {loading
        ? Days.map((item, i) => (
            <div key={i} className="text-center">
              <Card className="mb-6">{item}</Card>
              {Array.from({ length: 2 }).map((_, itemIndex) => (
                <Card
                  key={itemIndex}
                  className="p-0 border-0 overflow-hidden mb-6"
                >
                  {/* 关键：保持与实际图片完全一样的 3:4 比例骨架 */}
                  <Skeleton className="aspect-3/4 w-full rounded-sm" />
                </Card>
              ))}
            </div>
          ))
        : calendarData.map((item, i) => (
            <div key={i} className="text-center">
              <Card className="mb-6">{item.weekday}</Card>
              {item.items.map((anime) => {
                return (
                  <Card key={anime.id} className="mb-6 p-3 h-80">
                    <a
                      href={`https://bgm.tv/subject/${anime.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-full overflow-hidden bg-zinc-800 rounded-sm hover:opacity-90 transition-all border border-zinc-800 hover:border-zinc-500"
                    >
                      {/* 封面图片 */}
                      <Image
                        src={anime.image.large}
                        alt={anime.name}
                        width={300}
                        height={425}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </a>
                    <div>{anime.name}</div>
                  </Card>
                );
              })}
            </div>
          ))}
    </div>
  );
};

export default CalendarComponent;
