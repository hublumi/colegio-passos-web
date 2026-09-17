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
        educacaoInfantil: resolve(__dirname, 'educacao-infantil-jundiai/index.html'),
        fundamentalUm: resolve(__dirname, 'ensino-fundamental-1-jundiai/index.html'),
        fundamentalDois: resolve(__dirname, 'ensino-fundamental-2-jundiai/index.html'),
        matriculas: resolve(__dirname, 'matriculas/index.html'),
        propostaPedagogica: resolve(__dirname, 'proposta-pedagogica/index.html'),
      },
    },
  },
});
