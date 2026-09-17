import { NextResponse } from 'next/server';
import { AnimeCalendarItem } from '@/type/animeCalendar';

export async function GET() {
  try {
    const res = await fetch('https://api.bgm.tv/calendar');

    const data = await res.json();

    const resData = data.map((item: AnimeCalendarItem) => {
      // console.log(item);
      return {
        weekday: item.weekday.cn,
        items: item.items.map((animeItem) => {
          return {
            id: animeItem.id,
            name: animeItem.name_cn || animeItem.name,
            image: animeItem.images,
            score: animeItem.score,
          };
        }),
      };
    });

    // console.log(resData);

    return NextResponse.json(resData);
  } catch (error) {
    console.log(`animecalendar报错:${error}`);
    return NextResponse.json({ error: '服务器发生错误' }, { status: 500 });
  }
}
