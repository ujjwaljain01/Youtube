import { AuthFooter, AuthHeader } from '@/components/auth';

import { LoginForm } from '@/components/auth/login/LoginForm';

import { ROUTES } from '@/routes';

export default function LoginPage() {
	return (
		<div>
			<AuthHeader
				title="Welcome Back"
				description="Sign in to your NovaPlay account."
			/>

			<LoginForm />

			<AuthFooter
				label="Don't have an account?"
				linkLabel="Create one"
				href={ROUTES.REGISTER}
			/>
		</div>
	);
}
