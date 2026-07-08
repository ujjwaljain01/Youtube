import './App.css';
import { ThemeProvider } from '@/providers/themeProvider';

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
