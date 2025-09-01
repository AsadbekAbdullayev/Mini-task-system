import { useParams, useNavigate } from 'react-router-dom';
import { useGetTickets } from '@/entities/Tickets';
import { Card, Button, Tag, Spin } from 'antd';
import { ArrowLeftOutlined, BackwardOutlined } from '@ant-design/icons';

const getStatusColor = (status: string) => {
	switch (status.toLowerCase()) {
		case 'todo':
			return 'blue';
		case 'doing':
			return 'orange';
		case 'done':
			return 'green';
		case 'canceled':
			return 'red';
		case 'archived':
			return 'gray';
		default:
			return 'blue';
	}
};

const TicketInfo = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	type Ticket = {
		id: string;
		title: string;
		desc: string;
		status: string;
	};

	const { data: tickets, isLoading } = useGetTickets();

	const ticket = (tickets as Ticket[] | undefined)?.find((t) => t.id === id);

	return isLoading ? (
		<div className="flex justify-center items-center min-h-[calc(100vh-70px)]">
			<Spin size="large" />
		</div>
	) : ticket ? (
		<div className="p-5 bg-[#f9f9f9] h-[calc(100vh-70px)] ">
			<Button
				onClick={() => navigate('/ticket')}
				className="mb-5 bg-[#1890ff] text-white"
			>
				<ArrowLeftOutlined />
				Back to Tickets List
			</Button>

			<Card
				title={
					<span className="text-[1.5em] font-bold text-[#333]">
						{ticket.title}
					</span>
				}
				className="w-full p-2 rounded-lg shadow-md bg-white"
			>
				<p className="text-[1.2em] text-[#666]">
					<strong>Description:</strong>
				</p>
				<p className="text-[1em] text-[#444]">{ticket.desc}</p>

				<p className="text-[1.2em] text-[#666] mt-2">
					<strong>Status:</strong>
				</p>
				<Tag
					color={getStatusColor(ticket.status)}
					className="text-[1em] px-4 py-2 mt-1"
				>
					{ticket.status.toUpperCase()}
				</Tag>
			</Card>
		</div>
	) : (
		'Not Found'
	);
};

export default TicketInfo;
