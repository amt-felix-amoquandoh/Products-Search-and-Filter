# Travel Booking Server

Welcome to the Travel Booking Server! This server provides backend functionality for managing travel bookings and related tasks.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Installation](#installation)>>>>>>> 74cb394 (add README.md to server directory)
- [Configuration](#configuration)
- [Routes](#routes)
- [Environment Variables](#environment-variables)
- [License](#license)

## Introduction

The Travel Booking Server is built to handle the backend requirements of a travel booking application. It provides endpoints for user authentication, managing bookings, searching for available accommodations, and more.


## Getting Started

To get started with the server, follow these steps:

1. Clone the repository and navigate to the project directory.
2. Install dependencies by running `npm install`.
3. Create a `.env` file in the project root and set the environment variables listed above.
4. Start the server by running `npm run serve`.

The server will be available at `http://localhost:3000`.


## Configuration

Before running the server, make sure to set up the necessary configuration by creating a `.env` file in the project root directory. The `.env` file should contain the required environment variables as explained in the [Environment Variables](#environment-variables) section below.

## Routes

The Travel Booking Server exposes the following API routes:

### `POST /customer-auth/signup`

Register a new user account.

Request body:

```json
{
  "fullname": "your_fullname",
  "email": "your_email@example.com",
  "password": "your_password"
}
```
Response body:

```json
{
  "success": true,
  "message": "email sent to your account, please verify"
}
```
### POST `/customer-auth/login`

Log in an existing user.

Request body:

```json
{
  "email": "your_email@example.com",
  "password": "your_password"
}
```
Response body:

```json
{
  "success": true,
  "token": "your_jwt_token",
  "data": {
    "id": "user_id",
    "fullname": "your_fullname",
    "email": "your_email@example.com",
    "phonenumber": "your_phone_number",
    "address": "your_address"
  }
}
```
### GET `/customer-auth/:id/verify/:token`

Verify Email.

Response body:

```json
{
  "success": true,
   "message": "Email verified"
}
```
### `POST /business-auth/signup`

Register a new user account.

Request body:

```json
{
  "name": "business_name",
  "type": "business_type",
  "address": "business_address",
  "email": "business_email",
  "phone": "business_phone",
  "website": "business_website",
  "description": "business_description",
  "password": "business_password"
}

```
Response body:

```json
{
  "success": true,
  "message": "email sent to your account, please verify"
}
```

### `POST /check-email`

Request body

```json
{
  email: "user_email"
}
```

Response body

```json
{
  success: true,
  message: "reset password link sent"
}
```

### `POST /reset-password/:id/:token`

Request body 

```json
{
  newPassword: "new_password"
}
```

Response body

```json
{
  success: true,
  message: "password reset successful"
}
```
## Accommodations Routes

### NB: You've to be registered/ register as a business to be authorized to access the create, delete and update routes.
### `POST /api/accommodations`

create a new accommodation

Request body:

```json
{
  "name": "name_of_accommodation",
  "address": "address",
  "description": "description of the accommodation",
  "city": "city",
  "country": "country",
  "price": "price",
  "capacity": "capacity",
  "images": "array of images converted to base64",
  "amenities": "an array of ammenities",
  "rating": "accommodation's ratings"
}

```
Response body:

```json
{
  "success": true,
  "message": "accommodations added successfully",
  "data": "accommodatio's info"
}
```

### `GET /api/accommodations`

Response body:
```json
{
  "success" : true,
  "data" : "array of accommodations"
}
```

### `GET /api/accommodations/:id`

fetch an accommodation

Response body:
```json
{
  "success" : true,
  "data" : "accommodations info"
}
```
### `GET /api/accommodations/:user_id/mine`

fetch an array of the business' posted accommodations only

Response body:
```json
{
  "success" : true,
  "data" : "accommodations info"
}
```

### `PATCH /api/accommodations/:id`

Request body:
```json
{
  "name": "new_name"
}
```

Response body:
```json
{
  "success" : true,
  "message" : "accommodations updated successfully",
  "data": "new updated info"
}
```


### `DELETE /api/accommodations/:id`

Response body:
```json
{
  "success" : true,
  "message" : "accommodation deleted successfully",
}
```

## CART Routes
### `POST /carts`

add to carts

Request body:

```json
{
  "product_id": "id of the product",
  "product_type": "type_of_product eg. accommodations, hotels etc.",
  "user_id": "id_of_the user"
}

```
Response body:

```json
{
  "success": true,
  "message": "Item added to cart",
}
```

### `DELETE /cart/:item_id`

Response body:
```json
{
  "success" : true,
  "message": "item removed from cart"
}
```

### `GET /cart/:user_id`

Response body: 
```json
{
  "success": true,
  "data": "an array of products added to cart by user"
}
```


## PURCHASE Routes

### defines the purchase routes using stripe

### `POST /purchase`

Request body
```json
{
  "stripeTokenId": "stripe token id from frontend",
  "products": [{product_id, product_type}]
}
```
Response body
```json
{
  success: true,
  message: "Transaction completed",
  charge: "amount paid"
}
```

## Environment Variables

The Travel Booking Server uses the following environment variables. Make sure to set these in the `.env` file:

- `HOST`: The hostname of the database server.
- `DB_USER`: The username to use when connecting to the database.
- `PASSWORD`: The password to use when connecting to the database.
- `DB_NAME`: The name of the database to use.
- `SECRET`: The secret key used for signing JSON Web Tokens (JWTs).
- `EMAIL_USER`: The email used for configuring nodemailer.

- `EMAIL_PWD` : The password_key for configuring nodemailer.

## License
This project is licensed under the ISC License.
