# API de Gestão Escolar

## Estrutura do Projeto

O projeto segue uma arquitetura em camadas, separando as responsabilidades em:

### Controllers

Responsáveis por receber as requisições HTTP, validar o formato dos dados recebidos e repassar para a camada de serviço. Também são responsáveis por formatar a resposta que será enviada ao cliente.

### Services

Camada que contém as regras de negócio da aplicação. Realiza validações, transformações de dados e coordena as operações entre diferentes repositórios quando necessário.

### Repositories

Camada responsável pelo armazenamento e recuperação dos dados. Nesta implementação, os dados são armazenados em memória utilizando arrays, mas esta camada pode ser facilmente modificada para utilizar um banco de dados.

## Regras de Negócio

### Alunos

- Cada aluno deve ter matrícula única
- Campos obrigatórios: matrícula, nome, email e telefone
- A matrícula não pode ser duplicada no sistema

### Turmas

- Formato do semestre deve ser AAAA/S (exemplo: 2025/2)
- Campos obrigatórios: semestre, nome da disciplina, nome do professor e dia da semana
- Uma turma pode ter múltiplos alunos
- Alunos podem ser adicionados ou removidos da turma a qualquer momento

### Aulas

- Toda aula deve estar vinculada a uma turma
- Campos obrigatórios: data, conteúdo
- É obrigatório registrar presença ou falta para todos os alunos da turma
- Não é possível registrar uma aula sem marcar presença para todos os alunos
- As aulas são ordenadas por data ao serem consultadas

### Usuários

- Cada usuário deve ter email único
- Campos obrigatórios: nome completo, email e senha
- Senhas são armazenadas de forma segura utilizando hash e salt
- Autenticação é realizada através de email e senha

## Endpoints da API

### Alunos

- `GET /api/students` - Lista todos os alunos
- `GET /api/students/:id` - Busca um aluno pelo ID
- `GET /api/students/registration/:registration` - Busca um aluno pela matrícula
- `POST /api/students` - Cadastra um novo aluno
- `PUT /api/students/:id` - Atualiza os dados de um aluno
- `DELETE /api/students/:id` - Remove um aluno

### Turmas

- `GET /api/classes` - Lista todas as turmas
- `GET /api/classes/:id` - Busca uma turma pelo ID
- `GET /api/classes/:id/students` - Lista todos os alunos de uma turma
- `POST /api/classes` - Cria uma nova turma
- `POST /api/classes/:id/students` - Adiciona um aluno à turma
- `DELETE /api/classes/:id/students/:studentId` - Remove um aluno da turma
- `PUT /api/classes/:id` - Atualiza os dados de uma turma
- `DELETE /api/classes/:id` - Remove uma turma

### Aulas

- `GET /api/lessons` - Lista todas as aulas
- `GET /api/lessons/:id` - Busca uma aula pelo ID
- `GET /api/lessons/class/:classId` - Lista todas as aulas de uma turma
- `POST /api/lessons` - Registra uma nova aula
- `PUT /api/lessons/:id` - Atualiza os dados de uma aula
- `DELETE /api/lessons/:id` - Remove uma aula

### Usuários

- `GET /api/users` - Lista todos os usuários
- `GET /api/users/:id` - Busca um usuário pelo ID
- `POST /api/users` - Cadastra um novo usuário
- `POST /api/users/auth` - Realiza autenticação do usuário
- `PUT /api/users/:id` - Atualiza os dados de um usuário
- `DELETE /api/users/:id` - Remove um usuário

## Como Executar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor:

```bash
node src/app.js
```

O servidor será iniciado na porta 3000.

# Testando a API

importe o arquivo de collection do Postman, presente no projeto, para testar a API. Caso prefira, defina a variável da collection **api_url** para o serviço hospeadado no **Render**:

```
https://dev-apis-senac.onrender.com
```
