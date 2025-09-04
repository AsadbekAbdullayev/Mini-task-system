import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useMutation, useQuery } from 'react-query';
import { db } from '@/firebaseConfig';


// Interface
export interface UserDetail {
	id: string | null;
	name: string | null;
	email: string | null;
	photoURL?: string | null;
	createdAt?: string | null;
}

// GET current user (get-me)
export const getCurrentUser = async (): Promise<UserDetail | null> => {
	const uid = localStorage.getItem('user_uid');

	if (!uid) return null;

	const userRef = doc(db, 'users', uid);
	const docSnap = await getDoc(userRef);

	if (docSnap.exists()) {
		return {
			id: docSnap.id,
			...docSnap.data(),
		} as UserDetail;
	} else {
		return null;
	}
};

export const useGetMe = () => {
	return useQuery(['me'], getCurrentUser, {
		refetchOnWindowFocus: false,
	});
};

export const useMeMutation = () => {
	return useMutation({
		mutationFn: getCurrentUser,
	});
};

export const createUserIfNotExists = async (user: any) => {
	const userRef = doc(db, 'users', user.uui);
	const userSnap = await getDoc(userRef);

	if (!userSnap.exists()) {
		await setDoc(userRef, {
			uid: user.uui,
			displayName: user.displayName,
			email: user.email,
			photoURL: user.photoURL,
			createdAt: new Date(),
		});
		console.log('New user created:', user.uui);
	} else {
		console.log('User already exists:', user.uui);
	}
};
