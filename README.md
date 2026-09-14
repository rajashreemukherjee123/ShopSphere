# 🛒 ShopSphere — Full-Stack E-Commerce Website

A full-stack MERN e-commerce web application built with **React.js, Node.js, Express.js, MongoDB, and Redux Toolkit**.

ShopSphere provides a modern shopping experience with secure authentication, dynamic product categories, personalized cart and wishlist functionality, product sections, real-time search, skeleton loading states, and Razorpay payment integration.

---

# 🚀 Live Demo

**Live Website:**
https://shopsphere-frontend-xi.vercel.app/

**GitHub Repository:**
https://github.com/rajashreemukherjee123/ShopSphere

---

# 📌 Features

## 👤 User Authentication

* User Registration & Login
* Secure JWT Authentication
* JWT-based Authorization
* Persistent Login using JWT Token
* Password Encryption using bcrypt
* Protected backend routes
* Automatic session expiration handling

---

## 🛍️ Product Browsing

* Dynamic product listing
* Product detail page
* Product image, title, price, discount and description
* Clicking a product opens its detailed product page
* Responsive product card layout

---

## 🗂️ Dynamic Category Pages

Products are organized into multiple categories.

Available categories include:

* Fashion
* Electronics
* Appliance
* Mobile
* Beauty

When a user clicks a category from the navigation bar, the corresponding category page opens and displays only the products belonging to that category.

The category pages are dynamically generated using a reusable category page instead of creating a separate page for every category.

Example routes:

```text
/category/fashion
/category/electronics
/category/appliance
/category/mobile
/category/beauty
```

---

## 🎯 Dynamic Product Sections

The home page contains multiple dynamic product sections.

Examples include:

* Deal of the Day
* Trending Offers
* Top Selection
* Top's Deals on Accessories
* Discounts for You
* Recommended Items
* Suggested for You
* Season's Top Picks

Each section has a **View All** button.

Clicking **View All** opens a dedicated section page containing the products belonging to that particular section.

---

## ❤️ Wishlist

* Add products to wishlist
* Remove products from wishlist
* Dedicated Wishlist page
* Wishlist button on product cards
* Move products from Cart to Wishlist
* User-specific wishlist

---

## 🛒 Shopping Cart

* Add products to cart
* Remove products from cart
* Increase product quantity
* Decrease product quantity
* User-specific shopping cart
* Move products from Cart to Wishlist
* Persistent cart data for authenticated users

---

## 🔍 Product Search

* Real-time product search
* Search products while typing
* Dynamic search suggestions
* Search results without page refresh

---

## 💳 Payment Integration

* Razorpay payment gateway integration
* Razorpay Test Mode
* Secure checkout flow

---

## ⏳ Loading Experience

The application uses **Skeleton Loading UI** to provide a smoother user experience while product data is being fetched.

Skeleton loading is implemented for:

* Category product pages
* Section product pages
* Wishlist page
* Home product sections

Instead of showing a blank page while API requests are in progress, skeleton placeholders are displayed until the actual product data loads.

---

## 📱 Responsive Design

The application is designed to work across different screen sizes.

Responsive UI is implemented using:

* Material UI
* CSS
* Responsive product grids
* Responsive carousels
* Mobile-friendly navigation

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router DOM
* Redux Toolkit
* React Redux
* Axios
* JavaScript (ES6+)
* Material UI
* React Multi Carousel
* React Countdown
* React Toastify
* HTML5
* CSS3

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* RESTful APIs

## Authentication & Security

* JSON Web Token (JWT)
* bcrypt
* Protected API routes
* Axios request/response interceptors

## Payment

* Razorpay SDK

## Deployment

* Frontend — Vercel
* Backend — Render
* Database — MongoDB

---

# 🏗️ Application Architecture

ShopSphere follows a full-stack architecture where the React frontend communicates with the Express/Node.js backend through REST APIs.

```text
                 ┌──────────────────────┐
                 │      ShopSphere      │
                 │      Frontend        │
                 │   React + Vite       │
                 └──────────┬───────────┘
                            │
                         REST API
                            │
                            ▼
                 ┌──────────────────────┐
                 │       Backend        │
                 │ Node.js + Express.js │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │       MongoDB        │
                 │      Database        │
                 └──────────────────────┘

                 Frontend → Vercel
                 Backend  → Render
```

---

# 📂 Project Structure

```text
ShopSphere/
│
├── FrontEnd_E-commerce_website_v002/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── BackEnd_E-commerce_website_v002/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── package.json
│   └── server.js
│
├── .gitignore
│
└── README.md
```

---

# 🔄 Redux Toolkit

### State Management

The application uses **Redux Toolkit** for centralized and predictable state management.

Redux Toolkit simplifies Redux development by reducing boilerplate code and providing a structured way to manage application state. The project uses separate **slices** to keep different parts of the application state modular, maintainable, and easier to scale.

