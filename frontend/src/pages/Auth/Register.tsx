// src/pages/Auth/Register/index.tsx

import { AuthFooter, AuthHeader, RegisterForm } from '@/components/auth';

import { ROUTES } from '@/routes';

export default function RegisterPage() {
	return (
		<>
			<AuthHeader
				title="Create your account"
				description="Create an account to start using NovaPlay."
			/>

			<RegisterForm />

			<AuthFooter
				label="Already have an account?"
				linkLabel="Sign in"
				href={ROUTES.LOGIN}
			/>
		</>
	);
}
