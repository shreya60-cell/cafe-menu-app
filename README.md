# ☕ The Coffee Corner

> A full-stack café ordering web application built with React.js, Vite, Node.js, Express.js, and MongoDB. Customers can browse the café menu, search for items, manage quantities, enter their details, and place orders that are stored in MongoDB.

---

## 📷 Project Preview

**The Coffee Corner** provides a simple and user-friendly digital ordering experience for cafés.

Customers can:

* Browse available food and beverages
* Search menu items
* Increase or decrease item quantities
* Enter customer information
* Select a table number
* Place an order
* View an order confirmation

---

## 📖 Executive Overview

**The Coffee Corner** is a full-stack café ordering application designed to simplify the process of placing and storing customer orders.

The application uses a modern **React.js frontend** connected to a **Node.js and Express.js backend**. Customer orders are sent through REST APIs and stored in **MongoDB**.

The project demonstrates a complete full-stack workflow:

```text
Customer
   ↓
React.js Frontend
   ↓
Express.js REST API
   ↓
Node.js Backend
   ↓
MongoDB
   ↓
Order Stored Successfully
```

---

## ✨ Key Features

### ☕ Café Menu

* Displays café food and beverage items
* Shows item names and prices
* Clean and simple ordering interface

### 🔍 Menu Search

Customers can search for menu items quickly using the search bar.

### ➕➖ Quantity Management

Customers can:

* Increase item quantity
* Decrease item quantity
* Select multiple menu items

### 🛒 Order Management

The application calculates the order total automatically based on item price and quantity.

### 👤 Customer Details

Customers can provide:

* Customer name
* Phone number
* Table number

### 📦 Order Placement

Orders are submitted to the Express backend using a REST API.

### 🍃 MongoDB Storage

Customer orders are stored in MongoDB with information such as:

* Customer name
* Phone number
* Table number
* Ordered items
* Quantity
* Price
* Total amount
* Order creation time

### ✅ Order Confirmation

After a successful order, customers receive an order confirmation containing the order summary.

---

## 🔄 How It Works

```text
1. Customer opens The Coffee Corner
              ↓
2. Browses the café menu
              ↓
3. Searches/selects menu items
              ↓
4. Adjusts item quantities
              ↓
5. Enters customer details
              ↓
6. Clicks "Place Order"
              ↓
7. React sends POST request
              ↓
8. Express receives the order
              ↓
9. Order is saved in MongoDB
              ↓
10. Backend returns successful response
              ↓
11. React displays Order Confirmation
```

---

## 🏛️ Application Architecture

```text
                   ┌─────────────────────────────┐
                   │       React.js Frontend     │
                   │        Vite Application     │
                   │                             │
                   │  Menu • Search • Cart       │
                   │  Customer Details           │
                   │  Order Confirmation         │
                   └──────────────┬──────────────┘
                                  │
                              HTTP / REST
                                  │
                   ┌──────────────▼──────────────┐
                   │      Node.js + Express      │
                   │        Backend API          │
                   │                             │
                   │  Order Routes               │
                   │  Request Handling           │
                   │  MongoDB Integration        │
                   └──────────────┬──────────────┘
                                  │
                              Mongoose
                                  │
                   ┌──────────────▼──────────────┐
                   │           MongoDB            │
                   │                             │
                   │       Orders Collection     │
                   └─────────────────────────────┘
```

---

## 🗄️ MongoDB Order Model

Orders are stored using a MongoDB/Mongoose data model.

Example order:

```json
{
  "customerName": "Shreya",
  "phone": "9876510106",
  "tableNumber": 2,
  "items": [
    {
      "name": "Cappuccino",
      "quantity": 1,
      "price": 120
    },
    {
      "name": "Veg Sandwich",
      "quantity": 1,
      "price": 130
    }
  ],
  "total": 250
}
```

MongoDB also maintains order metadata such as:

* `_id`
* `createdAt`
* `updatedAt`

---

## 🔌 REST API Endpoints

### Test Backend

```http
GET /
```

Returns a message confirming that the Coffee Corner backend is running.

### API Test

```http
GET /api/test
```

Response:

```json
{
  "message": "Order API is working!"
}
```

### Get Orders

```http
GET /api/orders
```

Returns saved customer orders from MongoDB.

### Create Order

```http
POST /api/orders
```

Creates a new customer order and saves it to MongoDB.

