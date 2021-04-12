# Kanban App API Documentation

## RESTful endpoints

### POST /users/register

> Create a new user

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (201 - OK)_

```
{
  "msg": "Register success",
  "id": 1,
  "email": "nyoman.adi16@gmail.com",
  "username": "nyomanadi16"
}
```

_Response (400 - Bad Request)_

```
{
  "msg": "Invalid email format"
}
```

```
{
  "msg": "Email already registered"
}
```

```
{
  "msg": "Password must be at least contain a capital letter, a number or symbol, and minimum of 6 characters"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### POST /users/login

> Create access token and login for existing user

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (200 - OK)_

```
{
  "id": 1,
  "email": "nyoman.adi16@gmail.com",
  "username": "nyomanadi16",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE2MTU0OTMxOTZ9.A2owgYyENmqO8jp15Zwcyh0Iua4VQ5zQDzJ1F7fvG2Y"
}
```

_Response (400 - Bad Request)_

```
{
  "msg": "Invalid Email or Password"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### PATCH /users/:id

> change username for logged-in user

```
{
  "id": <your id>
}
```

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "username": "<your input username>"
}
```

_Response (200 - OK)_

```
[
  1,
  [
    {
      "id": 1,
      "email": "nyoman.adi16@gmail.com",
      "password": "$2a$10$leMlpBZwMcVfy7UKZ8fEPelWRawQqaJYT9SYd4tBD5LOwAk2FMnLu",
      "username": "new username",
      "createdAt": "2021-03-12T22:52:40.800Z",
      "updatedAt": "2021-03-12T22:53:37.185Z"
    }
  ]
]
```

_Response (400 - Bad Request)_

```
{
  "msg": "Input username should not be empty"
}
```

_Response (404 - Not Found)_

```
{
  "msg": "id not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### POST /users/googlelogin

> login with google account

_Request Header_

```
not needed
```

_Request Body_

```
{
  "googleToken": "<your id_token>"
}
```

_Response (200 - OK)_

```
{
  "id": 1,
  "email": "nyoman.adi16@gmail.com",
  "username": "nyomanadi16",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE2MTU0OTMxOTZ9.A2owgYyENmqO8jp15Zwcyh0Iua4VQ5zQDzJ1F7fvG2Y"
}
```

_Response (201 - Created)_

```
{
  "id": 1,
  "email": "nyoman.adi16@gmail.com",
  "username": "nyomanadi16",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE2MTU0OTMxOTZ9.A2owgYyENmqO8jp15Zwcyh0Iua4VQ5zQDzJ1F7fvG2Y"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### POST /categories

> create a new category

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "name": "<your input name>"
}
```

_Response (201 - Created)_

```
{
    "id": 1,
    "name": "Backlog",
    "updatedAt": "2021-03-12T23:02:37.250Z",
    "createdAt": "2021-03-12T23:02:37.250Z"
}
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### GET /categories

> get all category name

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
  {
    "id": 1,
    "name": "Backlog",
    "createdAt": "2021-03-12T22:05:05.842Z",
    "updatedAt": "2021-03-12T22:05:05.842Z"
  },
  {
    "id": 2,
    "name": "Todo",
    "createdAt": "2021-03-12T22:05:05.842Z",
    "updatedAt": "2021-03-12T22:05:05.842Z"
  },
  {
    "id": 3,
    "name": "Doing",
    "createdAt": "2021-03-12T22:05:05.842Z",
    "updatedAt": "2021-03-12T22:05:05.842Z"
  },
  {
    "id": 4,
    "name": "Finished",
    "createdAt": "2021-03-12T22:05:05.842Z",
    "updatedAt": "2021-03-12T22:05:05.842Z"
  },
]
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### DELETE /categories/:id

> delete category by id

_Request Params_

```
{
  "id": <your id>
}
```

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
  "msg": "Category deleted"
}
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

```
{
  "msg": "not authorized"
}
```

_Response (404 - Not Found)_

```
{
  "msg": "id not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### POST /tasks

> create a new task for currently login user

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "title": "<your input title>",
  "CategoryId": <your Category Id>,
  "UserId": <your User Id>
}
```

_Response (201 - Created)_

```
{
    "id": 1,
    "title": "create api doc",
    "CategoryId": 1,
    "UserId": 1,
    "updatedAt": "2021-03-12T23:07:38.160Z",
    "createdAt": "2021-03-12T23:07:38.160Z"
}
```

_Response (400 - Bad Request)_

```
{
  "msg": "Input title should not be empty"
}
```

```
{
  "msg": "CategoryId input must be integer"
}
```

```
{
  "msg": "UserId input must be integer"
}
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### GET /tasks

> get all tasks

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
  {
    "id": 1,
    "title": "create api doc",
    "CategoryId": 1,
    "UserId": 1,
    "createdAt": "2021-03-12T22:07:11.783Z",
    "updatedAt": "2021-03-12T22:08:27.797Z",
    "User": {
      "id": 1,
      "email": "nyoman.adi16@gmail.com",
      "password": "$2a$10$8vPAQ77.uSe/SPZh8ZvJ.udd9sJW/dJxYqMUZX25BWoHIY1DfElyu",
      "username": "nyomanadi16",
      "createdAt": "2021-03-12T22:07:02.293Z",
      "updatedAt": "2021-03-12T22:07:02.293Z"
    },
    "Category": {
      "id": 1,
      "name": "Backlog",
      "createdAt": "2021-03-12T22:05:05.842Z",
      "updatedAt": "2021-03-12T22:05:05.842Z"
    }
  }
]
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### PUT /tasks/:id

