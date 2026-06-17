# Visvesvaraya Research & Innovation Foundation (VRIF) Website

An interactive, premium, light-themed web portal designed for the **Visvesvaraya Research & Innovation Foundation (VRIF)**, the innovation and entrepreneurship arm of Visvesvaraya Technological University (VTU), Belagavi.

## 🚀 Features

- **Premium Light Theme UI**: Translucent glassmorphism backdrops, elegant borders, Outfit/Inter-based modern typography, and a cohesive royal blue & violet color palette.
- **Dynamic 3D Launch Constellation (Hero Animation)**:
  - Concentric orbiting constellation rings spinning in opposing directions.
  - 3D tilted orbiting rings with custom glowing nodes.
  - Pulsing central **VRIF Innovation Hub** core surrounded by clockwise/counter-clockwise dashed outer rings.
  - Floating and interactive **Launch (Rocket)**, **Ideate**, **Scale**, and **Connect** cards linked to the central core via animated SVG connector lines.
- **Scroll-Controlled 3D Gyroscope**: Concentric circles rotating in 3 dimensions tracking the user's scroll speed and page position.
- **Interactive Custom Rocket Cursor**: A premium hover cursor featuring custom animations, sizing transitions, and a hidden interactive click overlay that automatically handles backdrop overlaps (high z-index).
- **Integrated Brochure Metrics**: Fully featured 12-stat grid highlighting engagement (students, founders, prototypes, incubation months, funding grants).
- **Interactive Modals**: Seamless details panel with background scrolling locks and dynamic blur overlays.
- **Mobile Responsive Layout**: Vertically-stacking columns, collapsing mobile hamburger navigation drawers, and auto-scaling SVG viewports.

---

## 🛠️ Tech Stack

- **Core Framework**: React 19 / [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS
- **Animation Framework**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript & HTML5 / CSS3

---

## 📦 Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.17.0` or higher (Recommended: `v20.x` or `v22.x`)
- **NPM**: `v9.x` or higher (or Yarn / PNPM)

---

## 🔧 Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/UroojAKI/VRIF-WEBSITE.git
   cd VRIF-WEBSITE
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the live site.

4. **Build for Production**:
   ```bash
   npm run build
   ```
   This generates an optimized build in the `.next` directory.

5. **Start Production Server**:
   ```bash
   npm run start
   ```

---

## 📁 Project Structure

```text
├── public/                 # Static assets (images, logos, icons)
│   └── images/             # Cropped and optimized branding files
├── src/
│   ├── app/                # App router pages, layouts, and global styles
│   │   ├── page.tsx        # Main application layout and interactive sections
│   │   └── globals.css     # Tailored styling rules, scrollbar keyframes, animations
│   └── components/         # Reusable React UI widgets
│       ├── AnimatedCounter.tsx
│       ├── ProgramDetailsModal.tsx
│       └── RocketCursor.tsx
├── package.json            # Configuration and project scripts
├── tsconfig.json           # TypeScript configuration
└── tailwind.config.ts      # Tailwind setup
```
