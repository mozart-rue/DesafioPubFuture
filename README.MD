# Desafio PubFuture


##### REST API para controle de finanças pessoais
Documentação da aplicação na raiz do projeto, './Documentation.md'


### Tecnologias Utilizadas

- Nodejs - v16.13.0
- Sequelize - Nodejs ORM para integrar com banco de dados
- Express - Nodejs dependencia
- PostgreSql - Banco de dados relacional
- Git & Github
- Insomnia - para teste de rotas da API

---

### Requisitos Para Executar a Aplicação

- Nodejs
- npm
- PostgreSql
- Insomnia/Postman (para testar a aplicação)

---

### Execução da Aplicação

1. Clonar este repositório:

```cmd
git clone "https://github.com/mozart-rue/DesafioPubFuture.git"
```

2. Abre o seu terminal na pasta raiz do projeto, e execute o seguinte comando para instalar as depencias do Nodejs necessárias para a aplicação.

```cmd
npm install
```

3. Configure a conexão ao banco de dados:

- No arquivo ./config/database.js, insira as credenciais de acesso ao banco de dados, também insira o host/Ip e caso necessario descomente a linha com o requisito de porta e insira o numero da porta.
  Obs: O usuário do Banco de Dados deve possuir permissões de administrador

4. Crie o banco e tabelas:
   Para criar o banco da aplicação, no terminal execute seguinte comando:

```cmd
npx sequelize db:create
```

Para criar as tabelas, no terminal execute o seguinte comando:

```cmd
npx sequelize db:migrate
```

5. Iniciando a aplicação:
   Para iniciar a aplicação no seu terminar, na raiz do projeto, execute o comando:

```cmd
node ./server.js
```

---
