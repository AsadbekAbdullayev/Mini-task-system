// src/constants/types.ts
export type TicketStatus = 'TODO' | 'DOING' | 'DONE' | 'CANCELED';



export interface Ticket {
	id?: string;
	title: string;
	desc: string;
	status: TicketStatus;
	createdAt: any;
}
