<p align="center">
  <a href="https://nestjs.com/" target="blank">
    <img src="https://gdash.io/wp-content/uploads/2025/02/logo.gdash_.white_.png" width="120" alt="Nest Logo" />
  </a>
</p>

<h1 align="center">GDASH - Desafio técnico</h1>

<p align="center">
  <b>Backend desenvolvido por Lucas Soares Lima usando Clean Architecture e NestJS</b><br/>
  <sub>Focado em desacoplamento, escalabilidade de código e organização por camadas de domínio.</sub>
</p>

### End-Points de User:

| Método   | Endpoint                        | Descrição                      |
| :------- | :------------------------------ | :----------------------------- |
| **POST** | `http://localhost:3333/account` | Cria uma nova conta de usuário |

#### Exemplo de Body:

```json
{
  "name": "johnSnow",
  "userName": "johnSnow_123",
  "email": "johnSnow@gmail.com",
  "password": "123123"
}
```

---

| Método   | Endpoint                             | Descrição                                      |
| :------- | :----------------------------------- | :--------------------------------------------- |
| **POST** | `http://localhost:3333/authenticate` | Autenticação de usuário - Retornando jwt-token |

#### Exemplo de Body:

```json
{
  "email": "johnSnow@gmail.com",
  "password": "123123"
}
```

---

### OBS: Essa rota só pode ser acessada com token

| Método   | Endpoint                               | Descrição       |
| :------- | :------------------------------------- | :-------------- |
| **POST** | `http://localhost:3333/delete/account` | Deletar usuário |

#### Exemplo de Body:

### \_Bearer Token `${SEU_TOKEN}`

```json
{
  "email": "johnSnow@gmail.com"
}
```

---

### OBS: Essa rota só pode ser acessada com token

| Método   | Endpoint                             | Descrição      |
| :------- | :----------------------------------- | :------------- |
| **POST** | `http://localhost:3333/edit/account` | Editar Usuário |

#### Exemplo de Body:

### \_Bearer Token `${SEU_TOKEN}`

```json
{
  "name": "New User",
  "userName": "new_User_123",
  "email": "johnSnow@gmail.com",
  "password": "newPassword"
}
```

---

### End-Points Climate:

| Método   | Endpoint                        | Descrição                          |
| :------- | :------------------------------ | :--------------------------------- |
| **POST** | `http://localhost:3333/climate` | Cria uma novos dados sobre o clima |

#### Exemplo de Body:

```json
{
  "timeStamp": "2025-11-24T10:30:00Z",
  "temperature": 40.5,
  "windSpeed": 12.3,
  "windDirection": "NE",
  "weatherCode": "80"
}
```

---

| Método   | Endpoint                               | Descrição                 |
| :------- | :------------------------------------- | :------------------------ |
| **POST** | `http://localhost:3333/delete/climate` | Deletar dados sobre Clima |

#### Exemplo de Body:

```json
{
  "id": "ID from climate"
}
```

---

### OBS: Essa rota só pode ser acessada com token

### \_Bearer Token `${SEU_TOKEN}`

| Método  | Endpoint                                  | Descrição                  |
| :------ | :---------------------------------------- | :------------------------- |
| **GET** | `http://localhost:3333/get/:page/climate` | Buscar dados com paginação |

---

### OBS: Essa rota só pode ser acessada com token

### \_Bearer Token `${SEU_TOKEN}`

| Método  | Endpoint                                                     | Descrição                          |
| :------ | :----------------------------------------------------------- | :--------------------------------- |
| **GET** | `http://localhost:3333/get/:page/climate/weather/export/csv` | Exportar dados (CSV) com paginação |

---

### OBS: Essa rota só pode ser acessada com token

### \_Bearer Token `${SEU_TOKEN}`

| Método  | Endpoint                                                      | Descrição                           |
| :------ | :------------------------------------------------------------ | :---------------------------------- |
| **GET** | `http://localhost:3333/get/:page/climate/weather/export/xlsx` | Exportar dados (xlsx) com paginação |

---

### OBS: Essa rota só pode ser acessada com token

### \_Bearer Token `${SEU_TOKEN}`

| Método  | Endpoint                                        | Descrição                 |
| :------ | :---------------------------------------------- | :------------------------ |
| **GET** | `http://localhost:3333/get/1/report/AI/climate` | (reports) insights com IA |

## 🧠 Sobre o Projeto

Este projeto implementa um pipeline de coleta e processamento de dados climáticos usando **Python**, **Go**, **RabbitMQ** e uma API **NestJS**.
O Producer em Python consulta periodicamente a API Open-Meteo e envia os dados para uma fila no RabbitMQ.
O Worker em Go consome essas mensagens, converte o formato e envia os dados padronizados para a API Nest.
A API recebe, valida e armazena as informações climáticas para uso posterior.
O sistema é modular, escalável e integra múltiplas linguagens e serviços em um fluxo automatizado de dados.

---

OBS: Para rodar este projeto localmente, você precisa criar um arquivo .env e definir as seguintes variáveis:

```bash
# Gerada no site Oficial MongoDB Atlas
DATABASE_URL → URL de conexão com o banco de dados (utilizando as configurações do MongoDb Atlas).

# Gere as chaves com base no algoritmo (256) para jwt token
JWT_PUBLIC_KEY → Chave pública para assinatura de tokens JWT.

JWT_PRIVATE_KEY → Chave privada para assinatura de tokens JWT.

#Gerada no site oficial de Groq
GROQ_API_KEY → Chave privada para assinatura de tokens JWT.
```

## 🧰 Tecnologias e Ferramentas

- ⚙️ **NestJS** → Framework Node.js modular e escalável.
- 🔐 **Passport** → Middleware de autenticação.
- 🎫 **JWT** → Autenticação via tokens seguros.
- 🧩 **Zod** → Validação e tipagem de dados.
- 🗄️ **Prisma** → ORM moderno para banco de dados.
- 🐳 **Docker** → Containers para ambiente isolado e portátil.
- 🧪 **Vitest** → Testes unitários e de integração.
- 🧠 **Faker.js** → Geração de dados falsos para testes.
- 🔒 **bcryptjs** → Criptografia de senhas.
- 🌐 **GroqAI** → Inteligencia Artificial (Relatório sobre as ultimas atualizações do clima)

---

## 🚀 Configuração do Projeto

```bash
# Instalar dependências
$ npm install

# Rodar o servidor em modo desenvolvimento
$ npm run start:dev

# Build de produção
$ npm run start:prod

# Rodar Testes Unitários
$ npm run test

# Subir Container
$ docker compose up -d
```

## 🚀 Configuração do Projeto (Go + Python)

```bash
sudo apt install rabbitmq-server
sudo systemctl enable rabbitmq-server
sudo systemctl start rabbitmq-server
```

🐍 - Como executar o Producer (Python)
O Producer coleta dados da API Open-Meteo e envia para a fila weather_queue no RabbitMQ.

📦 1. Dependências necessárias

-Instale Python 3 e pip.

-Instale as dependências:

-Crie um requirements.txt com:

```bash
pika
requests

```

-Instale

```bash
pip install -r requirements.txt
```

▶️ Executar o Producer

```bash

python3 producer.py

```

🦫 - Como executar o Worker (Go)
-O Worker consome mensagens enviadas pelo Python e converte o formato para o DTO da API Nest, enviando via HTTP.

📦 - Dependências necessárias

-Instale o Go (versão 1.20 ou superior).

-O Go baixa automaticamente as dependências ao rodar o comando.

▶️ - Executar o Worker

Dentro da pasta do Worker:

```bash
go run main.go
```
