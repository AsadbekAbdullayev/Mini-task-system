import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routing/routes';
import './styles/index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ConfigProvider } from 'antd';
import store from '@redux/store/store';
import { Provider } from 'react-redux';
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
