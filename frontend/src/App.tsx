import './App.css';
import { ThemeProvider } from '@/providers/ThemeProvider';

function App() {
	return (
		<>
			<ThemeProvider>
				
				<RouterProvider router={router} />
			</ThemeProvider>
		</>
	);
}

export default App;
