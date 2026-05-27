---
name: browser-stability-first
description: Procedural guide for stabilizing browser-transpiled React/JS codebases. Use when fixing ReferenceErrors, TypeErrors (shadowing), or initialization issues in environments using in-browser Babel/Tailwind transformers.
---

# Browser Stability-First

## Design Philosophy
- **Hoisting over Closures:** In browser-transpiled environments (Babel standalone), closure-based scoping can be inconsistent. Prefer `function` declarations and `var` for constants to leverage native JS hoisting.
- **Explicit Global Namespace:** Use the `window` object as the definitive source of truth for cross-file shared entities. 
- **Zero Shadowing:** Never destructure variables from libraries (e.g., `React`) that share names with native JavaScript constructors (`Set`, `Map`, `Error`).

## Stability Workflows

### 1. The "Absolute Global" Pattern
When a component in `PageB.jsx` needs a primitive from `Primitives.jsx`:
- **Define:** Use `window.MyComponent = function() { ... }` in the source file.
- **Reference:** Use `window.MyComponent` inside the consumer, even if it's "globally available." This bypasses Babel-induced reference errors.

### 2. Eliminating Variable Shadowing
Common failure: `const { useState, Set } = React;`.
- **The Issue:** Native `new Set()` is now shadowed by `undefined` (or whatever React exports as Set).
- **The Fix:** Only destructure known hooks: `const { useState, useRef, useEffect } = React;`.

### 3. Execution Order (The Babel Script-Tag Rule)
- Load `primitives.jsx` (the backbone) first.
- Load data/mock files next.
- Load page components.
- Load `app.jsx` (the router) last.
- **Verification:** Ensure `primitives.jsx` does not depend on any page component. Page components should be the "leaves" of the dependency tree.

## Debugging Checklist
- [ ] Are any `const` components being used before their line of definition? (Switch to `function`)
- [ ] Is `Object.assign(window, { ... })` happening at the very bottom? (Move it, or use direct `window.` assignments)
- [ ] Are any native types (`Set`, `Map`) being used in files where they might be shadowed?
- [ ] Are React hooks correctly prefixed or destructured locally in EVERY file? (Babel standalone scripts do not share local scope)
