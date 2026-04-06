import type { Config } from 'tailwindcss';

const config: Config = {
  // DARK MODE ENABLE KIYA HAI YAHAN
  darkMode: 'class', 
  
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Agar tera folder structure 'src/components' hai, toh ye bhi safety ke liye:
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Yahan tu apne custom colors bhi add kar sakta hai future mein
    },
  },
  plugins: [],
};

export default config;