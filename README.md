# React Demo

A modern React application built with Esmx framework, featuring Tailwind CSS and shadcn/ui components.

## 📦 Tech Stack

- **Framework**: [Esmx](https://esmx.dev) - Next generation micro-frontend framework
- **UI Framework**: React 19
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Build Tool**: Rspack
- **Type Checking**: TypeScript

## 🚀 Quick Start

### Install Dependencies

```bash
pnpm install
```

### Development Environment

```bash
pnpm dev
```

Visit http://localhost:3000 to see the development environment.

### Production Build

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

## 📁 Project Structure

```
react-demo/
├── src/
│   ├── app.tsx                    # Root app component
│   ├── create-app.tsx             # App factory
│   ├── entry.client.tsx           # Client entry
│   ├── entry.server.tsx           # Server entry
│   ├── entry.node.ts              # Node config
│   │
│   ├── pages/                     # 📄 Pages
│   │   ├── home/
│   │   │   └── index.tsx
│   │   └── about/
│   │       └── index.tsx
│   │
│   ├── components/                # 🧩 Components
│   │   ├── layout/                # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── index.ts
│   │   └── ui/                    # UI primitives (shadcn/ui)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── index.ts
│   │
│   ├── lib/                       # 🛠️ Utilities
│   │   ├── utils.ts               # cn() helper for Tailwind
│   │   └── index.ts
│   │
│   ├── hooks/                     # 🎣 Custom React hooks
│   ├── utils/                     # 🔧 Utility functions
│   ├── types/                     # 📝 TypeScript types
│   ├── styles/                    # 🎨 Global styles
│   │   └── globals.css            # Tailwind CSS
│   └── assets/                    # 🖼️ Static assets
│
├── components.json                # shadcn/ui config
├── tailwind.config.js             # Tailwind config
├── postcss.config.js              # PostCSS config
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Adding shadcn/ui Components

To add more shadcn/ui components, you can use the CLI:

```bash
npx shadcn@latest add [component-name]
```

Or manually copy components from [shadcn/ui](https://ui.shadcn.com/docs/components).

## 📚 Additional Resources

- [Esmx Documentation](https://esmx.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)

