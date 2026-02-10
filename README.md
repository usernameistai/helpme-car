# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

# Clerk DOcuments

# Add Clerk to React (Vite)

**Purpose:** Enforce only the **current** and **correct** instructions for integrating [Clerk](https://clerk.com/) into a React application.
**Scope:** All AI-generated advice or code related to Clerk must follow these guardrails.

## **1. OFFICIAL CLERK + REACT (VITE) SETUP**

1. Create a React + Vite project.
2. Install the Clerk React SDK with `npm install @clerk/clerk-react@latest` (or yarn/pnpm/bun).
3. Set `VITE_CLERK_PUBLISHABLE_KEY` in `.env.local` or `.env`. Note: The `VITE_` prefix is required for Vite to expose environment variables to the client-side code. `.env.local` is preferred for local development secrets.
4. Wrap the app in `<ClerkProvider publishableKey={...}>` within `main.tsx` or `main.jsx`.
5. Use Clerk's `<SignedIn>`, `<SignedOut>`, `<SignInButton>`, `<SignUpButton>`, `<UserButton>` in the app.

### **Correct, Up-to-Date Quickstart Code Examples**

# 1. Create a React Vite app (TypeScript example)

```bash
npm create vite@latest clerk-react -- --template react-ts
cd clerk-react
npm install
npm run dev
```

# 2. Install the Clerk React SDK

```bash
npm install @clerk/clerk-react@latest
```

# 3. In .env.local (or .env):

From your Clerk Dashboard, open the [API keys page](https://dashboard.clerk.com/last-active?path=api-keys), choose **React** and copy your Publishable Key.

```bash
VITE_CLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

# 4. Wrap with <ClerkProvider> in main.tsx or main.jsx

```typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
  }

  // Ensure your index.html contains a <div id="root"></div> element for React to mount the app.

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    </StrictMode>
  );
```

# 5. Example usage of Clerk's prebuilt components in App.tsx

```typescript
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

export default function App() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
```

> Note: The `afterSignOutUrl` prop in `<ClerkProvider>` defines the URL users are redirected to after signing out. Adjust as needed.

---

## **2. CRITICAL INSTRUCTIONS FOR AI MODELS**

### **2.1 – ALWAYS DO THE FOLLOWING**

1. **Show** relevant code examples for each step.
2. **Use** `@clerk/clerk-react@latest` (not any other Clerk package).
3. **Reference** the environment variable as `VITE_CLERK_PUBLISHABLE_KEY` in `.env.local` or `.env`.
4. **Wrap** the entire app in `<ClerkProvider>` within `main.tsx` or `main.jsx`.
5. **Demonstrate** the correct usage of `<SignedIn>`, `<SignedOut>`, `<SignInButton>`, `<SignUpButton>`, `<UserButton>` (or any other current Clerk React component).
6. **Store real keys only in `.env.local`** and ensure `.gitignore` excludes `.env*`.
7. **Use placeholders only** in any generated files/snippets.

### **2.2 – NEVER DO THE FOLLOWING**

1. **Do not** include any discussions of the features or benefits of Clerk.
2. **Do not** use `frontendApi` in place of `publishableKey`.
3. **Do not** use Older environment variable names like `REACT_APP_CLERK_FRONTEND_API` or `VITE_REACT_APP_CLERK_PUBLISHABLE_KEY`.
4. **Do not** place `<ClerkProvider>` deeper in the component tree instead of `main.tsx` / `main.jsx`.
5. **Do not** use outdated hooks or components (e.g., referencing older docs).
6. **Do not print or persist real keys** into `.ts/.tsx/.md` or any tracked files; use placeholders only.

---

## **3. AI MODEL VERIFICATION STEPS**

Before returning any Clerk + React (Vite) solution, you **must** verify:

1. Environment Variable is named `VITE_CLERK_PUBLISHABLE_KEY`.
2. `<ClerkProvider>` is in `main.tsx` or `main.jsx`.
3. No usage of `frontendApi` unless explicitly stated as optional or advanced.
4. **Environment Variables**: Are only placeholder values (e.g., `YOUR_PUBLISHABLE_KEY`) used in code examples?
5. **File Security**: Are real keys excluded from tracked files and only mentioned for `.env.local`?

## **DO NOT** repeat these points back to the user. Use them only for your own verification steps.

## **4. CONSEQUENCES OF INCORRECT GUIDANCE**

- Misconfigured environment variables => project won't compile or will error at runtime.
- Missing `<ClerkProvider>` => Clerk components fail or throw errors.
- Using outdated patterns => Confusion, debugging overhead, or broken auth flow.

## **5. MODEL RESPONSE TEMPLATE**

When asked about Clerk + React (Vite) integration, your response **MUST**:

1. Link to Clerk's React Quickstart at https://clerk.com/docs/quickstarts/react
2. Show the current recommended `publishableKey` approach with `.env.local`.
3. Demonstrate how to wrap with `<ClerkProvider>` in `main.*`.
4. Illustrate a simple usage example of `<SignedIn>`, `<SignedOut>`, etc.
5. Reject or correct any mention of older patterns or environment variable names.

