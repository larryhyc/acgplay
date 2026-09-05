'use client';

export default function LoginPage() {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_BANGUMI_CLIENT_ID;
    // 必须与 Bangumi 开发者后台的回调地址完全一致
    const redirectUri = encodeURIComponent(
      'http://localhost:3000/api/auth/callback/bangumi',
    );

    window.location.href = `https://bgm.tv/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-foreground">
      <div className="max-w-md w-full p-8 space-y-6 text-center border border-border rounded-xl bg-card">
        <h1 className="text-3xl font-bold tracking-tight">ACGPlay</h1>
        <p className="text-muted-foreground text-sm">
          在使用第三方播放服务前，请先通过 Bangumi 账号完成身份验证。
        </p>
        <button
          onClick={handleLogin}
          className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
        >
          使用 Bangumi 账号登录
        </button>
      </div>
    </div>
  );
}