Example request:

```json
{
  "customerName": "Shreya",
  "phone": "9876510106",
  "tableNumber": 2,
  "items": [
    {
      "name": "Cappuccino",
      "quantity": 1,
      "price": 120
    },
    {
      "name": "Veg Sandwich",
      "quantity": 1,
      "price": 130
    }
  ],
  "total": 250
}
```

Successful response:

```json
{
  "message": "Order placed successfully!"
}
```

---

## 📁 Project Structure

```text
cafe-menu-app/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   └── Order.js
│   │
│   ├── routes/
│   │   └── orderRoutes.js
│   │
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* REST API
* CORS

### Database

* MongoDB
* Mongoose

### Development Tools

* Visual Studio Code
* Git
* GitHub
* npm
* PowerShell

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/shreya60-cell/cafe-menu-app.git
```

### 2. Open the project

```bash
cd cafe-menu-app
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Install backend dependencies

```bash
cd server
npm install
```

### 5. Configure environment variables

Create a `.env` file inside the `server` folder.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Do not upload the `.env` file to GitHub.

### 6. Start the backend

From the `server` folder:

```bash
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

### 7. Start the frontend

Open another terminal and return to the project root:

```bash
cd ..
npm run dev
```

Vite will provide the frontend URL, usually:

```text
http://localhost:5173
```

---

## ⚙️ Environment Variables

The backend uses environment variables to protect configuration details.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

The `.env` file is excluded from Git using `.gitignore`.

---

## 🧪 Testing

The backend and database integration were tested successfully.

### Backend Test

```http
GET /api/test
```

Result:

```json
{
  "message": "Order API is working!"
}
```

### Order Creation Test

A test order was successfully submitted through the API.

Example:

```text
Customer: Shreya
Table: 2
Cappuccino: ₹120
Veg Sandwich: ₹130
Total: ₹250
```

### MongoDB Verification

The order was successfully retrieved from MongoDB using:

```http
GET /api/orders
```

A real frontend order was also successfully tested:

```text
Customer: rrrrrr
Table: 5
Chocolate Cake: ₹180
Brownie: ₹150
Total: ₹330
```

This confirms the complete workflow:

```text
React
  ↓
Express API
  ↓
MongoDB
  ↓
Order Retrieved Successfully
```

---

## 🔒 Security Considerations

* MongoDB connection details are stored in `.env`.
* `.env` is excluded using `.gitignore`.
* `node_modules` is excluded from version control.
* Backend and frontend are separated.
* Orders are processed through REST APIs instead of directly connecting the frontend to MongoDB.

---

## 🚧 Current Limitations

The current version focuses on the core café ordering workflow.

Possible future additions include:

* Admin dashboard
* Order status management
* Online payment integration
* User authentication
* Customer order history
* Inventory management
* Menu management
* Order notifications
* Printable bills
* Sales analytics
* Daily/monthly revenue reports

---

## 🔮 Future Improvements

### 👨‍💼 Admin Dashboard

Allow café staff to view and manage incoming orders.

### 📊 Sales Analytics

Display:

* Daily sales
* Monthly sales
* Popular menu items
* Number of orders
* Revenue statistics

### 💳 Online Payments

Integrate a secure payment gateway for online order payments.

### 📱 Responsive Design

Improve the interface for:

* Mobile phones
* Tablets
* Desktop computers

### 🔐 Authentication

Add secure login functionality for café administrators.

---

## 📜 License

This project is created for educational and portfolio purposes.

You are free to modify and improve the project for learning and development.

---

## 👩‍💻 Author

**Shreya L**

BCA Graduate | Aspiring IT Professional

### Project

**The Coffee Corner**

A full-stack café ordering application demonstrating frontend development, REST API integration, backend development, and MongoDB database management.

---

## ⭐ Project Highlights

```text
☕ React.js Frontend
🟢 Node.js + Express Backend
🍃 MongoDB Database
🔌 REST API
🛒 Online Café Ordering
🔍 Menu Search
➕➖ Quantity Management
👤 Customer Details
📦 Order Management
✅ Order Confirmation
💾 Persistent Database Storage
🐙 GitHub Version Control
```

---

## ⭐ Project Status

**Completed and tested successfully.**

The application has been tested from the frontend through the backend API to MongoDB, confirming that customer orders can be placed and retrieved successfully.

