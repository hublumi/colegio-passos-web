import { defineConfig } from 'vite';
import { resolve } from 'path';

const googleAdsConversionTracking = `
(function () {
  const formConversion = 'AW-18546404288/x8x2CMC0o7UdEMDXzotF';
  const whatsappConversion = 'AW-18546404288/6_CTCM0o7UdEMDXzotF';

  function sendConversion(sendTo) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { send_to: sendTo });
    }
  }

  function bindConversionTracking() {
    document.querySelectorAll('a[href]').forEach(function (link) {
      const href = link.getAttribute('href') || '';
      const isSchoolWhatsApp = href.includes('api.whatsapp.com') || href.includes('wa.me/551144922787');

      if (isSchoolWhatsApp) {
        link.addEventListener('click', function () {
          sendConversion(whatsappConversion);
        });
      }
    });

    document.querySelectorAll('form').forEach(function (form) {
      form.addEventListener('submit', function () {
        sendConversion(formConversion);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindConversionTracking, { once: true });
  } else {
    bindConversionTracking();
  }
})();
`;

const googleAdsTag = {
  name: 'google-ads-tag',
  transformIndexHtml: {
    order: 'pre',
    handler() {
      return [
        {
          tag: 'script',
          attrs: {
            async: true,
            src: 'https://www.googletagmanager.com/gtag/js?id=AW-18546404288',
          },
          injectTo: 'head',
        },
        {
          tag: 'script',
          children: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-18546404288');",
          injectTo: 'head',
        },
        {
          tag: 'script',
          children: googleAdsConversionTracking,
          injectTo: 'body',
        },
      ];
    },
  },
};

export default defineConfig({
  plugins: [googleAdsTag],
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
