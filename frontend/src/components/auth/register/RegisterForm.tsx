// src/components/auth/RegisterForm.tsx

import { useNavigate } from 'react-router-dom';

import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import {
	registerSchema,
	type RegisterFormValues,
} from '@/features/auth/validation';

import { useRegister } from '@/features/auth/mutations';

import { ROUTES } from '@/routes';

import { RegisterStepper } from './RegisterStepper';

import { useRegisterStepper } from './useRegisterStepper';

import { AccountStep, ProfileStep, SecurityStep } from './steps';

import { RegisterStep } from './register-steps';

function RegisterFormContent() {
	const navigate = useNavigate();

	const registerMutation = useRegister();

	const stepper = useRegisterStepper();

	const methods = useFormContext<RegisterFormValues>();

	const submit = async (values: RegisterFormValues) => {
		try {
			await registerMutation.mutateAsync(values);

			toast.success('Account created successfully.');

			navigate(ROUTES.LOGIN, {
				replace: true,
			});
		} catch (error: any) {
			toast.error(
				error?.response?.data?.message ?? 'Registration failed.',
			);
		}
	};

	return (
		<form onSubmit={methods.handleSubmit(submit)} className="space-y-8">
			<RegisterStepper currentStep={stepper.currentStep} />

			{stepper.currentStep === RegisterStep.ACCOUNT && <AccountStep />}

			{stepper.currentStep === RegisterStep.SECURITY && <SecurityStep />}

			{stepper.currentStep === RegisterStep.PROFILE && <ProfileStep />}

			<div className="flex justify-between">
				<Button
					type="button"
					variant="outline"
					onClick={stepper.previous}
					disabled={stepper.isFirstStep}
				>
					Back
				</Button>

				{stepper.isLastStep ? (
					<Button type="submit" disabled={registerMutation.isPending}>
						{registerMutation.isPending
							? 'Creating...'
							: 'Create Account'}
					</Button>
				) : (
					<Button type="button" onClick={stepper.next}>
						Next
					</Button>
				)}
			</div>
		</form>
	);
}

export function RegisterForm() {
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

	return (
		<FormProvider {...methods}>
			<RegisterFormContent />
		</FormProvider>
	);
}
