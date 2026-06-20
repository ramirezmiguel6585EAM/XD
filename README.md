# OmniMarket - High-Velocity Local Commerce Platform

OmniMarket is a modern, high-fidelity local marketplace application converted from a Stitch export into a fully interactive **React + Vite** single-page application (SPA).

## 🚀 Live Demo & Deployment Ready
This project is fully configured for deployment on **GitHub** and **Vercel** with client-side routing support.

## 🛠️ Tech Stack & Dependencies
* **Core:** React, Vite (Javascript ES6+)
* **Routing:** React Router v6 (`react-router-dom`)
* **Styling:** Tailwind CSS v4 (configured via native `@tailwindcss/vite` plugin)
* **Icons:** Google Material Symbols Outlined
* **State Management:** React Context API (with localStorage persistence)

---

## 📂 Project Architecture
The project files are organized inside the `src/` directory:
```text
stitch_bluegold_marketplace/
├── public/                 # Static assets (favicons, Vite logos)
├── src/
│   ├── components/         # Shared reusable components
│   │   ├── Footer.jsx      # Global footer with link columns
│   │   ├── Navbar.jsx      # Top navigation header with search & badge links
│   │   └── ProductCard.jsx # Grid card with hover lifting micro-animations
│   ├── context/
│   │   └── AppContext.jsx  # Centralized state provider (Escrow, products, chats)
│   ├── data/
│   │   └── mockData.js     # Pre-populated mock products, orders, and chats
│   ├── pages/              # Routing pages
│   │   ├── Home.jsx           # landing page, category filters, and active lists
│   │   ├── SearchResults.jsx  # Multi-faceted search and filter layout
│   │   ├── ProductDetails.jsx # Comprehensive details page with interactive gallery
│   │   ├── SellItem.jsx       # Item creation form with URL image simulator
│   │   ├── EditListing.jsx    # Editing form pre-filled with listing metadata
│   │   ├── MyPurchases.jsx    # Escrow purchase logs and transaction statuses
│   │   ├── Chat.jsx           # Split panel chat window with automated seller replies
│   │   └── Checkout.jsx       # Pricing breakdown summary and placement animation
│   ├── App.jsx             # React Router structure
│   ├── index.css           # Global stylesheet and Tailwind v4 theme configurations
│   └── main.jsx            # React root mount script
├── index.html              # Shell markup, preloads Google Fonts & Icons
├── vercel.json             # Vercel rewrite configuration for routing support
├── vite.config.js          # Vite server and Tailwind plugin configuration
└── package.json            # Node project configuration and package definitions
```

---

## ✨ Features Built
1. **Interactive Search & Multi-Faceted Filters:**
   Search items by keywords in title, description, or category. Narrow down results dynamically on the search page using:
   * Category dropdown
   * Price limit slider
   * Condition filters (New, Like New, Good, Fair)
2. **Interactive Image Gallery:**
   On the Product Details page, click thumbnail tiles to instantly swap the active main display image. Multi-image arrays are supported with chevron arrows.
3. ** 중앙 집중식 State Context:**
   Adding a new product, editing a product, or purchasing an item updates the listings dynamically across the entire app. Your listings, orders, and chats are preserved across refreshes via `localStorage`.
4. **Real-time Chat Simulator:**
   Type a message to the seller, click send, and see your message added immediately. After a 1.5-second timeout, the seller will send a randomized auto-reply message!
5. **Simulated Transaction Checkout:**
   Pricing summaries compute item pricing, sales tax (8.25%), and the escrow protection fee. Placing an order triggers a loader animation followed by a transaction success overlay.

---

## 💻 Local Setup & Development

### 1. Requirements
Ensure you have **Node.js** (v20+ recommended) and **npm** installed.

### 2. Install Dependencies
Run the following command in the project root folder:
```bash
npm install
```

### 3. Run Development Server
Start the local hot-reloading development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
Generate the production-ready optimized assets bundle inside the `dist/` directory:
```bash
npm run build
```

---

## ⚡ Deployment
This application contains a `vercel.json` file, making it ready for single-click deployment to **Vercel**:
1. Push this project to a **GitHub** repository.
2. Link the repository to your Vercel Dashboard.
3. Vercel will automatically detect Vite and build the application.
