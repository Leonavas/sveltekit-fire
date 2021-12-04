const colors = require('tailwindcss/colors');

const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],

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
				},
				blueGray: colors.blueGray,
				coolGray: colors.coolGray,
				warmGray: colors.warmGray,
				gray: colors.gray,
				green: colors.green,
				red: colors.red,
				orange: colors.orange,
				yellow: colors.yellow,
				lime: colors.lime,
				green: colors.green,
				emerald: colors.emerald,
				teal: colors.teal,
				cyan: colors.cyan,
				sky: colors.sky,
				blue: colors.blue,
				indigo: colors.indigo,
				violet: colors.violet,
				purple: colors.purple,
				fuchsia: colors.fuchsia,
				pink: colors.pink,
				rose: colors.rose
			},
			maxWidth: {
				'8-xl': '90rem'
			},
			typography: {
				DEFAULT: {
				  css: {
					code: {
					  color: colors.amber[600]
					},
				  },
				},
			}
		}
	},

	plugins: [require('@tailwindcss/typography')]
};

module.exports = config;
