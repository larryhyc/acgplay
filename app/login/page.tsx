'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status !== 'loading' && session) {
      router.push('/');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-foreground">
        <div>加载中...</div>
      </div>
    );
  }

  if (session) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-foreground p-6">
      <div className="max-w-md w-full p-8 space-y-6 text-center border border-border rounded-xl bg-card">
        <h1 className="text-3xl font-bold tracking-tight">ACGPlay</h1>
        <p className="text-muted-foreground text-sm">
          在使用第三方播放服务前，请先通过 Bangumi 账号完成身份验证。
        </p>
        <button
          onClick={() => signIn('bangumi')}
          className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
        >
          使用 Bangumi 账号登录
        </button>
      </div>
    </div>
  );
}
