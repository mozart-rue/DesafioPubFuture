# Documentação REST API - Finanças Pessoais

RESTfull API com aplicação a sistema de finanças pessoais. Possui três grupos de chamadas:
* **RECEITAS** 
* **DESPESAS** 
* **CONTAS** 

**Cada grupo possui as seguintes funcionalidades**:
* Cadastro de novas operações e de nova conta;
* Edição de movimentações cadastradas (RECEITAS, DESPESAS) e de dados cadastrais (CONTAS);
* Remoção de registros, deleta da base de dados as movimentações ou contas;
* Leitura de dados cadastrados


# Consumo Da API


## Grupo  CONTAS

###  Cadastrar Conta 
Cria uma nova conta 
```http
POST http://localhost:9000/create_account
```
**Request Body**
| Campo | Requerido | Tipo | Descrição |
|---    | ---       | ---  | ---       |
|  nome   | true    | string   | nome da conta   |
| saldo  | true     | int   | valor inicial do saldo |
| tipo_conta | true  | string | tipo conta ex.: Poupança |
| inst_financeira | true | string | nome da instituição financeira|
 Exemplo Request Body:
 ```json
{
	"nome":"João",
	"saldo":100.00,
	"tipo_conta":"Conta-Corrente",
	"inst_financeira":"Banco do Brasil"
}
```
Exemplo Response:
Status code: 200
Retorna json com os dados da conta
 ```json
{
	"conta": 1,
	"nome": "João",
	"saldo": 100,
	"tipo_conta": "Conta-Corrente",
	"inst_financeira": "Banco do Brasil",
	"updatedAt": "2022-01-16T17:24:43.245Z",
	"createdAt": "2022-01-16T17:24:43.245Z"
}
```


###  Editar Conta 
Edita dados da conta criada
```http
PUT http://localhost:9000/edit_account/{numero_conta}
```
**Parâmetros da URL**
| Campo | Requerido | Tipo | Descrição |
|---    | ---       | ---  | ---       |
|  numero_conta   | true    | int | numero da conta cadastrada   |
Exemplo Request URL:
```http
PUT http://localhost:9000/edit_account/1
```

**Request Body**
| Campo | Requerido | Tipo | Descrição |
|---    | ---       | ---  | ---       |
|  nome   | true    | string   | nome da conta   |
| tipo_conta | true  | string | tipo conta ex.: Poupança |
| inst_financeira | true | string | nome da instituição financeira|
 Exemplo Request Body:
 ```json
{
	"nome":"João",
	"tipo_conta":"Conta-Corrente",
	"inst_financeira":"Bradesco"
}
```
Exemplo Response:
Status code: 200

###  Remover Conta 
Deleta  conta cadastrada e dados de receita e despesa relacionados
```http
DELETE http://localhost:9000/delete_account/{numero_conta}
```
**Parâmetros da URL**
| Campo | Requerido | Tipo | Descrição |
|---    | ---       | ---  | ---       |
|  numero_conta   | true    | int | numero da conta cadastrada   |
Exemplo Request URL:
```http
DELETE http://localhost:9000/delete_account/1
```
Exemplo Response:
Status code: 200


###  Lista dados da Conta 
Lista informações das contas cadastradas
```http
GET http://localhost:9000/get_accounts
```
Exemplo Response:
Status code: 200
```json
[
{
		"conta": 1,
		"nome": "João",
		"saldo": 100,
		"tipo_conta": "Conta-Corrente",
		"inst_financeira": "Bradesco",
		"createdAt": "2022-01-16T17:24:43.245Z",
		"updatedAt": "2022-01-16T17:33:09.591Z"
	}
]
```

###  Lista Saldo Total
Lista Saldo total, retorna a soma dos saldos de todas as contas cadastradas
```http
GET http://localhost:9000/get_total_balance
```
Exemplo Response:
Status code: 200
```json
[
	{
		"saldo_total": 100
	}
]
```
## Grupo  RECEITAS

