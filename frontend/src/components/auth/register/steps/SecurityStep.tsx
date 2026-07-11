// src/components/auth/steps/SecurityStep.tsx

import { useFormContext } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { FormMessage } from '@/components/form';

import { PasswordInput } from '../PasswordInput';

import type { RegisterFormValues } from '@/features/auth/validation';

export function SecurityStep() {
	const {
		register,
		formState: { errors },
	} = useFormContext<RegisterFormValues>();

	return (
		<div className="space-y-5">
			<div className="space-y-2">
				<Label htmlFor="password">Password</Label>

				<PasswordInput
					id="password"
					placeholder="Create a strong password"
					autoComplete="new-password"
					{...register('password')}
				/>

				<FormMessage message={errors.password?.message} />
			</div>
		</div>
	);
}
