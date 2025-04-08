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

type Expense = {
	id: number;
	category: string;
	amount: number;
	note?: string;
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
		label: 'Mobil aloqa',
		value: 'mobile',
	},
	'Oziq-ovqat',
	'Transport',
	'Mobil aloqa',
	'Internet',
	'O‘yin-kulgi',
];

const Categories = () => {
	const [data, setData] = useState<Expense[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editing, setEditing] = useState<Expense | null>(null);

	const [form] = Form.useForm();

	const openModal = (record?: Expense) => {
		if (record) {
			form.setFieldsValue(record);
			setEditing(record);
		} else {
			form.resetFields();
			setEditing(null);
		}
		setIsModalOpen(true);
	};

	const handleOk = () => {
		form.validateFields().then((values) => {
			if (editing) {
				const updated = data.map((item) =>
					item.id === editing.id ? { ...editing, ...values } : item,
				);
				setData(updated);
				message.success('Xarajat tahrirlandi!');
			} else {
				const newExpense = { ...values, id: Date.now() };
				setData([...data, newExpense]);
				message.success('Xarajat qo‘shildi!');
			}
			setIsModalOpen(false);
		});
	};

	const handleDelete = (id: number) => {
		setData(data.filter((item) => item.id !== id));
		message.success('Xarajat o‘chirildi!');
	};

	const columns = [
		{ title: 'Turkum', dataIndex: 'category' },
		{ title: 'Narx', dataIndex: 'amount' },
		{ title: 'Izoh', dataIndex: 'note' },
		{
			title: 'Amallar',
			render: (_: any, record: Expense) => (
				<>
					<Button onClick={() => openModal(record)} type="link">
						Tahrirlash
					</Button>
					<Button onClick={() => handleDelete(record.id)} type="link" danger>
						O‘chirish
					</Button>
				</>
			),
		},
	];

	return (
		<div className="p-4 h-[calc(100vh-70px)]  bg-[#e0f7fa]">
			<Button type="primary" onClick={() => openModal()} className="mb-4">
				Xarajat qo‘shish
			</Button>
			<Table
				rowKey="id"
				dataSource={data}
				columns={columns}
				scroll={{ x: 600 }}
			/>
			<Modal
				className="rounded-lg top-5 w-full p-2 max-w-[500px]"
				open={isModalOpen}
				title={editing ? 'Xarajatni tahrirlash' : 'Yangi xarajat'}
				onOk={handleOk}
				onCancel={() => setIsModalOpen(false)}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="category"
						label="Turkum"
						rules={[{ required: true }]}
					>
						<Select options={categories.map((c) => ({ value: c, label: c }))} />
					</Form.Item>
					<Form.Item name="amount" label="Narx" rules={[{ required: true }]}>
						<InputNumber className="w-full" />
					</Form.Item>
					<Form.Item name="note" label="Izoh">
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default Categories;
