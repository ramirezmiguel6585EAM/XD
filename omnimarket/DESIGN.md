---
name: OmniMarket
colors:
  surface: '#f9f9fd'
  surface-dim: '#d9dade'
  surface-bright: '#f9f9fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f7'
  surface-container: '#ededf1'
  surface-container-high: '#e8e8ec'
  surface-container-highest: '#e2e2e6'
  on-surface: '#1a1c1f'
  on-surface-variant: '#424656'
  inverse-surface: '#2f3034'
  inverse-on-surface: '#f0f0f4'
  outline: '#727687'
  outline-variant: '#c2c6d8'
  surface-tint: '#0054d7'
  primary: '#0050cd'
  on-primary: '#ffffff'
  primary-container: '#0866ff'
  on-primary-container: '#f9f7ff'
  inverse-primary: '#b3c5ff'
  secondary: '#6a5f00'
  on-secondary: '#ffffff'
  secondary-container: '#fae100'
  on-secondary-container: '#6f6300'
  tertiary: '#006830'
  on-tertiary: '#ffffff'
  tertiary-container: '#00843e'
  on-tertiary-container: '#e7ffe6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#00184a'
  on-primary-fixed-variant: '#003fa5'
  secondary-fixed: '#fde400'
  secondary-fixed-dim: '#dec800'
  on-secondary-fixed: '#201c00'
  on-secondary-fixed-variant: '#504700'
  tertiary-fixed: '#78fc9b'
  tertiary-fixed-dim: '#5adf81'
  on-tertiary-fixed: '#00210b'
  on-tertiary-fixed-variant: '#005224'
  background: '#f9f9fd'
  on-background: '#1a1c1f'
  surface-variant: '#e2e2e6'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  price-display:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  container-max: 1280px
  gutter: 16px
---

## Brand & Style
The design system is engineered to bridge the gap between social connectivity and high-velocity commerce. It leverages a **Corporate Modern** aesthetic infused with high-energy accents to evoke a sense of established trust and immediate action. 

The visual strategy focuses on clarity and reliability, ensuring that users feel secure during transactions while being subtly nudged toward discovery. The design utilizes generous whitespace, a structured card-based architecture, and a "Social-First" commerce logic where user reputation and product visibility are paramount.

## Colors
This design system utilizes a high-contrast palette to distinguish between structural elements and interactive triggers.

- **Primary (#0866FF):** Reserved for navigation, headers, and brand-level structural elements. It provides the "Trust Anchor" for the marketplace.
- **Secondary (#FFE600):** The primary action color. Used exclusively for high-priority CTAs like "Buy Now" or "Add to Cart." Must always use dark charcoal text for accessibility.
- **Tertiary (#00A650):** The "Trust Signal." Used for verified seller badges, successful payment states, and "Free Shipping" indicators.
- **Neutrals:** A light-grey background (#F0F2F5) is used to define card boundaries against the pure white (#FFFFFF) surface of the cards themselves.

## Typography
The typography system uses **Inter** exclusively to maintain a clean, systematic feel. Tight letter spacing is applied to headings to create a dense, premium editorial look. 

Price points are emphasized using `price-display` tokens, ensuring they remain the visual focal point within product listings. For mobile accessibility, high-level headers scale down aggressively to prevent awkward line breaks in narrow viewports. Labels and "Verified" badges use a slightly increased letter spacing and semi-bold weights for maximum legibility at small scales.

## Layout & Spacing
The design system employs a **Fluid Grid** with a 12-column structure for desktop and a 4-column structure for mobile. 

- **Desktop:** 24px margins with 16px gutters.
- **Mobile:** 16px margins with 12px gutters.

Spacing follows a 4px baseline shift. Horizontal padding within cards and containers should default to `lg` (24px) for a luxurious, airy feel, while vertical spacing between related list items should remain at `sm` (12px) to maintain a strong content relationship.

## Elevation & Depth
This design system uses **Ambient Shadows** to create a distinct hierarchy between the background and interactive surfaces. 

- **Level 0 (Flat):** Used for the main background (#F0F2F5).
- **Level 1 (Card):** Used for product cards and search bars. A very soft, diffused shadow with a 12% opacity (Color: #1C1E21) and a 10px blur. 
- **Level 2 (Hover/Overlay):** Used for active card states and dropdown menus. The shadow increases in blur (20px) and slightly in opacity to simulate the element lifting toward the user.

Avoid using harsh borders; depth is primarily communicated through subtle tonal shifts and these soft shadows.

## Shapes
The design system utilizes **Rounded** geometry to soften the corporate blue palette and make the interface feel approachable. 

The standard corner radius for primary containers and product cards is **12px**. Larger surface areas like main search inputs or hero sections may scale up to **16px** (`rounded-lg`). Interactive pills like badges or category filters use a fully rounded/circular radius to distinguish them from structural card elements.

## Components
- **Primary Buttons:** High-contrast Secondary Yellow (#FFE600) with Charcoal text (#1C1E21). Use a 12px border radius.
- **Secondary Buttons:** Subtle Blue background (Primary at 10% opacity) with Primary Blue text, or a simple 1px Blue outline.
- **Product Cards:** Must feature a white background, 12px rounded corners, and a Level 1 shadow. Price is always bold and positioned below the product title.
- **Search Bar:** A prominent, wide container with a 16px radius. It should integrate a vertical divider for "Location" selection and a Primary Blue magnifying glass icon.
- **Badges:** Pill-shaped with a font-size of `label-sm`. 
    - *Verified:* Tertiary Green background with white text.
    - *New/Used:* Light gray background with charcoal text.
- **Input Fields:** 12px rounded corners with a 1px soft gray border (#D1D5DB). On focus, the border shifts to Primary Blue.
- **Icons:** Use 24px line icons with a consistent 2px stroke weight to match the modern, clean aesthetic of the typography.