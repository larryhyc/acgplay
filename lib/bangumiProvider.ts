import { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';

export interface BangumiProfile {
  id: number;
  username: string;
  nickname: string;
  avatar: {
    large: string;
    medium: string;
    small: string;
  };
  sign: string;
}

export default function BangumiProvider<P extends BangumiProfile>(
  options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: 'bangumi',
    name: 'Bangumi',
    type: 'oauth',

    // 1. 前端跳转：保持完美弹出红色授权页的配置
    authorization: {
      url: 'https://bgm.tv/oauth/authorize',
      params: {
        response_type: 'code',
        scope: '',
      },
    },

    checks: ['state'],

    // 2. 换取 Access Token 拦截逻辑
    token: {
      url: 'https://bgm.tv/oauth/access_token',
      async request({ params }: { params: Record<string, object> }) {
        // console.log('params', params);
        const body = new URLSearchParams();
        body.append('grant_type', 'authorization_code');
        body.append('client_id', options.clientId ?? '');
        body.append('client_secret', options.clientSecret ?? '');
        body.append('code', String(params.code ?? ''));
        body.append(
          'redirect_uri',
          'http://localhost:3000/api/auth/callback/bangumi',
        );

        // ✅ 核心修复：在此处把缺失的 /oauth/access_token 后缀完美补齐！
        const response = await fetch('https://bgm.tv/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'YourAppName/1.0.0 (your@email.com)',
          },
          body,
        });

        const data = await response.json();

        // 🛡️ 绝杀点：把 Bangumi 的不规范 null 强制扭转为符合 Auth.js 标准的空字符串
        if (data && data.scope === null) {
          data.scope = '';
        }

        // 🛡️ 绝杀点 2：按 Auth.js 的标准 tokens 格式向上传递
        return {
          tokens: {
            access_token: data.access_token,
            token_type: data.token_type || 'bearer',
            expires_in: data.expires_in || 604800,
            refresh_token: data.refresh_token,
            scope: data.scope,
            user_id: data.user_id,
          },
        };
      },
    },

    // 3. 后端获取用户信息路径
    userinfo: 'https://api.bgm.tv/v0/me',

    // 4. 格式化用户信息并存入你的系统 Session
    profile(profile) {
      return {
        id: String(profile.id),
        name: profile.nickname || profile.username,
        email: null,
        image: profile.avatar?.large || profile.avatar?.medium,
      };
    },
    options,
  };
}
