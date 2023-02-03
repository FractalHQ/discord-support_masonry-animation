import { mdsvex } from 'mdsvex'
import preprocess from 'svelte-preprocess'
import mdsvexConfig from './mdsvex.config.js'
import vercel from '@sveltejs/adapter-vercel'
import { awesomePugPre, awesomePugPost } from 'svelte-awesome-pug'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [
		awesomePugPre,
		preprocess({
			postcss: true
		}),
		awesomePugPost,
		mdsvex(mdsvexConfig)
	],
	kit: { adapter: vercel() },
	vitePlugin: {
		experimental: {
			// https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#inspector
			inspector: {
				toggleButtonPos: 'bottom-left',
				toggleKeyCombo: 'meta-shift',
				showToggleButton: 'active',
				holdMode: true
			}
		}
	}
}

export default config
