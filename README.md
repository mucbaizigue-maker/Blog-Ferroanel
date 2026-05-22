# FERROANEL HUB - Blog

Blog colaborativo sobre Ferroanel, logistica paulista, infraestrutura ferroviaria, mobilidade urbana e impactos economicos.

## Recursos

- Publicacao aberta de anotacoes por visitantes
- Posts com autor, titulo, categoria, conteudo e imagem opcional
- Busca por titulo, autor, categoria e conteudo
- Filtro por categorias
- Post em destaque e feed de posts recentes
- Comentarios em cada publicacao
- Curtidas e denuncias
- Painel de moderacao local para ocultar, republicar ou excluir posts denunciados
- SEO basico com metatags, Open Graph e favicon
- Estrutura pronta para futura integracao com Supabase, Firebase ou outro backend

## Como rodar localmente

Se estiver usando o Node portatil que foi instalado neste projeto:

```cmd
rodar-local.cmd
```

Se ja tiver Node instalado:

```bash
npm install
npm run dev
```

Depois acesse:

```text
http://127.0.0.1:5173/
```

## Build

```bash
npm run build
```

## Moderacao

O painel de moderacao usa um codigo local simples:

```text
ferroanel2026
```

Esse codigo e adequado apenas para uso local/demonstracao. Para um blog publico real, substitua por autenticacao em backend.

## Persistencia atual

As publicacoes, comentarios, curtidas e denuncias ficam salvos no `localStorage` do navegador. Isso significa que os dados aparecem para a pessoa que usa aquele navegador, mas ainda nao sao compartilhados globalmente entre todos os visitantes.

## Proximo passo recomendado

Para transformar o projeto em um blog publico completo, conecte os posts a:

- Supabase
- Firebase Firestore
- Node.js + MongoDB
- MySQL + PHP

Com um backend real, as publicacoes passam a aparecer para todos os usuarios em qualquer dispositivo.
