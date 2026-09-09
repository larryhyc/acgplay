import type { NextConfig } from 'next';
import { ProxyAgent, setGlobalDispatcher } from 'undici';

if (process.env.NODE_ENV === 'development') {
  // 1. 依然挂载你的本地代理，防止超时
  const proxyAgent = new ProxyAgent('http://127.0.0.1:7897'); // 👈 确认这是你的本地代理端口
  setGlobalDispatcher(proxyAgent);

  // 2. ✨ 全局拦截并洗白 Bangumi 的 scope: null
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async function (input, init) {
    const url = typeof input === 'string' ? input : '';

    // 如果是换取 Token 的请求，我们直接在底层洗白数据
    if (url.includes('bgm.tv/oauth/access_token')) {
      const response = await originalFetch(input, init);
      if (!response.ok) return response;

      const data = await response.json();
      // 🛡️ 强制在最底层把 null 洗成符合 Auth.js 规范的空字符串
      if (data && data.scope === null) {
        data.scope = '';
      }

      // 重新包装成合规的 Response 返回给 Auth.js
      return new Response(JSON.stringify(data), {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    }

    return originalFetch(input, init);
  };

  console.log(
    '--- 🚀 Node.js 全局代理与 Bangumi Scope 洗白拦截器已成功双重挂载！ ---',
  );
}

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lain.bgm.tv',
      },
    ],
  },
};

export default nextConfig;
