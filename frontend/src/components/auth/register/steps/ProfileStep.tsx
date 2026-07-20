// src/components/auth/steps/ProfileStep.tsx

import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { FormMessage } from '@/components/form';
import { ImagePicker } from '@/components/media';
import type { RegisterFormValues } from '@/features/auth/validation';

export function ProfileStep() {
    const { control, formState: { errors } } = useFormContext<RegisterFormValues>();

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full w-full overflow-y-auto">
            {/* Avatar Upload */}
            <div className="space-y-2 group/input">
                <Label className="text-sm font-medium text-foreground transition-colors group-focus-within/input:text-primary">
                    Avatar <span className="text-destructive ml-1">*</span>
                </Label>
                <Controller
                    name="avatar"
                    control={control}
                    render={({ field }) => (
                        <ImagePicker 
                            value={field.value} 
                            onChange={field.onChange}
                            placeholder="Click to upload avatar"
                        />
                    )}
                />
                {errors.avatar && (
                    <FormMessage className="text-[var(--destructive)] animate-in slide-in-from-top-1 fade-in">
                        {errors.avatar.message as string}
                    </FormMessage>
                )}
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-2 group/input">
                <Label className="text-sm font-medium text-foreground transition-colors group-focus-within/input:text-primary">
                    Cover Image <span className="text-destructive ml-1"></span>
                </Label>
                <Controller
                    name="coverImage"
                    control={control}
                    render={({ field }) => (
                        <ImagePicker 
                            value={field.value} 
                            onChange={field.onChange} 
                            placeholder="Click to upload cover image"
                        />
                    )}
                />
                {errors.coverImage && (
                    <FormMessage className="text-[var(--destructive)] animate-in slide-in-from-top-1 fade-in">
                        {errors.coverImage.message as string}
                    </FormMessage>
                )}
            </div>
        </div>
    );
}