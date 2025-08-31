import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './../../context/ThemeContext';
import { FontSizeProvider } from './../../context/FontContext';
import PrivateRoute from '@/providers/ProtectedRoute';
import TicketInfo from './../../pages/TicketInfo';
import Dashboard from '@/pages/Dashboard';
import Profile from './../../pages/Profile';
import MyTickets from '@/pages/Ticket';
import Login from '@/pages/Login';
import AppLayout from '@/layout';

function App() {
	return (
		<ThemeProvider>
			<FontSizeProvider>
				{' '}
				{/* ThemeProvider bilan App komponentini o'rab olish */}
				<BrowserRouter>
					<Routes>
						{/* Login sahifasi */}
						<Route path="/login" element={<Login />} />

						<Route
							path="/"
							element={
								<PrivateRoute>
									<AppLayout /> {/* Asosiy layout (sidebar, topbar) */}
								</PrivateRoute>
							}
						>
							<Route path="" element={<Navigate to="dashboard" />} />
							<Route path="dashboard" element={<Dashboard />} />
							<Route path="ticket" element={<MyTickets />} />
							<Route path="/ticket/:id" element={<TicketInfo />} />
							<Route path="profile" element={<Profile />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</FontSizeProvider>
		</ThemeProvider>
	);
}

export default App;
