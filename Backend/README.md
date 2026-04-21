# Backend API Notes

## Register User

**Endpoint**
POST api/v1/users/register

**What it does**
Creates a new user account and returns an auth token on success.

### Request Body
Content-Type: application/json

**Example**
```
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "password": "secret123"
}
```

**Fields**
| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| fullName.firstName | string | Yes | Must not be empty; min length 3 |
| fullName.lastName | string | Yes | Must not be empty; min length 3 |
| email | string | Yes | Must be a valid email format |
| password | string | Yes | Min length 6 |

### Success Response
**Status**: 201 Created

```
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "661f2d2b0a0a0a0a0a0a0a0a",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john@example.com",
      "socketId": null,
      "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User Registered Successfully"
}
```

### Error Responses
| Status | When it happens |
| --- | --- |
| 400 Bad Request | Validation error or missing/empty fields |
| 409 Conflict | User with the email already exists |
| 500 Internal Server Error | Unexpected error while registering user |
