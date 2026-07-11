// src/components/auth/steps/ProfileStep.tsx

import { Controller, useFormContext } from 'react-hook-form';

import { FormMessage } from '@/components/form';
import { ImagePicker } from '@/components/media';

import type { RegisterFormValues } from '@/features/auth/validation';

export function ProfileStep() {
	const {
		control,
		formState: { errors },
	} = useFormContext<RegisterFormValues>();

	return (
		<div className="space-y-8">
			<div>
				<Controller
					name="avatar"
					control={control}
					render={({ field }) => (
						<ImagePicker
							label="Avatar"
							required
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>

				<FormMessage message={errors.avatar?.message} />
			</div>

			<div>
				<Controller
					name="coverImage"
					control={control}
					render={({ field }) => (
						<ImagePicker
							label="Cover Image"
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>

				<FormMessage message={errors.coverImage?.message} />
			</div>
		</div>
	);
}
