import {
    SignOutIcon,
    UserCircleIcon,
    GearIcon,
    MonitorPlayIcon,
} from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/features/auth/auth.store';

export function UserMenu() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuthStore();

    if (!isAuthenticated || !user) {
        return (
            <Button 
                onClick={() => navigate('/login')} 
                className="rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
            >
                Sign in
            </Button>
        );
    }

    const initials = user.fullName
        ?.split(' ')
        .map((name) => name[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() ?? 'U';

    return (
        <DropdownMenu>
         <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="inline-block rounded-full"
>
    <DropdownMenuTrigger className="rounded-full outline-none ring-offset-background transition-all focus-visible:ring-2 focus-visible:ring-ring">
        <Avatar className="h-9 w-9 cursor-pointer border-2 border-transparent transition-colors hover:border-primary">
            <AvatarImage src={user.avatar} alt={user.fullName} />
            <AvatarFallback className="bg-muted text-muted-foreground">
                {initials}
            </AvatarFallback>
        </Avatar>
    </DropdownMenuTrigger>
</motion.div>

            <DropdownMenuContent 
                align="end" 
                sideOffset={10} 
                className="w-72 rounded-xl border-border bg-popover p-0 text-popover-foreground shadow-lg"
            >
                {/* FIX: Replaced DropdownMenuLabel with a standard div wrapper */}
                <div className="flex items-center gap-3 p-4">
                    <Avatar className="h-11 w-11 ring-1 ring-border">
                        <AvatarImage src={user.avatar} alt={user.fullName} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex min-w-0 flex-1 flex-col">
                        <p className="truncate text-sm font-semibold text-foreground">
                            {user.fullName}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                            @{user.username}
                        </p>
                    </div>
                </div>

                <DropdownMenuSeparator className="m-0 bg-border/60" />

                <DropdownMenuGroup className="p-1.5">
                    <DropdownMenuItem
                        onClick={() => navigate(`/channel/${user.username}`)}
                        className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-sidebar-hover focus:bg-sidebar-hover"
                    >
                        <UserCircleIcon size={20} weight="duotone" className="text-primary" />
                        <span className="font-medium">My Channel</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem 
                        onClick={() => navigate('/studio')}
                        className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-sidebar-hover focus:bg-sidebar-hover"
                    >
                        <MonitorPlayIcon size={20} weight="duotone" className="text-info" />
                        <span className="font-medium">Creator Studio</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem 
                        onClick={() => navigate('/settings')}
                        className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-sidebar-hover focus:bg-sidebar-hover"
                    >
                        <GearIcon size={20} weight="duotone" className="text-muted-foreground" />
                        <span className="font-medium">Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="m-0 bg-border/60" />

                <div className="p-1.5">
                    <DropdownMenuItem
                        onClick={logout}
                        className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-destructive transition-colors hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive"
                    >
                        <SignOutIcon size={20} weight="duotone" />
                        <span className="font-medium">Sign out</span>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}