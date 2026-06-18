# 📰 AngularNews

App de notícias personalizadas desenvolvido em **Angular** que consome a [NewsAPI](https://newsapi.org/) para buscar e exibir artigos em tempo real, organizados por categoria (tecnologia, esportes, negócios, entretenimento e mais).

Projeto acadêmico desenvolvido para a disciplina de Desenvolvimento Web com Angular.

---

## ✨ Funcionalidades

- **Autenticação simulada (JWT)** — cadastro e login com geração de token JWT no próprio front-end (sem backend externo), guarda de rotas (`AuthGuard`) e interceptor HTTP que anexa o `Authorization: Bearer <token>`.
- **Consumo de API REST** — integração com a NewsAPI (`top-headlines` e `everything`), com tratamento de erros e estados de carregamento.
- **Filtros por categoria** — geral, tecnologia, negócios, entretenimento, esportes, ciência e saúde.
- **Busca de notícias** — campo de busca no cabeçalho, com resultados via query params (compartilháveis/atualizáveis).
- **Detalhamento de notícia** — tela dedicada com imagem, fonte, autor, data e link para a matéria completa.
- **Favoritos** — salvar/remover notícias favoritas, persistidas por usuário no `localStorage`.
- **Cache local e modo offline** — respostas da API são cacheadas no `localStorage` por 10 minutos; se a requisição falhar (sem internet, cota excedida etc.), o último resultado salvo é exibido, com um aviso de "modo offline" na tela.
- **Notificações push (Web Notifications API)** — ao carregar novas manchetes, o app solicita permissão e dispara uma notificação do navegador avisando sobre novidades na categoria selecionada.
- **Interface responsiva** — construída com Angular Material, adaptada para desktop e mobile (menu colapsável, grid de cards fluido).
- **Tela de perfil** — exibe dados do usuário logado, contagem de favoritos e status das notificações.

## 🧱 Tecnologias

- [Angular](https://angular.dev/) (NgModules + lazy loading de módulos)
- TypeScript
- Angular Material (UI responsiva)
- RxJS
- NewsAPI (https://newsapi.org)
- LocalStorage (cache, favoritos e autenticação simulada)
- Web Notifications API

## 📸 Capturas de tela

> ⚠️ **Antes de entregar a atividade**, substitua os itens abaixo por capturas de tela reais do seu app em execução (veja a seção "Como gerar suas capturas de tela"). O enunciado exige no mínimo 3 imagens.

| Tela | Imagem |
| --- | --- |
| Lista de notícias | `screenshots/news-list.png` |
| Login | `screenshots/login.png` |
| Favoritos | `screenshots/favorites.png` |

```md
![Lista de notícias](screenshots/news-list.png)
![Login](screenshots/login.png)
![Favoritos](screenshots/favorites.png)
```

### Como gerar suas capturas de tela

1. Siga os passos de instalação abaixo e rode `ng serve`.
2. Abra `http://localhost:4200` no navegador, cadastre um usuário e navegue pelas telas.
3. Tire ao menos 3 prints (ex.: lista de notícias, tela de login/cadastro, favoritos, detalhe da notícia ou perfil).
4. Salve os arquivos dentro de uma pasta `screenshots/` na raiz do projeto.
5. Atualize a tabela acima com os nomes reais dos arquivos.

## 🚀 Como executar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Angular CLI](https://angular.dev/tools/cli) (`npm install -g @angular/cli`)
- Uma chave gratuita da [NewsAPI](https://newsapi.org/register)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/AngularNews.git
cd AngularNews

# 2. Instale as dependências
npm install

# 3. Configure sua chave da NewsAPI
# Edite o arquivo src/environments/environment.ts e substitua:
# newsApiKey: 'COLOQUE_SUA_CHAVE_DA_NEWSAPI_AQUI'
# pela chave que você gerou em https://newsapi.org/register

# 4. Inicie o servidor de desenvolvimento
ng serve
```

Acesse `http://localhost:4200` no navegador.

> ℹ️ **Atenção:** o plano gratuito da NewsAPI só aceita requisições vindas de `localhost`. Por isso, o desenvolvimento e os testes devem ser feitos com `ng serve` (não em um domínio publicado), o que é exatamente o cenário desta atividade.

## 📁 Estrutura de pastas

```
src/app/
├── core/                  # Serviços, guards, interceptors e models compartilhados
│   ├── guards/             # AuthGuard (protege rotas de favoritos/perfil)
│   ├── interceptors/       # Interceptor JWT
│   ├── models/              # Interfaces (Article, User, etc.)
│   ├── services/            # AuthService, NewsService, FavoritesService, CacheService, NotificationService
│   └── utils/                # Helpers (base64url)
├── shared/                 # Módulo com componentes reutilizáveis + Angular Material
│   └── components/          # Header, Footer, NewsCard, CategoryFilter, LoadingSpinner
├── auth/                   # Módulo de autenticação (login, cadastro) — lazy loaded
├── news/                    # Módulo de notícias (lista, detalhe) — lazy loaded
├── favorites/                # Módulo de favoritos — lazy loaded, protegido por AuthGuard
└── profile/                  # Módulo de perfil — lazy loaded, protegido por AuthGuard
```

## 🔐 Sobre a autenticação

Esta atividade não exige um backend obrigatório (Firebase ou um serviço próprio são citados como opcionais no enunciado). Por isso, o `AuthService` implementa uma autenticação **simulada no front-end**:

- O cadastro grava os usuários em uma "tabela" no `localStorage` (a senha nunca é salva em texto puro).
- O login gera um token no **formato real de JWT** (`header.payload.assinatura`, todos em base64url), incluindo expiração (`exp`), e o valida normalmente a cada acesso.
- Um `HttpInterceptor` anexa esse token como `Authorization: Bearer <token>` em requisições (exceto para a NewsAPI, que não usa esse cabeçalho).

Isso demonstra o fluxo completo de autenticação JWT do lado do cliente. Para um cenário de produção real, basta trocar a implementação interna do `AuthService` por chamadas ao Firebase Authentication ou a um backend próprio — o restante da aplicação não precisa mudar, pois todos os componentes dependem apenas da interface pública do serviço.

## 🔔 Sobre as notificações push

O enunciado cita "Capacitor Push Notifications", recurso voltado para apps **nativos** (iOS/Android) integrados a um provedor como o Firebase Cloud Messaging — algo que não pode ser demonstrado em uma versão web. Como equivalente funcional no navegador, o `NotificationService` usa a **Web Notifications API**: o app solicita permissão ao usuário e dispara uma notificação real do sistema sempre que novas manchetes são carregadas. Para evoluir este projeto para um app empacotado com Capacitor, essa seria a camada a ser substituída por `@capacitor/push-notifications` + um provedor de push.

## 📄 Licença

Este projeto está licenciado sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

João — projeto desenvolvido como atividade complementar da disciplina de Desenvolvimento Web com Angular.
