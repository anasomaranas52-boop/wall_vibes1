import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@theme/tailwindcss' // تأكد من وجود السطر ده

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
