// src/components/auth/steps/SecurityStep.tsx

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { FormMessage } from '@/components/form';
import { PasswordInput } from '@/components/auth/PasswordInput';
import type { RegisterFormValues } from '@/features/auth/validation';

export function SecurityStep() {
    const { register, formState: { errors } } = useFormContext<RegisterFormValues>();

    return (
        <div className="space-y-5">
            <div className="space-y-2 group/input">
                <Label htmlFor="password" className="transition-colors group-focus-within/input:text-primary">
                    Password
                </Label>
                <PasswordInput
                    id="password"
                    placeholder="••••••••"
                    className="h-11 bg-background transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary"
                    {...register('password')}
                />
                {errors.password && (
                    <FormMessage className="text-[var(--destructive)] animate-in slide-in-from-top-1 fade-in">
                        {errors.password.message}
                    </FormMessage>
                )}
            </div>

            <div className="space-y-2 group/input">
                <Label htmlFor="confirmPassword" className="transition-colors group-focus-within/input:text-primary">
                    Confirm Password
                </Label>
                <PasswordInput
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="h-11 bg-background transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary"
                    {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                    <FormMessage className="text-[var(--destructive)] animate-in slide-in-from-top-1 fade-in">
                        {errors.confirmPassword.message}
                    </FormMessage>
                )}
            </div>
        </div>
    );
}