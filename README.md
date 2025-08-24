# Sistema de Gerenciamento de Produtos

## Descrição do Projeto
Sistema completo de autenticação e gerenciamento de produtos com interface intuitiva e funcionalidades avançadas.

## 🚀 Funcionalidades Implementadas

###  **Tela de Login**
- Autenticação segura com e-mail e senha
- Validação de campos em tempo real
- Feedback visual para o usuário
- Armazenamento de token JWT

### **Tela de Listagem de Produtos**
-  Exibição de todos os produtos cadastrados
-  Sistema de filtros avançado:
  -  Busca por texto (Categoria)
  -  Filtro por status (Anunciado, Desativado, Vendido)
-  Layout responsivo com cards de produtos
-  Informações completas: imagem, preço, descrição, status e categoria



## **Funcionalidade Secreta**
- **Easter Egg especial**: Ao manter o mouse sobre o botão "Novo produto" por 7 segundos, surge um tooltip com a mensagem motivacional: 
  > "Tá esperando o quê? Bora moer!! 🚀"

##  **Backend**
-  **Autenticação JWT** segura
-  **CRUD completo** de produtos
-  Sistema de **categorias** dinâmico
-  **Filtros avançados** por múltiplos parâmetros
-  Upload e gerenciamento de **imagens**
-  API RESTful organizada

## **Tecnologias Utilizadas**

### Frontend
- React.js
- Styled Components
- React Router DOM
- Axios para requisições HTTP
- Hugeicons React para ícones

### Backend
- Node.js
- Express.js
- JWT para autenticação
-  PostgreSQL com Prisma ORM
- Multer para upload de imagens
- CORS e segurança implementada

## **Banco de Dados**
-  **PostgreSQL** com relações otimizadas
- Esquema relacional para:
  - 👥 Usuários
  - 📦 Produtos
  - 📑 Categorias


## 🚀 **Como Executar**
```
clonar repositorio
```

### Backend
criar o .env igual o .env.example
```bash
cd backend
npm install
npx prisma generate
npm run dev
```
### Frontend
criar o .env igual o .env.example
com backend rodando.
```bash
cd frontend
npm install
npm run dev
```