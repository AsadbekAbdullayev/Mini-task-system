import { message } from 'antd';
import axios from 'axios';






// ✅ Define API Response Type
interface UploadResponse {
	data: string; // API returns { data: "uploaded_file_url" }
}

// ✅ Upload File Function
export const uploadFileTalent = async (file: File | null): Promise<any> => {
	if (!file) return;

	try {
		const token = localStorage.getItem('token');
		const axiosInstance = axios.create({
			baseURL: process.env.REACT_APP_BASE_URL,
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		});

		const formData = new FormData();
		formData.append('file', file);
		formData.append('transactionTime', new Date().toISOString());

		const response = await axiosInstance.post<UploadResponse>(
			'file/upload',
			formData,
		);
		return response.data; // ✅ Extracts the correct data property
	} catch (error) {
		if (axios.isAxiosError(error)) {
			message.error(
				error.response?.data?.resultMsg ||
					'Something went wrong uploading file',
			);
			return error.response?.data?.resultMsg;
		} else {
			message.error('Unexpected error occurred');
		}
	}
};
