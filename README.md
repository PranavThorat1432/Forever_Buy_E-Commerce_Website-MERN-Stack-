
# 🛒 Forever E-commerce – Full Stack MERN Website

> **A production-ready, scalable e-commerce solution built with the modern MERN stack.**

Forever E-commerce is a fully functional e-commerce platform built using the MERN stack. It allows users to browse products, add them to their cart, and make purchases securely. The platform includes user authentication, admin features for managing products, and a modern responsive UI.
  
----


## 📛 Tech Stack & Tools


##### **Frontend**

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB) ![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-593D88?style=for-the-badge\&logo=redux\&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-671ddf?style=for-the-badge\&logo=axios\&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)

</div>

##### **Backend**

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge\&logo=node.js\&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge\&logo=mongodb\&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge\&logo=mongoose\&logoColor=white)


</div>

##### **Other Tools & Services**

<div align="center">

![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge\&logo=cloudinary\&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge\&logo=JSON%20web%20tokens) ![bcrypt](https://img.shields.io/badge/bcrypt-00BFA5?style=for-the-badge) ![Vercel](https://img.shields.io/badge/Vercel-black?style=for-the-badge\&logo=vercel\&logoColor=white) ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge\&logo=render\&logoColor=white)

</div>


<br/>
<strong>Packages</strong> · 
<img alt="Admin" src="https://img.shields.io/badge/Admin-Vite%20%2B%20React-0ea5e9?logo=react&style=flat-square"/> 
<img alt="Client" src="https://img.shields.io/badge/Client-Vite%20%2B%20React-22c55e?logo=react&style=flat-square"/> 
<img alt="Server" src="https://img.shields.io/badge/Server-Express%205-ef4444?logo=express&style=flat-square"/>
</div>

---

## 📌 Overview

Forever Buy is a **full-stack e-commerce platform** with:
- Separate **Customer** (`Client/`) and **Admin** (`Admin/`) front-ends.
- A secure **Express API** (`Server/`) powered by **MongoDB**.
- Authentication, media uploads, payment processing, and responsive design.

Built with **scalability, security, and developer experience** in mind.

---

## 📂 Architecture

```plaintext
┌─────────────┐    ┌─────────────┐    ┌──────────────┐
│  Client     │ ↔  │  Server API │ ↔  │  MongoDB     │
│  (React)    │    │  (Express)  │    │  (Atlas)     │
└─────────────┘    └─────────────┘    └──────────────┘
       ↑                  ↑                   ↑
       │         Cloudinary / Stripe / Razorpay
       │
┌─────────────┐
│  Admin      │
│  (React)    │
└─────────────┘
````

---

## 📌 Key Features

* **🔐 User Authentication & Authorization** – Secure login and signup using JWT authentication and encrypted passwords.
* **🛍️ Product Management** – Users can browse products with details, search, and filter.
* **🛒 Cart & Checkout** – Add/remove products, adjust quantities, and proceed to checkout.
* **💳 Secure Payments** – Integrated payment gateway for real transactions.
* **📱 Fully Responsive** – Works seamlessly on mobile, tablet, and desktop.
* **🛠️ Admin Dashboard** – Admins can add, update, or delete products.
* **☁️ Deployed & Live** – Accessible anywhere via cloud deployment.

---

## 🛠 Tech Stack

#### **Frontend**

* React.js
* Redux Toolkit (State Management)
* Axios (API Communication)
* React Router DOM
* TailwindCSS (Responsive UI)

#### **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose (Database)

#### **Authentication & Security**

* JSON Web Tokens (JWT)
* bcrypt.js (Password Hashing)
* CORS (Cross-Origin Resource Sharing)

#### **Others**

* Cloudinary (Image Hosting)
* dotenv (Environment Variables)
* Render / Vercel (Deployment)

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

* **Node.js** 18+
* **MongoDB** (Atlas or local)
* **Cloudinary** account
* **Stripe** and/or **Razorpay** account

### 2️⃣ Installation

```bash
# Clone repo
git clone https://github.com/yourusername/forever-buy.git
cd forever-buy

# Install dependencies
cd Admin && npm install
cd ../Client && npm install
cd ../Server && npm install
```
```

### 3️⃣ Environment Variables

`Server/.env`

```env
PORT=4000
MONGODB_URI=your_mongodb_connection
JWT_SECRET=secure_jwt_secret

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=supersecret

CLOUDINARY_NAME=cloud_name
CLOUDINARY_API_KEY=api_key
CLOUDINARY_SECRET_KEY=api_secret

STRIPE_SECRET_KEY=sk_test_xxx
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=razorpay_secret
```

`Admin/.env` & `Client/.env`

```env
VITE_API_BASE=http://localhost:4000
```

### 4️⃣ Running the Project

```bash
# Start API server
cd Server && npm run server

# Start Admin
cd Admin && npm run dev

# Start Client
cd Client && npm run dev
```

---

## 📜 API Overview

| Method | Endpoint             | Description                   | Auth    |
| ------ | -------------------- | ----------------------------- | ------- |
| GET    | `/`                  | Health check                  | ❌       |
| POST   | `/api/user/register` | Register new user             | ❌       |
| POST   | `/api/user/login`    | Login user                    | ❌       |
| GET    | `/api/product`       | Get product list              | ❌       |
| POST   | `/api/product`       | Create product                | ✅ Admin |
| POST   | `/api/cart`          | Add to cart                   | ✅ User  |
| POST   | `/api/order`         | Create order + payment intent | ✅ User  |

*(Full API docs in `Server/routes/` and controllers)*

---

## 🖼 Screenshots

| Client Home                           | Product Page                             | Admin Dashboard                           |
| ------------------------------------- | ---------------------------------------- | ----------------------------------------- |
| ![Forever (Home)](https://github.com/user-attachments/assets/f2cfff48-5573-406a-a8d7-0dd224cc5540) | ![Forever (Products)](https://github.com/user-attachments/assets/218861a5-4ea9-407c-9c3d-4d191e068bab) | ![Forever (Admin)](https://github.com/user-attachments/assets/ddc1ab5d-928f-44d1-aa9a-f5b8a8a2187d) |


---

## 💡 Suggestions / Future Improvements

* Add **Wishlist feature** for saving favorite products.
* Implement **Order tracking system**.
* Add **Product reviews & ratings**.
* Improve **Admin analytics dashboard** with charts.
* Enable **Multi-language support** for a global audience.

---

## 🤝 Contribution

Contributions are welcome!
If you’d like to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the [MIT License](License.md) – you’re free to use, modify, and distribute with attribution.

---

## 📬 Contact

👤 **Pranav Thorat**

| Platform              | Link                                                          |
| --------------------- | ------------------------------------------------------------- |
| 🌐 **Live Demo**      | [View Now](https://forever-buy-e-commerce-website-mern.vercel.app/)                        |
| 🧑‍💻 **GitHub Repo** | [View Code](https://github.com/PranavThorat1432/Forever_Buy_E-Commerce_Website-MERN-Stack-) |
| 💼 **LinkedIn**       | [Connect with Me](https://www.linkedin.com/in/curiouspranavthorat/)       |
| 📩 **Email**          | [pranavthorat95@gmail.com](mailto:pranavthorat95@gmail.com)   |

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Pranav Thorat](https://github.com/PranavThorat1432)

</div>