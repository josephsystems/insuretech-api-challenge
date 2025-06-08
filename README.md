# Insuretech API Challenge

This project is a NestJS-based API that allows users to buy insurance plans and activate policies.

## Project Setup

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=insuretech_db
PORT=3000
```

### Database Setup

This project uses PostgreSQL as its database. Make sure you have PostgreSQL installed and running on your system.

1. Create a new PostgreSQL database with the name specified in your environment variables (`POSTGRES_DB`).
2. The application will automatically create the necessary tables when it first runs, thanks to TypeORM's synchronization feature.

### Seeder

The project includes a seeder that creates default users with wallets and insurance products:

- **Users**: Two default users are created with wallets:
  - John Doe (john.doe@example.com) with 10,000 NGN (1,000,000 Kobo)
  - Jane Smith (jane.smith@example.com) with 20,000 NGN (2,000,000 Kobo)

- **Products**: Four default insurance products are created:
  - Optimal care mini (Health) - 10,000 NGN (1,000,000 Kobo)
  - Optimal care standard (Health) - 20,000 NGN (2,000,000 Kobo)
  - Third-party Auto Insurance - 5,000 NGN (500,000 Kobo)
  - Comprehensive Auto Insurance - 15,000 NGN (1,500,000 Kobo)

## Project Startup

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Run the Application

Development mode:
```bash
npm run start:dev
# or
yarn start:dev
```


### Run the Seeder

```bash
npm run seed
# or
yarn seed
```

### Database Synchronization

The application uses TypeORM's `synchronize: true` setting, which means database tables are automatically created/altered based on entity definitions. In production, this should be set to `false` and proper migrations should be used.

## Authentication

As per the requirements, this API does not implement authentication. Instead, it uses a `userId` query parameter to identify users when required.

### Default Users

The seeder creates two default users:

1. **John Doe**
   - ID: 1
   - Email: john.doe@example.com
   - Wallet: 10,000 NGN (1,000,000 Kobo)

2. **Jane Smith**
   - ID: 2
   - Email: jane.smith@example.com
   - Wallet: 20,000 NGN (2,000,000 Kobo)

> Note: Wallet values are stored in Kobo (100 Kobo = 1 Naira)

## API Documentation

All endpoints are prefixed with `/api/v1`.

### Products API

#### List all insurance products

```
GET /api/v1/products
```

Query Parameters:
- `category` (optional): Filter by product category (HEALTH, AUTO, etc.)
- `minPrice` (optional): Minimum price in NGN
- `maxPrice` (optional): Maximum price in NGN

Response:
```json
{
  "message": "Successfully retrieved products",
  "result": [
    {
      "id": 1,
      "name": "Optimal care mini",
      "description": "",
      "price": 10000,
      "currency": "NGN",
      "category": "HEALTH",
      "createdAt": "2023-08-01T10:00:00.000Z",
      "updatedAt": "2023-08-01T10:00:00.000Z"
    },
    // ...more products
  ]
}
```

#### Get a specific product

```
GET /api/v1/products/:id
```

Response:
```json
{
  "message": "Product successfully retrieved",
  "result": {
    "id": 1,
    "name": "Optimal care mini",
    "description": "",
    "price": 10000,
    "currency": "NGN",
    "category": "HEALTH",
    "createdAt": "2023-08-01T10:00:00.000Z",
    "updatedAt": "2023-08-01T10:00:00.000Z"
  }
}
```

### Plans API

#### Purchase a new insurance plan

```
POST /api/v1/plans
```

Query Parameters:
- `userId` (required): ID of the user purchasing the plan

Request Body:
```json
{
  "productId": 1,
  "quantity": 1
}
```

Response:
```json
{
    "message": "Plan created successfully",
    "result": {
        "id": 1,
        "createdAt": "2025-06-08T16:56:29.902Z",
        "updatedAt": "2025-06-08T16:56:29.902Z",
        "quantity": 1,
        "product": {
            "id": 1,
            "createdAt": "2025-06-08T16:47:13.242Z",
            "updatedAt": "2025-06-08T16:47:13.242Z",
            "category": "health",
            "name": "Optimal care mini",
            "price": "10000.00",
            "description": "",
            "currency": "NGN",
            "priceKobo": 1000000
        },
        "user": {
            "id": 1,
            "createdAt": "2025-06-08T16:47:13.225Z",
            "updatedAt": "2025-06-08T16:56:29.902Z",
            "email": "john.doe@example.com",
            "firstName": "John",
            "lastName": "Doe",
            "wallet": 0
        },
        "pendingPolicies": [
            {
                "id": 1,
                "createdAt": "2025-06-08T16:56:29.902Z",
                "updatedAt": "2025-06-08T16:56:29.902Z",
                "status": "unused"
            }
        ],
        "totalPrice": "10000.00",
        "totalPriceKobo": 1000000
    }
}
```

#### List all plans for a user

```
GET /api/v1/plans
```

Query Parameters:
- `userId` (required): ID of the user

Response:
```json
{
    "message": "Plans fetched successfully",
    "result": [
        {
            "id": 7,
            "createdAt": "2025-06-08T16:56:29.902Z",
            "updatedAt": "2025-06-08T16:56:29.902Z",
            "quantity": 1,
            "product": {
                "id": 13,
                "createdAt": "2025-06-08T16:47:13.242Z",
                "updatedAt": "2025-06-08T16:47:13.242Z",
                "category": "health",
                "name": "Optimal care mini",
                "price": "10000.00",
                "description": "",
                "currency": "NGN",
                "priceKobo": 1000000
            },
            "user": {
                "id": 5,
                "createdAt": "2025-06-08T16:47:13.225Z",
                "updatedAt": "2025-06-08T16:56:29.902Z",
                "email": "john.doe@example.com",
                "firstName": "John",
                "lastName": "Doe",
                "wallet": 0
            },
            "pendingPolicies": [
                {
                    "id": 7,
                    "createdAt": "2025-06-08T16:56:29.902Z",
                    "updatedAt": "2025-06-08T16:56:29.902Z",
                    "status": "unused"
                }
            ],
            "totalPrice": "10000.00",
            "totalPriceKobo": 1000000
        }
      // ..more plans
    ]
}
```

#### Get details of a specific plan

```
GET /api/v1/plans/:id
```

Query Parameters:
- `userId` (required): ID of the user

Response:
```json
{
    "message": "Plan retrieved successfully",
    "result": {
        "id": 1,
        "createdAt": "2025-06-08T16:56:29.902Z",
        "updatedAt": "2025-06-08T16:56:29.902Z",
        "quantity": 1,
        "product": {
            "id": 1,
            "createdAt": "2025-06-08T16:47:13.242Z",
            "updatedAt": "2025-06-08T16:47:13.242Z",
            "category": "health",
            "name": "Optimal care mini",
            "price": "10000.00",
            "description": "",
            "currency": "NGN",
            "priceKobo": 1000000
        },
        "user": {
            "id": 1,
            "createdAt": "2025-06-08T16:47:13.225Z",
            "updatedAt": "2025-06-08T16:56:29.902Z",
            "email": "john.doe@example.com",
            "firstName": "John",
            "lastName": "Doe",
            "wallet": 0
        },
        "pendingPolicies": [
            {
                "id": 1,
                "createdAt": "2025-06-08T16:56:29.902Z",
                "updatedAt": "2025-06-08T16:56:29.902Z",
                "status": "unused"
            }
        ],
        "totalPrice": "10000.00",
        "totalPriceKobo": 1000000
    }
}
```

### Pending Policies API

#### List all pending policies for a user

```
GET /api/v1/pending-policies
```

Query Parameters:
- `userId` (required): ID of the user

Response:
```json
{
    "message": "Pending policies fetched successfully",
    "result": [
        {
            "id": 1,
            "createdAt": "2025-06-08T16:56:29.902Z",
            "updatedAt": "2025-06-08T16:56:29.902Z",
            "status": "unused",
            "plan": {
                "id": 7,
                "createdAt": "2025-06-08T16:56:29.902Z",
                "updatedAt": "2025-06-08T16:56:29.902Z",
                "quantity": 1,
                "product": {
                    "id": 13,
                    "createdAt": "2025-06-08T16:47:13.242Z",
                    "updatedAt": "2025-06-08T16:47:13.242Z",
                    "category": "health",
                    "name": "Optimal care mini",
                    "price": 1000000,
                    "description": "",
                    "currency": "NGN"
                },
                "user": {
                    "id": 5,
                    "createdAt": "2025-06-08T16:47:13.225Z",
                    "updatedAt": "2025-06-08T16:56:29.902Z",
                    "email": "john.doe@example.com",
                    "firstName": "John",
                    "lastName": "Doe",
                    "wallet": 0
                }
            }
        }
    ]
}
```

#### Get details of a specific pending policy

```
GET /api/v1/pending-policies/:id
```

Query Parameters:
- `userId` (required): ID of the user

Response:
```json
{
    "message": "Pending policy fetched successfully",
    "result": {
        "id": 7,
        "createdAt": "2025-06-08T16:56:29.902Z",
        "updatedAt": "2025-06-08T16:56:29.902Z",
        "status": "unused",
        "plan": {
            "id": 7,
            "createdAt": "2025-06-08T16:56:29.902Z",
            "updatedAt": "2025-06-08T16:56:29.902Z",
            "quantity": 1,
            "product": {
                "id": 13,
                "createdAt": "2025-06-08T16:47:13.242Z",
                "updatedAt": "2025-06-08T16:47:13.242Z",
                "category": "health",
                "name": "Optimal care mini",
                "price": 1000000,
                "description": "",
                "currency": "NGN"
            },
            "user": {
                "id": 5,
                "createdAt": "2025-06-08T16:47:13.225Z",
                "updatedAt": "2025-06-08T16:56:29.902Z",
                "email": "john.doe@example.com",
                "firstName": "John",
                "lastName": "Doe",
                "wallet": 0
            }
        },
        "product": {
            "id": 13,
            "createdAt": "2025-06-08T16:47:13.242Z",
            "updatedAt": "2025-06-08T16:47:13.242Z",
            "category": "health",
            "name": "Optimal care mini",
            "price": 1000000,
            "description": "",
            "currency": "NGN"
        }
    }
}
```

#### Activate a pending policy

```
POST /api/v1/pending-policies/:id/activate
```

Query Parameters:
- `userId` (required): ID of the user

Request Body:
```json
{
  "beneficiaryEmail": "john.doe@example.com"
}
```

Response:
```json
{
    "message": "Pending policy activated successfully",
    "result": {
        "id": 4,
        "createdAt": "2025-06-08T17:00:12.089Z",
        "updatedAt": "2025-06-08T17:00:12.089Z",
        "beneficiaryEmail": "john.doe@example.com",
        "product": {
            "id": 13,
            "createdAt": "2025-06-08T16:47:13.242Z",
            "updatedAt": "2025-06-08T16:47:13.242Z",
            "category": "health",
            "name": "Optimal care mini",
            "price": 1000000,
            "description": "",
            "currency": "NGN"
        },
        "user": {
            "id": 5,
            "createdAt": "2025-06-08T16:47:13.225Z",
            "updatedAt": "2025-06-08T16:56:29.902Z",
            "email": "john.doe@example.com",
            "firstName": "John",
            "lastName": "Doe",
            "wallet": 0
        },
        "pendingPolicy": {
            "id": 7,
            "createdAt": "2025-06-08T16:56:29.902Z",
            "updatedAt": "2025-06-08T17:00:12.089Z",
            "status": "used"
        }
    }
}
```

### Policies API

#### List all activated policies

```
GET /api/v1/policies
```

Query Parameters:
- `userId` (required): ID of the user
- `beneficiaryEmail` (optional | Boolean): Filter by beneficiary email
- `mine` (optional | Boolean): Filter by user that created the policy

Response:
```json
{
    "message": "Policies fetched successfully",
    "policies": [
        {
            "id": 4,
            "createdAt": "2025-06-08T17:00:12.089Z",
            "updatedAt": "2025-06-08T17:00:12.089Z",
            "beneficiaryEmail": "john.doe@example.com",
            "product": {
                "id": 1,
                "createdAt": "2025-06-08T16:47:13.242Z",
                "updatedAt": "2025-06-08T16:47:13.242Z",
                "category": "health",
                "name": "Optimal care mini",
                "price": 1000000,
                "description": "",
                "currency": "NGN"
            },
            "user": {
                "id": 1,
                "createdAt": "2025-06-08T16:47:13.225Z",
                "updatedAt": "2025-06-08T16:56:29.902Z",
                "email": "john.doe@example.com",
                "firstName": "John",
                "lastName": "Doe",
                "wallet": 0
            }
        }
    ]
}
```

#### Get details of a specific policy

```
GET /api/v1/policies/:id
```

Query Parameters:
- `userId` (required): ID of the user

Response:
```json
{
  "message": "Policy fetched successfully",
  "policy": {
    "id": 1,
    "startDate": "2023-08-01T00:00:00.000Z",
    "endDate": "2024-08-01T00:00:00.000Z", 
    "planId": 1,
    "pendingPolicyId": 1,
    "userId": 1,
    "createdAt": "2023-08-01T10:00:00.000Z",
    "updatedAt": "2023-08-01T10:00:00.000Z"
  }
}
```

## Additional Information

### Business Rules

1. The wallet is deducted based on the product price × quantity when purchasing a plan.
2. One beneficiary can have only one policy per product.
3. The API follows a workflow where:
   - User purchases a plan
   - A pending policy is automatically created
   - User activates the pending policy to create an active policy

### Relationship Flow

1. **User** purchases a **Product** by creating a **Plan**
2. A **Plan** automatically creates a **Pending Policy**
3. User activates a **Pending Policy** to create an **Policy**

All monetary values in the API are stored in Kobo (100 Kobo = 1 Naira) for precision, but are displayed in Naira in the API responses.
