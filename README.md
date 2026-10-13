# WonderGlass Technologies • Architectural Glass & Systems

A clean, modern, and high-performance luxury architecture and glazing firm website built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite**.

Designed for **WonderGlass Technologies UAE** — showcasing motorized vertical sliding glass façades (Vertilux), switchable smart privacy glass (PDLC), luxury SkyFold solariums, and automated architectural pergolas.

---

## ✨ Features & Architecture

1. **Header & Navigation ([Navbar.tsx](src/components/Navbar.tsx))**:
   - Official WonderGlass Technologies brand mark.
   - Smooth navigation menu: `About`, `Services`, `Projects`, `Gallery`, `Reviews`, `Location`, `Contact`.
   - Direction-aware scroll hide/reveal and mobile responsive drawer.

2. **Cinematic Hero ([Hero.tsx](src/components/Hero.tsx))**:
   - Depth typography with multi-layered parallax backdrop.
   - Curtain reveal opening animation and luxury modern villa framing.

3. **Brand Story ([About.tsx](src/components/About.tsx))**:
   - High-caliber editorial introduction to WonderGlass UAE engineering craft, European hardware, and thermal acoustic design.

4. **Product Offerings ([Services.tsx](src/components/Services.tsx))**:
   - Interactive accordion with smooth expandable cards:
     - **01 Smart Glass & Film** (PDLC Switchable Film, privacy on demand, solar heat rejection).
     - **02 Vertilux Guillotine Glass** (Motorized vertical sliding systems with balustrades).
     - **03 SkyFold & Skylights** (Motorized retractable glass solariums and bioclimatic pergolas).
     - **04 Bespoke Architectural Glass** (Curved structural facades, minimalist frameless systems).

5. **Projects Showcase ([Projects.tsx](src/components/Projects.tsx))**:
   - High-impact parallax imagery paired with frosted glass project details.

6. **Gallery ([Gallery.tsx](src/components/Gallery.tsx))**:
   - Asymmetric parallax masonry grid showcasing luxury installations.

7. **Reviews & Testimonials ([Reviews.tsx](src/components/Reviews.tsx))**:
   - Dark-contrast section featuring client and architect endorsements across Abu Dhabi and Dubai.

8. **Showroom & Interactive Map ([Location.tsx](src/components/Location.tsx))**:
   - Interactive hub switcher: **Abu Dhabi Flagship Showroom** (Al Sawari Tower B, Corniche) & **Dubai Regional Hub** (Al Quoz).
   - Real-time interactive Google Maps embed with one-click navigation links, direct telephone dialing, and address clipboard copying.
   - 1:1 scale mockups and visitor consultation highlight cards.

9. **Consultation Request Form ([Contact.tsx](src/components/Contact.tsx))**:
   - Validated inquiry form powered by `react-hook-form` and `zod`.

10. **AI Architectural Assistant ([ChatBot.tsx](src/components/ChatBot.tsx))**:
    - Floating AI assistant powered by OmniRoute Gateway for instant glazing and product recommendations.
    - Code-split and lazy-loaded to prevent initial bundle overhead.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8 with optimized manual chunk splitting
- **Styling**: Tailwind CSS v4 + Vanilla CSS tokens
- **Animations**: Motion (`motion/react`)
- **Smooth Scroll**: Lenis (`lenis/react`)
- **Validation**: React Hook Form + Zod
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd wg
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Configure `VITE_AI_BASE_URL` and `VITE_AI_API_KEY` for the AI assistant).*

### 3. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/          # Page sections & UI components
│   ├── ui/              # Reusable UI primitives (Reveal, ParallaxImage, Splash)
│   ├── About.tsx
│   ├── ChatBot.tsx      # Code-split AI Assistant
│   ├── Contact.tsx      # Inquiry form
│   ├── Footer.tsx
│   ├── Gallery.tsx
│   ├── Hero.tsx
│   ├── Location.tsx     # Showroom & Interactive Maps
│   ├── Navbar.tsx
│   ├── Projects.tsx
│   ├── Reviews.tsx
│   ├── Services.tsx
│   └── Stats.tsx
├── data/                # Structured static data & copy
├── lib/                 # Utility functions (cn, clsx)
├── services/            # API services (AI assistant)
├── types/               # Centralized TypeScript definitions
├── App.tsx              # Root application layout
├── index.css            # Design tokens & Tailwind entry
└── main.tsx             # Application mount point
```
