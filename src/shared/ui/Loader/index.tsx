import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

interface LoaderProps {
	size?: number;
}

const Loader: React.FC<LoaderProps> = ({ size }) => {
	const { pathname } = useLocation();
	const isAdmin = pathname.includes('admin');

	return (
		<div className={`w-full h-screen flex items-center justify-center `}>
			<Spin
				indicator={
					<LoadingOutlined
						style={{
							fontSize: size || 62,
							color: '#9ec8fc',
						}}
						spin
					/>
				}
			/>
		</div>
	);
};

export default Loader;
