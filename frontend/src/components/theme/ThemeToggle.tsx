// src/components/theme/ThemeToggle.tsx
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { buttonVariants } from '@/components/ui/button'; // Import the variants
import { ThemeIcon } from './ThemeIcon';
import { ThemeMenu } from './ThemeMenu';

export function ThemeToggle() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger 
                className={buttonVariants({ 
                    variant: 'outline', 
                    size: 'icon', 
                    className: 'relative overflow-hidden border-border bg-background hover:bg-accent hover:text-accent-foreground ring-offset-background transition-colors focus-visible:ring-ring' 
                })}
            >
                <ThemeIcon />
                <span className="sr-only">Toggle theme</span>
            </DropdownMenuTrigger>
            
            <ThemeMenu />
        </DropdownMenu>
    );
}