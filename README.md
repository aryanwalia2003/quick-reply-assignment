# 📄 Quick Reply Assignment — Research Paper Tracker

A **Research Paper Tracking** app built with **React 19**, **TypeScript**, **Vite**, **Supabase**, and **Tailwind CSS 4**. The project follows a strict **Feature-Driven Clean Architecture** for maximum modularity, debuggability, and scalability.

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI Library |
| TypeScript | 5.9 | Type Safety |
| Vite | 7 | Dev Server & Bundler |
| Supabase | 2.x | Backend-as-a-Service (Postgres DB + Auth) |
| Tailwind CSS | 4 | Utility-first Styling |
| Recharts | 3.x | Data Visualization / Analytics Charts |
| React Router | 7 | Client-side Routing |
| Lucide React | — | Icon Library |

---

## 📁 Folder Structure

```
src/
├── app/                          # 🚀 App bootstrap (routing, providers, global config)
│
├── features/                     # 🧩 Domain features (each feature = self-contained module)
│   ├── papers/                   #    📑 Research Papers feature
│   │   ├── domain/               #       🧠 Business logic (entities, use cases)
│   │   ├── infrastructure/       #       🌐 API / DB queries (Supabase calls)
│   │   ├── application/          #       🔗 State management (hooks, stores)
│   │   ├── presentation/         #       🎨 UI components & pages
│   │   └── index.ts              #       📦 Barrel file (public API of this feature)
│   │
│   └── analytics/                #    📊 Analytics / Charts feature
│       ├── domain/               #       🧠 Business logic
│       ├── infrastructure/       #       🌐 Data fetching
│       ├── application/          #       🔗 State management
│       ├── presentation/         #       🎨 Charts, dashboards
│       └── index.ts              #       📦 Barrel file
│
├── shared/                       # ♻️  Reusable code (NOT feature-specific)
│   ├── constants/                #    📌 App-wide constants
│   ├── hooks/                    #    🪝 Shared React hooks
│   ├── infrastructure/           #    🌐 Shared clients (e.g. Supabase singleton)
│   ├── types/                    #    📝 Shared TypeScript types
│   ├── ui/                       #    🎨 Shared UI components (Atomic Design)
│   └── utils/                    #    🔧 Pure utility functions
│
├── App.tsx                       # Root React component
├── main.tsx                      # Vite entry point
└── index.css                     # Global styles
```

---

## 🏗️ Architecture Layers — Kya Kahan Milega?

Har feature ke andar **4 layers** hain, aur har layer ki ek **fixed responsibility** hai. Ye Clean Architecture follow karta hai:

### 1. 🧠 `domain/` — Business Logic Yahan Hai

> **Kya hai:** Pure business rules — koi React nahi, koi API nahi, koi side-effect nahi.

| What | Naming Pattern | Example |
|------|---------------|---------|
| **Entities** | `PascalCase.entity.ts` | `ResearchPaper.entity.ts` |
| **Use Cases** | `verbNoun.usecase.ts` | `addPaper.usecase.ts` |

**Entity example** (`ResearchPaper.entity.ts`):
- Business model define karta hai (title, author, domain, citation count etc.)
- Validation logic — `isValid()`, `isCompleted()`
- DB row → clean camelCase conversion — `fromSupabase()` factory method
- ⚠️ Yahan koi HTTP call ya React import **nahi** hoga

**Use Case example:**
- Ek file = ek action (e.g., "add paper", "delete paper", "filter papers")
- Infrastructure ko as parameter accept karta hai, direct API call nahi karta

---

### 2. 🌐 `infrastructure/` — DB Queries & API Calls Yahan Hai

> **Kya hai:** Bahar ki duniya se baat karna — Supabase, HTTP, localStorage, etc.

| What | Naming Pattern | Example |
|------|---------------|---------|
| **API Requests** | `actionEntityApi.request.ts` | `fetchPapersApi.request.ts` |

- Supabase client use karke actual `.select()`, `.insert()`, `.update()`, `.delete()` queries **yahan** likhte hai
- Koi business decision **nahi** — sirf data fetch/send
- Shared Supabase client: `shared/infrastructure/supabase.client.ts`

