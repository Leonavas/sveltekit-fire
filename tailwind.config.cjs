const colors = require('tailwindcss/colors');

const config = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			// 'sans': ["'DM Sans'", 'ui-sans-serif', 'system-ui']
			sans: ['"DM Sans"']
		},
		extend: {
			colors: {
				brand: colors.amber,
				firebase: {
					DEFAULT: '#ffcA28'
				},
				svelte: {
					DEFAULT: '#ff3e00'
				}
			},
			maxWidth: {
				'8-xl': '90rem'
			},
			typography: {
				DEFAULT: {
					css: {
						code: {
							color: colors.amber[600]
						}
					}
				}
			}
		}
	},

	plugins: [require('@tailwindcss/typography')]
};

module.exports = config;