###  Cadastrar Nova Receita
Faz o cadastro de receitas
```http
POST http://localhost:9000/register_income
```
**Request Body**
| Campo | Requerido | Tipo | Descrição |
|---    | ---       | ---  | ---       |
|  conta   | true    | int | numero da conta   |
| valor  | true     | int   | valor da receita |
| data_recebimento | true  | date | data de recebimento |
| data_recebimento_esperado | true | date | Data esperada de recebimento|
| descricao| true  | string | Descrição da receita |
| tipo_receita | true  | string | tipo receita ex.: Salario |
 Exemplo Request Body:
 ```json
{
	"conta":1,
	"valor":900.00,
	"data_recebimento":"2022-01-10",
	"data_recebimento_esperado":"2022-01-10",
	"descricao":"Aluguel da casa um",
	"tipo_receita":"outros"
}
```
Exemplo Response:
Status code: 200
Retorna json com os dados cadastrados
 ```json
{
	"receita_id": 1,
	"conta": 1,
	"valor": 900,
	"data_recebimento": "2022-01-10",
	"data_recebimento_esperado": "2022-01-10",
	"descricao": "Aluguel da casa um",
	"tipo_receita": "outros",
	"updatedAt": "2022-01-16T18:03:49.120Z",
	"createdAt": "2022-01-16T18:03:49.120Z"
}
```

###  Editar Receita 
Edita dados de receita cadastrada
```http
PUT http://localhost:9000/edit_income/{receita_id}
```
**Parâmetros da URL**
| Campo | Requerido | Tipo | Descrição |
|---    | ---       | ---  | ---       |
|  receita_id   | true    | int | id da receita cadastrada   |
Exemplo Request URL:
```http
PUT http://localhost:9000/edit_income/1
```

**Request Body**
| Campo | Requerido | Tipo | Descrição |
|---    | ---       | ---  | ---       |
|  conta   | true    | int | numero da conta   |
| valor  | true     | int   | valor da receita |
| data_recebimento | true  | date | data de recebimento |
| data_recebimento_esperado | true | date | Data esperada de recebimento|
| descricao| true  | string | Descrição da receita |
| tipo_receita | true  | string | tipo receita ex.: Salario |
 Exemplo Request Body:
 ```json
[
		{
			"receita_id": 1,
			"conta": 1,
			"valor": 1000,
			"data_recebimento": "2022-01-09",
			"data_recebimento_esperado": "2022-01-10",
			"descricao": "Aluguel da casa um",
			"tipo_receita": "outros",
			"createdAt": "2022-01-15T02:04:16.334Z",
			"updatedAt": "2022-01-16T18:10:03.510Z"
		}
	]
```
Exemplo Response:
Status code: 200

###  Excluir Receita 
Deleta  receita cadastrada 
```http
DELETE http://localhost:9000/delete_income/{receita_id}
```
**Parâmetros da URL**
| Campo | Requerido | Tipo | Descrição |
|---    | ---       | ---  | ---       |
|  receita_id   | true    | int | id da receita cadastrada   |
Exemplo Request URL:
```http
DELETE http://localhost:9000/delete_income/1
```
Exemplo Response:
Status code: 200

###  Lista Total de Receitas
Lista valor total de receitas  e quantidade de receitas geradas, somando o valor de todas as contas.
```http
GET http://localhost:9000/total_incomes
```
Exemplo Response:
Status code: 200
```json
[
	{
		"Qtd_receitas": "5",
		"Valor_total": 7100
	}
]
```
Lista valor total de receitas e quantidade de receitas geradas, agrupadas por conta
```http
GET http://localhost:9000/total_incomes/by_account
```
Exemplo Response:
Status code: 200
```json
[
	{
		"conta": 2,
		"Qtd_receitas": "2",
		"Valor_total": 4200
	},
	{
		"conta": 3,
		"Qtd_receitas": "1",
		"Valor_total": 1000
	},
	{
		"conta": 1,
		"Qtd_receitas": "2",
		"Valor_total": 1900
	}
]
```

