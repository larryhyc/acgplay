import { NextResponse } from 'next/server';
import { AnimeCalendarItem, AnimeHost } from '@/types/animeCalendar';

const JAPANESE_KANA_REGEX = /[\u3040-\u309F\u30A0-\u30FF]/;

export async function GET() {
  try {
    const res = await fetch('https://api.bgm.tv/calendar');

    const data = await res.json();

    const resData: AnimeHost[] = [];

    data.map((item: AnimeCalendarItem) => {
      const validItems = item.items.filter((animeItem) => {
        const hasChineseName = animeItem.name_cn !== '';
        const score = animeItem.rating?.score ?? 0;
        const hostAnime = score >= 7;
        const isJapaneseAnime = JAPANESE_KANA_REGEX.test(animeItem.name || '');
        return hasChineseName && isJapaneseAnime && hostAnime;
      });

      const hotItems = validItems.sort((a, b) => {
        const scoreA = a.rating.score; // 容错处理：若没有评分则按 0 分处理
        const scoreB = b.rating.score;
        return scoreB - scoreA;
      });

      // console.log(hotItems);
      // console.log(validItems);
      const lastData = hotItems.map((animeItem) => {
        return {
          id: animeItem.id,
          name: animeItem.name_cn || animeItem.name,
          image: animeItem.images,
          score: animeItem.rating.score,
        };
      });

      lastData.map((item) => {
        resData.push(item);
      });
    });
    // console.log(resData);

    return NextResponse.json(resData);
  } catch (error) {
    console.log(`animecalendar报错:${error}`);
    return NextResponse.json({ error: '服务器发生错误' }, { status: 500 });
  }
}
