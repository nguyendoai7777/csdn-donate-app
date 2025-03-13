import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
	plugins: [],
	resolve: {
		alias: {
			images: path.resolve(__dirname, 'public/images'),
		},
	},
});
