🛍️ Sharma Furnitures – MERN E-Commerce Website

A full-stack E-Commerce web application built using the MERN Stack with secure authentication and Razorpay payment integration.

🚀 Features

🔐 JWT Authentication (Signup / Login)

🛒 Cart Management

💳 Razorpay Online Payment Integration

📦 Order Creation & Payment Verification

👤 User Profile with Order History

🛠 Admin Product Management

🔒 Secure Password Hashing (bcrypt)

🗄 MongoDB Database Integration

⚡ Fully Responsive UI (Tailwind CSS)

🏗 Tech Stack
Frontend

React.js

React Router

Context API (Auth + Cart)

Tailwind CSS

Razorpay Checkout

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

bcryptjs

Razorpay SDK

📂 Project Structure
Sharma-Furnitures/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── components/
│   │   └── App.js
│
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── server.js

🔑 Environment Variables

Create a .env file inside backend/

MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

🛠 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/sharma-furnitures.git
cd sharma-furnitures

2️⃣ Backend Setup
cd backend
npm install
npm run dev


Server runs on:

http://localhost:8000

3️⃣ Frontend Setup
cd frontend
npm install
npm start


Frontend runs on:

http://localhost:3000

💳 Razorpay Payment Flow

User clicks Pay Online

Backend creates Razorpay order

Razorpay popup opens

After payment → signature verification

Order saved securely in MongoDB

Cart cleared & user redirected

🔐 Authentication Flow

Passwords hashed using bcrypt

JWT token generated on login/signup

Token stored in localStorage

Protected routes using middleware

📦 Order Schema Highlights

User reference

Product items

Payment status

Razorpay payment result

Shipping address

Order status tracking

🧪 Test Payment

Use Razorpay test card:

Card Number: 4111 1111 1111 1111
Expiry: Any future date
CVV: 123
OTP: 123456

📸 Screenshots

(Add screenshots of Home, Cart, Checkout, Admin Panel here)

🏆 Future Improvements

📧 Email verification

📊 Admin dashboard analytics

🧾 Invoice PDF generation

🌍 Deployment (Render + Vercel)

🔔 Order status notifications

💬 Reviews & Ratings

👨‍💻 Author

Developed by [Your Name]

📜 License

This project is licensed under the MIT License.
