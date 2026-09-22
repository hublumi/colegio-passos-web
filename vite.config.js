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
        acompanhamentoPedagogico: resolve(__dirname, 'acompanhamento-pedagogico/index.html'),
        desenvolvimentoSocioemocional: resolve(__dirname, 'desenvolvimento-socioemocional/index.html'),
        idiomas: resolve(__dirname, 'idiomas/index.html'),
        simulados: resolve(__dirname, 'simulados/index.html'),
        perguntasFrequentes: resolve(__dirname, 'perguntas-frequentes/index.html'),
        escolherEscolaJundiai: resolve(__dirname, 'como-escolher-escola-particular-jundiai/index.html'),
        visitaEscola: resolve(__dirname, 'perguntas-visita-escola-particular/index.html'),
        escolherSextoAno: resolve(__dirname, 'como-escolher-escola-6-ano/index.html'),
        transicaoFundamental: resolve(__dirname, 'fundamental-1-fundamental-2-diferencas/index.html'),
      },
    },
  },
});
