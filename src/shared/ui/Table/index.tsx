import React from 'react';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { NumberParam, useQueryParam } from 'use-query-params';

interface CustomTableProps {
	dataSource: any[];
	columns: TableProps<any>['columns'];
	loading?: boolean;
	header?: React.ReactNode;
	footer?: React.ReactNode;
	rowKey?: string;
	pagination?: TableProps<any>['pagination'] | false;
}

const CustomTable: React.FC<CustomTableProps> = ({
	columns,
	dataSource,
	header,
	footer,
	loading,
}) => {
	const { totalCount } = useSelector((state: RootState) => state.generel);
	const [current, setCurrent] = useQueryParam('PageNumber', NumberParam);
	return (
		<div className="w-full h-fit p-6">
			<div className="w-full h-[calc(100vh-147px)]  !border border-[#EAECF0] rounded-[16px] overflow-auto">
				{header}
				<Table
					columns={columns}
					dataSource={dataSource}
					loading={loading}
					pagination={false}
					onChange={(e) => {
						if (e.current) setCurrent(e.current);
					}}
					className="custom-table" //
					style={
						{
							width: '100%',
							'--border-radius': '0px!important',
						} as React.CSSProperties
					}
					components={{
						header: {
							cell: (props: any) => (
								<th
									{...props}
									style={{
										...props.style,
										fontSize: '24px',
										padding: '12px 16px',
										background: '#43232232',
										fontWeight: 500,
										color: '#475467',
									}}
								/>
							),
						},
					}}
				/>
				{footer}
			</div>
		</div>
	);
};

export default CustomTable;
