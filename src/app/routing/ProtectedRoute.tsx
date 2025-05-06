// import { useProfile } from '@/entities/student/api';
// import { Loader } from '@/shared/ui';
// import { useDispatch } from 'react-redux';
// import { setUserDetails } from '@redux/slices/generelSlice';
// import { useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
// import { message } from 'antd';

import { useEffect } from 'react';

interface DecodedToken {
	role: string;
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	// const { data, isLoading, refetch } = useProfile();
	// const dispatch = useDispatch();
	// const token = localStorage.getItem('token');
	const navigate = useNavigate();

	// useEffect(() => {
	// 	token && window?.location?.pathname.includes('profile') && refetch();
	// }, [token]);

	// useEffect(() => {
	// 	if (data?.id && token) {
	// 		const decoded = jwtDecode<DecodedToken>(token);
	// 		const currentPath = window.location.pathname;

	// 		// Store user role in localStorage
	// 		if (decoded.role === 'Student') {
	// 			localStorage.setItem('role', 'Student');
	// 		} else if (decoded.role === 'Admin') {
	// 			localStorage.setItem('role', 'Admin');
	// 		} else if (decoded.role === 'Instructor') {
	// 			localStorage.setItem('role', 'Instructor');
	// 		} else {
	// 			console.log(decoded.role, 'role');
	// 			localStorage.removeItem('role');
	// 			navigate('/login');
	// 			message.error('Role not found');
	// 			return;
	// 		}

	// 		// Set user details in Redux store
	// 		dispatch(
	// 			setUserDetails({
	// 				id: data?.id,
	// 				firstName: data?.firstName,
	// 				lastName: data?.lastName,
	// 				username: data?.username,
	// 				email: data?.email,
	// 				profilePhoto: data?.profilePhoto,
	// 			}),
	// 		);

	// 		// Only redirect to profile pages if not already on a specific page like course detail
	// 		// and not already on the correct profile page
	// 		if (!currentPath.includes('my-courses/') &&
	// 		    !currentPath.includes('start-test') &&
	// 		    currentPath === '/login') {

	// 			setTimeout(() => {
	// 				if (decoded.role === 'Student') {
	// 					navigate('/student-profile');
	// 				} else if (decoded.role === 'Admin') {
	// 					navigate('/admin-profile');
	// 				} else if (decoded.role === 'Instructor') {
	// 					navigate('/mentor-profile');
	// 				}
	// 			}, 100); // Small delay to ensure Redux state is updated
	// 		}
	// 	}
	// }, [data]);

	// if (isLoading) return <Loader />;
	// if (!token && window?.location?.pathname.includes('profile')) {
	// 	navigate('/login');
	// 	return <Navigate to="/login" />;
	// }
	useEffect(() => {
		if (localStorage.getItem('auth')) {
			navigate('/login');
		}
	}, [localStorage.getItem('auth')]);
	return <>{children}</>;
};

export default ProtectedRoute;
