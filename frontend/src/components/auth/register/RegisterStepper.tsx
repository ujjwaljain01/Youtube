// src/components/auth/RegisterStepper.tsx

import { REGISTER_STEPS } from './register-steps';
import { cn } from '@/lib/utils';

interface RegisterStepperProps {
	currentStep: number;
}

export function RegisterStepper({ currentStep }: RegisterStepperProps) {
	return (
		<div className="mb-10">
			<div className="flex items-center justify-between">
				{REGISTER_STEPS.map((step, index) => {
					const active = currentStep === index;
					const completed = currentStep > index;

					return (
						<div key={step.id} className="flex flex-1 items-center">
							<div className="flex flex-col items-center">
								<div
									className={cn(
										'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors',
										completed &&
											'border-primary bg-primary text-primary-foreground',
										active && 'border-primary',
										!completed && !active && 'border-muted',
									)}
								>
									{index + 1}
								</div>

								<p className="mt-2 text-xs font-medium">
									{step.title}
								</p>
							</div>

							{index !== REGISTER_STEPS.length - 1 && (
								<div
									className={cn(
										'h-[2px] flex-1 mx-2',
										completed ? 'bg-primary' : 'bg-border',
									)}
								/>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
