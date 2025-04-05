import { Layout, Menu, Button, Popconfirm, Popover, Radio, Input } from 'antd';
import {
	PieChartOutlined,
	DollarOutlined,
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	EyeOutlined,
	SunOutlined,
	MoonOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const { Sider, Content, Header } = Layout;
const { Search } = Input;

const AppLayout = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [collapsed, setCollapsed] = useState(false);
	const { theme, toggleTheme, fontSize, setFontSize } = useTheme();
	const [searchTerm, setSearchTerm] = useState('');

	const handleMenu = (key: string) => {
		if (key === 'logout') {
			localStorage.removeItem('auth');
			navigate('/');
		} else {
			navigate(`/${key}`);
		}
	};

	const handleFontSizeChange = (size: 'small' | 'normal' | 'large') => {
		setFontSize(size);
	};

	const fontSizeContent = (
		<div>
			<Radio.Group
				onChange={(e) => handleFontSizeChange(e.target.value)}
				value={fontSize}
			>
				<Radio.Button
					value="small"
					style={{ fontSize: '16px', fontWeight: 'bold' }}
				>
					A-
				</Radio.Button>
				<Radio.Button
					value="normal"
					style={{ fontSize: '16px', fontWeight: 'bold' }}
				>
					A
				</Radio.Button>
				<Radio.Button
					value="large"
					style={{ fontSize: '16px', fontWeight: 'bold' }}
				>
					A+
				</Radio.Button>
			</Radio.Group>
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
			key: 'expenses',
			icon: <DollarOutlined />,
			label: 'Xarajatlar',
			// children: [
			// 	{
			// 		key: 'expenses/sub1',
			// 		label: 'Submenu 1',
			// 	},
			// 	{
			// 		key: 'expenses/sub2',
			// 		label: 'Submenu 2',
			// 	},
			// ],
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
				onCollapse={(value) => setCollapsed(value)}
			>
				<div className="text-white text-center py-4 font-bold text-lg">
					{collapsed ? 'UH' : 'Uy Hisobi'}
				</div>

				{/* Search input */}
				<div className="px-4 py-2">
					<Search
						placeholder="Menularni qidirish..."
						onSearch={(value) => setSearchTerm(value)}
						onChange={(e) => setSearchTerm(e.target.value)}
						value={searchTerm}
					/>
				</div>

				{/* Filtered nested Menu */}
				<Menu
					theme={theme}
					mode="inline"
					selectedKeys={[location.pathname.replace('/', '')]}
					onClick={(e) => handleMenu(e.key)}
					items={filteredMenuItems}
				/>

				<Menu
					theme={theme}
					mode="inline"
					className="absolute bottom-[50px] w-full"
					items={[
						{
							key: 'logout',
							icon: <LogoutOutlined />,
							label: (
								<Popconfirm
									title="Are you sure you want to logout?"
									onConfirm={() => handleMenu('logout')}
									okText="Yes"
									cancelText="No"
								>
									Logout
								</Popconfirm>
							),
						},
					]}
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
						<Button onClick={toggleTheme} className="ml-4">
							{theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
						</Button>

						{/* Font Size Popover */}
						<Popover
							content={fontSizeContent}
							title="Text Size"
							trigger="click"
							placement="bottomRight"
						>
							<Button icon={<EyeOutlined />} />
						</Popover>
					</div>
				</Header>

				<Content className="p-4 bg-white overflow-auto border">
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default AppLayout;
