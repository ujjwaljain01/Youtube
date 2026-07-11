import { AuthCard, AuthFooter, AuthHeader } from '@/components/auth';

import { LoginForm } from '@/components/auth/LoginForm';

import { ROUTES } from '@/routes';
import { useLogin } from '@/features/auth/mutations';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function LoginPage() {
	const navigate = useNavigate();

	const loginMutation = useLogin();

	const onSubmit = async (values: LoginCredentials) => {
		try {
			await loginMutation.mutateAsync(values);

			toast.success('Welcome back!');

			navigate(ROUTES.HOME, {
				replace: true,
			});
		} catch (error: any) {
			toast.error(error?.response?.data?.message ?? 'Login failed');
		}
	};

	return (
		<AuthCard>
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
		</AuthCard>
	);
}
