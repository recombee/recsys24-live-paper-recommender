/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/utils/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
			primary: {
				light: '#ebf9f5',
				hover: '#62cfb3',
				DEFAULT: '#3bc4a1',
				text: '#374040',
			},
			blue: '#0091ff',
		},
	},
	plugins: [require('@tailwindcss/custom-forms')],
};
export default config;
