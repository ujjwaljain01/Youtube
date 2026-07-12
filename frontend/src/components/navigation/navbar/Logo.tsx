import logo from '@/assets/logo.webp';

import { Link } from 'react-router-dom';

export function Logo() {
	return (
		<Link to="/" className="flex items-center gap-2">
			<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
				<img src={logo} alt="NovaPlay Logo" className="h-6 w-6" />
			</div>

			<span className="text-lg font-semibold">NovaPlay</span>
		</Link>
	);
}
