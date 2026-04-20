

---

# 🛒 Simple Grocery Store — Express MVC

This project is a **server-side web application built with Express.js using the MVC pattern**, consuming a public API:

👉 [https://simple-grocery-store-api.click/](https://simple-grocery-store-api.click/)

It simulates a basic e-commerce workflow, including:

* API client authentication
* Product browsing
* Cart management
* Order creation and management

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run in development mode

```bash
npm run dev
```

Open your browser:
👉 [http://localhost:3000](http://localhost:3000)

> nodemon will automatically restart the server on file changes

### 3. Run in production mode

```bash
npm start
```

---

## 📁 Project Structure (MVC Pattern)

```
grocery-store-app/
├── app.js
│
├── models/
│   ├── apiConfig.js
│   ├── productModel.js
│   ├── cartModel.js
│   ├── orderModel.js
│   └── authModel.js
│
├── controllers/
│   ├── indexController.js
│   ├── productController.js
│   ├── cartController.js
│   ├── orderController.js
│   └── authController.js
│
├── routes/
│   ├── indexRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   └── authRoutes.js
│
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   └── pages/
│       ├── home.ejs
│       ├── products/
│       │   ├── index.ejs
│       │   └── detail.ejs
│       ├── cart/
│       │   └── index.ejs
│       ├── orders/
│       │   ├── index.ejs
│       │   ├── create.ejs
│       │   ├── detail.ejs
│       │   └── edit.ejs
│       └── auth/
│           └── index.ejs
│
└── public/
    ├── css/
    └── js/
```

---

## 🗺️ Routes Overview

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| GET    | `/`                   | Home page            |
| GET    | `/products`           | List all products    |
| GET    | `/products/:id`       | Product detail       |
| POST   | `/cart/create`        | Create new cart      |
| GET    | `/cart`               | View cart            |
| POST   | `/cart/items`         | Add item to cart     |
| PATCH  | `/cart/items/:itemId` | Update item quantity |
| PUT    | `/cart/items/:itemId` | Replace item         |
| DELETE | `/cart/items/:itemId` | Remove item          |
| GET    | `/auth`               | Authentication page  |
| POST   | `/auth/register`      | Register API client  |
| POST   | `/auth/set-token`     | Set token manually   |
| GET    | `/orders`             | List orders          |
| POST   | `/orders`             | Create order         |
| GET    | `/orders/:id`         | Order detail         |
| PATCH  | `/orders/:id`         | Update order         |
| DELETE | `/orders/:id`         | Delete order         |

---

## 🔗 API Integration

This project uses the public API:

```
https://simple-grocery-store-api.click/
```

All API interactions are handled in the **models layer**, ensuring:

* Clean controllers
* Centralized API logic
* Easier maintenance

---

## 🧪 Testing (Katalon / Postman)

### Recommended flow:

1. Register API Client
2. Get Products
3. Create Cart
4. Add Item
5. Create Order

### Required headers for order endpoints:

```
Authorization: Bearer <your_token>
Content-Type: application/json
```

---

## 📚 Concepts Covered

* Express.js (Web framework)
* MVC Architecture
* REST API integration
* EJS (Server-side rendering)
* Axios (HTTP client)
* Session management
* Flash messages
* Method override (PUT/DELETE from forms)
* Bearer Token authentication

---

## 🔧 Tech Stack

| Technology      | Purpose               |
| --------------- | --------------------- |
| Node.js         | Runtime               |
| Express.js      | Backend framework     |
| EJS             | Template engine       |
| Axios           | API requests          |
| express-session | Session management    |
| connect-flash   | Notifications         |
| method-override | Extended HTTP methods |
| nodemon         | Development tool      |

---

## ⚠️ Notes

* No local database (fully API-based)
* Token stored in session
* Data depends on external API

---

## ✨ Portfolio Highlights

* Clean MVC architecture
* Modular routing
* External API integration
* Real-world flow (auth → cart → order)
* Server-side rendering

---



Just say the word.
