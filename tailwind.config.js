/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
    // "./server/**/*.{js,ts,jsx,tsx}", // added in for dark mode
  ],
  darkMode: 'class',
  theme: {
  	extend: {
  		boxShadow: {
  			'inner-strong': 'inset 0 4px 10px rgba(0,0,0,0.5)',
  		},
      fontFamily: {
        // Now you can use 'font-poppins' or 'font-michroma' in your HTML
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        michroma: ['Michroma', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },
  	},
  	container: {
  		center: true,
  		padding: '1rem'
  	}
  },
  plugins: [],
};