# Portafolio - Nicolas Schernetzki

Personal portfolio website built with a unique RPG/Fantasy theme showcasing my journey as a FullStack Developer.

## Features

- **Character Profile** - Interactive hero stats and progression system
- **Skills Tree** - Visual skill development paths (Frontend, Backend, Tools)
- **Missions** - Education and certifications with PDF viewing
- **Story** - Personal journey narrative
- **Bestiary** - Technical skills compendium with mastery levels
- **Projects** - Artifact forge for projects
- **Contact** - Interactive contact form with Formspree integration

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Motion (animations)
- **Icons**: Lucide React
- **Backend**: Express.js (server-side API)
- **Deployment**: GitHub Pages

## Getting Started

```bash
# Install dependencies
npm install

# Development server (with API)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

The repository is configured for GitHub Pages deployment via GitHub Actions.

1. Push to `main` branch
2. GitHub Actions automatically builds and deploys
3. Site available at: https://ordinaldragon.github.io/Portafolio/

## Environment Variables

Create a `.env` file for custom configuration:

```env
VITE_FORMSPREE_ID=your_formspree_id
BASE_URL=/
```

## License

MIT