import { SearchBar } from './SearchBar';
import { SidebarToggle } from './SidebarToggle';
import { Logo } from './Logo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { CreateButton } from './CreateButton';
import { UserMenu } from './UserMenu';
import { SearchButton } from './SearchButton';
import { motion } from 'motion/react';

export function Navbar() {
	return (
		<motion.header
			layout
			initial={false}
			transition={{
				layout: {
					duration: 0.25,
				},
			}}
			className=" sticky top-0 z-50 flex h-16 items-center justify-between bg-background/75 px-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
		>
			<div className="flex items-center gap-3">
				<SidebarToggle />
				<motion.div
					layout
					whileHover={{
						scale: 1.03,
					}}
					whileTap={{
						scale: 0.96,
					}}
				>
					<Logo />
				</motion.div>
			</div>

			<motion.div
				layout
				className="hidden flex-1 justify-center px-8 md:flex"
			>
				<SearchBar />
			</motion.div>

			<div className="flex items-center gap-2">
				<SearchButton />

				<ThemeToggle />

				<CreateButton />

				<UserMenu />
			</div>
		</motion.header>
	);
}
