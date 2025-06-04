import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const repository = 'crypto-quest'

export default defineConfig({
  base: process.env.GITHUB_PAGES ? `/${repository}/` : '/',
  plugins: [react()],
})
