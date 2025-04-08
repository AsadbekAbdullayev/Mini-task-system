import { useEffect, useState } from 'react';
import { Layout, Menu, Button, Popconfirm, Popover, Avatar } from 'antd';
import {
	PieChartOutlined,
	DollarOutlined,
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
	SketchOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { RootState } from '@/redux/store/store';
import { setUserDetails } from '@redux/slices/generelSlice';
import { useDispatch, useSelector } from 'react-redux';
const { Sider, Header } = Layout;
const AppLayout = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [collapsed, setCollapsed] = useState(false);
	const { theme, toggleTheme, fontSize, setFontSize } = useTheme();
	const [searchTerm, setSearchTerm] = useState('');
	const { userDetails } = useSelector((state: RootState) => state.generel);
	const { firstName, lastName, profilePhoto } = userDetails;
	const dispatch = useDispatch();

	const handleMenu = (key: string) => {
		if (key === 'logout') {
			localStorage.removeItem('auth');
			navigate('/login');
		} else {
			navigate(`/${key}`);
		}
	};

	const AdminContent = (
		<div>
			<Menu
				mode="inline"
				items={[
					{
						key: 'profile',
						icon: <UserOutlined />,
						label: 'Profile',
						onClick: () => navigate('/profile'),
					},
					{
						key: 'logout',
						icon: <LogoutOutlined style={{ color: 'red' }} />,
						label: (
							<Popconfirm
								title="Are you sure you want to logout?"
								onConfirm={() => handleMenu('logout')}
								okText="Yes"
								cancelText="No"
								className="text-red-500"
							>
								Logout
							</Popconfirm>
						),
					},
				]}
			/>
		</div>
	);
	// Recursive function to filter menu items and sub-items
	const filterMenuItems: any = (menuItems: any[], search: string) => {
		return menuItems
			.filter(
				(item: any) =>
					item.label.toLowerCase().includes(search.toLowerCase()) ||
					(item.children && filterMenuItems(item.children, search).length > 0),
			)
			.map((item) => ({
				...item,
				children: item.children
					? filterMenuItems(item.children, search)
					: undefined,
			}));
	};

	// Menularni o'z ichiga olgan nested structure
	const menuItems = [
		{
			key: 'dashboard',
			icon: <PieChartOutlined />,
			label: 'Dashboard',
		},
		{
			key: 'ticket',
			icon: <DollarOutlined />,
			label: 'My Ticket',
		},
		{
			key: 'archive',
			icon: <SketchOutlined />,
			label: 'Archived Tickets',
		},
		{
			key: 'profile',
			icon: <UserOutlined />,
			label: 'Profile',
		},
	];

	const filteredMenuItems = filterMenuItems(menuItems, searchTerm); // Apply search filter to menu items
	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem('userProfile') || '{}');
		if (userData) {
			dispatch(
				setUserDetails({
					firstName: userData.name,
					lastName: userData.surname,
					profilePhoto: userData.avatar,
				}),
			);
		}
	}, []);
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider
				theme={theme}
				collapsible
				collapsed={collapsed}
				breakpoint="md"
				style={{ borderRight: '1px solid #eaeaea' }}
				onCollapse={(value) => setCollapsed(value)}
			>
				<div className="w-full flex items-center justify-center py-9">
					<h1 className="text-[#2e99fd] text-lg font-semibold ">
						{collapsed ? 'TS' : 'TICKET SYSTEM'}
					</h1>
				</div>

				{/* Filtered nested Menu */}
				<Menu
					theme={theme}
					mode="inline"
					selectedKeys={[location.pathname.replace('/', '')]}
					onClick={(e) => handleMenu(e.key)}
					items={filteredMenuItems}
				/>
			</Sider>

			<Layout>
				<Header className="bg-white flex justify-between items-center px-4 shadow-sm">
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						className="md:hidden"
					/>
					<h2 className="text-lg font-semibold">Admin Panel</h2>

					<div className="flex items-center gap-5 pr-5">
						<Popover
							content={AdminContent}
							trigger="click"
							placement="bottomRight"
						>
							<div className="flex items-center pr-1 justify-center gap-2 cursor-pointer">
								{profilePhoto ? (
									<Avatar
										size={40}
										src={profilePhoto}
										icon={<UserOutlined />}
									/>
								) : (
									<div className="w-[40px] h-[40px] p-1 rounded-full border flex items-center justify-center">
										<UserOutlined className="text-[20px] " />
									</div>
								)}
								{firstName ? (
									<span className="text-lg font-semibold">
										{`${firstName}. ${lastName?.slice(0, 1).toUpperCase()}`}
									</span>
								) : (
									<span className="text-lg font-semibold">Admin</span>
								)}
							</div>
						</Popover>
					</div>
				</Header>

				<div className="overflow-auto w-full max-h-[calc(100v-200px)] bg-[#e0f7fa]">
					<Outlet />
				</div>
			</Layout>
		</Layout>
	);
};

export default AppLayout;
