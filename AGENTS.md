# OmniMarket — AGENTS.md

## Dev commands
```bash
npm run dev      # Vite dev server (http://localhost:5173)
npm run build    # Production build to dist/
npm run lint     # ESLint flat config (eslint.config.js)
npm run preview  # Preview production build locally
```
No test, typecheck, or formatter scripts configured.

## Architecture
- **Framework:** React 19 + Vite 8, plain JSX (no TypeScript).
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` plugin (no PostCSS config, no tailwind.config.js). All theme overrides live in `src/index.css` inside `@theme {}`.
- **Routing:** React Router v6 (`BrowserRouter`). SPA fallback is handled by `vercel.json` rewrites.
- **State:** React Context API (`src/context/AppContext.jsx`). All state is persisted to `localStorage` under keys prefixed `omnimarket_` (products, purchases, chats, sellers, current_user, cart). Deleting localStorage resets to mock data.
- **Icons:** Google Material Symbols Outlined (loaded via `<link>` in `index.html`, class `material-symbols-outlined`).
- **Entrypoint:** `index.html` → `src/main.jsx` → `src/App.jsx`.
- **No test runner, no codegen, no migrations, no Docker.**

## Pages (src/pages/)
| Route | Component | Notes |
|-------|-----------|-------|
| `/` | Home | Landing, category filters, listings |
| `/search` | SearchResults | Multi-faceted filters (category, price, condition) |
| `/product/:id` | ProductDetails | Image gallery, seller info |
| `/sell` | SellItem | Create listing form |
| `/edit/:id` | EditListing | Pre-filled edit form |
| `/purchases` | MyPurchases | Escrow purchase logs, release/rate actions |
| `/chat` | Chat | Split-panel chat + auto-reply simulation (1.5s delay) |
| `/checkout/:id?` | Checkout | Cart/checkout flow |
| `/profile/edit` | EditProfile | Edit current user profile |
| `/seller/:sellerId` | SellerProfile | Public seller profile page |
| `/support` | SupportChat | Support/help chat |

The `App.jsx` route table is the single source of truth; README may lag.

## State keys (AppContext)
`useContext(AppContext)` provides: `products`, `purchases`, `chats`, `sellers`, `currentUser`, `searchQuery`, `cart` + mutators (`addProduct`, `updateProduct`, `buyProduct`, `releaseEscrow`, `rateSeller`, `updateUserProfile`, `getOrCreateChat`, `sendChatMessage`, `addToCart`, `removeFromCart`, `updateCartQuantity`, `clearCart`).

## Styling conventions
- Use Tailwind utility classes with custom tokens from `@theme` (e.g. `bg-surface-container-low`, `text-on-background`, `shadow-level-1`, `rounded-xl`). Avoid raw CSS or `App.css` (legacy file, not used by pages).
- Standard spacing: `xs`=8px, `sm`=12px, `md`=16px, `lg`=24px, `xl`=32px.
- Icons: `<span class="material-symbols-outlined">icon_name</span>`.

## Notes
- `npm run lint` uses the flat config format (`eslint.config.js`), not `.eslintrc`.
- The project is a single-page SPA — all routes are client-side.
- `dist/` and `node_modules/` are gitignored.
- External image URLs (Unsplash, Googleusercontent) are used as fallbacks.
