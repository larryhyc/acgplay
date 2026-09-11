'use client';
import { LucideIcon, Search, Settings, Star } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type navItemType = {
  title: string;
  icon: LucideIcon;
  href: string;
};

const navItems = [
  { title: '探索', icon: Search, href: '/' },
  { title: '追番', icon: Star, href: '/bangumilist' },
  { title: '设置', icon: Settings, href: '/setting' },
];

export function AppSidebar() {
  const [active, setActive] = useState('探索');
  const route = useRouter();

  const handleClick = (item: navItemType) => {
    setActive(item.title);
    route.push(item.href);
  };

  return (
    <aside className="w-24 mt-30 h-full shrink-0 border-r border-white/10 bg-background/50 backdrop-blur-md flex flex-col justify-between py-6">
      {/* 顶部主导航列表 */}
      <nav className="flex flex-col items-center gap-4">
        {navItems.map((item) => {
          const isActive = active === item.title;
          return (
            <button
              key={item.title}
              onClick={() => handleClick(item)}
              className={`flex flex-col items-center justify-center h-14 w-12 rounded-xl transition-all ${
                isActive
                  ? 'bg-primary/20 text-primary font-medium shadow-sm'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs scale-90">{item.title}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
