import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { createUserIfNotExists } from '@/entities/User';
import { message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { GoogleOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import './style.css';

const Login = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const signInWithGoogle = async () => {
		setLoading(true);
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;

			const user = result.user;

			const userDetails = {
				id: user.uid,
				uui: user.uid,
				name: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
				createdAt: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
			};
			await createUserIfNotExists(userDetails);
			localStorage.setItem('user_uid', user.uid);
			message.success('Google login successful!');
			navigate('/dashboard');
			return { user, token };
		} catch (error: any) {
			console.error('Google login error:', error);
			setLoading(false);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative min-h-screen flex flex-col justify-center items-center px-2 bg-gradient-to-br from-[#474646]  to-[#0c111b] animate-gradientBackground">
			<div className="absolute inset-0 bg-black/30 z-0"></div>

			<div className="relative z-10 flex flex-col items-center gap-4 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
				<h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#30F2F2] to-purple-400 bg-clip-text text-transparent">
					Welcome Back! Sign In
				</h2>

				<button
					className="btn w-full max-w-52 btn-primary btn-xl flex items-center"
					onClick={() => {
						if (!loading) signInWithGoogle();
					}}
				>
					{loading ? (
						<>
							<Spin
								indicator={
									<Loading3QuartersOutlined className="text-gray-950 mr-1 animate-spin !font-bold" />
								}
							/>
							Loading...
						</>
					) : (
						<>
							<GoogleOutlined className="inline mr-1 text-xl" />
							Login with Google
						</>
					)}
				</button>
			</div>
		</div>
	);
};

export default Login;
