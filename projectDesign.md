# 项目结构

```
acgplay/
├── app/                          # App Router 路由与 API 服务层
│   ├── api/                      # 后端代理 API (BFF)
│   │   ├── auth/
│   │   │   ├── callback/route.ts # Bangumi OAuth2 授权回调处理
│   │   │   └── logout/route.ts   # 清除凭证并登出
│   │   └── proxy/video/route.ts # 绕过防盗链与 CORS 的视频代理
│   ├── anime/[id]/
│   │   └── page.tsx              # 番剧详情页 (SSR)
│   ├── watch/[id]/[ep]/
│   │   └── page.tsx              # 播放与弹幕交互页 (Client Component)
│   ├── layout.tsx                # 全局 Root Layout
│   └── page.tsx                  # 首页 / 每日新番时间线
│
├── components/                   # 视图 UI 组件层
│   ├── ui/                       # shadcn/ui 基础通用组件
│   ├── layout/                   # 顶部导航、用户菜单等全局布局
│   ├── anime/                    # 番剧卡片、集数网格等业务组件
│   └── player/                   # 播放器核心组件
│       ├── video-player.tsx      # HLS 解码与视频播放器
│       ├── danmaku-layer.tsx     # 弹幕 Canvas/DOM 渲染图层
│       └── player-controls.tsx   # 播放控制器与选集条
│
├── lib/                          # 核心服务与工具函数
│   ├── auth.ts                   # Cookie 读写与 Token 管理
│   ├── bangumi.ts                # Bangumi Open API 请求封装
│   ├── dandan.ts                 # 弹弹play 弹幕 API 请求封装
│   ├── mikan.ts                  # 蜜柑计划 RSS/磁力链接解析
│   └── utils.ts                  # Tailwind 样式合并等辅助函数
│
├── hooks/                        # 自定义 React Hooks
│   ├── use-danmaku.ts            # 弹幕获取与发射状态控制
│   └── use-local-history.ts      # 基于 IndexedDB/Storage 的播放秒数记录
│
├── store/                        # 客户端全局状态 (Zustand)
│   └── player-store.ts           # 播放器偏好设置（音量、弹幕开关）
│
├── types/                        # TypeScript 类型定义
│   ├── bangumi.d.ts              # Bangumi 数据接口类型定义
│   └── player.d.ts               # 播放器与弹幕数据类型定义
│
├── middleware.ts                 # 根目录全局路由守卫 (强制 Bangumi 登录)
└── .env.local                    # 环境变量 (Bangumi App 密钥配置)
```