### Listar Cadastros de Receitas
Retorna cadastros completos de receitas. Lista todas as receitas cadastradas, e pode se aplicar filtros na requisição.
**Nota**: Não é possível aplicar apenas filtro de data inicial ou data final na url, filtros com data precisam dos dois valores.
```http
GET http://localhost:9000/get_incomes?ini_dt={ini_dt}&end_dt={end_dt}&tp_rec={tp_rec}
```
**Parâmetros da URL**
| Campo | Obrigatório | Tipo | Descrição |
|---    | ---       | ---  | ---       |
|  ini_dt   | false    | date | data inicial para filtro de período   |
| end_dt  |  false | date | data final para filtro de período |
| tp_rec | false | string | tipo de receita |

Exemplo de URL
Aplicando todos os filtros na URL  
```http
GET http://localhost:9000/get_incomes?ini_dt=2022-01-03&end_dt=2022-01-08&tp_rec=salario
```
Exemplo Response:
```json
[
	{
		"receita_id": 2,
		"conta": 3,
		"valor": 1000,
		"data_recebimento": "2022-01-05",
		"data_recebimento_esperado": "2022-01-05",
		"descricao": "adiantamento salario",
		"tipo_receita": "salario",
		"createdAt": "2022-01-15T02:05:45.001Z",
		"updatedAt": "2022-01-15T02:05:45.001Z"
	},
	{
		"receita_id": 6,
		"conta": 4,
		"valor": 2700,
		"data_recebimento": "2022-01-05",
		"data_recebimento_esperado": "2022-01-05",
		"descricao": "salario referente ao mes passado",
		"tipo_receita": "salario",
		"createdAt": "2022-01-16T12:16:45.378Z",
		"updatedAt": "2022-01-16T12:16:45.378Z"
	}
]
```
Exemplo de URL
Aplicando apenas filtro de tipo receita  
```http
GET http://localhost:9000/get_incomes?tp_rec=outros
```
Exemplo Response:
```json
[
	{
		"receita_id": 8,
		"conta": 1,
		"valor": 900,
		"data_recebimento": "2022-01-10",
		"data_recebimento_esperado": "2022-01-10",
		"descricao": "Aluguel da casa um",
		"tipo_receita": "outros",
		"createdAt": "2022-01-16T18:03:49.120Z",
		"updatedAt": "2022-01-16T18:03:49.120Z"
	},
	{
		"receita_id": 1,
		"conta": 1,
		"valor": 1000,
		"data_recebimento": "2022-01-09",
		"data_recebimento_esperado": "2022-01-10",
		"descricao": "Aluguel da casa um",
		"tipo_receita": "outros",
		"createdAt": "2022-01-15T02:04:16.334Z",
		"updatedAt": "2022-01-16T18:10:03.510Z"
	}
]
```
## Grupo DESPESA

###  Cadastrar Nova Despesa
Faz o cadastro de despesas
```http
POST http://localhost:9000/register_expense
```
**Request Body**
| Campo | Requerido | Tipo | Descrição |
|---    | ---       | ---  | ---       |
|  conta   | true    | int | numero da conta   |
| valor  | true     | int   | valor da despesa |
| data_pagamento | true  | date | data de pagamento |
| data_pagamento_esperado | true | date | Data esperada de pagamento|
| tipo_despesa | true  | string | tipo receita ex.: alimentacao |
 Exemplo Request Body:
 ```json
{
	"conta":1,
	"valor":120.00,
	"data_pagamento":"2022-01-16",
	"data_pagamento_esperado":"2022-01-16",
	"tipo_despesa":"alimetacao"
}
```
Exemplo Response:
Status code: 200
Retorna json com os dados cadastrados
 ```json
{
	"despesa_id": 9,
	"conta": 1,
	"valor": 120,
	"data_pagamento": "2022-01-16",
	"data_pagamento_esperado": "2022-01-16",
	"tipo_despesa": "alimetacao",
	"updatedAt": "2022-01-16T19:03:15.072Z",
	"createdAt": "2022-01-16T19:03:15.072Z"
}
```
###  Editar Despesa 
Edita dados de despesa cadastrada
```http
PUT http://localhost:9000/edit_expense/{despesa_id}
```
**Parâmetros da URL**
| Campo | Requerido | Tipo | Descrição |
|---    | ---       | ---  | ---       |
|  despesa_id   | true    | int | id da despesa cadastrada   |
Exemplo Request URL:
```http
PUT http://localhost:9000/edit_despesa/1
```

