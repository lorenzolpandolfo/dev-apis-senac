# Exemplos de Requisições para a API de Gestão Escolar

Este documento contém exemplos de requisições CURL para todos os endpoints da API.

## Usuários

### Listar Todos os Usuários

```bash
curl -X GET http://localhost:3000/api/users
```

### Buscar Usuário por ID

```bash
curl -X GET http://localhost:3000/api/users/1
```

### Criar Novo Usuário

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "João da Silva",
    "email": "joao.silva@email.com",
    "password": "senha123"
  }'
```

### Autenticar Usuário

```bash
curl -X POST http://localhost:3000/api/users/auth \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao.silva@email.com",
    "password": "senha123"
  }'
```

### Atualizar Usuário

```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "João Silva Santos",
    "email": "joao.silva.santos@email.com"
  }'
```

### Deletar Usuário

```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## Alunos

### Listar Todos os Alunos

```bash
curl -X GET http://localhost:3000/api/students
```

### Buscar Aluno por ID

```bash
curl -X GET http://localhost:3000/api/students/1
```

### Buscar Aluno por Matrícula

```bash
curl -X GET http://localhost:3000/api/students/registration/2025001
```

### Criar Novo Aluno

```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "registration": "2025001",
    "name": "Maria Santos",
    "email": "maria.santos@email.com",
    "phone": "(11) 98765-4321"
  }'
```

### Atualizar Aluno

```bash
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Santos Silva",
    "phone": "(11) 98765-9876"
  }'
```

### Deletar Aluno

```bash
curl -X DELETE http://localhost:3000/api/students/1
```

## Turmas

### Listar Todas as Turmas

```bash
curl -X GET http://localhost:3000/api/classes
```

### Buscar Turma por ID

```bash
curl -X GET http://localhost:3000/api/classes/1
```

### Listar Alunos de uma Turma

```bash
curl -X GET http://localhost:3000/api/classes/1/students
```

### Criar Nova Turma

```bash
curl -X POST http://localhost:3000/api/classes \
  -H "Content-Type: application/json" \
  -d '{
    "semester": "2025/2",
    "courseName": "Programação Web",
    "teacherName": "Pedro Oliveira",
    "weekDay": "Segunda-feira"
  }'
```

### Adicionar Aluno à Turma

```bash
curl -X POST http://localhost:3000/api/classes/1/students \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1
  }'
```

### Remover Aluno da Turma

```bash
curl -X DELETE http://localhost:3000/api/classes/1/students/1
```

### Atualizar Turma

```bash
curl -X PUT http://localhost:3000/api/classes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "teacherName": "Carlos Souza",
    "weekDay": "Terça-feira"
  }'
```

### Deletar Turma

```bash
curl -X DELETE http://localhost:3000/api/classes/1
```

## Aulas

### Listar Todas as Aulas

```bash
curl -X GET http://localhost:3000/api/lessons
```

### Buscar Aula por ID

```bash
curl -X GET http://localhost:3000/api/lessons/1
```

### Listar Aulas de uma Turma

```bash
curl -X GET http://localhost:3000/api/lessons/class/1
```

### Registrar Nova Aula

```bash
curl -X POST http://localhost:3000/api/lessons \
  -H "Content-Type: application/json" \
  -d '{
    "classId": 1,
    "date": "2025-10-27",
    "content": "Introdução a APIs REST",
    "attendance": [
      {"studentId": 1, "present": true},
      {"studentId": 2, "present": true},
      {"studentId": 3, "present": false}
    ]
  }'
```

### Atualizar Aula

```bash
curl -X PUT http://localhost:3000/api/lessons/1 \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Introdução a APIs REST e HTTP",
    "attendance": [
      {"studentId": 1, "present": true},
      {"studentId": 2, "present": false},
      {"studentId": 3, "present": true}
    ]
  }'
```

### Deletar Aula

```bash
curl -X DELETE http://localhost:3000/api/lessons/1
```

## Exemplos de Cenários Completos

### Cenário 1: Criar Turma e Adicionar Alunos

1. Criar uma turma nova:

```bash
curl -X POST http://localhost:3000/api/classes \
  -H "Content-Type: application/json" \
  -d '{
    "semester": "2025/2",
    "courseName": "Desenvolvimento Web",
    "teacherName": "Ana Silva",
    "weekDay": "Quarta-feira"
  }'
```

2. Cadastrar alunos:

```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "registration": "2025001",
    "name": "João Santos",
    "email": "joao@email.com",
    "phone": "(11) 98765-4321"
  }'
```

3. Adicionar alunos à turma:

```bash
curl -X POST http://localhost:3000/api/classes/1/students \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1
  }'
```

### Cenário 2: Registrar Aula com Presença

1. Registrar uma aula nova:

```bash
curl -X POST http://localhost:3000/api/lessons \
  -H "Content-Type: application/json" \
  -d '{
    "classId": 1,
    "date": "2025-10-27",
    "content": "Introdução ao Express.js",
    "attendance": [
      {"studentId": 1, "present": true},
      {"studentId": 2, "present": true},
      {"studentId": 3, "present": false}
    ]
  }'
```

2. Consultar aulas da turma:

```bash
curl -X GET http://localhost:3000/api/lessons/class/1
```

### Cenário 3: Autenticação e Atualização de Usuário

1. Criar um usuário:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Carlos Eduardo",
    "email": "carlos@email.com",
    "password": "senha123"
  }'
```

2. Autenticar:

```bash
curl -X POST http://localhost:3000/api/users/auth \
  -H "Content-Type: application/json" \
  -d '{
    "email": "carlos@email.com",
    "password": "senha123"
  }'
```

3. Atualizar dados:

```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Carlos Eduardo Silva",
    "password": "novaSenha123"
  }'
```
