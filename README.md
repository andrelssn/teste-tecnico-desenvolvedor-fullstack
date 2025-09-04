# 📦 API de Produtos e Clientes

Aplicação Node.js com **Express + Prisma + SQLite**, desenvolvida como parte de um teste técnico.  
Permite cadastrar e consultar **produtos** e **clientes**, com validações básicas e persistência em banco local.

---

## 📋 Funcionalidades

### Produtos
- **POST /produtos** → cadastrar um produto  
- **GET /produtos** → listar produtos (com busca e paginação)  
- **GET /produtos/:id** → buscar produto pelo ID  

### Clientes
- **POST /clientes** → cadastrar um cliente  
- **GET /clientes** → listar clientes  
- **GET /clientes/:id** → buscar cliente pelo ID  

---

## ✅ Regras de Negócio
- Produto deve ter **nome** e **preço** obrigatórios.  
- Cliente deve ter **nome** e **email** obrigatórios.  
- Emails devem ser **únicos** no banco.  

---

## 🛠️ Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/)  
- [Prisma ORM](https://www.prisma.io/)  
- [SQLite](https://www.sqlite.org/)  

---

## 🔧 Como Rodar o Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

### 2. Instalar dependências
```bash
npm install
```

### Configurar o banco de dados

O projeto usa SQLite. O schema já está definido em prisma/schema.prisma.
Para criar o banco e aplicar as migrations:

```bash
npx prisma migrate dev --name init
```
Isso criará o arquivo do banco em:
```bash
prisma/dev.db
```

### 4. Rodar a aplicação
```bash
node server.js
```
O servidor estará disponível em:
```bash
http://localhost:3000
```

### 📡 Exemplos de Uso

Criar Produto
```bash
POST /produtos
Content-Type: application/json

{
  "nome": "Notebook",
  "preco": 3500,
  "estoque": 5
}
```

Listar Produtos
```bash
GET /produtos?search=note&page=1&limit=5
```

Criar Cliente
```bash
POST /clientes
Content-Type: application/json

{
  "nome": "André",
  "email": "andre@email.com"
}
```

Buscar Cliente por ID
```bash
GET /clientes/1
```

## 🔍 Extras
### Prisma Studio

Interface web para gerenciar o banco:
```bash
npx prisma studio
```

Disponível em http://localhost:5555.

### Acessar banco diretamente

O banco SQLite fica em:
```bash
prisma/dev.db
```

Pode ser aberto com DBeaver
, SQLiteStudio
, ou via terminal:
```bash
sqlite3 prisma/dev.db
```

## 📌 Observações
- O banco SQLite é apenas para desenvolvimento/local.
- Em produção, basta alterar o datasource no schema.prisma para MySQL ou PostgreSQL e rodar prisma migrate.

## 👨‍💻 Autor

Feito por André Santos ✨
