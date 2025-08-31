// pages/Expenses.tsx
import {
	Button,
	Form,
	Input,
	InputNumber,
	Modal,
	Select,
	Table,
	message,
} from 'antd';
import { useState } from 'react';
import { useTransactions, useAddTransaction } from '@entities/api';
import { AntSelect } from './style';

type Expense = {
	comment: String;
	category: String;
	type: String;
	amount: Number;
	_id: null;
	date: Date;
};

const categories = [
	{
		label: 'Oziq-ovqat',
		value: 'food',
	},
	{
		label: 'Transport',
		value: 'transport',
	},
	{
		label: 'Mobil aloqa',
		value: 'mobile',
	},
	{
		label: 'Internet',
		value: 'internet',
	},
];

const Expenses = () => {
	const [data, setData] = useState<Expense[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editing, setEditing] = useState<Expense>({
		comment: '',
		_id: null,
		category: '',
		type: 'expense',
		amount: 0,
		date: new Date(),
	});
	const { data: expensesData, isLoading } = useTransactions();
	const { mutateAsync, isLoading: addLoading } = useAddTransaction();
	const [form] = Form.useForm();

	const addExpense = async () => {
		try {
			const res = await mutateAsync({
				comment: editing.comment,
				category: editing.category,
				type: 'expense',
				amount: editing.amount,
				date: editing.date,
			});
			message.success("Xarajat qo'shildi");
			setIsModalOpen(false);
		} catch (e) {
			message.error('Something went wrong');
			console.log(e);
		}
	};

	const openModal = (record?: Expense) => {
		if (record) {
			form.setFieldsValue(record);
			setEditing(record);
		} else {
			form.resetFields();
			setEditing({
				comment: '',
				category: '',
				type: 'expense',
				amount: 0,
				date: new Date(),
				_id: null,
			});
		}
		setIsModalOpen(true);
	};

	const handleOk = () => {
		form.validateFields().then((values) => {
			if (editing._id) {
				console.log(editing, 'editing');
				message.success('Xarajat tahrirlandi!');
			} else {
				addExpense();
			}
		});
	};

	const handleDelete = (id: number) => {
		// setData(data.filter((item) => item.id !== id));
		// message.success('Xarajat o‘chirildi!');
	};

	const columns = [
		{ title: 'Turkum', dataIndex: 'category' },
		{ title: 'Narx', dataIndex: 'amount' },
		{ title: 'Izoh', dataIndex: 'comment' },
		{
			title: 'Amallar',
			render: (_: any, record: Expense) => (
				<>
					<Button onClick={() => openModal(record)} type="link">
						Tahrirlash
					</Button>
					<Button onClick={() => handleDelete(1)} type="link" danger>
						O‘chirish
					</Button>
				</>
			),
		},
	];

	return (
		<div className="h-[calc(100vh-65px)] p-4 bg-[#e0f7fa]">
			<Button type="primary" onClick={() => openModal()} className="mb-4">
				Xarajat qo‘shish
			</Button>
			<Table
				rowKey="id"
				dataSource={expensesData?.data}
				columns={columns}
				loading={isLoading}
				scroll={{ x: 600 }}
			/>
			<Modal
				className="rounded-lg top-5 w-full p-2 max-w-[500px]"
				open={isModalOpen}
				title={editing ? 'Xarajatni tahrirlash' : 'Yangi xarajat'}
				onOk={handleOk}
				onCancel={() => setIsModalOpen(false)}
				confirmLoading={addLoading}
				maskClosable={false} // Prevent closing when clicking outside the modal
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="category"
						label="Turkum"
						rules={[{ required: true }]}
					>
						<AntSelect
							options={categories}
							onChange={(value) => {
								setEditing({ ...editing, category: value });
							}}
						/>
					</Form.Item>
					<Form.Item name="amount" label="Narx" rules={[{ required: true }]}>
						<InputNumber
							className="w-full"
							onChange={(value) =>
								setEditing({ ...editing, amount: Number(value) || 0 })
							}
						/>
					</Form.Item>
					<Form.Item name="note" label="Izoh">
						<Input
							onChange={(e) => {
								setEditing({ ...editing, comment: e.target.value });
							}}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default Expenses;
