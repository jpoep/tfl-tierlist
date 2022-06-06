import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
const base = '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		paths: {
			base
		},
		prerender: {
			default: true
		},
		vite: {
			server: {
				fs: {
					allow: ['..']
				}
			}
		}
	}
};

export default config;
