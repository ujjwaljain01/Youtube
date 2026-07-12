import { Link } from 'react-router-dom';

import { ROUTES } from '@/routes';

export default function NotFoundPage() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			<h1 className="text-5xl font-bold">404</h1>

			<p>The page you're looking for doesn't exist.</p>

			<Link
				to={ROUTES.HOME}
				className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
			>
				Go Home
			</Link>
		</div>
	);
}
