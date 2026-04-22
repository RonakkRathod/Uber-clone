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

## Login User

**Endpoint**
POST api/v1/users/login

**What it does**
Authenticates a user and returns an auth token on success.

### Request Body
Content-Type: application/json

**Example**
```
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Fields**
| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| email | string | Yes | Must be a valid email format |
| password | string | Yes | Min length 6 |

### Success Response
**Status**: 200 OK

```
{
  "statusCode": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User Logged in Successfully"
}
```

### Error Responses
| Status | When it happens |
| --- | --- |
| 400 Bad Request | Validation error (invalid email or password length) |
| 401 Unauthorized | Email and password are required, or password is invalid |
| 404 Not Found | User not found |
| 500 Internal Server Error | Unexpected error while logging in |

## Auth Flow (Token + Profile)

**Summary**
Login creates a JWT token. The client must send that token on every protected request. If no token is sent (or it is expired), `/profile` returns 401.

**Token usage**
- Send as header: `Authorization: Bearer <token>`
- Or send as cookie: `authToken=<token>` (if the client supports cookies)

**/profile behavior**
- Logged in + token included: 200 OK
- Not logged in / missing token / expired token: 401 Unauthorized

**Diagram**
```mermaid
sequenceDiagram
  participant Client
  participant API
  participant DB

  Client->>API: POST /login (email, password)
  API->>DB: find user by email
  DB-->>API: user record
  API->>API: verify password + sign JWT
  API-->>Client: 200 OK + token (cookie/header/JSON)

  Client->>API: GET /profile (token in header or cookie)
  API->>API: verify JWT + attach req.user
  API-->>Client: 200 OK + user profile
```

## Logout User

**Endpoint**
POST api/v1/users/logout

**What it does**
Logs out the current user session by blacklisting the active token and clearing the `authToken` cookie.

### Auth Required
Yes. Send one of the following:
- Header: `Authorization: Bearer <token>`
- Cookie: `authToken=<token>`

### Request Body
No body required.

### Example Request
```
POST /api/v1/users/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Success Response
**Status**: 200 OK

```
{
  "statusCode": 200,
  "data": null,
  "message": "User logged out successfully"
}
```

### Error Responses
| Status | When it happens |
| --- | --- |
| 401 Unauthorized | Missing token, invalid token, expired token, or blacklisted token |
| 500 Internal Server Error | Unexpected error while logging out |

### After Logout
- The token used for logout is stored in blacklist until it expires.
- Any protected route call with that same token returns 401.

## Register Captain

**Endpoint**
POST api/v1/captain/register

**What it does :**
Creates a new captain account with vehicle details and returns a captain auth token on success.

### Request Body
Content-Type: application/json

**Example**
```
{
  "fullName": {
    "firstName": "Ravi",
    "lastName": "Sharma"
  },
  "email": "captain@example.com",
  "password": "secret123",
  "vehicle": {
    "color": "Black",
    "plate": "GJ01AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Fields**
| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| fullName.firstName | string | Yes | Must not be empty |
| fullName.lastName | string | Yes | Must not be empty |
| email | string | Yes | Must be a valid email format |
| password | string | Yes | Minimum 6 characters |
| vehicle.color | string | Yes | Must not be empty |
| vehicle.plate | string | Yes | Must not be empty |
| vehicle.capacity | number | Yes | Must be an integer >= 1 |
| vehicle.vehicleType | string | Yes | Allowed: car, motorcycle, autoRickshaw |

### Success Response
**Status**: 201 Created

```
{
  "statusCode": 200,
  "data": {
    "createdCaptain": {
      "_id": "6620abcd0a0a0a0a0a0a0a0a",
      "fullName": {
        "firstName": "Ravi",
        "lastName": "Sharma"
      },
      "email": "captain@example.com",
      "status": "inactive",
      "vehicle": {
        "color": "Black",
        "plate": "GJ01AB1234",
        "capacity": 4,
        "vehicleType": "car"
      }
    },
    "captainToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Captain Registered Successfully"
}
```

### Error Responses
| Status | When it happens |
| --- | --- |
| 400 Bad Request | Validation error or missing required fields |
| 409 Conflict | Captain with the email already exists |
| 500 Internal Server Error | Unexpected error while registering captain |
