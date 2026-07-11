// src/components/auth/register-steps.ts

// 1. Define a standard JavaScript object
export const RegisterStep = {
	ACCOUNT: 0,
	SECURITY: 1,
	PROFILE: 2,
} as const;

// 2. Derive the type from the object
export type RegisterStep = (typeof RegisterStep)[keyof typeof RegisterStep];

export const REGISTER_STEPS = [
	{
		id: RegisterStep.ACCOUNT,
		title: 'Account',
		description: 'Basic account information',
		fields: ['fullName', 'username', 'email'] as const,
	},
	{
		id: RegisterStep.SECURITY,
		title: 'Security',
		description: 'Create a password',
		fields: ['password'] as const,
	},
	{
		id: RegisterStep.PROFILE,
		title: 'Profile',
		description: 'Upload profile images',
		fields: ['avatar'] as const,
	},
] as const;
