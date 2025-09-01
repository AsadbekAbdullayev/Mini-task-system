import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { Card, Space, Button, Tooltip } from 'antd';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import CSV from '../../../public/csv.svg';
import { v4 as uuidv4 } from 'uuid';
import Excel from '../../../public/excel.svg';
import { QuestionCircleFilled } from '@ant-design/icons';
import { useGetTickets, useCreateTicket } from '@/entities/Tickets';
import { Ticket } from '@/constants/types';

const Dashboard = () => {
	const { data: tickets = [], isLoading } = useGetTickets();
	const { mutateAsync: createTicket } = useCreateTicket();

	const [statusCounts, setStatusCounts] = useState<{ [key: string]: number }>({
		todo: 0,
		doing: 0,
		done: 0,
		cancel: 0,
		archive: 0,
	});

	useEffect(() => {
		if (tickets.length) {
			calculateStatusCounts();
		}
	}, [tickets]);

	// Calculate status counts
	const calculateStatusCounts = () => {
		const counts: { [key: string]: number } = {
			todo: 0,
			doing: 0,
			done: 0,
			cancel: 0,
			archive: 0,
		};
		tickets.forEach((t) => {
			if (counts[t.status] !== undefined) {
				counts[t.status]++;
			}
		});
		setStatusCounts(counts);
	};

	// Create ticket
	const handleAddTicket = async (
		status: 'todo' | 'doing' | 'done' | 'cancel' | 'archive',
	) => {
		const newTicket: Ticket = {
			id: uuidv4(),
			title: `New Task ${status}`,
			desc: 'Task description',
			status,
			createdAt: new Date().toISOString(),
		};
		try {
			await createTicket(newTicket);
			console.log('Ticket created:', newTicket);
		} catch (err) {
			console.error('Error creating ticket:', err);
		}
	};

	// Excel export
	const exportToExcel = () => {
		const worksheet = XLSX.utils.json_to_sheet(tickets);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Tickets');
		const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		saveAs(
			new Blob([excelFile], { type: 'application/octet-stream' }),
			'tickets.xlsx',
		);
	};

	// CSV export
	const exportToCSV = () => {
		const csv = tickets.map(
			(t: any) => `${t.id},${t.title},${t.desc},${t.status}`,
		);
		const csvBlob = new Blob([csv.join('\n')], {
			type: 'text/csv;charset=utf-8;',
		});
		saveAs(csvBlob, 'tickets.csv');
	};

	// Charts
	const statusChartConfig = {
		chart: { type: 'bar', stacked: true },
		plotOptions: { bar: { columnWidth: '60%' } },
		series: [
			{
				name: 'Todo',
				data: [{ x: 'Tickets', y: statusCounts.todo }],
				color: '#a6cee3',
			},
			{
				name: 'Doing',
				data: [{ x: 'Tickets', y: statusCounts.doing }],
				color: '#1f78b4',
			},
			{
				name: 'Done',
				data: [{ x: 'Tickets', y: statusCounts.done }],
				color: '#b2df8a',
			},
			{
				name: 'Cancel',
				data: [{ x: 'Tickets', y: statusCounts.cancel }],
				color: '#ff3131',
			},
		],
		xaxis: { categories: ['Tickets'] },
		legend: { position: 'top' },
		dataLabels: { enabled: false },
	};

	const donutChartConfig = {
		chart: { type: 'donut' },
		labels: ['Todo', 'Doing', 'Done', 'Cancel'],
		series: [
			statusCounts.todo,
			statusCounts.doing,
			statusCounts.done,
			statusCounts.cancel,
			statusCounts.archive,
		],
		colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#ff3131', '#fb9a99'],
		legend: { position: 'bottom' },
		dataLabels: {
			enabled: true,
			style: { fontSize: '14px', fontWeight: 'bold' },
		},
	};

	return (
		<div className="p-6 h-[calc(100vh-65px)] overflow-auto bg-[#e0f7fa]">
			<Card
				title={
					<Space>
						<span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
							Dashboard - Ticket Tracker
						</span>
						<Button onClick={exportToExcel}>
							<img src={Excel} className="w-6" />
							Download Excel
						</Button>
						<Button onClick={exportToCSV}>
							<img src={CSV} className="w-6" />
							Download CSV
						</Button>
					</Space>
				}
				style={{
					marginBottom: 24,
					backgroundColor: '#fff',
					boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
				}}
			>
				<div className="w-full flex items-center gap-2">
					<Tooltip title="These buttons create tickets quickly">
						<QuestionCircleFilled className="cursor-pointer" />
					</Tooltip>
					<span
						style={{
							fontWeight: 'bold',
							fontSize: '1.2em',
							marginRight: '20px',
						}}
					>
						Quick add task:
					</span>
					<Button
						className="bg-[#5f7784] text-white"
						onClick={() => handleAddTicket('todo')}
					>
						Add Todo
					</Button>
					<Button
						className="bg-[#1f78b4] text-white"
						onClick={() => handleAddTicket('doing')}
					>
						Add Doing
					</Button>
					<Button
						className="bg-[#b2df8a] text-white"
						onClick={() => handleAddTicket('done')}
					>
						Add Done
					</Button>
					<Button
						className="bg-[#ff3131] text-white"
						onClick={() => handleAddTicket('cancel')}
					>
						Add Cancel
					</Button>
				</div>
			</Card>

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					gap: '20px',
					marginBottom: '24px',
				}}
			>
				<Card title="Ticket Status Overview" style={{ width: '30%' }}>
					<ApexCharts
						options={donutChartConfig}
						series={donutChartConfig.series}
						type="donut"
						height={350}
					/>
				</Card>
				<Card title="Ticket Count by Status" style={{ width: '65%' }}>
					<ApexCharts
						options={statusChartConfig}
						series={statusChartConfig.series}
						type="bar"
						height={350}
					/>
				</Card>
			</div>
		</div>
	);
};

export default Dashboard;
