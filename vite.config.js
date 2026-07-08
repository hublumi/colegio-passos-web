import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        leitura: resolve(__dirname, 'blog-leitura.html'),
        protagonismo: resolve(__dirname, 'blog-protagonismo.html'),
        telas: resolve(__dirname, 'blog-telas.html'),
      },
    },
  },
});
