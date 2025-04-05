import request from '@/services/api';
import { Users } from './model';
import { useMutation, useQuery } from 'react-query';

export interface UsersFilters {
	searchTerm?: string;
	role?: number;
	pageNumber: number;
	pageSize: number;
}

export interface UsersResponse {
	items: Users[];
	totalCount: number;
	pageCount: number;
	pageSize: number;
	pageNumber: number;
}

export const fetchUsers = async (filters: UsersFilters): Promise<UsersResponse> => {
	const params: Record<string, any> = {
		pageNumber: filters.pageNumber,
		pageSize: filters.pageSize,
	};

	if (filters.searchTerm) {
		params.searchTerm = filters.searchTerm;
	}

	if (filters.role !== undefined) {
		params.role = filters.role;
	}

	const { data } = await request.get('/users/filter', { params });
	return {
		items: data.items || [],
		totalCount: data.totalCount || 0,
		pageCount: data.pageCount || 0,
		pageSize: data.pageSize || 10,
		pageNumber: data.pageNumber || 1,
	};
};

export const useUsers = (filters: UsersFilters) => {
	return useQuery({
		queryKey: ['users', filters],
		queryFn: () => fetchUsers(filters),
		cacheTime: 5000,
	});
};

 const createUser=async(data:{
	firstName:string,
	lastName:string,
	email:string,
	username:string,
	phoneNumber:string,
	password:string,
	role:number,
	
 })=>{
	try{
		const response=await request.post('/users/create',data);
		return response.data;
	}catch(error){
		console.error('Error creating user:',error);
		throw error;
	}
 }
 export const useCreateUser=()=>{
	return useMutation(createUser);	
 }

 const updateUser = async (id: string, data: {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    phoneNumber: string,
    password?: string,
    role: number,
}) => {
    try {
        const response = await request.put(`/users/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

const deleteUser = async (id: string) => {
    try {
        const response = await request.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};



export const useUpdateUser = () => {
    return useMutation(({ id, data }: { id: string; data: any }) => updateUser(id, data));
};

export const useDeleteUser = () => {
    return useMutation(deleteUser);
};

export const fetchUserById = async (id: string) => {
    try {
        const response = await request.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Add this new hook
export const useUserById = (id: string) => {
    return useQuery(['user', id], () => fetchUserById(id), {
        enabled: !!id, // Only fetch when id is available
    });
};

export const fetchCourseProgress = async (userId: string, courseId: string) => {
    try {
        const response = await request.get(`/users/${userId}/courses/${courseId}/progress`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const useCourseProgress = (userId: string, courseId: string) => {
    return useQuery(
        ['courseProgress', userId, courseId],
        () => fetchCourseProgress(userId, courseId),
        {
            enabled: !!userId && !!courseId,
        }
    );
};