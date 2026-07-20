// src/components/auth/PasswordInput.tsx

import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const PasswordInput = React.forwardRef<
    HTMLInputElement,
    PasswordInputProps
>(({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className="relative">
            <Input
                {...props}
                ref={ref}
                type={showPassword ? 'text' : 'password'}
                className={cn('pr-10', className)}
            />

            <Button
                type="button"
                variant="ghost"
                size="icon"
                tabIndex={-1}
                onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => !prev);
                }}
                // Changed from "top-1/2 -translate-y-1/2" to "top-0 bottom-0 my-auto"
                className="absolute right-1 top-0 bottom-0 my-auto h-8 w-8 hover:bg-transparent"
            >
                {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                ) : (
                    <Eye className="h-4 w-4" />
                )}

                <span className="sr-only">
                    {showPassword ? 'Hide password' : 'Show password'}
                </span>
            </Button>
        </div>
    );
});

PasswordInput.displayName = 'PasswordInput';