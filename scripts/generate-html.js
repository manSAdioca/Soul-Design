import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importar as configurações de nichos
import { niches } from '../src/config/niches.js';

const rootDir = path.resolve(__dirname, '..');
const templatePath = path.join(rootDir, 'index.html');
const templateHtml = fs.readFileSync(templatePath, 'utf-8');

console.log('--- Gerando HTMLs estáticos para nichos ---');

Object.keys(niches).forEach((nicheKey) => {
  if (nicheKey === 'default') return; // default já é o index.html gerado normalmente pelo vite

  const nicheData = niches[nicheKey];
  const outputPath = path.join(rootDir, `${nicheKey}.html`);

  // Substituir os metadados de SEO
  let modifiedHtml = templateHtml
    .replace(
      /<title>(.*?)<\/title>/,
      `<title>${nicheData.seoTitle}</title>`
    )
    .replace(
      /<meta name="description" content="(.*?)"/,
      `<meta name="description" content="${nicheData.seoDescription}"`
    );

  // Injetar a variável global para o React saber qual nicho carregar
  const injectionScript = `\n    <script>window.NICHE = '${nicheKey}';</script>`;
  modifiedHtml = modifiedHtml.replace('</head>', `${injectionScript}\n  </head>`);

  fs.writeFileSync(outputPath, modifiedHtml);
  console.log(`✅ Gerado: ${nicheKey}.html`);
});

console.log('--- Geração concluída! ---');
