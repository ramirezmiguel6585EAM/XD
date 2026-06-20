---
name: Vibrant Kinetic
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434656'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737688'
  outline-variant: '#c3c5d9'
  surface-tint: '#004ceghghghd'
  primary: '#003ec7'
  on-primary: '#ffffff'
  primary-container: '#0052ff'
  on-primary-container: '#dfe3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#705d00'
  on-secondary: '#ffffff'
  secondary-container: '#fdd400'
  on-secondary-container: '#6f5c00'
  tertiary: '#394e79'
  on-tertiary: '#ffffff'
  tertiary-container: '#516692'
  on-tertiary-container: '#dce5ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001452'
  on-primary-fixed-variant: '#0038b6'
  secondary-fixed-dim: '#e9c400'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#544600'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#b1c6f9'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#314671'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system is built for high-energy environments where motion, clarity, and brand presence are paramount. The personality is confident, forward-leaning, and unapologetically bold. It targets a modern, tech-savvy audience that values efficiency but appreciates a high-fidelity, polished aesthetic.

The design style is **Corporate Modern with a Kinetic Edge**. It utilizes clean layouts and professional structure but injects life through vibrant color saturation and subtle, functional gradients. It moves away from "safe" muted tones toward a high-definition visual language that feels active and premium. The emotional response should be one of reliability paired with excitement—a tool that is both powerful and a joy to interact with.

## Colors

The palette is anchored by a **Vibrant Electric Blue** (`#0052FF`) which serves as the primary driver for navigation and core actions. This is balanced by an **Energetic Gold-Yellow** (`#FFD600`) accent, used strategically to draw the eye to the most critical conversion points.

Color is applied through a "Prominence-First" hierarchy:
- **Primary Blue:** Used for headers, active states, and structural branding.
- **Accent Yellow:** Reserved for primary CTAs and notification badges. It is paired with black or deep navy text to ensure AA accessibility.
- **Deep Navy Tertiary:** Provides the "anchor" for the system, used in headers and text to provide high contrast against the vibrant accents.
- **Gradients:** Subtle vertical and diagonal transitions are used to prevent the vibrant colors from feeling "flat." Use the `primary_header` gradient for large surfaces and `accent_action` for high-priority buttons.

## Typography

The typography system is designed for maximum clarity and technical precision. **Hanken Grotesk** is used for headlines to provide a sharp, contemporary feel that complements the vibrant color palette. Its tight kerning and geometric construction feel high-performance.

**Inter** handles the body copy, ensuring readability across dense data sets. For technical metadata, badges, and small captions, **JetBrains Mono** is utilized to provide a "developer-refined" look that balances the friendliness of the sans-serif fonts.

Hierarchy is established through significant weight shifts (Bold for headlines, Regular for body) rather than just size changes. Always use the `-0.02em` tracking for headlines to maintain a compact, impactful look.

## Layout & Spacing

This design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. The layout is structured around an 8px base unit, ensuring all spacing is a multiple of 8.

- **Desktop:** 12 columns, 24px gutters, and 40px outer margins. Content is capped at 1280px to prevent excessive line lengths.
- **Mobile:** 4 columns, 16px gutters, and 16px margins. 
- **Vertical Rhythm:** Use the `stack` tokens to manage vertical spacing between sections. Large headers should use `stack-lg` for breathing room, while component internals (like icon-to-text) use `stack-sm`.

## Elevation & Depth

Depth is created through **Tonal Layering** and **Soft Ambient Shadows**. Rather than heavy black shadows, the system uses "Tinted Depth":

1.  **Low Elevation (Cards):** 1px border (`#E2E8F0`) with a very soft, high-diffusion shadow tinted with the primary blue (e.g., `rgba(0, 82, 255, 0.05)`).
2.  **High Elevation (Modals/Dropdowns):** A more pronounced shadow with a 16px blur, keeping the blue tint to maintain brand harmony.
3.  **The Header:** Uses the `primary_header` gradient to create a sense of being the "topmost" structural layer, often pinned with a slight backdrop blur if transparency is applied on scroll.

## Shapes

The shape language is **Rounded**, striking a balance between the precision of the typography and the energy of the colors. 

- **Standard Elements (Inputs, Small Buttons):** 0.5rem (8px).
- **Cards and Large Containers:** 1rem (16px).
- **Pill Elements:** Used exclusively for status chips and the primary "Hero" CTA to make them feel distinct from the structural UI.

## Components

### Buttons
- **Primary Action:** Uses the `accent_action` gradient (Yellow/Gold) with deep navy text. This is the highest visibility element.
- **Secondary Action:** Solid Vibrant Blue with white text.
- **Ghost Action:** Transparent background with 1px Vibrant Blue border or text.

### Inputs
Fields use a white background with a 1px soft border. Upon focus, the border thickens to 2px in Vibrant Blue and gains a subtle blue outer glow (3px spread).

### Cards
Cards are clean, using a white surface. For "Featured" cards, a 4px top-border using the `accent_action` gradient is applied to denote prominence.

### Chips & Badges
Use the `label-sm` (monospaced) font. Status badges should use highly saturated versions of their respective colors (Success: Green, Warning: Yellow, Error: Red) with light tinted backgrounds for legibility.

### Lists
List items use a subtle hover state (`#F8FAFC`) and use the Vibrant Blue for icons or bullet points to keep the brand front-of-mind even in text-heavy areas.