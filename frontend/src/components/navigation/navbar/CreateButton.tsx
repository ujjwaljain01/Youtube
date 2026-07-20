import { PlusIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function CreateButton() {
	const navigate = useNavigate();
	return (
		<Button
			variant="secondary"
			className="hidden gap-2 rounded-full md:flex"
			onClick={() => navigate('/upload')}
		>
			<PlusIcon />
			Create
		</Button>
	);
}
