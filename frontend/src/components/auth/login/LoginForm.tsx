// src/components/auth/LoginForm.tsx

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { FormMessage } from '@/components/form';

import { PasswordInput } from '@/components/auth/PasswordInput';

import { loginSchema, type LoginFormValues } from '@/features/auth/validation';

import { useLogin } from '@/features/auth/mutations';

import { ROUTES } from '@/routes';

export function LoginForm() {
	const navigate = useNavigate();

	const login = useLogin();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),

		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: LoginFormValues) => {
		try {
			await login.mutateAsync(values);

			toast.success('Welcome back!');

			navigate(ROUTES.HOME, {
				replace: true,
			});
		} catch (error: any) {
			toast.error(error?.response?.data?.message ?? 'Login failed.');
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>

				<Input
					id="email"
					type="email"
					autoComplete="email"
					placeholder="Enter your email"
					{...register('email')}
				/>

				<FormMessage message={errors.email?.message} />
			</div>

			<div className="space-y-2">
				<Label htmlFor="password">Password</Label>

				<PasswordInput
					id="password"
					autoComplete="current-password"
					placeholder="Enter your password"
					{...register('password')}
				/>

				<FormMessage message={errors.password?.message} />
			</div>

			<Button type="submit" className="w-full" disabled={login.isPending}>
				{login.isPending ? 'Signing in...' : 'Sign In'}
			</Button>
		</form>
	);
}
