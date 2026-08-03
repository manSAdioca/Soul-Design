import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { niches } from './src/config/niches.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const nicheKey = env.VITE_NICHE || 'default';
  const nicheData = niches[nicheKey] || niches.default;

  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html
            .replace(/<title>(.*?)<\/title>/, `<title>${nicheData.seoTitle}</title>`)
            .replace(/<meta name="description" content="(.*?)"/, `<meta name="description" content="${nicheData.seoDescription}"`);
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    }
  }
})
