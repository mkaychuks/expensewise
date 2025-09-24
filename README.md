# Expensewise  

**Expensewise** is a modern expense tracker app built with [NuxtJS](https://nuxt.com/), [Nuxt UI](https://ui.nuxt.com/), [TypeScript](https://www.typescriptlang.org/), [TailwindCSS](https://tailwindcss.com/), and the [Gemini API](https://ai.google.dev/).  
It helps you stay on top of your finances by organizing your income and expenses into clean, actionable insights.  

---

## ✨ Features  

- 📊 **Track income & expenses** – add transactions easily. 
- 🤖 **AI-powered insights** – leverage the Gemini API for financial summaries and smart suggestions.  
- 🎨 **Modern UI** – built with Nuxt UI and styled using TailwindCSS.  
- ⚡ **Type-safe development** – fully typed with TypeScript for maintainability.  

---

## 🚀 Tech Stack  

- [Nuxt 3](https://nuxt.com/) – Vue-powered full-stack framework  
- [Nuxt UI](https://ui.nuxt.com/) – UI components for Nuxt  
- [TypeScript](https://www.typescriptlang.org/) – static typing  
- [TailwindCSS](https://tailwindcss.com/) – utility-first styling  
- [Gemini API](https://ai.google.dev/) – AI-powered insights and summaries  

---

## 📂 Project Structure  

```bash
expensewise/
│── components/       # Reusable UI components
│── composables/      # Composables and stores
│── pages/            # Application pages (Nuxt routing)
│── layouts/          # Page layouts
│── plugins/          # Nuxt plugins (e.g. Gemini API integration)
│── public/           # Static assets
│── types/            # TypeScript types
│── utils/            # Helper functions
│── nuxt.config.ts    # Nuxt configuration
│── tailwind.config.js# TailwindCSS configuration
```

## Clone the repo
```bash
git clone https://github.com/mkaychuks/expensewise.git
cd expensewise
```

## Install dependencies
```bash
npm install
```

## Set up environment variables
Create a `.env` file in the root directory and add your API keys:
```bash
GEMINI_API_KEY=your_api_key_here
```

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
