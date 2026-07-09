import {
	SignOutIcon,
	UserCircleIcon,
	GearIcon,
	MonitorPlayIcon,
} from '@phosphor-icons/react';

import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Button } from '@/components/ui/button';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useAuthStore } from '@/features/auth/auth.store';

export function UserMenu() {
	const navigate = useNavigate();

	const { user, isAuthenticated, logout } = useAuthStore();

	if (!isAuthenticated || !user) {
		return (
			<Button onClick={() => navigate('/login')} className="rounded-full">
				Sign in
			</Button>
		);
	}

	const initials =
		user.fullName
			?.split(' ')
			.map((name) => name[0])
			.join('')
			.slice(0, 2)
			.toUpperCase() ?? 'U';

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="rounded-full outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring">
					<Avatar className="h-9 w-9 cursor-pointer">
						<AvatarImage src={user.avatar} alt={user.fullName} />

						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" sideOffset={10} className="w-72">
				<DropdownMenuLabel className="p-3">
					<div className="flex gap-3">
						<Avatar className="h-11 w-11">
							<AvatarImage
								src={user.avatar}
								alt={user.fullName}
							/>

							<AvatarFallback>{initials}</AvatarFallback>
						</Avatar>

						<div className="min-w-0 flex-1">
							<p className="truncate font-medium">
								{user.fullName}
							</p>

							<p className="truncate text-sm text-muted-foreground">
								@{user.username}
							</p>
						</div>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={() => navigate(`/channel/${user.username}`)}
					>
						<UserCircleIcon size={20} weight="duotone" />

						<span>My Channel</span>
					</DropdownMenuItem>

					<DropdownMenuItem onClick={() => navigate('/studio')}>
						<MonitorPlayIcon size={20} weight="duotone" />

						<span>Creator Studio</span>
					</DropdownMenuItem>

					<DropdownMenuItem onClick={() => navigate('/settings')}>
						<GearIcon size={20} weight="duotone" />

						<span>Settings</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					onClick={logout}
					className="text-destructive focus:text-destructive"
				>
					<SignOutIcon size={20} weight="duotone" />

					<span>Sign out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
