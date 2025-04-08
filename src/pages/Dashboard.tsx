import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import { Card, Space, Badge, Tag, Button, Tooltip } from 'antd';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import CSV from '../../public/csv.svg';
import { v4 as uuidv4 } from 'uuid';
import Excel from '../../public/excel.svg';
import { QuestionCircleFilled } from '@ant-design/icons';
// Define types for tickets
interface Ticket {
	id: string;
	title: string;
	description: string;
	status: 'todo' | 'doing' | 'done' | 'cancel' | 'archive';
}

// Utility functions to interact with localStorage
const getTicketsFromLocalStorage = (): Ticket[] => {
	const stored = localStorage.getItem('tickets');
	return stored ? JSON.parse(stored) : [];
};

const saveTicketsToLocalStorage = (tickets: Ticket[]) => {
	localStorage.setItem('tickets', JSON.stringify(tickets));
};

const Dashboard = () => {
	const [tickets, setTickets] = useState<Ticket[]>(
		getTicketsFromLocalStorage(),
	);
	const [statusCounts, setStatusCounts] = useState<{ [key: string]: number }>({
		todo: 0,
		doing: 0,
		done: 0,
		cancel: 0,
		archive: 0,
	});

	useEffect(() => {
		// Recalculate status counts when tickets change
		calculateStatusCounts();
		saveTicketsToLocalStorage(tickets); // Save tickets back to localStorage
	}, [tickets]);

	// Calculate the counts for each ticket status
	const calculateStatusCounts = () => {
		const counts: { [key: string]: number } = {
			todo: 0,
			doing: 0,
			done: 0,
			cancel: 0,
			archive: 0,
		};

		tickets.forEach((ticket) => {
			if (counts[ticket.status] !== undefined) {
				counts[ticket.status]++;
			}
		});

		setStatusCounts(counts);
	};

	// Create new ticket
	const handleAddTicket = (
		status: 'todo' | 'doing' | 'done' | 'cancel' | 'archive',
	) => {
		const newTicket: Ticket = {
			id: uuidv4(),
			title: `New Task ${status}`,
			description: 'Task description ',
			status: status,
		};

		setTickets((prevTickets) => [...prevTickets, newTicket]);
	};

	// Excel export functionality
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

	// CSV export functionality
	const exportToCSV = () => {
		const csv = tickets.map((ticket) => {
			return `${ticket.id},${ticket.title},${ticket.description},${ticket.status}`;
		});
		const csvBlob = new Blob([csv.join('\n')], {
			type: 'text/csv;charset=utf-8;',
		});
		saveAs(csvBlob, 'tickets.csv');
	};

	// ApexCharts configuration for stacked column bar chart
	const statusChartConfig = {
		chart: {
			type: 'bar',
			stacked: true, // Enable stacking
		},
		plotOptions: {
			bar: {
				columnWidth: '60%', // Adjust the width of the bars
			},
		},
		series: [
			{
				name: 'Todo',
				data: [{ x: 'Tickets', y: statusCounts.todo }],
				color: '#a6cee3', // Custom color for 'Todo'
			},
			{
				name: 'Doing',
				data: [{ x: 'Tickets', y: statusCounts.doing }],
				color: '#1f78b4', // Custom color for 'Doing'
			},
			{
				name: 'Done',
				data: [{ x: 'Tickets', y: statusCounts.done }],
				color: '#b2df8a', // Custom color for 'Done'
			},
			{
				name: 'Cancel',
				data: [{ x: 'Tickets', y: statusCounts.cancel }],
				color: '#ff3131', // Custom color for 'Cancel'
			},
			{
				name: 'Archive',
				data: [{ x: 'Tickets', y: statusCounts.archive }],
				color: '#fb9a99', // Custom color for 'Archive'
			},
		],
		xaxis: {
			categories: ['Tickets'], // Single category for all bars
		},
		yaxis: {
			title: {
				text: '',
			},
		},
		legend: {
			position: 'top',
		},
		dataLabels: {
			enabled: false, // Disable data labels to avoid clutter
		},
	};

	// Donut Chart configuration for the Ticket Status Overview
	const donutChartConfig = {
		chart: {
			type: 'donut',
		},
		labels: ['Todo', 'Doing', 'Done', 'Cancel', 'Archive'],
		series: [
			statusCounts.todo,
			statusCounts.doing,
			statusCounts.done,
			statusCounts.cancel,
			statusCounts.archive,
		],
		colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99'], // Custom colors for each status
		legend: {
			position: 'bottom',
		},
		dataLabels: {
			enabled: true, // Enable data labels to show values
			style: {
				fontSize: '14px',
				fontWeight: 'bold',
			},
		},
	};

	return (
		<div className="p-6 max-h-[90vh] overflow-auto bg-[#e0f7fa]">
			<Card
				title={
					<Space>
						<span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
							Dashboard - Ticket Tracker
						</span>
						<Button onClick={exportToExcel} style={{ marginLeft: '10px' }}>
							<img src={Excel} className="w-6" />
							Download Excel Format
						</Button>
						<Button onClick={exportToCSV} style={{ marginLeft: '10px' }}>
							<img src={CSV} className="w-6" />
							Download CSV Format
						</Button>
					</Space>
				}
				style={{
					marginBottom: 24,
					backgroundColor: '#fff',
					boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
				}}
			>
				<div className="w-full flex items-center gap-2">
					<Tooltip title="These buttons for creating tickets quickly">
						<QuestionCircleFilled className="cursor-pointer" />
					</Tooltip>
					<span
						style={{
							fontWeight: 'bold',
							fontSize: '1.2em',
							marginRight: '20px',
						}}
					>
						Quick adding task:
					</span>
					<Button
						type="primary"
						className="bg-[#5f7784]"
						onClick={() => handleAddTicket('todo')}
					>
						Add Todo Ticket
					</Button>
					<Button
						type="primary"
						className="bg-[#1f78b4]"
						onClick={() => handleAddTicket('doing')}
					>
						Add Doing Ticket
					</Button>
					<Button
						type="primary"
						className="bg-[#b2df8a]"
						onClick={() => handleAddTicket('done')}
					>
						Add Done Ticket
					</Button>
					<Button
						type="primary"
						className="bg-[#ff3131]"
						onClick={() => handleAddTicket('cancel')}
					>
						Add Cancel Ticket
					</Button>
					<Button
						type="primary"
						className="bg-[#fb9a99]"
						onClick={() => handleAddTicket('archive')}
					>
						Add Archive Ticket
					</Button>
				</div>
			</Card>

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					gap: '0px',
					marginBottom: '24px',
				}}
			>
				<Card
					title={
						<span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
							Ticket Status Overview
						</span>
					}
					style={{
						width: '30%',
						backgroundColor: '#fff',
						boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
					}}
				>
					<ApexCharts
						options={donutChartConfig}
						series={donutChartConfig.series}
						labels={donutChartConfig.labels}
						type="donut"
						height={350}
					/>
				</Card>

				<Card
					title={
						<span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
							Ticket Count by Status
						</span>
					}
					style={{
						width: '65%',
						backgroundColor: '#fff',
						boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
					}}
				>
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
