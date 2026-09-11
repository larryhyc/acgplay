'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import HederConponent from '@/components/layout/headerConponent';

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
      <div className="p-4 flex items-center gap-4"></div>
    </div>
  );
}
