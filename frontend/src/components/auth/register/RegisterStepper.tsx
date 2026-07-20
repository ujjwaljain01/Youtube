// src/components/auth/RegisterStepper.tsx

import { motion } from 'framer-motion';
import { RegisterStep } from './register-steps';
import { cn } from '@/lib/utils';

interface RegisterStepperProps {
	currentStep: number;
}

// Ensure you have an array/object mapping the steps in order
const STEPS_ORDER = [
	{ id: RegisterStep.ACCOUNT, label: 'Account' },
	{ id: RegisterStep.SECURITY, label: 'Security' },
	{ id: RegisterStep.PROFILE, label: 'Profile' },
];

export function RegisterStepper({ currentStep }: RegisterStepperProps) {
	// Find the index of the current step to calculate progress
	const currentIndex = STEPS_ORDER.findIndex(
		(step) => step.id === currentStep,
	);

	return (
		<div className="relative flex items-center justify-between w-full mb-4">
			{/* Background Track */}
			<div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-secondary rounded-full" />

			{/* Animated Progress Fill */}
			<motion.div
				className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0"
				initial={{ width: 0 }}
				animate={{
					width: `${(currentIndex / (STEPS_ORDER.length - 1)) * 100}%`,
				}}
				transition={{ duration: 0.4, ease: 'easeInOut' }}
			/>

			{/* Step Indicators */}
			{STEPS_ORDER.map((step, index) => {
				const isActive = index === currentIndex;
				const isCompleted = index < currentIndex;

				return (
					<div
						key={step.id}
						className="relative z-10 flex flex-col items-center gap-2"
					>
						<motion.div
							initial={false}
							animate={{
								scale: isActive ? 1.2 : 1,
							}}
							style={{
								backgroundColor: isCompleted
									? 'var(--success)'
									: isActive
										? 'var(--primary)'
										: 'var(--background)',
								borderColor: isCompleted
									? 'var(--success)'
									: isActive
										? 'var(--primary)'
										: 'var(--border)',
								color: isCompleted
									? '#ffffff'
									: isActive
										? 'var(--primary-foreground)'
										: 'var(--muted-foreground)',
							}}
							className={cn(
								'flex items-center justify-center w-8 h-8 rounded-full border-2',
								'transition-colors duration-300',
								isActive ? 'shadow-md shadow-primary/20' : '',
							)}
						>
							<span className="text-sm font-semibold">
								{index + 1}
							</span>
						</motion.div>
						<span
							className={cn(
								'text-xs font-medium absolute -bottom-6 w-20 text-center transition-colors duration-300',
								isActive
									? 'text-foreground'
									: 'text-muted-foreground',
							)}
						>
							{step.label}
						</span>
					</div>
				);
			})}
		</div>
	);
}
