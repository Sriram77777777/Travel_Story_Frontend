import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  theme:{
    fontFamily:{
      display:["Poppins","sans-serif"]
    }
  },

  extend:{
    //colors used in the project
    colors:{
      primary:"#05B6D3",
      seccondary:"#EF863E",
    },

    backgroundImage:{
      'login-bg-img': "url('./src/assets/images/travelstory.jpg",
      'signup-bg-img': "url('./src/assets/images/signup1.jpg",
    },
  }
})
