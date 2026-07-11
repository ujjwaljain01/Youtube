export default function RegisterPage() {
	const navigate = useNavigate();

	const registerMutation = useRegister();

	const onSubmit = async (values: RegisterCredentials) => {
		try {
			await registerMutation.mutateAsync(values);

			toast.success('Account created successfully.');

			navigate(ROUTES.LOGIN, {
				replace: true,
			});
		} catch (error: any) {
			toast.error(
				error?.response?.data?.message ?? 'Registration failed',
			);
		}
	};

	return <div>Register Page</div>;
}
