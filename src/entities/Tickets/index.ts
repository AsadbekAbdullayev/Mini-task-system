import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
	collection,
	addDoc,
	getDocs,
	updateDoc,
	deleteDoc,
	doc,
	serverTimestamp,
	query,
	where,
} from 'firebase/firestore';

import { db } from '../../firebaseConfig';
import { Ticket } from '../../constants/types';

// GET tickets (faqat userga tegishli)
export const getTickets = async () => {
	const userId = localStorage.getItem('user_uid');
	if (!userId) return [];

	const q = query(collection(db, 'tickets'), where('userId', '==', userId));
	const querySnapshot = await getDocs(q);

	return (
		querySnapshot?.docs?.map((doc) => ({
			id: doc?.id,
			...doc?.data(),
		})) || []
	);
};

// CREATE ticket
export const createTicket = async (ticket: Ticket) => {
	const userId = localStorage.getItem('user_uid');
	if (!userId) throw new Error('User not authenticated');

	const docRef = await addDoc(collection(db, 'tickets'), {
		...ticket,
		userId,
		createdAt: serverTimestamp(),
	});
	return { id: docRef.id, ...ticket, userId, createdAt: new Date() };
};

// UPDATE ticket
export const updateTicket = async (
	id: string,
	updatedData: Partial<Ticket>,
) => {
	const ticketRef = doc(db, 'tickets', id);
	await updateDoc(ticketRef, updatedData);
	return { id, ...updatedData };
};

// DELETE ticket
export const deleteTicket = async (id: string) => {
	const ticketRef = doc(db, 'tickets', id);
	await deleteDoc(ticketRef);
	return id;
};

// GET tickets hook
export const useGetTickets = () => {
	return useQuery(['tickets'], getTickets, {
		refetchOnWindowFocus: false,
		enabled: true,
		cacheTime: 0,
	});
};

// CREATE ticket hook
export const useCreateTicket = () => {
	const queryClient = useQueryClient();
	return useMutation(createTicket, {
		onSuccess: () => queryClient.invalidateQueries(['tickets']),
	});
};

// UPDATE ticket hook
export const useUpdateTicket = () => {
	const queryClient = useQueryClient();
	return useMutation(
		({ id, data }: { id: string; data: Partial<Ticket> }) =>
			updateTicket(id, data),
		{
			onSuccess: () => queryClient.invalidateQueries(['tickets']),
		},
	);
};

// DELETE ticket hook
export const useDeleteTicket = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteTicket, {
		onSuccess: () => queryClient.invalidateQueries(['tickets']),
	});
};
