---
name: DreamLexi
colors:
  surface: '#f3fcf0'
  surface-dim: '#d4ddd1'
  surface-bright: '#f3fcf0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#edf6ea'
  surface-container: '#e7f0e5'
  surface-container-high: '#e2ebdf'
  surface-container-highest: '#dce5d9'
  on-surface: '#161d16'
  on-surface-variant: '#44474e'
  inverse-surface: '#2a322b'
  inverse-on-surface: '#eaf3e7'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#485f84'
  primary: '#031f41'
  on-primary: '#ffffff'
  primary-container: '#1d3557'
  on-primary-container: '#879ec6'
  inverse-primary: '#b0c7f1'
  secondary: '#795900'
  on-secondary: '#ffffff'
  secondary-container: '#fec330'
  on-secondary-container: '#6f5100'
  tertiary: '#002234'
  on-tertiary: '#ffffff'
  tertiary-container: '#003953'
  on-tertiary-container: '#6fa4c7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#b0c7f1'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#30476a'
  secondary-fixed: '#ffdfa0'
  secondary-fixed-dim: '#f8bd2a'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#c7e7ff'
  tertiary-fixed-dim: '#98cdf2'
  on-tertiary-fixed: '#001e2e'
  on-tertiary-fixed-variant: '#064c6b'
  background: '#f3fcf0'
  on-background: '#161d16'
  surface-variant: '#dce5d9'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  container-max: 1280px
---

## Brand & Style
The design system embodies a **Corporate / Modern** aesthetic with a specific focus on the intersection of academic research and high-technology. It is designed to feel authoritative yet illuminating, mirroring the educational aspirations of its users.

The visual language is influenced by Material Design 3, emphasizing functional clarity, intentional use of color for hierarchy, and a structured, "logical" beauty. It balances a deep, stable navy with a vibrant, optimistic gold to evoke feelings of trust, intelligence, and a breakthrough "lightbulb" moment. The target audience includes researchers, educators, and advanced learners who value precision and a distraction-free environment.

## Colors
The palette is rooted in the "Deep Navy" (#1D3557), used for primary brand actions, high-level headers, and critical UI framing to establish authority. "Vibrant Gold" (#FBC02D) serves as the primary accent, used sparingly for high-visibility highlights, secondary interactive states, and achievement markers.

A supporting "Steel Blue" (#457B9D) provides a softer alternative for secondary actions and categorization, while "Soft Bone" (#F1FAEE) acts as the foundation for the background, offering a warmer, more eye-friendly alternative to pure white that feels more like premium paper or a research journal.

## Typography
This design system uses **Geist** exclusively to maintain a technical, clean, and highly legible appearance across all interfaces. The typeface’s monospaced-influenced proportions provide a "developer-friendly" and "precise" feel that suits research-oriented software.

Headlines use bold weights and tighter letter spacing to create a strong visual anchor. Body text is optimized for long-form reading with a generous 1.5x line-height. Labels and captions are set with slightly increased letter spacing and semi-bold weights to ensure they remain distinct even at small sizes.

## Layout & Spacing
The layout follows a **Fluid Grid** system based on an 8px base unit (with 4px increments for micro-spacing). 

- **Desktop:** 12-column grid with 24px gutters and a maximum container width of 1280px.
- **Tablet:** 8-column grid with 24px gutters and 32px side margins.
- **Mobile:** 4-column grid with 16px gutters and 16px side margins.

Information density should be moderate; use generous vertical padding between sections to allow content to "breathe," reflecting a calm, focused research environment.

## Elevation & Depth
Elevation is conveyed through **Tonal Layers** and extremely subtle **Ambient Shadows**. Instead of heavy shadows, depth is primarily created by shifting the background color of containers.

- **Level 0 (Surface):** The default background (#F1FAEE).
- **Level 1 (Card/Container):** Pure white surfaces with a 1px border in a 10% opacity of the Navy.
- **Level 2 (Active/Hover):** A soft, diffused shadow (0px 4px 20px rgba(29, 53, 87, 0.08)) that makes the element feel as if it is floating slightly above the page.
- **Overlays:** Modals and menus use a backdrop blur (8px) combined with a semi-transparent Navy scrim (20% opacity) to maintain focus.

## Shapes
The shape language uses **Rounded (0.5rem)** corners as the standard. This softens the technical nature of the Geist font and the Navy color palette, making the interface feel more approachable and modern.

- **Standard Elements (Buttons, Inputs):** 8px (0.5rem) radius.
- **Large Containers (Cards, Modals):** 16px (1rem) radius.
- **Small Accents (Chips, Tags):** 4px (0.25rem) radius or fully rounded pill-shape for status indicators.

## Components
- **Buttons:** Primary buttons use the Deep Navy background with white text. Secondary buttons use a Navy outline with the Vibrant Gold for the text color or icon. Ghost buttons use Navy text with no background.
- **Input Fields:** Use a white background with an 8px radius. The focus state should feature a 2px border in Vibrant Gold to highlight the active area clearly.
- **Chips:** Small, pill-shaped elements used for tags or filters. Selected chips should use a Navy background; unselected chips should use a 5% Navy tint background.
- **Cards:** White surfaces with an 8px corner radius and a subtle 1px border. On hover, apply Level 2 elevation (diffused shadow).
- **Progress Bars:** Use the Vibrant Gold for the progress indicator against a 10% Navy track to provide high contrast and a sense of "achievement."
- **Checkboxes & Radios:** Should use the Navy color for the selected state, ensuring high contrast against the light background.