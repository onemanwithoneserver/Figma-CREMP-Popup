# React + TypeScript + MUI Project Setup

## Project Structure

```
src/
├── assets/          # Images, fonts, etc.
├── components/      # Reusable UI components
├── pages/           # Page components
├── layouts/         # Layout components
├── hooks/           # Custom React hooks
├── services/        # API services
├── utils/           # Utility functions
├── styles/          # Theme and global styles
├── App.tsx          # Main app component
└── main.tsx         # Entry point
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Dependencies

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **MUI (Material UI)** - UI component library
- **react-router-dom** - Routing

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Absolute Imports

Use `@/` for imports from `src/`:

```typescript
import Button from '@/components/Button'
import { theme } from '@/styles/theme'
```
