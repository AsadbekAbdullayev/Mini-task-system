// pages/Dashboard.tsx
import { Card } from 'antd';
import { Column } from '@ant-design/charts';

const data = [
	{ month: 'Yanvar', total: 400 },
	{ month: 'Fevral', total: 300 },
	{ month: 'Mart', total: 500 },
	{ month: 'Aprel', total: 350 },
	{ month: 'May', total: 700 },
];

const config = {
	data,
	xField: 'month',
	yField: 'total',
	label: {
		position: 'middle',
		style: {
			fill: '#FFFFFF',
			opacity: 0.6,
		},
	},
	xAxis: {
		label: {
			autoHide: true,
			autoRotate: false,
		},
	},
	meta: {
		total: {
			alias: 'Xarajatlar (ming so‘m)',
		},
	},
};

const Dashboard = () => {
	return (
		<div className="p-4 min-w-[400px]">
			<Card title="Oylik xarajatlar statistikasi ">
				<Column {...config} />
			</Card>
		</div>
	);
};

export default Dashboard;
