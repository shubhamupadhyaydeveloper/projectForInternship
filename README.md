
# ProjectForInternship


## Tech Stack

**Client:** React , Redux , Chakra-ui  , React-Query , React-hook-form

**Server:** Node, Express , Mongodb 


## API Reference

#### USERS API

```http
  GET /api/users: Retrieve all users with pagination support.
  GET /api/users/:id: Retrieve a specific user by ID.
  POST /api/users: Create a new user.
  PUT /api/users/:id: Update an existing user.
  DELETE /api/users/:id: Delete a user.
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required** userId get user info | 
| `id` | `string` | **Required** userId for update |
| `id` | `string` | **Required** userId for delete user |

#### Team API

```http
  POST /api/team: Create a new team by selecting users
  GET /api/team/:id: Retrieve the details of a specific team by ID.

```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` | **Required** Post Id for find Team | 


