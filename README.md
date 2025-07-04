<<<<<<< HEAD
# 🧾 Rugas ORM Demo

A full-stack Order Management System built as part of an internship assignment. This application allows authenticated users to onboard customers, manage products, place and update orders, and view order statistics.

## 🚀 Live Demo

- **Frontend (Vercel):** [https://rugas-orm-demo-abdul.vercel.app](https://rugas-orm-demo-abdul.vercel.app)
- **Backend API (Render):** [https://rugas-orm-demo-lnmm.onrender.com](https://rugas-orm-demo-lnmm.onrender.com)

---

## 📦 Features

### 🔐 Authentication
- JWT-based login and registration
- Protected routes after login

### 👤 Customer Management
- Add customer with name, email, phone, and address
- List all customers

### 📦 Product Management
- Add product with name, category, description, image URL, and price
- View all products

### 📋 Order Management
- Create order by selecting a customer and a product
- Filter orders by status (`Placed`, `Shipped`, `Delivered`, `Cancelled`)
- Update status of any order

### 📊 Dashboard (Bonus)
- View total order statistics (number of each status)

---

## 🛠️ Tech Stack

### Frontend
- [React.js (Vite)](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- React Router DOM

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- Hosted on [Render](https://render.com/)

---

## 📁 Folder Structure
```tree
rugas-orm-demo/
│
├── client/ # Frontend (Vite + React)
│ ├── public/
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Pages like Login, Dashboard, Orders
│ │ └── services/ # API base configuration
│ └── vite.config.js
│
├── server/ # Backend (Express + MongoDB)
│ ├── controllers/ # Auth, Orders, Products, Customers
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API endpoints
│ └── server.js # App entry point
│
└── README.md # You’re reading it!
```

---

## 🧪 How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/AbdulAhadSiddiqui-0786/rugas-orm-demo.git
cd rugas-orm-demo
```
### 2. Setup Backend
```bash
cd server
pnpm install

# Create a .env file
touch .env
In .env file :
PORT=10000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_ORIGIN=http://localhost:5173

Then start the server:
pnpm start
```
### 3. Setup Frontend
```bash
cd ../client
pnpm install

# Create a .env file
touch .env

VITE_API_URL=http://localhost:10000


Then start the client:
pnpm run dev
```

✅ Deployment
Frontend (Vercel): Vite app deployed using GitHub integration
Backend (Render): Express API with MongoDB Atlas connection

📊 Screenshots

👨‍💻 Author
Abdul Ahad
[GitHub Profile →](https://github.com/AbdulAhadSiddiqui-0786)

📃 License
This project is for educational and demonstration purposes only.


=======
# 🧾 Rugas ORM Demo

A full-stack Order Management System built as part of an internship assignment. This application allows authenticated users to onboard customers, manage products, place and update orders, and view order statistics.

## 🚀 Live Demo

- **Frontend (Vercel):** [https://rugas-orm-demo-abdul.vercel.app](https://rugas-orm-demo-abdul.vercel.app)
- **Backend API (Render):** [https://rugas-orm-demo-lnmm.onrender.com](https://rugas-orm-demo-lnmm.onrender.com)

---

## 📦 Features

### 🔐 Authentication
- JWT-based login and registration
- Protected routes after login

### 👤 Customer Management
- Add customer with name, email, phone, and address
- List all customers

### 📦 Product Management
- Add product with name, category, description, image URL, and price
- View all products

### 📋 Order Management
- Create order by selecting a customer and a product
- Filter orders by status (`Placed`, `Shipped`, `Delivered`, `Cancelled`)
- Update status of any order

### 📊 Dashboard (Bonus)
- View total order statistics (number of each status)

---

## 🛠️ Tech Stack

### Frontend
- [React.js (Vite)](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- React Router DOM

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- Hosted on [Render](https://render.com/)

---

## 📁 Folder Structure
```tree
rugas-orm-demo/
│
├── client/ # Frontend (Vite + React)
│ ├── public/
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Pages like Login, Dashboard, Orders
│ │ └── services/ # API base configuration
│ └── vite.config.js
│
├── server/ # Backend (Express + MongoDB)
│ ├── controllers/ # Auth, Orders, Products, Customers
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API endpoints
│ └── server.js # App entry point
│
└── README.md # You’re reading it!
```

---

## 🧪 How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/AbdulAhadSiddiqui-0786/rugas-orm-demo.git
cd rugas-orm-demo
```
### 2. Setup Backend
```bash
cd server
pnpm install

# Create a .env file
touch .env
In .env file :
PORT=10000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_ORIGIN=http://localhost:5173

Then start the server:
pnpm start
```
### 3. Setup Frontend
```bash
cd ../client
pnpm install

# Create a .env file
touch .env

VITE_API_URL=http://localhost:10000


Then start the client:
pnpm run dev
```

✅ Deployment
Frontend (Vercel): Vite app deployed using GitHub integration
Backend (Render): Express API with MongoDB Atlas connection

📊 Screenshots

👨‍💻 Author
Abdul Ahad
[GitHub Profile →](https://github.com/AbdulAhadSiddiqui-0786)

📃 License
This project is for educational and demonstration purposes only.
>>>>>>> 64f6737 (final commit)
