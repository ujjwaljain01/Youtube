// src/components/auth/RegisterForm.tsx
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretRight, CaretLeft } from '@phosphor-icons/react';

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
import { AuthHeader } from '../AuthHeader';
import { AuthFooter } from '../AuthFooter';

const PLAYFUL_TEXTS = {
	[RegisterStep.ACCOUNT]: {
		title: "Let's Get Started! 🚀",
		description:
			"Every great journey begins with a single step. We just need a few basic details to set up your profile. Don't worry, no spam allowed.",
	},
	[RegisterStep.SECURITY]: {
		title: 'Lock It Down 🔒',
		description:
			'Create a fortress for your account. Pick a strong password to keep the digital goblins and hackers at bay.',
	},
	[RegisterStep.PROFILE]: {
		title: 'Make It Yours 🎨',
		description:
			'Put a face to the name! Upload an avatar and cover image so everyone knows how awesome you are.',
	},
};

function RegisterFormContent() {
	const navigate = useNavigate();
	const registerMutation = useRegister();
	const stepper = useRegisterStepper();
	const methods = useFormContext<RegisterFormValues>();

	const submit = async (values: RegisterFormValues) => {
		try {
			await registerMutation.mutateAsync(values);
			toast.success('Account created successfully. Welcome aboard! 🎉');
			navigate(ROUTES.LOGIN, { replace: true });
		} catch (error: any) {
			toast.error(
				error?.response?.data?.message ??
					'Registration failed. Please try again.',
			);
		}
	};

	const currentPlayfulText =
		PLAYFUL_TEXTS[stepper.currentStep as keyof typeof PLAYFUL_TEXTS];

	return (
		<div className="flex min-h-screen w-full bg-background">
			{/* LEFT SECTION: Playful Animated Text */}
			<div className="hidden lg:flex w-1/2 flex-col justify-center items-center bg-zinc-950 p-12 relative overflow-hidden">
				{/* Background styling for the dark section */}
				<div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-500 to-transparent" />

				<div className="z-10 max-w-lg text-center text-zinc-50">
					<AnimatePresence mode="wait">
						<motion.div
							key={stepper.currentStep}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.4, ease: 'easeOut' }}
						>
							<h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
								{currentPlayfulText.title}
							</h2>
							<p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
								{currentPlayfulText.description}
							</p>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>

			{/* RIGHT SECTION: The Actual Form */}
			<div className="flex w-full lg:w-1/2 flex-col justify-center px-6 py-12 sm:px-12 lg:px-24">
				<div className="mx-auto w-full max-w-md">
					<AuthHeader
						title="Join Us"
						description="Create your account to unlock all features."
					/>

					<form
						onSubmit={methods.handleSubmit(submit)}
						className="mt-8 space-y-8"
					>
						<RegisterStepper currentStep={stepper.currentStep} />

						{/* Form Steps with Animation */}
						<div className="relative min-h-[320px] w-full">
							<AnimatePresence mode="wait">
								<motion.div
									key={stepper.currentStep}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.3 }}
									className="absolute inset-x-0 top-0"
								>
									{stepper.currentStep ===
										RegisterStep.ACCOUNT && <AccountStep />}
									{stepper.currentStep ===
										RegisterStep.SECURITY && (
										<SecurityStep />
									)}
									{stepper.currentStep ===
										RegisterStep.PROFILE && <ProfileStep />}
								</motion.div>
							</AnimatePresence>
						</div>

						{/* Navigation Controls */}
						<div className="flex gap-4 pt-4">
							<Button
								type="button"
								variant="outline"
								onClick={stepper.previous}
								disabled={stepper.isFirstStep}
								className={
									stepper.isFirstStep
										? 'opacity-0 pointer-events-none w-0 p-0 overflow-hidden'
										: 'w-24 transition-all'
								}
							>
								<CaretLeft
									weight="bold"
									className="mr-2 h-4 w-4"
								/>
								Back
							</Button>

							{stepper.isLastStep ? (
								<Button
									type="submit"
									className="flex-1"
									disabled={registerMutation.isPending}
								>
									{registerMutation.isPending
										? 'Creating Account...'
										: 'Create Account'}
								</Button>
							) : (
								<Button
									type="button"
									className="flex-1"
									onClick={stepper.next}
								>
									Continue
									<CaretRight
										weight="bold"
										className="ml-2 h-4 w-4"
									/>
								</Button>
							)}
						</div>
					</form>

					<div className="mt-8">
						<AuthFooter
							label="Already have an account?"
							linkLabel="Sign in"
							href={ROUTES.LOGIN}
						/>
					</div>
				</div>
			</div>
		</div>
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
