import React, { memo } from 'react';
import { useDrag } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { Ticket, TicketStatus } from '@/constants/types';
import { Card, Select, Button, Tooltip, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { Option } = Select;

interface TicketCardProps {
	ticket: Ticket;
	onStatusChange: (id: string, newStatus: TicketStatus) => void;
	onDelete: (id: string) => void;
	onEdit: (ticket: Ticket) => void;
	statuses: TicketStatus[];
}

const TicketCard: React.FC<TicketCardProps> = ({
	ticket,
	onStatusChange,
	onDelete,
	onEdit,
	statuses,
}) => {
	const navigate = useNavigate();
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'CARD',
		item: { id: ticket.id },
		collect: (monitor) => ({ isDragging: monitor.isDragging() }),
	}));

	const divRef = React.useRef<HTMLDivElement>(null);
	drag(divRef);

	return (
		<div
			ref={divRef}
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
								onConfirm={() => onDelete(ticket.id!)}
								okText="Yes"
								cancelText="No"
							>
								<Button icon={<DeleteOutlined />} danger size="small" />
							</Popconfirm>
						</Tooltip>
					</div>
				}
			>
				<p className="line-clamp-6">{ticket.desc}</p>
				<Select
					value={ticket.status}
					className="w-full mt-2"
					onChange={(value: TicketStatus) => onStatusChange(ticket.id!, value)}
				>
					{statuses?.map((status) => (
						<Option key={status} value={status}>
							{status.toUpperCase()}
						</Option>
					))}
				</Select>
			</Card>
		</div>
	);
};

export default memo(TicketCard);
