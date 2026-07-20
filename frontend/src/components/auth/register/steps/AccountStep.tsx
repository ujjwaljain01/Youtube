// src/components/auth/steps/AccountStep.tsx

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormMessage } from '@/components/form';
import type { RegisterFormValues } from '@/features/auth/validation';

export function AccountStep() {
    const { register, formState: { errors } } = useFormContext<RegisterFormValues>();

    return (
        <div className="space-y-5">
            <div className="space-y-2 group/input">
                <Label htmlFor="email" className="transition-colors group-focus-within/input:text-primary">
                    Email Address
                </Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-11 bg-background transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary"
                    {...register('email')}
                />
                {errors.email && (
                    <FormMessage className="text-[var(--destructive)] animate-in slide-in-from-top-1 fade-in">
                        {errors.email.message}
                    </FormMessage>
                )}
            </div>

            <div className="space-y-2 group/input">
                <Label htmlFor="username" className="transition-colors group-focus-within/input:text-primary">
                    Username
                </Label>
                <Input
                    id="username"
                    placeholder="cool_creator_99"
                    className="h-11 bg-background transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary"
                    {...register('username')}
                />
                {errors.username && (
                    <FormMessage className="text-[var(--destructive)] animate-in slide-in-from-top-1 fade-in">
                        {errors.username.message}
                    </FormMessage>
                )}
            </div>
        </div>
    );
}