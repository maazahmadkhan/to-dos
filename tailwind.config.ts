import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/**/*.{html,svelte,js,ts}', // Adjust based on your custom folder setup
		'./src/routes/**/*.{svelte,js,ts}' // Ensure routes are included if custom folder
	],
	theme: {
		extend: {}
	},
	plugins: []
};

export default config;
