// import adapter from 'svelte-adapter-bun'
// import adapter from '@sveltejs/adapter-auto'
// import adapter from '@sveltejs/adapter-node'
import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		csrf: {
			checkOrigin: false
		},
        csp: {
            directives: {
                "default-src": [
                    'self'
                ],
                "connect-src": [
                    'self',
                    'data:',
                    'blob:',
                    'http://localhost:3000',
                    'http://0.0.0.0:3000',
                    'https://lamy-tools.onrender.com',
                    'https://cdn.emulatorjs.org',
                    'https://allancoding-files.netlify.app',
                    'https://static.playemulator.com',
                ],
                "frame-src": [
                    'self',
                    'https://demo.emulatorjs.org',
                ],
                "script-src": [
                    'self',
                    'unsafe-eval',
                    'blob:',
                    'https://cdn.emulatorjs.org',
                ],
                "style-src": [
                    'self',
                    'unsafe-inline',
                    'https://cdn.emulatorjs.org',
                ],
                "img-src": [
                    'self',
                    'data:',
                    'blob:',
                    'https://www.zeldadungeon.net',
                    'https://assets-prd.ignimgs.com',
                    'https://m.media-amazon.com',
                ],
            }
        }
	}
};

export default config;
