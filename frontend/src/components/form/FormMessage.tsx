// src/components/form/FormMessage.tsx
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface FormMessageProps {
    message?: string;
    className?: string;
    children?: ReactNode; // 1. Add children to your types
}

export function FormMessage({ message, className, children }: FormMessageProps) {
    // 2. Allow it to use either the children or the message prop
    const content = children || message; 
    
    if (!content) return null;

    return (
        <p className={cn('text-sm font-medium text-destructive', className)}>
            {content}
        </p>
    );
}