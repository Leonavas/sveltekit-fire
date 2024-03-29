import adapter from '@sveltejs/adapter-static';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	// Consult https://github.com/sveltejs/svelte-preprocess
// 	// for more information about preprocessors
// 	preprocess: [
// 		preprocess({
// 			postcss: true
// 		})
// 	],

// 	kit: {
// 		adapter: adapter(),
// 		// hydrate the <div id="svelte"> element in src/app.html
// 		package: {
// 			files: (file) => !file.toLocaleLowerCase().includes('demo'),
// 			exports: (file) => file === 'index.ts'
// 		},
// 		vite: {
// 			resolve: {
// 				alias: {
// 					'sveltekit-fire': path.resolve('src/lib')
// 				}
// 			},
// 			ssr: {
// 				external: ['firebase']
// 			}
// 		}
// 	}
// };

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	}
};

export default config;
