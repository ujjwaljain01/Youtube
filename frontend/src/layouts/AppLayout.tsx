// src/layouts/AppLayout.tsx

import { Outlet } from 'react-router-dom';

import { Navbar } from '@/components/navigation/navbar';
import { Sidebar } from '@/components/navigation/sidebar';

import { motion } from 'motion/react';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function AppLayout() {
	return (
		<div className="min-h-screen bg-background">
			<TooltipProvider>
				<Navbar />
				<motion.div layout className="flex flex-1 overflow-hidden">
					<Sidebar />

					<motion.main layout className="flex-1 overflow-y-auto">
						<Outlet />
					</motion.main>
				</motion.div>
			</TooltipProvider>
		</div>
	);
}
