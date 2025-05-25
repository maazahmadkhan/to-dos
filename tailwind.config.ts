import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{html,js,ts,svelte}', './src/routes/**/*.{svelte,js,ts}'],
	theme: {
		extend: {}
	},
	plugins: []
};

export default config;
