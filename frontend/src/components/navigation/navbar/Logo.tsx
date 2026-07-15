import logo from '@/assets/logo.webp';

import { Link } from 'react-router-dom';

export function Logo() {
	return (
		<Link to="/" className="flex items-center">
			<div className="flex h-10 w-20 items-center justify-center rounded-xl bg-primary text-primary-foreground">
				<img src={logo} alt="NovaPlay Logo" className="h-10 w-18" />
			</div>
			<span className="text-lg font-semibold">NovaPlay</span>
		</Link>
	);
}
