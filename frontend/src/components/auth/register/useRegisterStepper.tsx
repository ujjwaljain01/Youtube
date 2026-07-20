// src/components/auth/useRegisterStepper.tsx

import { useState } from 'react';
import { RegisterStep } from './register-steps';

export function useRegisterStepper() {
    // Initialize with the first step in the sequence
    const [currentStep, setCurrentStep] = useState<RegisterStep>(RegisterStep.ACCOUNT);
    
    // Direction tracks if we are moving forward (1) or backward (-1).
    // This is passed to Framer Motion's `custom` prop for directional slide animations.
    const [direction, setDirection] = useState<number>(0);

    // Define the strict order of steps for the registration flow
    const stepsOrder = [
        RegisterStep.ACCOUNT,
        RegisterStep.SECURITY,
        RegisterStep.PROFILE,
    ];

    const currentIndex = stepsOrder.indexOf(currentStep);
    
    const isFirstStep = currentIndex === 0;
    const isLastStep = currentIndex === stepsOrder.length - 1;

    const nextStep = () => {
        if (!isLastStep) {
            setDirection(1); // Moving forward
            setCurrentStep(stepsOrder[currentIndex + 1]);
        }
    };

    const prevStep = () => {
        if (!isFirstStep) {
            setDirection(-1); // Moving backward
            setCurrentStep(stepsOrder[currentIndex - 1]);
        }
    };

    const jumpToStep = (step: RegisterStep) => {
        const targetIndex = stepsOrder.indexOf(step);
        if (targetIndex !== -1 && targetIndex !== currentIndex) {
            setDirection(targetIndex > currentIndex ? 1 : -1);
            setCurrentStep(step);
        }
    };

    return {
        currentStep,
        direction,
        isFirstStep,
        isLastStep,
        nextStep,
        prevStep,
        jumpToStep,
    };
}