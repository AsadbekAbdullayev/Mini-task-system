import request from '@/services/api';
import { useMutation, useQuery, useQueryClient } from 'react-query';

// Fetch all transactions
export const useTransactions = () => {
	return useQuery('transactions', async () => {
		const response = await request.get('/transactions');
		return response.data;
	});
};

// Add a new transaction
export const useAddTransaction = () => {
	const queryClient = useQueryClient();

	return useMutation(
		async (newTransaction: any) => {
			const response = await request.post('/transactions', newTransaction);
			return response.data;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('transactions'); // Refresh the transactions list
			},
		},
	);
};

// Update a transaction
export const useUpdateTransaction = () => {
	const queryClient = useQueryClient();

	return useMutation(
		async ({
			id,
			updatedTransaction,
		}: {
			id: string;
			updatedTransaction: any;
		}) => {
			const response = await request.put(
				`/transactions/${id}`,
				updatedTransaction,
			);
			return response.data;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('transactions'); // Refresh the transactions list
			},
		},
	);
};

// Delete a transaction
export const useDeleteTransaction = () => {
	const queryClient = useQueryClient();

	return useMutation(
		async (id: string) => {
			await request.delete(`/transactions/${id}`);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('transactions'); // Refresh the transactions list
			},
		},
	);
};
