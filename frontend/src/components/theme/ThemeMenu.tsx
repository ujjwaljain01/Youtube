import { DesktopIcon, MoonIcon, SunDimIcon } from '@phosphor-icons/react';

import { Check } from 'lucide-react';

import {
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { useTheme } from '@/hooks/use-theme';

export function ThemeMenu() {
	const { theme, setTheme } = useTheme();

	const items = [
		{
			label: 'Light',
			value: 'light',
			icon: SunDimIcon,
		},
		{
			label: 'Dark',
			value: 'dark',
			icon: MoonIcon,
		},
		{
			label: 'System',
			value: 'system',
			icon: DesktopIcon,
		},
	] as const;

	return (
		<DropdownMenuContent align="end" className="w-52">
			{items.map((item) => {
				const Icon = item.icon;

				return (
					<DropdownMenuItem
						key={item.value}
						onClick={() => setTheme(item.value)}
						className="cursor-pointer"
					>
						<Icon size={18} className="mr-3" />

						<span className="flex-1">{item.label}</span>

						{theme === item.value && <Check className="h-4 w-4" />}
					</DropdownMenuItem>
				);
			})}
		</DropdownMenuContent>
	);
}
