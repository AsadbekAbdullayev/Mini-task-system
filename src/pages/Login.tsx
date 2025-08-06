// pages/Login.tsx
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Theme, Button } from 'react-daisyui';

const Login = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const onFinish = (values: { username: string; password: string }) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			if (values.username === 'admin' && values.password === 'admin') {
				localStorage.setItem('auth', 'true');
				message.success('Xush kelibsiz, admin!');
				navigate('/dashboard');
			} else {
				message.error('Login yoki parol noto‘g‘ri');
			}
		}, 1000);
	};

	return (
		<div className="min-h-screen flex justify-center items-center bg-gray-100 px-2">
			<Form
				name="login"
				onFinish={onFinish}
				className="bg-white p-6 shadow rounded w-full max-w-md"
				layout="vertical"
			>
				<h2 className="text-xl font-semibold mb-4">Admin Login</h2>
				<Form.Item label="Login" name="username" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item label="Parol" name="password" rules={[{ required: true }]}>
					<Input.Password />
				</Form.Item>
				<div className="w-full flex justify-center">
					<button className="btn w-full btn-primary btn-xl">Kirish</button>
				</div>
			</Form>
		</div>
	);
};

export default Login;
