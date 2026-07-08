// layouts/AppLayout.tsx

import { Navbar } from '@/components/navigation/navbar/Navbar';
import { Sidebar } from '@/components/navigation/sidebar/Sidebar';
import { MainContent } from '@/components/layout/MainContent';

export function AppLayout() {
	return (
		<div className="min-h-screen bg-background">
			<Navbar />

			<div className="flex flex-1 overflow-hidden">
				<Sidebar />

				<MainContent />
			</div>
		</div>
	);
}
