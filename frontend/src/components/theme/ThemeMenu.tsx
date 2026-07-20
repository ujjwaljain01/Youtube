// src/components/theme/ThemeMenu.tsx
import { DesktopIcon, MoonIcon, SunDimIcon, MoonStarsIcon } from '@phosphor-icons/react';
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
            label: 'Night',
            value: 'night',
            icon: MoonStarsIcon,
        },
        {
            label: 'System',
            value: 'system',
            icon: DesktopIcon,
        },
    ] as const;

    return (
        <DropdownMenuContent 
            align="end" 
            className="w-44 border-border bg-popover p-1 shadow-md rounded-md"
        >
            {items.map((item) => {
                const Icon = item.icon;
                const isActive = theme === item.value;
                
                return (
                    <DropdownMenuItem
                        key={item.value}
                        onClick={() => setTheme(item.value)}
                        className={`flex items-center gap-3 cursor-pointer rounded-sm px-2 py-1.5 text-sm transition-colors
                            ${isActive 
                                ? 'bg-accent text-accent-foreground font-medium' 
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            }
                        `}
                    >
                        <Icon weight={isActive ? 'fill' : 'regular'} size={18} />
                        <span className="flex-1">{item.label}</span>
                        {isActive && (
                            <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                        )}
                    </DropdownMenuItem>
                );
            })}
        </DropdownMenuContent>
    );
}