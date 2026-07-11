// src/components/auth/AuthCard.tsx

import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

interface AuthCardProps extends PropsWithChildren {
	className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
			<div
				className={cn(
					'w-full max-w-md rounded-2xl border bg-card p-8 shadow-xl',
					className,
				)}
			>
				{children}
			</div>
		</div>
	);
}
