import { useParams, useNavigate } from 'react-router-dom';
import { notification, Card, Button, Tag } from 'antd';

interface Ticket {
	id: string;
	title: string;
	description: string;
	status: string;
}

const TicketInfo = () => {
	const { id } = useParams(); // Get the ticket ID from the URL
	const navigate = useNavigate();

	// Retrieve tickets from localStorage
	const tickets: Ticket[] = JSON.parse(localStorage.getItem('tickets') || '[]');

	// Find the ticket based on the ID from URL
	const ticket = tickets.find((ticket) => ticket.id == id);
	// If ticket not found, show a notification
	if (!ticket) {
		notification.error({
			message: 'Ticket Not Found',
			description: 'The ticket you are looking for does not exist.',
		});
		navigate('/'); // Navigate back to the ticket list page
	}

	// Function to get the status color
	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case 'todo':
				return 'blue';
			case 'doing':
				return 'orange';
			case 'done':
				return 'green';
			case 'cancel':
				return 'red';
			case 'archived':
				return 'gray';
			default:
				return 'blue';
		}
	};

	return (
		<div
			style={{
				padding: '20px',
				backgroundColor: '#f9f9f9',
				minHeight: '100vh',
			}}
		>
			<Button
				onClick={() => navigate('/ticket')} // Go back to the list of archived tickets
				style={{
					marginBottom: '20px',
					backgroundColor: '#1890ff',
					color: '#fff',
				}}
			>
				Back to Tickets List
			</Button>

			{ticket && (
				<Card
					title={
						<span
							style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#333' }}
						>
							{ticket.title}
						</span>
					}
					style={{
						width: '100%',
						padding: '20px',
						borderRadius: '8px',
						boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
						backgroundColor: '#fff',
					}}
				>
					<p style={{ fontSize: '1.2em', color: '#666' }}>
						<strong>Description:</strong>
					</p>
					<p style={{ fontSize: '1em', color: '#444' }}>{ticket.description}</p>

					<p style={{ fontSize: '1.2em', color: '#666' }}>
						<strong>Status:</strong>
					</p>
					<Tag
						color={getStatusColor(ticket.status)}
						style={{ fontSize: '1em', padding: '8px 16px' }}
					>
						{ticket.status.toUpperCase()}
					</Tag>
				</Card>
			)}
		</div>
	);
};

export default TicketInfo;
