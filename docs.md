# 📚 Project Documentation - Product Comparison App

## 🧱 Folder Structure

```
src/
├── app/                        # Next.js app router directory
│   ├── __tests__/              # Tests related to pages (e.g., page.js)
│   ├── favicon.ico
│   ├── globals.css             # Global styles
│   ├── layout.js               # Shared layout across pages
│   ├── page.js                 # Home page component
│   └── page.module.css         # Page-specific styles
│
├── components/                # Reusable React components
│   ├── __tests__/              # General component-level tests
│   ├── ProductCard/            # ProductCard-related files
│   │   ├── __tests__/          # Unit tests specific to ProductCard
│   │   ├── index.jsx           # ProductCard component
│   │   └── ProductCard.module.css
│   ├── ProductCardPlaceholder.jsx
│   ├── ProductComparisonView.jsx
│   ├── ProductSelectionList.jsx
│   └── SortDropdown.jsx
│
├── store/                     # Redux state management
│   ├── __tests__/              # Redux-related unit tests
│   ├── productSlice.js         # Redux slice for product selection
│   └── ReduxProvider.jsx       # Redux provider wrapper
```

---

## ⚙️ State Management

### 🔷 Redux Toolkit
- Global state tracks:
  - Selected products (`selected[]`)
  - Sort mode (`sortBy`)
  - UI flags (like `highlightDifferences` via component-local state)

### 🔍 Why Redux Toolkit?
- Predictable state across components
- Central store ideal for SSR apps
- DevTools support for debugging
- Minimal boilerplate using `createSlice()`

### 🔁 Alternatives Considered
| Tool             | Reason Not Chosen                             |
|------------------|-----------------------------------------------|
| React Context    | Lacks separation, becomes messy for multi-slice state |
| Zustand          | Lightweight but lacks robust SSR/test/debug story |
| Local State Only | Difficult to sync selections across components |

---

## 🧩 Component Overview

| Component               | Purpose                                           |
|------------------------|---------------------------------------------------|
| ProductTable           | Main product table with selection + sorting       |
| ProductCard            | Renders individual product in table row          |
| CompareCheckbox        | Redux-based toggle for selected product IDs       |
| SortControls           | Dropdown for sorting logic                        |
| CompareModal           | Side-by-side difference viewer                    |
| ProductComparisonView  | Accordion layout showing grouped differences      |

---

## ⚠️ Known Limitations

- Max selection of 3 products is not enforced in UI
- No client-side search/filter yet
- SSR fallback UI is minimal (`"Try again later"`)
- Accessibility for modal/image/accordion may need improvements
- Mobile table comparison layout can be enhanced with horizontal scroll

---

For setup, testing, and run instructions, refer to [README.md](./README.md).

