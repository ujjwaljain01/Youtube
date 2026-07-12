import './App.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AppRouter } from '@/routes';

function App() {
	return (
		<>
			<ThemeProvider>
					<AppRouter />
			</ThemeProvider>
		</>
	);
}

export default App;
