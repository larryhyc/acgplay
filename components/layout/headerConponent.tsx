import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger } from '@/components/ui/popover'; // 确保从 popover 引入
import { Search, Settings } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

export const HeaderComponent = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between">
      <div className="text-xl">探索</div>
      <div className="flex gap-4 items-center">
        <div>
          <Search />
        </div>
        <div>
          <Settings />
        </div>

        <PopoverTrigger>
          <Button
            variant="ghost"
            className="p-0 rounded-full h-12 w-12 border-0 focus:ring-0"
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={session?.user?.image || undefined} />
              <AvatarFallback className="leading-none">
                {session?.user?.name ? session.user.name[0] : '游'}
              </AvatarFallback>
            </Avatar>
          </Button>

          <Popover
            placement="bottom end"
            className="w-48 p-3 bg-popover rounded-md shadow-lg border"
          >
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">{session?.user?.name || ''}</p>
              <p className="text-xs text-muted-foreground">
                {session ? '已登录' : '未登录'}
              </p>
              <Button onClick={() => signOut()}>退出登录</Button>
            </div>
          </Popover>
        </PopoverTrigger>
      </div>
    </div>
  );
};

export default HeaderComponent;