**Request Body**
| Campo | Requerido | Tipo | Descrição |
|---    | ---       | ---  | ---       |
|  conta   | true    | int | numero da conta   |
| valor  | true     | int   | valor da despesa |
| data_pagamento | true  | date | data de pagamento |
| data_pagamento_esperado | true | date | Data esperada de pagamento|
| tipo_despesa | true  | string | tipo receita ex.: alimentacao |
 Exemplo Request Body:
 ```json
		{
	"conta":1,
	"valor":100.00,
	"data_pagamento":"2022-01-15",
	"data_pagamento_esperado":"2022-01-15",
	"tipo_despesa":"alimetacao"
}
```
Exemplo Response:
Status code: 200

###  Excluir Despesa 
Deleta  despesa cadastrada 
```http
DELETE http://localhost:9000/delete_expense/{receita_id}
```
**Parâmetros da URL**
| Campo | Requerido | Tipo | Descrição |
|---    | ---       | ---  | ---       |
|  despesa_id   | true    | int | id da despesa cadastrada   |
Exemplo Request URL:
```http
DELETE http://localhost:9000/delete_expense/1
```
Exemplo Response:
Status code: 200

###  Lista Total de Despesa
Lista valor total de despesas  e quantidade de despesas geradas, somando o valor de todas as contas.
```http
GET http://localhost:9000/total_expenses
```
Exemplo Response:
Status code: 200
```json
[
	{
		"Qtd_despesas": "6",
		"Valor_total": 1300
	}
]
```
Lista valor total de despesas e quantidade de despesas geradas, agrupadas por conta
```http
GET http://localhost:9000/total_expenses/by_account
```
Exemplo Response:
Status code: 200
```json
[
	{
		"conta": 3,
		"Qtd_despesas": "3",
		"Valor_total": 150
	},
	{
		"conta": 1,
		"Qtd_despesas": "1",
		"Valor_total": 100
	},
	{
		"conta": 2,
		"Qtd_despesas": "2",
		"Valor_total": 1050
	}
]
```

### Listar Cadastros de Despesas
Retorna cadastros completos de despesas. Lista todas as despesas cadastradas, e pode se aplicar filtros na requisição.
**Nota**: Não é possível aplicar apenas filtro de data inicial ou data final na url, filtros com data precisam dos dois valores.
```http
GET http://localhost:9000/get_expenses?ini_dt={ini_dt}&end_dt={end_dt}&tp_des={tp_rec}
```
**Parâmetros da URL**
| Campo | Obrigatório | Tipo | Descrição |
|---    | ---       | ---  | ---       |
|  ini_dt   | false    | date | data inicial para filtro de período   |
| end_dt  |  false | date | data final para filtro de período |
| tp_des | false | string | tipo de despesa |

Exemplo de URL
Aplicando todos os filtros na URL  
```http
GET http://localhost:9000/get_expenses?ini_dt=2022-01-03&end_dt=2022-01-08&tp_des=alimentacao
```
Exemplo Response:
```json
[
	{
		"despesa_id": 5,
		"conta": 3,
		"valor": 25,
		"data_pagamento": "2022-01-06",
		"data_pagamento_esperado": "2022-01-06",
		"tipo_despesa": "alimentacao",
		"createdAt": "2022-01-15T23:06:18.435Z",
		"updatedAt": "2022-01-15T23:06:18.435Z"
	}
]
```
Exemplo de URL
Aplicando apenas filtro de tipo despesa  
```http
GET http://localhost:9000/get_expenses?tp_des=aluguel
```
Exemplo Response:
```json
[
	{
		"despesa_id": 7,
		"conta": 4,
		"valor": 900,
		"data_pagamento": "2022-01-06",
		"data_pagamento_esperado": "2022-01-06",
		"tipo_despesa": "aluguel",
		"createdAt": "2022-01-16T12:17:46.753Z",
		"updatedAt": "2022-01-16T12:17:46.753Z"
	}
]
```
