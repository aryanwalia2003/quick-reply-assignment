---
trigger: always_on
---

This project follows an extremely strict modular React architecture designed around the Single Responsibility Principle, high cohesion, low coupling, extreme debuggability, and predictable scalability. The goal is that every file has exactly one responsibility and its purpose can be understood instantly from its name and location. The architecture combines Feature-Driven Design, Clean Architecture layering, and Atomic UI structure. The codebase must feel predictable, searchable, and safe to refactor.

The project is organized primarily by feature. A feature represents a domain or capability such as auth, cart, products, checkout, dashboard, profile, etc. All code related to a feature lives inside its own feature folder. Nothing outside a feature should contain feature-specific logic. This allows entire features to be debugged, tested, or deleted without affecting the rest of the application.

The top level src structure must always follow this shape:

src
features
shared
app

The features folder contains domain features. The shared folder contains global reusable code that is not tied to any single feature. The app folder contains app bootstrap, routing, providers, and global configuration.

Each feature follows strict Clean Architecture layering. Every feature must contain the following layers in this exact order:

features/<feature-name>/domain
features/<feature-name>/infrastructure
features/<feature-name>/application
features/<feature-name>/presentation

No code may skip layers or mix responsibilities across layers.

The domain layer represents pure business logic and must be framework-agnostic. No React, no browser APIs, no HTTP, no localStorage, no external libraries that cause side effects. Domain code must be pure and testable with Node alone.

The domain layer contains entities and use cases.

Entities represent business models and business rules. An entity models a real concept in the domain and contains validation or transformation logic if needed. Entity file names must follow the pattern PascalCase.entity.ts. Examples include User.entity.ts, Product.entity.ts, CartItem.entity.ts, AuthToken.entity.ts. Entities must never import from React or infrastructure.

Use cases represent business actions the application can perform. Each use case must perform exactly one business action. Use case files must follow the naming pattern verbNoun.usecase.ts. Examples include loginUser.usecase.ts, logoutUser.usecase.ts, registerUser.usecase.ts, getCurrentUser.usecase.ts, addItemToCart.usecase.ts. The exported function name must exactly match the file name. A use case may depend on infrastructure abstractions passed as parameters, but must not directly call APIs itself.

The infrastructure layer represents interaction with the outside world. This includes HTTP APIs, browser storage, cookies, analytics, and third-party SDKs. This is the only layer allowed to perform side effects.

API request files must follow the naming pattern actionEntityApi.request.ts. Examples include loginApi.request.ts, registerApi.request.ts, getUserApi.request.ts, refreshTokenApi.request.ts. These files must contain only HTTP or external calls and must not contain business decisions.

The application layer orchestrates state and connects domain with presentation. This layer contains hooks, stores, and state orchestration. Hooks manage loading states, error states, and call use cases. Hooks must never call APIs directly. Hooks must only call use cases.

Hook files must follow the naming pattern useActionNoun.hook.ts. Examples include useLogin.hook.ts, useRegister.hook.ts, useCurrentUser.hook.ts, useLogout.hook.ts, useCart.hook.ts.

State stores must follow the naming pattern feature.store.ts. Examples include auth.store.ts, cart.store.ts, theme.store.ts.

The presentation layer contains React UI. This layer must contain zero business logic and minimal state logic. Components receive data via props and call hooks. Components must be easily testable and visually focused.

Components must follow the naming pattern PascalCase.component.tsx. Examples include LoginForm.component.tsx, LoginButton.component.tsx, AuthError.component.tsx, ProductCard.component.tsx.

Route pages must follow the naming pattern PascalCase.page.tsx. Examples include LoginPage.page.tsx, RegisterPage.page.tsx, DashboardPage.page.tsx.

Within presentation, Atomic Design principles must be followed for shared UI. Shared UI components live in the shared/ui folder and are divided into atoms, molecules, and organisms. Atoms are basic UI elements such as Button, Input, Spinner. Molecules combine atoms such as FormField or SearchBar. Organisms represent larger UI compositions such as Navbar, Sidebar, or LoginForm. Feature-specific components stay inside the feature folder and are not moved to shared unless reused across multiple features.

The shared folder contains code reusable across the entire app. It must never contain feature-specific logic. Shared contains shared/ui, shared/hooks, shared/utils, shared/constants, shared/types.

Utility files must follow the naming pattern specificAction.util.ts. Examples include formatDate.util.ts, validateEmail.util.ts, debounce.util.ts. A file named utils.ts or helpers.ts is forbidden. Each utility file must contain one logical function group with a clear purpose.

Constant files must follow the naming pattern descriptiveName.constant.ts. Examples include apiRoutes.constant.ts, appConfig.constant.ts.

Type files must follow the naming pattern PascalCase.type.ts or descriptive.type.ts. Examples include User.type.ts, ApiResponse.type.ts, Pagination.type.ts.

Every folder that exposes public functionality must contain an index.ts barrel file. Barrel files must export only the public API of that folder. Internal implementation details must not be exported. Features must be imported through their barrel file to enforce encapsulation.

Absolute imports must be used. Relative imports like ../../../../ are forbidden. Path aliases must be used such as @/features, @/shared, and @/app.

Function naming must be descriptive and intention revealing. Event handlers must start with handle such as handleClick or handleSubmit. Boolean functions must start with is or has such as isUserLoggedIn. Getter functions must start with get such as getUserFromCache. Validation functions must start with validate such as validatePassword. Formatter functions must start with format such as formatCurrency.

Files must remain small. Files exceeding roughly 150 lines should be refactored. Components must not contain business logic. Hooks must not contain API calls. API files must not contain UI logic. Domain must not depend on React or browser APIs.

The following file names are forbidden because they indicate multiple responsibilities or unclear ownership: helpers.ts, utils.ts, services.ts, common.ts, misc.ts, temp.ts, stuff.ts.

When debugging, the architecture must guide the developer. UI bugs belong in presentation. State orchestration bugs belong in application. Business logic bugs belong in domain. API or external interaction bugs belong in infrastructure. This separation is intentional and must be preserved.

The end goal is that any developer can read a file path and immediately know the purpose of the file without opening it. The codebase must feel predictable, modular, and easy to navigate.