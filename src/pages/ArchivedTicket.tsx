import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

interface Ticket {
	id: string;
	title: string;
	description: string;
	status: string;
}

const ArchivedTicket = () => {
	// Assuming you have tickets stored in localStorage
	const [tickets, setTickets] = useState<Ticket[]>(
		JSON.parse(localStorage.getItem('tickets') || '[]'),
	);
	// Filter tickets by "archived" status
	const archivedTickets = tickets.filter(
		(ticket) => ticket.status === 'archive',
	);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);

	const [form] = Form.useForm();

	// Function to open the modal for adding a new ticket
	const handleAdd = () => {
		setIsModalVisible(true);
		setCurrentTicket(null);
	};

	// Function to handle editing a ticket
	const handleEdit = (ticket: Ticket) => {
		setIsModalVisible(true);
		setCurrentTicket(ticket);
		form.setFieldsValue(ticket);
	};

	// Function to delete a ticket
	const handleDelete = (id: string) => {
		const newTickets = tickets.filter((ticket) => ticket.id !== id);
		setTickets(newTickets);
		localStorage.setItem('tickets', JSON.stringify(newTickets));
		message.success('Ticket deleted successfully');
	};

	// Handle adding or editing a ticket from the modal
	const handleModalOk = () => {
		form.validateFields().then((values) => {
			if (currentTicket) {
				// Edit existing ticket
				const updatedTickets = tickets.map((ticket) =>
					ticket.id === currentTicket.id ? { ...ticket, ...values } : ticket,
				);
				setTickets(updatedTickets);
				localStorage.setItem('tickets', JSON.stringify(updatedTickets));
				message.success('Ticket updated successfully');
			} else {
				// Add new ticket
				const newTicket = {
					...values,
					id: uuidv4(),
					status: 'archive',
				}; // Mark as archived
				const updatedTickets = [...tickets, newTicket];
				setTickets(updatedTickets);
				localStorage.setItem('tickets', JSON.stringify(updatedTickets));
				message.success('Ticket added successfully');
			}
			setIsModalVisible(false);
		});
	};

	const handleModalCancel = () => {
		setIsModalVisible(false);
	};

	// Define columns for the Ant Design table
	const columns = [
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record: Ticket) => (
				<span>
					<Button
						icon={<EditOutlined />}
						onClick={() => handleEdit(record)}
						style={{ marginRight: 8 }}
					/>
					<Popconfirm
						title="Are you sure to delete this ticket?"
						onConfirm={() => handleDelete(record.id)}
					>
						<Button icon={<DeleteOutlined />} danger />
					</Popconfirm>
				</span>
			),
		},
	];

	return (
		<div className="h-[calc(100vh-70px)] p-4 bg-[#e0f7fa]">
			<div className="w-full flex justify-between">
				<h1 className="text-2xl font-bold">Archived Tickets</h1>

				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={handleAdd}
					style={{ marginBottom: 16 }}
				>
					Add Archived Ticket
				</Button>
			</div>

			<Table
				columns={columns}
				dataSource={archivedTickets}
				rowKey="key"
				pagination={false}
			/>

			<Modal
				title={currentTicket ? 'Edit Ticket' : 'Add Ticket'}
				visible={isModalVisible}
				onOk={handleModalOk}
				onCancel={handleModalCancel}
				destroyOnClose
			>
				<Form
					form={form}
					initialValues={currentTicket || { status: 'archived' }}
				>
					<Form.Item
						label="Title"
						name="title"
						rules={[{ required: true, message: 'Please input the title!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Description"
						name="description"
						rules={[
							{ required: true, message: 'Please input the description!' },
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item name="status" hidden initialValue="archived">
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default ArchivedTicket;