---

### 3. 🔗 `application/` — State Management & Hooks Yahan Hai

> **Kya hai:** Domain aur Presentation ke beech ka bridge — hooks, stores, loading/error states.

| What | Naming Pattern | Example |
|------|---------------|---------|
| **Hooks** | `useActionNoun.hook.ts` | `usePapers.hook.ts` |
| **Stores** | `feature.store.ts` | `papers.store.ts` |

- Hook **sirf use case call** karta hai, direct API nahi
- Loading state, error state, data caching sab **yahan** manage hota hai
- UI ko clean data deta hai

---

### 4. 🎨 `presentation/` — UI Components & Pages Yahan Hai

> **Kya hai:** Jo user ko dikhta hai — React components, pages, layouts.

| What | Naming Pattern | Example |
|------|---------------|---------|
| **Components** | `PascalCase.component.tsx` | `PaperCard.component.tsx` |
| **Pages** | `PascalCase.page.tsx` | `PapersPage.page.tsx` |

- **Zero business logic** — sirf props receive karo aur hooks call karo
- Visual-focused, easily testable
- Koi API call ya complex state logic **nahi** hoga yahan

---

## ♻️ `shared/` — Reusable Global Code

Jo code **kisi ek feature se tied nahi** hai, wo `shared/` mein jaata hai:

| Folder | Purpose | Example File |
|--------|---------|-------------|
| `shared/types/` | TypeScript types for DB schema & enums | `supabase.type.ts` — full DB schema, `ReadingStage`, `ResearchDomain`, `ImpactScore` types |
| `shared/constants/` | App-wide constant arrays | `paperOptions.constant.ts` — dropdown-ready arrays of reading stages, domains, impact scores |
| `shared/infrastructure/` | Shared external clients | `supabase.client.ts` — singleton Supabase client |
| `shared/hooks/` | Shared React hooks | Reusable hooks not tied to a feature |
| `shared/ui/` | Shared UI components (Atomic Design) | `Button`, `Input`, `Spinner` (atoms), `FormField` (molecules) |
| `shared/utils/` | Pure utility functions | `formatDate.util.ts`, `validateEmail.util.ts` |

---

## 🔑 Key Conventions

| Rule | Detail |
|------|--------|
| **Absolute imports** | `@/features/...`, `@/shared/...`, `@/app/...` — no `../../../../` |
| **Barrel files** | Every folder exports via `index.ts` |
| **Max file size** | ~150 lines, zyada ho toh refactor karo |
| **No generic filenames** | `helpers.ts`, `utils.ts`, `services.ts` etc. **forbidden** |
| **Function naming** | `handle*` (events), `is*/has*` (booleans), `get*` (getters), `validate*`, `format*` |

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Set environment variables (create .env.local)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Run dev server
npm run dev
```

---

## 🐛 Debugging Guide

Architecture se debug karna easy hai — bug ka type dekhna aur sahi layer mein jaana:

| Bug Type | Look In |
|----------|---------|
| UI not rendering correctly | `presentation/` |
| Wrong data / stale state | `application/` (hooks/stores) |
| Business rule broken (e.g., validation) | `domain/` (entities/use cases) |
| API call failing / wrong response | `infrastructure/` (request files) |
| Wrong types / schema mismatch | `shared/types/` |

---

## 📊 Data Flow (Request Lifecycle)

```
User clicks button
       │
       ▼
┌─────────────────┐
│  presentation/   │  ← Component calls a hook
└────────┬────────┘
         ▼
┌─────────────────┐
│  application/    │  ← Hook calls a use case
└────────┬────────┘
         ▼
┌─────────────────┐
│  domain/         │  ← Use case runs business logic
└────────┬────────┘
         ▼
┌─────────────────┐
│ infrastructure/  │  ← Makes API/DB call to Supabase
└─────────────────┘
         │
         ▼
    Supabase DB
```

Data flows **downward** through the layers. Each layer only talks to the one directly below it — no skipping!
