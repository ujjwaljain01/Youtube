// src/pages/Auth/Register/index.tsx

import { AuthFooter, AuthHeader, LoginForm } from '@/components/auth/';
import { ROUTES } from '@/routes';

export default function RegisterPage() {
	return (
		<>
			// src/pages/Auth/Login/index.tsx
			<AuthHeader
				title="Welcome back"
				description="Sign in to continue to NovaPlay."
			/>
			<LoginForm />
			<AuthFooter
				label="Don't have an account?"
				linkLabel="Create one"
				href={ROUTES.REGISTER}
			/>
		</>
	);
}
