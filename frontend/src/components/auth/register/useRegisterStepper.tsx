// src/components/auth/useRegisterStepper.ts

import { useCallback, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import type { RegisterFormValues } from '@/features/auth/validation';

import { RegisterStep, REGISTER_STEPS } from './register-steps';

export function useRegisterStepper() {
	const { trigger } = useFormContext<RegisterFormValues>();

	const [currentStep, setCurrentStep] = useState(0);

	const isFirstStep = currentStep === 0;

	const isLastStep = currentStep === REGISTER_STEPS.length - 1;

	const next = useCallback(async () => {
		const valid = await trigger(REGISTER_STEPS[currentStep].fields);

		if (!valid) return false;

		setCurrentStep((prev) => prev + 1);

		return true;
	}, [currentStep, trigger]);

	const previous = useCallback(() => {
		if (isFirstStep) return;

		setCurrentStep((prev) => prev - 1);
	}, [isFirstStep]);

	const current = useMemo(() => REGISTER_STEPS[currentStep], [currentStep]);

	return {
		current,
		currentStep,

		isFirstStep,
		isLastStep,

		next,
		previous,
	};
}
