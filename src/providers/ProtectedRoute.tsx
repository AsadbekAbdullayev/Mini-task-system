import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { Loader } from '@/shared/ui';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { isLoading } = useAuth(pathname !== '/login');

	useEffect(() => {
		const uid = localStorage.getItem('user_uid');

		if (!uid) {
			navigate('/login');
		}
	}, []);

	return (
		<>{pathname == '/login' ? children : isLoading ? <Loader /> : children}</>
	);
};

export default ProtectedRoute;
