import { useEffect, useState } from 'react';
import { setUserDetails } from '@redux/slices/generelSlice';
import { useMeMutation } from '@/entities/User';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const useAuth = (shouldFetch: boolean) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { mutateAsync, isLoading, isError, error } = useMeMutation();

	useEffect(() => {
		if (!shouldFetch) return;

		const getMe = async () => {
			try {
				await mutateAsync(undefined, {
					onSuccess: (data: any) => {
						if (data) {
							dispatch(
								setUserDetails({
									id: data.id,
									email: data.email,
									photoURL: data.photoURL,
									name: data.name,
								}),
							);
						} else {
							navigate('/login');
						}
					},
				});
			} catch (e: any) {
				if (e.status == '401' || e.status == '403') {
					// message.error('Please login again.');
					navigate('/login');
				}
			}
		};

		getMe();
	}, [shouldFetch]);

	return { isLoading, isError, error };
};
