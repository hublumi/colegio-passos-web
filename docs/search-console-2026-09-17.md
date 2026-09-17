# Indexação no Search Console — Colégio Passos

Análise dos nove arquivos Coverage-Drilldown de 17/09/2026 e testes HTTP GET realizados nesta tarefa. O gráfico dos arquivos informa 13/09/2026; algumas linhas registram rastreamentos posteriores. São 34 registros distribuídos em nove motivos, não 34 páginas comerciais quebradas.

## Problema confirmado e correção local

O servidor responde 308 para `https://colegiopassos.com.br/` e leva à versão `https://www.colegiopassos.com.br/`, que responde 200. Porém, as páginas publicadas declaram a versão sem www como canônica e o sitemap lista essa versão que redireciona. São sinais contraditórios.

Foram alinhadas ao domínio final com www as referências canônicas, Open Graph, Twitter, URLs e identificadores nos dados estruturados, sitemap e sua declaração no robots.txt. Política e Termos receberam canônicas autorreferentes e descrições. Não houve alteração visual, de DNS, de firewall ou das regras de redirecionamento da hospedagem.

Isso resolve a inconsistência no código, mas não comprova a causa histórica do erro de redirecionamento registrado pelo Google. Nenhum loop foi reproduzido nos quatro artigos nesta verificação.

## Interpretação dos nove relatórios

| Arquivo (sufixo) | Motivo / quantidade | Resultado atual e ação |
| --- | --- | --- |
| Sem sufixo | Página com redirecionamento / 8 | Variantes HTTP e sem www redirecionam corretamente. Há também parâmetros suspeitos. Não é necessário indexar essas variantes: a URL final deve ser a canônica. |
| (1) | Não encontrado (404) / 5 | Autor antigo, caminhos com asteriscos e URL de apostas não são páginas atuais. Quatro retornaram 404 ao final e `wp-*.php` retornou 403. Não criar páginas nem redirecionar esses endereços para a Home. |
| (2) | Erro de redirecionamento / 4 | Os quatro artigos abaixo retornaram 308 → 200, sem loop. Canônicas e sitemap corrigidos localmente. Repetir teste ao vivo e validação após publicar. |
| (3) | Acesso proibido (403) / 3 | Rotas de WordPress continuam retornando 403. Não são necessárias para renderizar o site Vite atual. Preservar bloqueios; não abrir wp-admin para tentar zerar o painel. |
| (4) | Alternativa com canônica adequada / 2 | Parâmetros suspeitos mostram a Home, não artigos de apostas nos testes. Exclusão de duplicata é esperada. A referência canônica da Home foi alinhada ao www. |
| (5) | Outro problema 4xx / 1 | `wp-admin/admin-ajax.php` retorna 403 hoje. Endpoint legado, não página pública atual. Manter inacessível. |
| (6) | Cópia sem canônica / 1 | `http://webmail.colegiopassos.com.br/processa_login.php` retornou 200, sem título ou canônica detectados. Serviço externo a este projeto; não foi modificado. |
| (7) | Rastreada, não indexada / 8 | Seis URLs com parâmetros de apostas exibem a Home; os dois feeds antigos retornam 404. Não solicitar indexação dessas URLs. |
| (8) | Detectada, não indexada / 2 | Política e Termos retornam 308 → 200. Canônicas adicionadas e sitemap alinhado. Não há garantia de indexação, nem necessidade de priorizá-las acima das páginas de ensino. |

Fontes: arquivos `colegiopassos.com.br-Coverage-Drilldown-2026-09-17[ (n)].xlsx`; em todos, motivo em `Metadados!B3`, URLs em `Tabela!A2:A9` ou até a última linha preenchida conforme a quantidade acima. As datas 31/12/1969 do arquivo (8) não devem ser interpretadas como rastreamentos reais; são compatíveis com um valor de data ausente convertido na exportação.

### Artigos prioritários para nova inspeção

- https://www.colegiopassos.com.br/blog-ansiedade-escolar.html
- https://www.colegiopassos.com.br/blog-telas.html
- https://www.colegiopassos.com.br/blog-protagonismo.html
- https://www.colegiopassos.com.br/blog-leitura.html

## URLs suspeitas e limites da análise

Termos como `robo_mines_pdf`, `5win.doc` e `casino` são incompatíveis com o colégio. Podem vir de spam externo ou de um histórico de comprometimento, mas o relatório isolado não prova invasão atual. Os GETs testados mostraram a Home ou respostas de erro; uma busca textual no código-fonte atual não encontrou os termos de apostas nem as rotas de WordPress pesquisadas. Isso não substitui auditoria de segurança do antigo servidor, DNS, contas e logs.

Verificar as seções “Problemas de segurança” e “Ações manuais” no Search Console e os acessos à hospedagem antiga. Não aplicar `noindex` à Home, remover a propriedade inteira, bloquear todos os parâmetros nem redirecionar qualquer URL inexistente para a Home. Parâmetros legítimos de campanhas e os slugs dos artigos dinâmicos precisam continuar funcionando.

Para o webmail, solicitar ao administrador do serviço que confirme se o endpoint ainda é utilizado. Se desativado, retornar 404/410. Se ativo, tratar autenticação e exclusão de busca no servidor do webmail (por exemplo, `X-Robots-Tag: noindex` nas respostas públicas apropriadas), sem expor mensagens ou remover a autenticação. A configuração do site principal não corrige esse subdomínio.

## Sequência após publicação

1. Publicar as alterações locais e confirmar que as 11 URLs do sitemap respondem 200 diretamente, com canônicas idênticas às URLs finais. Confirmar também que as variantes sem www continuam redirecionando para www, nunca ao contrário.
2. Enviar `https://www.colegiopassos.com.br/sitemap.xml` na propriedade do domínio no Search Console. O antigo endereço do sitemap pode redirecionar; a submissão preferencial deve ser a final.
3. Inspecionar os quatro artigos listados, usar “Testar URL publicada” e, se estiverem elegíveis, solicitar indexação das versões com www.
4. No grupo “Erro de redirecionamento”, iniciar “Validar correção” após conferir as URLs. Se o erro reaparecer, registrar a resposta do teste do Google e investigar logs/firewall e regras da hospedagem; não presumir que a canônica resolve um bloqueio de rastreamento.
5. Priorizar Home e páginas de ensino nas inspeções; Política e Termos são secundários. Não solicitar indexação de spam, webmail ou endpoints antigos.
6. Aguardar novo rastreamento. Acompanhar canônica selecionada pelo Google e indexação das páginas úteis. Não há prazo garantido e a contagem de páginas excluídas não precisa chegar a zero.

## Verificação executada

`npm run test:seo`: build concluído; as 11 páginas do sitemap existem no artefato, possuem uma canônica idêntica à URL listada, usam o domínio com www e não contêm noindex detectado pelo teste. Os blocos JSON-LD foram parseados sem erro. O script também verifica a declaração do sitemap no robots.txt. `git diff --check` passou.

As alterações desta tarefa permanecem locais. Não foi feita publicação nem acionada validação na conta do Search Console. As modificações de conteúdo da tarefa anterior e os ajustes visuais preexistentes foram preservados.

Referências: [relatório de indexação do Google](https://support.google.com/webmasters/answer/7440203?hl=pt-BR), [consolidação de URLs duplicadas](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) e [tratamento de 404](https://support.google.com/webmasters/answer/2445990?hl=en).
