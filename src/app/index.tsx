import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ReactDOM from 'react-dom/client';
import store from '@redux/store/store';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import App from './routing/routes';
import './styles/index.css';

const queryClient = new QueryClient();

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
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<App />
				</Provider>
			</QueryClientProvider>
		</ConfigProvider>
	</React.StrictMode>,
);
