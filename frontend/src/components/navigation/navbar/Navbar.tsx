import { SearchBar } from './SearchBar';
import { SidebarToggle } from './SidebarToggle';
import { Logo } from './Logo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { NotificationButton } from './NotificationButton';
import { CreateButton } from './CreateButton';
import { UserMenu } from './UserMenu';
import { SearchButton } from './SearchButton';

export function Navbar() {
	return (
		<header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur">
			<div className="flex items-center gap-3">
				<SidebarToggle />
				<Logo />
			</div>

			<div className="hidden flex-1 justify-center px-8 md:flex">
				<SearchBar />
			</div>

			<div className="flex items-center gap-2">
				<SearchButton />

				<ThemeToggle />

				<CreateButton />

				<NotificationButton />

				<UserMenu />
			</div>
		</header>
	);
}
