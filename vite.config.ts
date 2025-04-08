import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dotenv from 'dotenv';
import path from 'path';
// Load environment variables
dotenv.config();

export default defineConfig({
	plugins: [react(), svgr()],
	define: {
		'process.env.REACT_APP_BASE_URL': JSON.stringify(
			process.env.REACT_APP_BASE_URL || 'fallback-url',
		),
	},
	server: {
		port: 3003,
	},
	css: {
		postcss: './postcss.config.js',
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@hooks': path.resolve(__dirname, './src/shared/hooks'),
			'@redux': path.resolve(__dirname, './src/redux'),
			'@ui': path.resolve(__dirname, './src/shared/ui'),
			'@imgs': path.resolve(__dirname, './src/assets/img'),
			'@icons': path.resolve(__dirname, './src/assets/icons'),
			'@api': path.resolve(__dirname, './src/services/api'),
			'@services': path.resolve(__dirname, './src/services'),
			'@constants': path.resolve(__dirname, './src/constants'),
			'@entities': path.resolve(__dirname, './src/entities'),
			'@features': path.resolve(__dirname, './src/features'),
		},
	},
});
