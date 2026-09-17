'use cilent';
import { useEffect, useState } from 'react';
import { AnimeCalendarItem } from '@/type/animeCalendar';

const CalendarComponent = () => {
  const [calendarData, setCalendarData] = useState<AnimeCalendarItem[]>([]);
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
        setError('加载失败');
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, []);

  console.log(calendarData);

  if (loading) return <div>新番日历加载中...</div>;
  if (error) return <div className="text-red-500">错误: {error}</div>;

  return (
    <div>
      {calendarData.map((item, i) => (
        <div key={i}>
          <div>{item.weekday.cn}</div>
        </div>
      ))}
    </div>
  );
};

export default CalendarComponent;
