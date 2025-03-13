import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
	plugins: [],
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, 'src'),
			'@shared': path.resolve(__dirname, 'shared'),
		},
	},
});
