import { useEffect, useState } from 'react';
import { Layout, Menu, Button, Popconfirm, Popover, Avatar } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { setUserDetails } from '@redux/slices/generelSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { RootState } from '@/redux/store/store';
import {
	PieChartOutlined,
	DollarOutlined,
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
} from '@ant-design/icons';

const { Sider, Header } = Layout;

const AppLayout = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [collapsed, setCollapsed] = useState(false);
	const { theme } = useTheme();
	const [searchTerm, setSearchTerm] = useState('');
	const { userDetails } = useSelector((state: RootState) => state.generel);
	const { name, photoURL } = userDetails;
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
	];

	const filteredMenuItems = filterMenuItems(menuItems, searchTerm); // Apply search filter to menu items

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
					<h2 className="text-lg font-semibold">Personal cabinet</h2>

					<div className="flex items-center gap-5 pr-5">
						<Popover
							content={AdminContent}
							trigger="click"
							placement="bottomRight"
						>
							<div className="flex items-center pr-1 justify-center gap-2 cursor-pointer">
								{photoURL ? (
									<Avatar size={40} src={photoURL} icon={<UserOutlined />} />
								) : (
									<div className="w-[40px] h-[40px] p-1 rounded-full border flex items-center justify-center">
										<UserOutlined className="text-[20px] " />
									</div>
								)}
								{name ? (
									<span className="text-lg font-semibold">{`${name}`}</span>
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
