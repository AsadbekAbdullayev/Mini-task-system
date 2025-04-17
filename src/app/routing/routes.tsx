import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './../../context/ThemeContext';
import { FontSizeProvider } from './../../context/FontContext';
import Login from './../../pages/Login';
import Dashboard from './../../pages/Dashboard';
import ArchivedTicket from './../../pages/ArchivedTicket';
import Profile from './../../pages/Profile';
import MyTickets from './../../pages/MyTickets';
import TicketInfo from './../../pages/TicketInfo';
import AppLayout from '@/pages/Layout';

const PrivateRoute = ({ children }: any) => {
	const isAuth = localStorage.getItem('auth') === 'true'; // Agar autentifikatsiya qilingan bo'lsa
	return isAuth ? children : <Navigate to="/login" />; // Agar autentifikatsiya qilinmagan bo'lsa, login sahifasiga yo'naltiradi
};

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
							<Route path="archive" element={<ArchivedTicket />} />
							<Route path="profile" element={<Profile />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</FontSizeProvider>
		</ThemeProvider>
	);
}

export default App;
