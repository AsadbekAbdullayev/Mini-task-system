import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Ticket, TicketStatus } from '@/constants/types';
import { PlusOutlined } from '@ant-design/icons';
import { TicketCard, Loader } from '@/shared/ui';
import { DndProvider } from 'react-dnd';
import Column from './ui/Column';
import {
	useGetTickets,
	useCreateTicket,
	useUpdateTicket,
	useDeleteTicket,
} from '@/entities/Tickets';

const { Option } = Select;
const statuses: TicketStatus[] = ['TODO', 'DOING', 'DONE', 'CANCELED'];

const MyTickets: React.FC = () => {
	const { data: tickets, isLoading } = useGetTickets();

	const createMutation = useCreateTicket();
	const updateMutation = useUpdateTicket();
	const deleteMutation = useDeleteTicket();
	const [modalOpen, setModalOpen] = useState(false);
	const [form] = Form.useForm();
	const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

	const handleCreateOrUpdate = () => {
		form
			.validateFields()
			.then((values) => {
				if (editingTicket) {
					updateMutation.mutate({
						id: editingTicket.id!,
						data: values,
					});
					message.success('Ticket updated!');
				} else {
					createMutation.mutate({
						...values,
						createdAt: new Date()
							.toLocaleDateString('en-GB')
							.replace(/\//g, '-'),
					});
					message.success('Ticket created!');
				}
				setModalOpen(false);
				setEditingTicket(null);
				form.resetFields();
			})
			.catch(() => message.error('Please fill all required fields.'));
	};

	const handleDelete = (id: string) => {
		deleteMutation.mutate(id);
		message.success('Ticket deleted!');
	};

	const handleStatusChange = (id: string, newStatus: TicketStatus) => {
		updateMutation.mutate({ id, data: { status: newStatus } });
	};

	const handleDrop = (id: string, newStatus: TicketStatus) => {
		handleStatusChange(id, newStatus);
	};

	const handleEdit = (ticket: Ticket) => {
		setEditingTicket(ticket);
		form.setFieldsValue(ticket);
		setModalOpen(true);
	};

	if (isLoading) return <Loader />;

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
						<Column key={status} status={status} onDrop={handleDrop}>
							{tickets
								?.filter((t: any) => t.status === status)
								?.map((ticket) => (
									<TicketCard
										key={ticket.id}
										ticket={ticket}
										onDelete={handleDelete}
										onStatusChange={handleStatusChange}
										onEdit={handleEdit}
										statuses={statuses}
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
							name="desc"
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
