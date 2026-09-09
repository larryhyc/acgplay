'use client';

// import { signIn } from '@/auth';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { data: session, status } = useSession();
  const route = useRouter();

  useEffect(() => {
    if (!session) {
      route.push('/login');
    }
  }, [session, status, route]);

  if (status == 'loading' && !session) {
    return <div>正在跳转到登录页面</div>;
  }
  return (
    <div>
      <h1>首页面</h1>

      <div className="p-4 flex items-center gap-4">
        {/* <Image
          src={session?.user?.image || ''}
          alt="头像"
          width={48}
          height={48}
          className="w-12 h-12 rounded-full"
        /> */}
        {session ? (
          <Image
            src={session?.user?.image || ''}
            alt="头像"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div className="w-12 h-12 rounded-full">游客</div>
        )}
        <div>
          <h3 className="font-bold">{session?.user?.name}</h3>
          <p className="text-sm text-gray-500">欢迎回来！</p>
        </div>
        <Button
          onClick={() => signOut()}
          className="ml-auto px-3 py-1 bg-red-500 text-white rounded"
        >
          退出登录
        </Button>
      </div>
    </div>
  );
}
