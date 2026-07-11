// src/components/auth/steps/AccountStep.tsx

import { useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormMessage } from '@/components/form';

import type { RegisterFormValues } from '@/features/auth/validation';

export function AccountStep() {
	const {
		register,
		formState: { errors },
	} = useFormContext<RegisterFormValues>();

	return (
		<div className="space-y-5">
			<div className="space-y-2">
				<Label htmlFor="fullName">Full Name</Label>

				<Input
					id="fullName"
					placeholder="John Doe"
					{...register('fullName')}
				/>

				<FormMessage message={errors.fullName?.message} />
			</div>

			<div className="space-y-2">
				<Label htmlFor="username">Username</Label>

				<Input
					id="username"
					placeholder="johndoe"
					{...register('username')}
				/>

				<FormMessage message={errors.username?.message} />
			</div>

			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>

				<Input
					id="email"
					type="email"
					placeholder="john@example.com"
					{...register('email')}
				/>

				<FormMessage message={errors.email?.message} />
			</div>
		</div>
	);
}
