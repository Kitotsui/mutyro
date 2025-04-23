## Mutyro
Aplicação feita com Node.js, TypeScript e React para cadastrar, acompanhar e gerenciar mutirões comunitários.

## Estrutura do Projeto
client/              # Frontend React + Vite
  └── src/            # Código-fonte do frontend
controllers/         # Controladores das rotas
middleware/          # Middlewares (auth, validação, erros)
models/              # Modelos do Mongoose
routes/              # Definição das rotas da API
utils/               # Funções utilitárias
server.js            # Entry point da API
swaggerConfig.js     # Configuração da documentação Swagger
README.md            # Esse arquivo!

## Instalação das dependências
npm run setup-project

## Variáveis de Ambiente
No arquivo .env:
PORT=5100
MONGO_URL
JWT_SECRET
JWT_LIFETIME
NODE_ENV=development

## Scripts disponíveis
npm run dev          # Inicia servidor + client juntos
npm run server       # Inicia apenas o servidor (API)
npm run client       # Inicia apenas o client (React)

## Autenticação
Baseada em JWT
Tokens são enviados via cookies HTTP-only
Rotas protegidas com middleware authenticateUser
Algumas rotas exigem permissões adicionais (authorizePermissions)

## Documentação da API
Acesse a Documentação Swagger após iniciar o servidor: http://localhost:5100/api-docs

## Tecnologias Utilizadas
Backend:
  Node.js
  Express
  TypeScript
  Mongoose
  JWT
  Swagger
  Middlewares de segurança
Frontend:
  React
  Vite
  React Router
  Styled Components
  Axios
  React Toastify
  Lucide Icons

## Estilo de nomenclatura:
CamelCase           #variáveis e funções.
PascalCase          #classes e tipos.
UPPER_SNAKE_CASE    #constantes e variáveis imutáveis.
kebab-case          #URLs