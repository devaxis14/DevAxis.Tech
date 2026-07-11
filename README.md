# DevAxis.Tech.

A modern, high-performance corporate website built for DevAxis, a web design and development agency in Kochi, Kerala.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Design System & Branding
- **Brand Primary (Coral):** `#E85D4C` (Used for accents, buttons, decorative dots, and hover states)
- **Brand Dark (Deep Navy):** `#101828` (Used for dark sections like Services)
- **Card Backgrounds:** `#151515` 
- **Text:** White (`#FFFFFF`) for headings, Light Gray (`#A0A0A0` or `#98A2B3`) for paragraphs.

## Project Structure & Everything Created

### 1. Application Routing (`app/`)
- **`app/page.tsx`**: The main landing page. We stitched together all the individual components here to create the one-page scroll experience.
- **`app/layout.tsx`**: Contains the global HTML wrapper, imports the global CSS, and sets up metadata.
- **`app/globals.css`**: We stripped out the default Next.js boilerplate and set up our custom Tailwind directives and background color (`bg-[#FDFDFD]`).

### 2. UI Components (`app/components/`)
All sections of the landing page were built from scratch as highly modular React components:

- **`Navbar.tsx`**: 
  - A sticky header with glassmorphism (`backdrop-blur-md`).
  - Includes a fully responsive full-screen mobile menu overlay with smooth toggle animations.
- **`Hero.tsx`**: 
  - Split layout featuring a bold headline on the left and a descriptive subheading/CTA on the right.
  - Includes a dark, moody background image (`hero-bg.png`).
  - *Dev Note:* Features specific bottom padding (`pb-44`) designed to accommodate the overlapping FunFact section.
- **`FunFact.tsx`**: 
  - A statistics card (`250+ Projects`, etc.) designed to visually straddle the boundary between the Hero and Services sections.
  - *Dev Note:* Uses negative top margins (e.g., `-mt-44`) to pull up into the Hero space. It uses a transparent background for the top half (letting the Hero image show through) and an absolute positioned `#101828` background on the bottom half to seamlessly connect to the Services section below it. On mobile, stats stack vertically (`flex-col`) to prevent horizontal overflow.
- **`Services.tsx`**: 
  - A dark section (`#101828`) showcasing digital offerings.
  - *Dev Note:* Desktop uses an asymmetric 4-column staggered masonry layout (achieved via alternating `mt-24` classes). Mobile uses a 2-column grid with a taller `aspect-[3/4]` ratio to make images prominent.
- **`About.tsx`**: 
  - A clean, light-themed section describing the agency's mission and team, featuring a large image and bold typography.
- **`Portfolio.tsx`**: 
  - A grid of recent work. Features interactive category tabs (All, Web Design, E-commerce, etc.) and hover-state overlays that reveal project titles and descriptions.
- **`Testimonials.tsx`**: 
  - A clean carousel/grid of client reviews with a warm, trustworthy aesthetic.
- **`Contact.tsx`**: 
  - The footer section featuring a contact form, social links, and a call-to-action for new clients.
- **`Footer.tsx`**: 
  - The bottom bar containing copyright info and secondary links.

### 3. Image Assets (`public/images/`)
We generated and imported custom images to avoid using generic placeholders:
- **Branding**: `devaxis-logo.png`
- **Hero**: `hero-bg.png`
- **Services**: `service-webdesign.png`, `service-webdev.png`, `service-ecommerce.png`, `service-seo.png`
- **Portfolio**: `portfolio-ecommerce.png`, `portfolio-fitness.png`, `portfolio-healthcare.png`, `portfolio-realestate.png`, `portfolio-restaurant.png`, `portfolio-travel.png`

## Important Development Notes
- **The "Seam" Overlap:** If you need to adjust the vertical spacing between the Hero and Services sections, you MUST update both `Hero.tsx` (the `pb-*` padding) and `FunFact.tsx` (the `-mt-*` margins and the `top-*` positioning of the absolute background div) so they mathematically match. Otherwise, a white gap will appear.
- **Images:** All static images and placeholder graphics are located in the `/public/images/` directory and are rendered using the Next.js `<Image />` component for optimization.

## Getting Started

First, install dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
