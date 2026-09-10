import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
    reportCompressedSize: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        leitura: resolve(__dirname, 'blog-leitura.html'),
        protagonismo: resolve(__dirname, 'blog-protagonismo.html'),
        telas: resolve(__dirname, 'blog-telas.html'),
        ansiedade: resolve(__dirname, 'blog-ansiedade-escolar.html'),
        post: resolve(__dirname, 'blog-post.html'),
        termos: resolve(__dirname, 'termos.html'),
        politica: resolve(__dirname, 'politica.html'),
      },
    },
  },
});
