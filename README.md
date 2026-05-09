# HelpLink Backend

## 📌 Overview

HelpLink Backend is a RESTful API built with Node.js, Express.js, and MongoDB. It powers the HelpLink platform by handling authentication, role-based access, donation system, emergency request management, AI-based urgency detection, and chatbot integration.

---

## 🚀 Features

- 🔐 JWT-based authentication & secure authorization system
- 👥 Role-based access control (Receiver, Donor, Volunteer, Admin)
- 🆘 Emergency help request creation, update, and management
- 💰 Donation system with tracking and history
- 🤖 AI-powered emergency detection for prioritizing urgent requests
- 💬 OpenAI-powered chatbot integration support
- 🧾 Fully RESTful API structure for frontend communication
- 🛡️ Protected routes using middleware validation

---

## 🧑‍💼 Role-Based Functionalities

### 🔹 Receiver

- Create help requests
- View, update, delete own requests
- Track donation status

### 🔹 Donor

- View all active requests
- Donate to requests and payment (SSLCommerz, Bikash)
- View donation history

### 🔹 Volunteer

- Access volunteer dashboard APIs
- Verify and validate help requests
- Manage assigned tasks and campaigns
- Support delivery/relief operations

### 🔹 Admin

- Access admin dashboard APIs
- Manage users (block/unblock/delete)
- Manage campaigns and relief requests
- Monitor donations and system activity
- Approve or reject requests when needed
- View platform analytics and reports

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- OpenAI API
- Axios
- dotenv
- CORS

---

## 📁 Project Structure

```
src/
│
├── config/        # Database, env, cloudinary config
├── constants/     # Roles, statuses, fixed values
├── entry/         # Server bootstrap (local, vercel, deployment setup)
├── middlewares/   # auth, roleVerify, upload, request validation
├── models/        # Mongoose schemas
├── modules/       # Feature-based business logic (auth, user, donation, etc.)
├── utils/         # Helper functions (sendResponse, etc.)
│
├── app.ts         # Express app setup
└── server.ts      # Server entry point
```

---

## 🚀 Run Locally

```bash
git clone https://github.com/kalidashodekare14/HelpLink_Backend.git
cd HelpLink_Backen
npm install
npm run dev
```

Create a .env file in root directory:

```
PORT=5000
DB_URL=mongodb://localhost:27017/helplink_demo_db
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000

JWT_SECRET=helplink_secret_key_12345

CLOUDINARY_NAME=helplink_cloud_demo
CLOUDINARY_API_KEY=1234567890abcdef
CLOUDINARY_API_SECRET=cloudinary_secret_xyz

# bKash
bKASH_USERNAME=helplink_bkash_user
bKASH_PASSWORD=bkash_pass_98765
bKASH_API_KEY=bkash_api_key_abc123
bKASH_SECRET_KEY=bkash_secret_key_xyz789

bKASH_GRANT_TOKEN_URL=https://sandbox.bkash.com/grant-token
bKASH_CREATE_PAYMENT_URL=https://sandbox.bkash.com/create-payment
bKASH_EXECUTE_PAYMENT_URL=https://sandbox.bkash.com/execute-payment
bKASH_REFUND_TRANSACTION_URL=https://sandbox.bkash.com/refund

# SSLCommerz
SSL_COMMERZ_STORE_ID=ssl_store_helplink
SSL_COMMERZ_STORE_PASSWORD=ssl_password_456

# APIs
OPENAI_API_KEY=sk-demo-openai-key-987654321
OPEN_WEATHER_API=weather_api_key_demo_12345
```
