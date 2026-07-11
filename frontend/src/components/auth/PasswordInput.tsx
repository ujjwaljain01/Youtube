// src/components/auth/PasswordInput.tsx

import { Eye, EyeOff } from 'lucide-react';

import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type PasswordInputProps = React.ComponentProps<typeof Input>;

export function PasswordInput(props: PasswordInputProps) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="relative">
			<Input {...props} type={showPassword ? 'text' : 'password'} />

			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="absolute right-2 top-1/2 -translate-y-1/2"
				onClick={() => setShowPassword((prev) => !prev)}
			>
				{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
			</Button>
		</div>
	);
}
