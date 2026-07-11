// src/components/auth/AuthDivider.tsx

interface AuthDividerProps {
	text?: string;
}

export function AuthDivider({ text = 'OR' }: AuthDividerProps) {
	return (
		<div className="my-6 flex items-center gap-4">
			<div className="h-px flex-1 bg-border" />

			<span className="text-xs uppercase tracking-widest text-muted-foreground">
				{text}
			</span>

			<div className="h-px flex-1 bg-border" />
		</div>
	);
}
