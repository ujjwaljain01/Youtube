// src/components/auth/AuthHeader.tsx

interface AuthHeaderProps {
	title: string;

	description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
	return (
		<header className="mb-8 space-y-2 text-center">
			<h1 className="text-3xl font-bold">{title}</h1>

			<p className="text-muted-foreground">{description}</p>
		</header>
	);
}