### Redux Toolkit Structure

```text
redux/
│
├── slices/
│   ├── productSlice.js
│   ├── cartSlice.js
│   ├── wishListSlice.js
│   └── userSlice.js
│
├── axiosInstance.js
│
└── store.js
```

### State Managed by Redux Toolkit

* **Product State** — product listing, product details, categories, and product sections
* **Cart State** — cart items, quantity updates, and item removal
* **Wishlist State** — adding, displaying, and removing wishlist items
* **User State** — user authentication and user information
* **Loading & Error States** — handling API loading and error conditions

This structure keeps state management **organized, modular, predictable, and easier to maintain and scale**.


# 🔐 Authentication Workflow

1. User creates an account.
2. User logs in with their credentials.
3. Backend validates the credentials.
4. A JWT token is generated.
5. JWT token is stored on the client.
6. Protected API requests include the JWT token.
7. Backend verifies the token using authentication middleware.
8. User-specific cart and wishlist data can then be accessed securely.
9. Expired or invalid sessions are handled automatically.

---

# 🛒 Shopping Cart Workflow

1. User logs in.
2. User browses products.
3. Products can be added to the shopping cart.
4. Cart data is associated with the authenticated user.
5. User can:

   * Increase quantity
   * Decrease quantity
   * Remove products
   * Move products to Wishlist
6. User proceeds to checkout.
7. Payment is processed through Razorpay Test Mode.

---

# ❤️ Wishlist Workflow

1. User logs in.
2. User clicks the Wishlist button on a product.
3. Product is added to the user's wishlist.
4. User can open the Wishlist page.
5. User can remove a product from the wishlist.
6. User can move a wishlist product to the shopping cart.

---

# 🗂️ Category Workflow

The navigation bar provides access to different product categories.

```text
Home
Fashion
Electronics
Appliance
Mobile
Beauty
```

When a category is selected:

```text
Navbar
   ↓
Category
   ↓
Category API
   ↓
Products filtered by category
   ↓
Dynamic Category Page
```

This allows multiple categories to use the same reusable category page instead of creating separate pages for every category.

---

# 🎯 Section Workflow

Home page sections use dynamic section-based product data.

For example:

```text
Suggested for You
        ↓
     View All
        ↓
/sections/Suggesting-items
        ↓
   Section API
        ↓
All products in that section
```

The same approach is used for other sections such as:

* Discounts for You
* Top's Deals on Accessories
* Recommended Items
* Trending Offers
* Season's Top Picks

---

# ⏳ Skeleton Loading

The application uses skeleton placeholders while waiting for API responses.

Example loading flow:

```text
User opens page
      ↓
API request starts
      ↓
Skeleton UI displayed
      ↓
API response received
      ↓
Skeleton removed
      ↓
Products displayed
```

This provides a smoother experience while product data is being loaded.

---

# 🔎 Search Functionality

The search feature provides real-time product suggestions.

```text
User types product name
          ↓
Search API
          ↓
Matching products
          ↓
Search suggestions
```

Search results update dynamically without requiring a full page refresh.

---

# 💳 Razorpay Payment

ShopSphere integrates the Razorpay payment gateway in **Test Mode**.

The checkout flow allows users to proceed from their shopping cart toward payment using Razorpay.

> Payment integration is currently configured for testing purposes.

---

# ⚙️ Environment Variables

The backend requires environment variables for database connection, authentication, and payment configuration.

Create a `.env` file inside:

```text
BackEnd_E-commerce_website_v002/
```

Example:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_key_id

RAZORPAY_KEY_SECRET=your_key_secret
```

**Never commit your `.env` file or secret credentials to GitHub.**

---

# 📦 Installation

## Clone the Repository

```bash
git clone https://github.com/rajashreemukherjee123/ShopSphere.git
```

## Navigate to the Project

```bash
cd ShopSphere
```

---

# 💻 Frontend Setup

Navigate to the frontend directory:

```bash
cd FrontEnd_E-commerce_website_v002
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

# ⚙️ Backend Setup

Open another terminal and navigate to the backend directory:

```bash
cd BackEnd_E-commerce_website_v002
```

Install dependencies:

```bash
npm install
```

Create your `.env` file with the required environment variables.

Start the backend development server:

```bash
npm run dev
```

---

# 🌐 Deployment

## Frontend

The frontend is deployed using **Vercel**.

**Live URL:**

https://shopsphere-frontend-xi.vercel.app/

## Backend

The backend is deployed using **Render**.

The frontend communicates with the deployed backend API instead of the local development server.

## Database

MongoDB is used as the application's database.

---

# 👨‍💻 Author

**Rajashree Mukherjee**

GitHub:

https://github.com/rajashreemukherjee123

---

# ⭐ Support

If you like this project, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is licensed under the MIT License.
