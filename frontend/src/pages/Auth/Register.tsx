// src/pages/Auth/Register/index.tsx

import { RegisterForm } from '@/components/auth';
import { ThemeToggle } from '@/components/theme/ThemeToggle';


export default function RegisterPage() {
	return (
		<div className="relative flex min-h-screen items-center justify-center transition-colors duration-300">
		{/* Top Right Corner Wrapper */}
		<div className="absolute right-4 top-4 sm:right-8 sm:top-8">
			<ThemeToggle />
		</div>

		{/* Centered Login Form Wrapper */}
		<div>
			<RegisterForm />
		</div>
	</div>
	);
}
