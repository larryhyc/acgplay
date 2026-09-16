'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import HederConponent from '@/components/layout/headerConponent';
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Host() {
  const route = useRouter();

  return (
    <div>
      <div className="flex justify-between h-8">
        <span className="text-xl">最高热度</span>
        <Button
          className="flex items-center gap-2 bg-background"
          onClick={() => route.push('/animecalendar')}
        >
          <CalendarDays size={14} />
          <div>新番时间表</div>
        </Button>
      </div>
    </div>
  );
}

export default function Home() {
  const { data: session, status } = useSession();
  const route = useRouter();

  useEffect(() => {
    if (!session) {
      route.push('/login');
    }
  }, [session, status, route]);

  if (!session) {
    return null;
  }

  return (
    <div className="p-6">
      <HederConponent />
      <Host />
    </div>
  );
}
