# helpme-car

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

{/* <section className="relative max-w-6xl mx-auto bg-gradient-to-br z-20 from-cyan-300 to-white sm:mt-10">
  <h2 className="font-space text-xl md:text-3xl lg:text-5xl font-bold text-zinc-700 p-8 mx-2 md:mx-5">A little bit about HelpMe-Car site</h2>
  <section className="relative flex flex-col md:flex-row justify-between ml-1 md:ml-3 lg:ml-10 md:my-5">            
    
    <article className="w-[80vw] sm:w-[95%] md:max-w-[50%] mx-auto mb-8">
      <Link 
        to='/regrules'
          className={`${linksClass}`}
            aria-label="Again, this button will take you to rules and regulations"
      >
        Rules & Regulations
      </Link>
      <div className={`${linkClass}`}>
        <p>Who should be using it & rules</p>
        <p>Please do not use whilst driving 
          (you shouldn't be reading this)</p>
        <p>It is illegal to use your phone whilst driving</p>
      </div>
      <br />
      <Link 
        to='/reghelp' 
          className={`${linksClass}`}
            aria-label="This button will take you to the helpfulness page"
      >
        Why people should help
      </Link>
      <div className={`${linkClass}`}>
        <p>Why be helpful?</p>
        <p>Don't need to sign up to help someone</p>
        <p>Be helpful </p>
      </div>
      <br />
      <Link 
        to='/search' 
          className={`${linksClass}`}
            aria-label="This is another button to go to the car search page"
      >
        Search for your car
      </Link>
      <div className={`${linkClass}`}>
        <p>This way to search for your car, or a family member or friend's</p>
      </div>
      <br />
      <Link
        to='/regsafety' 
          className={`${linksClass}`}
            aria-label="This button takes you to the safety page where some stats are presented"
      >
        Car stats / accidents 2018
      </Link>
      <div className={`${linkClass}`}>
        <a 
          rel='noopener noreferrer' 
            target='_blank' 
              href='https://www.gov.uk/government/collections/road-accidents-and-safety-statistics'
                className="text-cyan-500 font-bold"
                  aria-label="This link goes to an offical site of tehe Department For Transport"
        >
          <p>Accident reports from The Department of Transport Statistics </p>
        </a>
        <p>RAS50002 & RAS20002 DOT Statistics</p>
      </div>
      <br />
      <Link 
        to='/' 
          className={`${linksClass}`}
            onClick={() => toast.success(`Isn't the neon glow good?`)}
              aria-label="This button will take you back to the landing page"
      >
        Landing page
      </Link>
      <div className={`${linkClass}`}>
        <p>Want to start from the beginning </p>
      </div>
    </article>

    <article className={`${shimmerClass} z-10 flex w-[80vw] mx-auto sm:w-[95%] md:max-w-[45%] mb-8 bg-search-combine bg-standard md:bg-fixed shadow-[inset_5px_5px_10px_rgba(255,255,255,0.2)] rounded-2xl border border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(34,211,238,0.3)] transition-all duration-500 group overflow-hidden`}>
      <div className="flex flex-col min-h-[500px] landscape:min-h-[850px] p-8 items-center justify-center my-auto bg-zinc-900/30 group-hover:bg-zinc-900/10 transition-colors duration-500">
        <div className="font-space text-2xl md:text-3xl lg:text-4xl text-white font-extrabold text-center leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500">
          Maybe cars aren't for you... <br/>
          <a 
            href="https://www.deere.co.uk/en-gb/products-and-solutions/harvesting/combines"
              target="_blank"
                rel="noopener noreferrer"
                  className="text-yellow-400"
          >
            Maybe you would prefer a Combine Harvester?
          </a>
        </div>
      </div>
    </article>
  </section>
</section> */}

{/* {leaderboard.map((entry: any, index: number) => (
  <motion.li 
    key={entry.clerkId}
      variants={rowVariants}
        className="flex justify-between items-center inter p-2 sm:p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
  >
    <div className="flex items-center gap-4">
      <span className="text-lg sm:text-2xl font-mono text-zinc-500 dark:text-zinc-100">#{index + 1}</span>
      <span className="text-lg sm:text-xl font-semibold text-gray-500 dark:text-gray-100">{entry.username}</span>
    </div>
    <div className="flex gap-6 items-center">
      <span className="text-xs sm:text-sm text-cyan-400">{entry.carsHelped} Car(s)</span>
      <span className="text-lg sm:text-2xl font-bold text-yellow-300">{entry.starsGiven} ⭐</span>
    </div>
  </motion.li>
))} */}