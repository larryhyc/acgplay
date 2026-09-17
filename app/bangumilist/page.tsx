'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const BangumiList = () => {
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

  return <div>追番页面</div>;
};

export default BangumiList;
