export type AnimeCalendarItem = {
  weekday: {
    en: string;
    cn: string;
    ja: string;
    id: number;
  };
  items: Array<{
    id: number;
    url: string;
    name: string;
    name_cn: string;
    air_date: string;
    score: number;
    images: {
      large: string;
      common: string;
      medium: string;
      small: string;
      grid: string;
    };
    collection: {
      doing: number;
    };
  }>;
};

export type AnimeCalendar = {
  weekday: string;
  items: Array<{
    id: number;
    image: {
      large: string;
      common: string;
      medium: string;
      small: string;
      grid: string;
    };
    name: string;
  }>;
};
