<div align="center">
  <img src="./public/icons/app-icon.png" alt="DataPath Logo" width="120" height="120" />
  <br/>
  <h1>DATAPATH</h1>
  <p>
    <b>A mobile-first Data Analyst roadmap tracker with a premium "iOS 26 Liquid Glass" UI.</b>
  </p>
  <br/>

  <p>
    <a href="https://aneeshsolanki22-hue.github.io/DATAPATH/">View Live Demo</a> ·
    <a href="#features">Features</a> ·
    <a href="#tech-stack">Tech Stack</a> ·
    <a href="#getting-started">Getting Started</a>
  </p>
</div>

<hr />

## ✨ About DataPath

DataPath is a beautifully designed, mobile-first Progressive Web App (PWA) built specifically to track progress through a comprehensive Data Analysis course. Designed with a stunning, ultra-modern "Liquid Glass" theme (inspired by a futuristic iOS 26 aesthetic), it offers an immersive app-like experience purely on the web.

The core of DataPath is driven by a **1-4-7 Spaced Repetition System**—ensuring you truly memorize what you learn. Learn a topic on Day 1, revise on Day 4, and re-revise on Day 7 to master it.

<br/>

## 🚀 Features

- **📱 Mobile-First "Liquid Glass" UI**: A state-of-the-art dark mode UI tailored for iPhone screens (specifically optimized for iPhone 13 dimensions), featuring a 4-level deep blur hierarchy, amber-glowing accents, and silky-smooth spring-physics animations.
- **🧠 1-4-7 Spaced Repetition Algorithm**: Automatically tracks which topics you've covered and alerts you when it's time for a Day 4 or Day 7 revision.
- **📊 Interactive Skill Analytics**: A custom-built, radial-gradient skill radar chart tracking proficiency across Python, NumPy, Pandas, Statistics, Visualization, and Projects.
- **📅 30-Day Heatmap**: A GitHub-style contribution heatmap visualizing your daily consistency over the last month.
- **🔋 Progressive Web App (PWA)**: Installable directly to your device home screen. Features network-first service worker caching for offline resilience and blazing fast load times.
- **🗂 Rich Course Structure**: Tracks progress across 27 distinct sections consisting of 244 individual topics (~21.5 hours of learning).

<br/>

## 🛠 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (`App.css`) with custom CSS Variables & Glassmorphism System
- **Typography**: Syne (Headings) & JetBrains Mono (Data/Code/Labels)
- **Data Persistence**: `localStorage` (No backend required)
- **Deployment**: GitHub Pages (using GitHub Actions)

<br/>

## 🎨 Design System: "DataPath × iOS 26"

The design system blends a stealthy “dark tools” aesthetic with premium native mobile interactions:
- **Colors**: Deep void backgrounds (`#060606`) giving way to frosted translucent overlays, accented by a bold Amber (`#F59E0B`).
- **Typography**: The tension between the organic, stylish **Syne** and the structured, analytical **JetBrains Mono**.
- **Delight**: Dynamic empty states, bouncy card expansions, and custom emoji metadata for every section.

<br/>

## 📦 Getting Started

Running DataPath locally is simple. There are no backend dependencies.

```bash
# Clone the repository
git clone https://github.com/aneeshsolanki22-hue/DATAPATH.git

# Navigate to the project folder
cd DATAPATH

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Then, open [`http://localhost:5173/DATAPATH/`](http://localhost:5173/DATAPATH/) in your browser. _Tip: For the best experience, toggle Chrome DevTools to a mobile viewport (e.g., iPhone 13)._

<br/>

## 部署 Deployment

This project uses **GitHub Actions** to automatically build and deploy the React application to GitHub Pages whenever changes are pushed to the `main` branch. 

Check out the workflow file here: [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)

<hr />

<div align="center">
  Built with ❤️ for Data Analysts.
</div>
