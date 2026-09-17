import { NextResponse } from 'next/server';
import { AnimeCalendarItem } from '@/types/animeCalendar';

const JAPANESE_KANA_REGEX = /[\u3040-\u309F\u30A0-\u30FF]/;

export async function GET() {
  try {
    const res = await fetch('https://api.bgm.tv/calendar');

    const data = await res.json();

    const resData = data.map((item: AnimeCalendarItem) => {
      const validItems = item.items.filter((animeItem) => {
        const hasChineseName = animeItem.name_cn !== '';
        const isJapaneseAnime = JAPANESE_KANA_REGEX.test(animeItem.name || '');
        return hasChineseName && isJapaneseAnime;
      });

      return {
        weekday: item.weekday.cn,
        items: validItems.map((animeItem) => {
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
