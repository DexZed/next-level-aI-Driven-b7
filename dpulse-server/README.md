
# Dpulse

"Service as a Service" platform to track, issue, request ; bugs and features.

## 🔗 Links
Url: https://umbrella-corporation.onrender.com


## Tech Stack



**Server:** Node, Express, Typescript, PostgresSQL, Bcrypt, Json Web Token and Zod


## Features

- CRUD based RestApi
- Authentication and Authorization
- Relational Detabase
- CORS compliant


## Installation

Install Dpulse with npm


```bash
  git clone https://github.com/DexZed/next-level-aI-Driven-b7/tree/main/dpulse-server

  cd my-project

  npm install my-project
```
## Schema Design

### `users`

| Field | Description |
| --- | --- |
| `id` | Number, auto-incrementing unique identifier|
| `name` | Username Varchar(255), required|
| `email` | Email, Varchar(255) unique and required|
| `password` | Text, required |
| `role` | Enum `contributor` or `maintainer` |
| `created_at` | Timestamp |
| `updated_at` | Timestamp |

### `issues`

| Field | Description |
| --- | --- |
| `id` | Number, auto-incrementing unique identifier |
| `title` | Varchar(150), required|
| `description` | Text, minimum 20 characters, required|
| `type` | Enum `bug` or `feature_request` |
| `status` | Enum `open`, `in_progress`, `resolved` |
| `reporter_id` | Number, references `users.id` at application level|
| `created_at` | Timestamp  |
| `updated_at` | Timestamp  |
## API Reference

#### Create User

```http
  `POST /api/auth/signup`
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user` | `object` | creates user data |

#### Login

```http
  `POST /api/auth/login`
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user`   | `object` | logs the user in and sends a token |

#### Login

```http
  `POST /api/issues`
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user`   | `object` | logs the user in and sends a token |

#### Create Issue
```http
  `POST /api/issues`
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`   | `token` | Json Web Token|


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `issue`   | `object` | creates an issue|



#### Gets All Issues

```http
  `GET /api/issues?sort=[value | newest]&type=[value | none]&status=[value | none]`

```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`   | `none` | Retrieves all issues based on query parameters. Defaults to sort=newest. Sort = newest,oldest, type = bug, feature_request, status = open, in_progress, resolved                       |

#### Get Single Issue


```http
  `GET /api/issues/:id`
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `number` | Retrieves single issue|

#### Update Issue
```http
  `PATCH /api/issues/:id`
```
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`   | `token` | Json Web Token|


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `number` | Issue Id|
| `payload`   | `object` | Issue Body|

#### Delete Issue

```http
  `DELETE /api/issues/:id`
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`   | `token` | Json Web Token|


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `number` | Issue Id|

