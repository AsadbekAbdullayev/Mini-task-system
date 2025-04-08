import { useState, useEffect } from 'react';
import {
	Input,
	Button,
	DatePicker,
	Select,
	Upload,
	message,
	Card,
	Avatar,
} from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { setUserDetails } from '@redux/slices/generelSlice';
import { useDispatch } from 'react-redux';
const ProfilePage = () => {
	const [name, setName] = useState<string>('');
	const [surname, setSurname] = useState<string>('');
	const [dob, setDob] = useState<any>(null); // Date of Birth
	const [city, setCity] = useState<string>('');
	const [avatar, setAvatar] = useState<any>(null); // Avatar Image
	const cities = [
		'Chilanzar',
		'Yunusabad',
		'Mirzo Ulugbek',
		'Sergeli',
		'Yakkasaray',
	];
	const dispatch = useDispatch();

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem('userProfile') || '{}');
		if (userData) {
			setName(userData.name);
			setSurname(userData.surname);
			setDob(userData.dob || null);
			setCity(userData.city);
			setAvatar(userData.avatar);
			dispatch(
				setUserDetails({
					firstName: userData.name,
					lastName: userData.surname,
					profilePhoto: userData.avatar,
				}),
			);
		}
	}, []);

	const handleAvatarChange = (info: any) => {
		const reader = new FileReader();
		reader.onload = () => {
			const imgUrl = reader.result; // This is the Base64 representation of the image
			setAvatar(imgUrl);
			// Save the avatar image (Base64 string) to localStorage
			localStorage.setItem('avatar', imgUrl as string);
		};
		reader.readAsDataURL(info.file); // Convert the image file to Base64 string
	};

	const handleSave = () => {
		if (!name || !surname || !dob || !city) {
			message.error('Please fill in all fields');
			return;
		}

		// Save data to localStorage
		const userData = {
			name,
			surname,
			dob,
			city,
			avatar,
		};
		dispatch(
			setUserDetails({
				firstName: name,
				lastName: surname,
				profilePhoto: avatar,
			}),
		);
		localStorage.setItem('userProfile', JSON.stringify(userData));
		message.success('Profile updated successfully!');
	};

	return (
		<div
			style={{
				padding: '20px',
				backgroundColor: '#f9f9f9',
				height: 'calc(100vh-100px)',
				overflow: 'auto',
			}}
		>
			<Card
				title="Profile Page"
				style={{
					maxWidth: '500px',
					margin: '0 auto',
					padding: '20px',
					boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
				}}
			>
				<div
					style={{ textAlign: 'center', marginBottom: '20px' }}
					className="flex flex-col items-center"
				>
					{avatar ? (
						<Avatar size={100} src={avatar} icon={<UserOutlined />} />
					) : (
						<Avatar size={100} icon={<UserOutlined />} />
					)}
					<Upload
						onChange={handleAvatarChange}
						showUploadList={false}
						accept="image/*"
						beforeUpload={() => false}
					>
						<Button icon={<UploadOutlined />} style={{ marginTop: '10px' }}>
							Upload Avatar
						</Button>
					</Upload>
				</div>

				<Input
					placeholder="First Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					style={{ marginBottom: '10px' }}
				/>
				<Input
					placeholder="Last Name"
					value={surname}
					onChange={(e) => setSurname(e.target.value)}
					style={{ marginBottom: '10px' }}
				/>

				<DatePicker
					placeholder="Date of Birth"
					value={dob ? dayjs(dob, 'YYYY-MM-DD') : null}
					onChange={(e, date) => {
						setDob(date);
					}}
					style={{ width: '100%', marginBottom: '10px' }}
					format="YYYY-MM-DD"
				/>

				<Select
					value={city}
					onChange={setCity}
					placeholder="Select a City"
					style={{ width: '100%', marginBottom: '10px' }}
				>
					{cities.map((cityName) => (
						<Select.Option key={cityName} value={cityName}>
							{cityName}
						</Select.Option>
					))}
				</Select>

				<Button type="primary" onClick={handleSave} style={{ width: '100%' }}>
					Save Profile
				</Button>
			</Card>
		</div>
	);
};

export default ProfilePage;
