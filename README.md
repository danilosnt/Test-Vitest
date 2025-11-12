# Test Plan with Vitest

This project demonstrates the implementation of a **Software Test Plan** in a frontend application built with **Vue.js 3**, using **Vitest** as the main component testing tool.

The **"Joks Landing Page"** is a **SPA (Single Page Application)** that serves as a digital showcase and reservation system for a fictional establishment.  
The main focus of this repository is not the application itself but the **implementation and documentation of its testing process**.

> 🌐 The web project was developed by: [https://github.com/iS0lares](https://github.com/iS0lares)

---

## Test Plan Focus

The test plan is strictly focused on the most critical component of the application: `index.vue`.

| Item | Description |
|------|-------------|
| 🎯 **Main Target** | `index.vue` (Home Page) |
| 🧩 **Testing Level** | Component Testing |
| 🧰 **Main Tool** | Vitest |

---

## Specific Test Objectives

The tests were written to ensure the following behaviors:

1. **Initial Rendering**  
   Verifies whether all visual elements — such as `v-carousel`, `div#map`, and the reservation button — are rendered correctly.

2. **User Interactivity**  
   Ensures that clicking the reservation button (`.reserve-button`) correctly triggers the `initReserve(true)` function.

3. **State Management**  
   Tests whether the reactive variable `isActive` updates properly, causing the `v-dialog` (modal) to appear.

4. **Component Communication**  
   Checks if the `v-dialog` closes when the child component (`FormReserve`) emits the `@init-reserve` event with the value `false`.

5. **Lifecycle Hooks**  
   Verifies that the logic within the `onMounted` hook runs correctly, initializing the **Leaflet** map inside the `div#map`.

---

## Technologies Used

### Application
- **Vue.js 3** — Main application framework  
- **Vuetify** — UI component library  
- **Leaflet** — Interactive map library

### Testing
- **Vitest** — Fast test runner based on Vite  
- **Vue Test Utils** — Official Vue component testing library  
- **happy-dom** — Simulated DOM environment for testing

---

## Installation and Setup

### Clone the repository:
```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```
### Navigate to the project directory:
```bash
cd RESPOSITORY
```

### Install dependencies:
```bash
npm install
```

## Running the Tests
This project is configured with several scripts for running tests using **Vitest**.

### Watch Mode (Development)
Runs tests in watch mode, automatically re-executing when files change:
```bash
npx vitest
```
(or npm test if configured in package.json)

### Graphical Interface (Vitest UI)
For a visual and interactive testing experience:
```bash
npx vitest --ui
```
This will open the test panel in your browser.

### Single Run (Validation/CI)
Runs all tests once — ideal for Continuous Integration:
```bash
npx vitest run
```

### Test Coverage Report
Generates a coverage report showing which lines of code are tested:
```bash
npx vitest run --coverage
```

Results will be generated inside the:
```bash
/coverage
```
