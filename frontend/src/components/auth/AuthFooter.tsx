// src/components/auth/AuthFooter.tsx

import { Link } from 'react-router-dom';

interface AuthFooterProps {
	label: string;

	linkLabel: string;

	href: string;
}

export function AuthFooter({ label, linkLabel, href }: AuthFooterProps) {
	return (
		<footer className="mt-8 text-center text-sm text-muted-foreground">
			{label}{' '}
			<Link
				to={href}
				className="font-medium text-primary hover:underline"
			>
				{linkLabel}
			</Link>
		</footer>
	);
}
