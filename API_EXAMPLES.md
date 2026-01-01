# API Examples

This document shows sample API requests and responses for testing.

## Base URL
All API endpoints start with: `http://127.0.0.1:8000/api/`

## Authentication

Most endpoints require authentication. Include the token in the request header:
```
Authorization: Token <your-token-here>
```

## 1. Register User

**Request:**
```bash
POST /api/register/
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Response (201 Created):**
```json
{
  "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b",
  "user_id": 1,
  "username": "john_doe",
  "message": "User registered successfully"
}
```

## 2. Login

**Request:**
```bash
POST /api/login/
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepass123"
}
```

**Response (200 OK):**
```json
{
  "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b",
  "user_id": 1,
  "username": "john_doe",
  "message": "Login successful"
}
```

## 3. Get All Food Items

**Request:**
```bash
GET /api/foods/
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Margherita Pizza",
    "description": "Classic pizza with tomato sauce, mozzarella cheese, and fresh basil",
    "price": "12.99",
    "image": "/media/food_images/pizza.jpg",
    "created_at": "2024-01-15T10:30:00Z"
  },
  {
    "id": 2,
    "name": "Pepperoni Pizza",
    "description": "Delicious pizza topped with pepperoni and mozzarella cheese",
    "price": "14.99",
    "image": "/media/food_images/pepperoni.jpg",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

## 4. Get Cart (Requires Auth)

**Request:**
```bash
GET /api/cart/
Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```

**Response (200 OK):**
```json
{
  "items": [
    {
      "id": 1,
      "food": {
        "id": 1,
        "name": "Margherita Pizza",
        "description": "Classic pizza with tomato sauce...",
        "price": "12.99",
        "image": "/media/food_images/pizza.jpg",
        "created_at": "2024-01-15T10:30:00Z"
      },
      "food_id": 1,
      "quantity": 2,
      "created_at": "2024-01-15T11:00:00Z"
    }
  ],
  "total": 25.98
}
```

## 5. Add to Cart (Requires Auth)

**Request:**
```bash
POST /api/cart/add/
Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
Content-Type: application/json

{
  "food_id": 1,
  "quantity": 2
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "food": {
    "id": 1,
    "name": "Margherita Pizza",
    "description": "Classic pizza with tomato sauce...",
    "price": "12.99",
    "image": "/media/food_images/pizza.jpg",
    "created_at": "2024-01-15T10:30:00Z"
  },
  "food_id": 1,
  "quantity": 2,
  "created_at": "2024-01-15T11:00:00Z"
}
```

## 6. Update Cart Item (Requires Auth)

**Request:**
```bash
PUT /api/cart/update/1/
Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
Content-Type: application/json

{
  "quantity": 3
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "food": {
    "id": 1,
    "name": "Margherita Pizza",
    "description": "Classic pizza with tomato sauce...",
    "price": "12.99",
    "image": "/media/food_images/pizza.jpg",
    "created_at": "2024-01-15T10:30:00Z"
  },
  "food_id": 1,
  "quantity": 3,
  "created_at": "2024-01-15T11:00:00Z"
}
```

## 7. Remove from Cart (Requires Auth)

**Request:**
```bash
DELETE /api/cart/update/1/
Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```

**Response (204 No Content):**
```
(empty body)
```

## 8. Create Order (Requires Auth)

**Request:**
```bash
POST /api/order/create/
Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```

**Response (201 Created):**
```json
{
  "id": 1,
  "user": 1,
  "total_price": "38.97",
  "created_at": "2024-01-15T12:00:00Z",
  "items": [
    {
      "id": 1,
      "food": {
        "id": 1,
        "name": "Margherita Pizza",
        "description": "Classic pizza with tomato sauce...",
        "price": "12.99",
        "image": "/media/food_images/pizza.jpg",
        "created_at": "2024-01-15T10:30:00Z"
      },
      "quantity": 2,
      "price": "12.99"
    },
    {
      "id": 2,
      "food": {
        "id": 3,
        "name": "Caesar Salad",
        "description": "Fresh romaine lettuce...",
        "price": "9.99",
        "image": "/media/food_images/salad.jpg",
        "created_at": "2024-01-15T10:30:00Z"
      },
      "quantity": 1,
      "price": "9.99"
    }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Username and password required"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid username or password"
}
```

### 404 Not Found
```json
{
  "error": "Food item not found"
}
```

## Testing with cURL

### Register
```bash
curl -X POST http://127.0.0.1:8000/api/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"test123"}'
```

### Login
```bash
curl -X POST http://127.0.0.1:8000/api/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
```

### Get Foods
```bash
curl http://127.0.0.1:8000/api/foods/
```

### Add to Cart (replace TOKEN with actual token)
```bash
curl -X POST http://127.0.0.1:8000/api/cart/add/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Token YOUR_TOKEN_HERE" \
  -d '{"food_id":1,"quantity":2}'
```

### Get Cart
```bash
curl http://127.0.0.1:8000/api/cart/ \
  -H "Authorization: Token YOUR_TOKEN_HERE"
```

### Create Order
```bash
curl -X POST http://127.0.0.1:8000/api/order/create/ \
  -H "Authorization: Token YOUR_TOKEN_HERE"
```

## Testing with Postman

1. Import the collection (if available) or create requests manually
2. For authenticated endpoints, add the token in the "Authorization" tab:
   - Type: Token
   - Token: `<your-token>`
3. Set Content-Type to `application/json` in headers for POST/PUT requests











