/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
    "./server/**/*.{js,ts,jsx,tsx}", // added in for dark mode
  ],
  darkMode: 'class',
  theme: {
  	extend: {
  		boxShadow: {
  			'inner-strong': 'inset 0 4px 10px rgba(0,0,0,0.5)'
  		},
  	},
  	container: {
  		center: true,
  		padding: '1rem'
  	}
  },
  plugins: [],
};