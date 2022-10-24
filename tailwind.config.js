/**
 * https://github.com/chrissy-dev/eleventy-web-starter
 */
module.exports = {
	theme: {
		fontFamily: {
			'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
		},
		extend: {
			colors: {
				white: '#FAFAFA',
				black: '#0C0C0C',
				blue: {
					DEFAULT: '#2010BC',
					'50': '#988EF5',
					'100': '#877BF4',
					'200': '#6456F1',
					'300': '#4230ED',
					'400': '#2613E2',
					'500': '#2010BC',
					'600': '#170C88',
					'700': '#0E0755',
					'800': '#060321',
					'900': '#000000'
				},
			}
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
	content: [
		'src/forms/*.njk',
		'src/_includes/**/form-pages.njk',
		'src/_includes/components/forms/*.*'
	]
}