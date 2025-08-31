import React from 'react';
import { useDrop } from 'react-dnd';
import { Ticket, TicketStatus } from '@/constants/types';

interface ColumnProps {
	status: TicketStatus;
	onDrop: (id: string, newStatus: TicketStatus) => void;
	children: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ status, onDrop, children }) => {
	const divRef = React.useRef<HTMLDivElement>(null);
	useDrop({
		accept: 'CARD',
		drop: (item: { id: string }) => onDrop(item.id, status),
		collect: (monitor) => ({}),
		// Attach drop to the ref in useEffect
	})[1](divRef);

	return (
		<div
			ref={divRef}
			className="w-full md:w-1/5 bg-gray-100 p-4 rounded-md min-h-[300px]"
		>
			<h2 className="text-lg font-semibold mb-2 capitalize">{status}</h2>
			{children}
		</div>
	);
};

export default Column;
