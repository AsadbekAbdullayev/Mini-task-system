import { useState } from 'react';
import { Layout, Menu, Button, Popconfirm, Popover, Avatar } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { RootState } from '@/redux/store/store';
import Trackify from '@/logos/trackify.png';
import { useSelector } from 'react-redux';
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
	const { userDetails } = useSelector((state: RootState) => state.generel);
	const [collapsed, setCollapsed] = useState(false);
	const { name, photoURL } = userDetails;
	const navigate = useNavigate();
	const location = useLocation();

	const handleMenu = (key: string) => {
		if (key === 'logout') {
			localStorage.removeItem('auth');
			navigate('/');
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

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider
				theme={'dark'}
				collapsible
				collapsed={collapsed}
				breakpoint="md"
				style={{ borderRight: '1px solid #eaeaea' }}
				onCollapse={(value) => setCollapsed(value)}
			>
				<div className="w-full flex items-center justify-center py-9 relative">
					<img src={Trackify} alt="logo" className="w-[200px] absolute" />
				</div>

				{/* Filtered nested Menu */}
				<Menu
					theme={'dark'}
					mode="inline"
					selectedKeys={[location.pathname.replace('/', '')]}
					onClick={(e) => handleMenu(e.key)}
					items={menuItems}
				/>
			</Sider>

			<Layout>
				<Header className="bg-[#001529] flex justify-end items-center px-4 shadow-sm">
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						className="md:hidden"
					/>
					<div className="flex items-center gap-5 pr-5">
						<Popover
							content={AdminContent}
							trigger="click"
							placement="bottomRight"
						>
							<div className="flex items-center pr-1 justify-center gap-2 cursor-pointer text-white">
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
