import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build'
		}),
		files: {
			routes: 'src/routes'
		},
		paths: {
			base: dev ? '' : '/to-dos'
		},
		prerender: {
			entries: ['*']
		}
	}
};

export default config;
