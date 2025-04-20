import React, { useEffect, useState } from 'react';
import {
	Card,
	Modal,
	Form,
	Input,
	Select,
	Button,
	Tooltip,
	message,
	Popconfirm,
} from 'antd';










import {
	EditOutlined,
	DeleteOutlined,
	PlusOutlined,
	EyeFilled,
	EyeOutlined,
} from '@ant-design/icons';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

type Status = 'todo' | 'doing' | 'done' | 'cancel' | 'archive';

interface Ticket {
	id: number;
	title: string;
	description: string;
	status: Status;
}

const statuses: Status[] = ['todo', 'doing', 'done', 'cancel', 'archive'];

const TicketCard: React.FC<{
	ticket: Ticket;
	onStatusChange: (id: number, newStatus: Status) => void;
	onDelete: (id: number) => void;
	onEdit: (ticket: Ticket) => void;
}> = ({ ticket, onStatusChange, onDelete, onEdit }) => {
	const navigate = useNavigate();
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'CARD',
		item: { id: ticket.id },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	return (
		<div
			ref={drag}
			className={`mb-4 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
		>
			<Card
				title={ticket.title}
				className="shadow-md"
				extra={
					<div className="flex gap-2 ml-2">
						<Tooltip title="Show">
							<Button
								icon={<EyeOutlined />}
								size="small"
								onClick={() => navigate(`/ticket/${ticket.id}`)}
							/>
						</Tooltip>
						<Tooltip title="Edit">
							<Button
								icon={<EditOutlined />}
								size="small"
								onClick={() => onEdit(ticket)}
							/>
						</Tooltip>
						<Tooltip title="Delete">
							<Popconfirm
								title="Are you sure to delete this ticket?"
								onConfirm={() => onDelete(ticket.id)}
								okText="Yes"
								cancelText="No"
							>
								<Button icon={<DeleteOutlined />} danger size="small" />
							</Popconfirm>
						</Tooltip>
					</div>
				}
			>
				<p>{ticket.description}</p>
				<Select
					value={ticket.status}
					className="w-full mt-2"
					onChange={(value: Status) => onStatusChange(ticket.id, value)}
				>
					{statuses.map((status) => (
						<Option key={status} value={status}>
							{status.toUpperCase()}
						</Option>
					))}
				</Select>
			</Card>
		</div>
	);
};

const Column: React.FC<{
	status: Status;
	tickets: Ticket[];
	onDrop: (id: number, newStatus: Status) => void;
}> = ({ status, tickets, onDrop, children }) => {
	const [, drop] = useDrop({
		accept: 'CARD',
		drop: (item: { id: number }) => onDrop(item.id, status),
	});

	return (
		<div
			ref={drop}
			className="w-full md:w-1/5 bg-gray-100 p-4 rounded-md min-h-[300px]"
		>
			<h2 className="text-lg font-semibold mb-2 capitalize">{status}</h2>
			{children}
		</div>
	);
};

const MyTickets: React.FC = () => {
	const [tickets, setTickets] = useState<Ticket[]>(() => {
		const stored = localStorage.getItem('tickets');
		return stored ? JSON.parse(stored) : [];
	});

	const [modalOpen, setModalOpen] = useState(false);
	const [form] = Form.useForm();
	const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

	useEffect(() => {
		const stored = JSON.parse(
			localStorage.getItem('tickets') || '[]',
		) as Ticket[];
		setTickets(stored);
	}, []);

	useEffect(() => {
		localStorage.setItem('tickets', JSON.stringify(tickets));
	}, [tickets]);

	const handleCreateOrUpdate = () => {
		form
			.validateFields()
			.then((values) => {
				if (editingTicket) {
					setTickets((prev) =>
						prev.map((t) =>
							t.id === editingTicket.id ? { ...t, ...values } : t,
						),
					);
					message.success('Ticket updated!');
				} else {
					const newTicket: Ticket = {
						id: Date.now(),
						...values,
					};
					setTickets((prev) => [...prev, newTicket]);
					message.success('Ticket created!');
				}
				setModalOpen(false);
				setEditingTicket(null);
				form.resetFields();
			})
			.catch(() => {
				message.error('Please fill all required fields.');
			});
	};

	const handleDelete = (id: number) => {
		setTickets((prev) => prev.filter((t) => t.id !== id));
		message.success('Ticket deleted!');
	};

	const handleStatusChange = (id: number, newStatus: Status) => {
		setTickets((prev) =>
			prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)),
		);
	};

	const handleDrop = (id: number, newStatus: Status) => {
		handleStatusChange(id, newStatus);
	};

	const handleEdit = (ticket: Ticket) => {
		setEditingTicket(ticket);
		form.setFieldsValue(ticket);
		setModalOpen(true);
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="h-[calc(100vh-70px)] p-4 bg-[#e0f7fa]">
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-2xl font-bold">My Tickets</h1>
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={() => {
							form.resetFields();
							setEditingTicket(null);
							setModalOpen(true);
						}}
					>
						Add Ticket
					</Button>
				</div>

				<div className="flex flex-col md:flex-row gap-4 w-full overflow-x-auto">
					{statuses.map((status) => (
						<Column
							key={status}
							status={status}
							onDrop={handleDrop}
							tickets={tickets.filter((t) => t.status === status)}
						>
							{tickets
								.filter((ticket) => ticket.status === status)
								.map((ticket) => (
									<TicketCard
										key={ticket.id}
										ticket={ticket}
										onDelete={handleDelete}
										onStatusChange={handleStatusChange}
										onEdit={handleEdit}
									/>
								))}
						</Column>
					))}
				</div>

				<Modal
					title={editingTicket ? 'Edit Ticket' : 'Create New Ticket'}
					open={modalOpen}
					onOk={handleCreateOrUpdate}
					onCancel={() => {
						setModalOpen(false);
						setEditingTicket(null);
						form.resetFields();
					}}
					okText={editingTicket ? 'Update' : 'Create'}
				>
					<Form form={form} layout="vertical">
						<Form.Item
							name="title"
							label="Title"
							rules={[{ required: true, message: 'Title is required' }]}
						>
							<Input placeholder="Ticket title" />
						</Form.Item>
						<Form.Item
							name="description"
							label="Description"
							rules={[{ required: true, message: 'Description is required' }]}
						>
							<Input.TextArea placeholder="Ticket description" />
						</Form.Item>
						<Form.Item
							name="status"
							label="Status"
							rules={[{ required: true, message: 'Status is required' }]}
						>
							<Select placeholder="Select status">
								{statuses.map((s) => (
									<Option key={s} value={s}>
										{s.toUpperCase()}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Form>
				</Modal>
			</div>
		</DndProvider>
	);
};

export default MyTickets;