> edit all field of task for currently login user

_Request Params_

```
{
  "id": <id to get insert into>
}
```

_Request Header_

```

{
"access_token": "<your access token>"
}

```

_Request Body_

```
{
  "title": "<your input title>",
  "CategoryId": <your Category Id>,
  "UserId": <your User Id>
}
```

_Response (200 - OK)_

```
[
  1,
  [
    {
    "id": 1,
    "title": "create api doc",
    "CategoryId": 1,
    "UserId": 1,
    "updatedAt": "2021-03-12T23:07:38.160Z",
    "createdAt": "2021-03-12T23:07:38.160Z"
}
  ]
]
```

_Response (400 - Bad Request)_

```
{
  "msg": "CategoryId input must be integer"
}
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

```
{
  "msg": "not authorized"
}
```

_Response (404 - Not Found)_

```
{
  "msg": "id not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### PATCH /tasks/:id

> change CategoryId of a task for currently login user

_Request Params_

```
{
  "id": <id to get insert into>
}
```

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "CategoryId": <your CategoryId input>
}
```

_Response (200 - OK)_

```
[
  1,
  [
    {
      "id": 1,
      "title": "learn",
      "CategoryId": 3,
      "UserId": 1,
      "createdAt": "2021-03-12T23:28:19.949Z",
      "updatedAt": "2021-03-12T23:40:30.543Z"
    }
  ]
]
```

_Response (400 - Bad Request)_

```
{
  "msg": "CategoryId input must be integer"
}
```

_Response (401 - Unauthorized)_

```
{
  "msg": "invalid token"
}
```

```
{
  "msg": "not authorized"
}
```

_Response (404 - Not Found)_

```
{
  "msg": "id not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```

---

### DELETE /tasks/:id

> delete task by id for currently login user

_Request Params_

```
{
  "id": <id to get insert into>
}
```

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
  "msg": "task deleted"
}
```

_Response (401 - Unauthorized)_

```
{
  "msg": "not authorized"
}
```

```
{
  "msg": "invalid token"
}
```

_Response (404 - Not Found)_

```
{
  "msg": "id not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "msg": "Internal Server Error"
}
```
