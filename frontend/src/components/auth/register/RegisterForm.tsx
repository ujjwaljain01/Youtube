// src/components/auth/RegisterForm.tsx

import { useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
	registerSchema,
	type RegisterFormValues,
} from '@/features/auth/validation';

import { REGISTER_STEPS, RegisterStep } from './register-steps';

import { RegisterStepper } from './RegisterStepper';

import { AccountStep, SecurityStep, ProfileStep } from './steps';

export function RegisterForm() {
	const [step, setStep] = useState(RegisterStep.ACCOUNT);

	const methods = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),

		mode: 'onTouched',

		defaultValues: {
			fullName: '',
			username: '',
			email: '',
			password: '',
		},
	});

	const { trigger, handleSubmit } = methods;

	const next = async () => {
		const valid = await trigger(REGISTER_STEPS[step].fields);

		if (!valid) return;

		setStep((prev) => (prev + 1) as RegisterStep);
	};

	const previous = () => {
		setStep((prev) => (prev - 1) as RegisterStep);
	};

	const submit = (values: RegisterFormValues) => {
		console.log(values);

		// useRegister mutation
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(submit)} className="space-y-8">
				<RegisterStepper currentStep={step} />

				{step === RegisterStep.ACCOUNT && <AccountStep />}

				{step === RegisterStep.SECURITY && <SecurityStep />}

				{step === RegisterStep.PROFILE && <ProfileStep />}

				<div className="flex justify-between">
					<button
						type="button"
						onClick={previous}
						disabled={step === 0}
					>
						Back
					</button>

					{step < RegisterStep.PROFILE ? (
						<button type="button" onClick={next}>
							Next
						</button>
					) : (
						<button type="submit">Create Account</button>
					)}
				</div>
			</form>
		</FormProvider>
	);
}
