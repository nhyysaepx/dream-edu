---
name: Dream Education System
colors:
  surface: '#f9f9fc'
  surface-dim: '#dadadc'
  surface-bright: '#f9f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f6'
  surface-container: '#eeeef0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e2e2e5'
  on-surface: '#1a1c1e'
  on-surface-variant: '#434751'
  inverse-surface: '#2f3133'
  inverse-on-surface: '#f0f0f3'
  outline: '#747782'
  outline-variant: '#c4c6d2'
  surface-tint: '#3a5ca2'
  primary: '#002862'
  on-primary: '#ffffff'
  primary-container: '#163e82'
  on-primary-container: '#8bacf7'
  inverse-primary: '#afc6ff'
  secondary: '#745c00'
  on-secondary: '#ffffff'
  secondary-container: '#fdcc15'
  on-secondary-container: '#6e5700'
  tertiary: '#2b2b27'
  on-tertiary: '#ffffff'
  tertiary-container: '#41413c'
  on-tertiary-container: '#afada7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#afc6ff'
  on-primary-fixed: '#001944'
  on-primary-fixed-variant: '#1e4488'
  secondary-fixed: '#ffe089'
  secondary-fixed-dim: '#f0c100'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e5e2db'
  tertiary-fixed-dim: '#c9c6c0'
  on-tertiary-fixed: '#1c1c18'
  on-tertiary-fixed-variant: '#474742'
  background: '#f9f9fc'
  on-background: '#1a1c1e'
  surface-variant: '#e2e2e5'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-sm:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
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
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
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
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system is built for an elite educational environment, focusing on the bridge between aspiration and achievement. The aesthetic is **Corporate Modern** with an academic soul—marrying the structural reliability of a traditional university with the fluid, tech-forward interface of a modern learning platform.

The visual narrative prioritizes clarity and authority. It uses generous whitespace to reduce cognitive load, ensuring students feel a sense of calm and focus. The style avoids excessive ornamentation, instead using high-quality typography and a sophisticated color palette to convey premium value. The emotional response is one of "Guided Success"—where the UI feels like a trusted partner in the user's journey toward international education.

## Colors

The color palette is anchored by **Deep Royal Blue**, representing trust, tradition, and global authority. This is complemented by **Golden Yellow**, used sparingly as an "excellence accent" to highlight success stories, badges, and primary calls to action.

**Surface Architecture:**
- **Primary Surface:** White (#FFFFFF) is used for cards and main content areas to maximize legibility.
- **Secondary Surface:** Soft Warm Ivory (#FCF9F2) is utilized for page backgrounds and section breaks to soften the high-contrast blue and white, creating a more inviting, premium feel.
- **Neutrals:** A range of cool grays is used for secondary text and borders to maintain a professional, systematic appearance.

## Typography

The typography system uses a pairing of **Montserrat** for headlines and **Inter** for body copy. Montserrat’s geometric confidence provides the "Aspirational" character of the brand, while Inter’s utilitarian precision ensures maximum readability for dense educational content and practice tests.

- **Headlines:** Use Bold (700) or SemiBold (600) weights. High-level display titles should use tighter letter spacing to maintain a modern, "designed" look.
- **Body:** Standardized on a 16px base for accessibility. Line heights are kept generous (1.5x) to prevent reader fatigue during long-form study material.
- **Labels:** Always uppercase for small labels or category tags to distinguish them from standard body text.

## Layout & Spacing

The design system employs a **12-column fixed grid** for desktop viewing to mimic the structured feel of academic journals and institutional websites. 

- **Grid:** On desktop, the content is centered with a max-width of 1280px. On mobile, the system transitions to a fluid single-column layout.
- **Vertical Rhythm:** A strict 8px base unit governs all padding and margins. Use "stack" variables to maintain consistent vertical separation between components (e.g., 24px between headline and body, 48px between sections).
- **Sticky Elements:** Navigation headers and "Quick Actions" sidebars (like "Book a Test") remain fixed to provide constant access to key conversion points.

## Elevation & Depth

To maintain a "High-End" feel, the system avoids heavy, dark shadows in favor of **Tonal Layers** and **Ambient Elevation**.

1.  **Level 0 (Base):** The Warm Ivory (#FCF9F2) background.
2.  **Level 1 (Cards):** White surfaces with a very soft, diffused shadow: `box-shadow: 0 4px 20px rgba(22, 62, 130, 0.06)`. Note the use of the primary blue color in the shadow to keep the depth "cool" and professional.
3.  **Level 2 (Interactive/Floating):** Used for hover states and dropdowns. A slightly more pronounced shadow: `box-shadow: 0 12px 32px rgba(22, 62, 130, 0.12)`.
4.  **Accent Depth:** Subtle 1px borders in a light gray-blue are used to define boundaries on white backgrounds where shadows are not appropriate.

## Shapes

The shape language is defined as **Rounded**, striking a balance between the "sharp" corporate look and the "playful" consumer look.

- **Standard Elements (Buttons, Inputs):** 8px (0.5rem) radius.
- **Large Elements (Cards, Featured Sections):** 16px (1rem) radius.
- **Containers (Modals, Large Banners):** 24px (1.5rem) radius.

Icons should follow a medium-stroke weight (approx. 1.5pt to 2pt) with slightly rounded terminals to match the corner radii of the UI containers.

## Components

**Buttons**
- **Primary:** Deep Royal Blue background with White text. High-contrast, sharp, and authoritative.
- **Secondary:** Transparent with a Blue 2px border or Golden Yellow background for high-priority "Call to Success" actions like "Enroll Now".

**Cards**
- Cards are the primary vessel for course information. They must feature a 16px corner radius, a white background, and a Level 1 shadow. Headers within cards should use Montserrat SemiBold.

**Input Fields**
- Inputs use a soft gray border (1px) that transitions to Deep Royal Blue on focus. Labels sit outside the field in Inter SemiBold 12px.

**Chips & Badges**
- Used for indicating course levels (e.g., "Beginner", "IELTS 7.5+"). These use the Golden Yellow background with Dark Blue text to ensure they are the first thing a user sees.

**Lists**
- Practice test lists and curriculum modules should use a "Zebra" striping pattern or subtle dividers, with 16px padding to ensure touch targets are accessible on tablets and mobile.