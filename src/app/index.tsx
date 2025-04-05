import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routing/routes';
import './styles/index.css';
import { ConfigProvider } from 'antd';
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ConfigProvider
			theme={{
				components: {
					Input: {
						controlHeight: 40,
					},
					InputNumber: {
						controlHeight: 40,
					},
					Select: {
						controlHeight: 40,
					},
					Button: {
						controlHeight: 40,
						borderRadius: 4,
					},
				},
			}}
		>
			<App />
		</ConfigProvider>
	</React.StrictMode>,
);
