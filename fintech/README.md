# React + TypeScript + Vite

This project provides a minimal yet scalable setup to get started with React, TypeScript, and Vite. It incorporates a modern UI framework, state management, and a responsive design system to achieve scalability, effectiveness, and quick development cycles.

## Approach Taken to Bring This Project to Life

To ensure this project meets modern development standards and remains scalable and maintainable, we adopted the following approach:

1. **Use of Vite + React**: Vite was chosen for its fast build times and excellent development experience, paired with React for building dynamic user interfaces.
2. **Tailwind CSS**: A utility-first CSS framework for rapidly styling components, ensuring responsiveness and ease of customization.
3. **ShadCN UI**: Leveraged as a component library to accelerate UI development and maintain consistency across the application.
4. **Context API**: Used for state management to efficiently share data across the component tree without the need for additional libraries.

These tools and frameworks were selected to prioritize performance, scalability, and developer productivity.

## Dependencies Used

### 1. Vite + React

Vite provides a modern build tool and development server with hot module replacement (HMR). Paired with React, it ensures a smooth developer experience and fast page loads.

### 2. Tailwind CSS

Tailwind CSS allows for rapid UI development with pre-defined utility classes, making it easier to build and maintain a consistent design system.

### 3. ShadCN UI

ShadCN UI was used to include pre-designed components that align with modern design principles, accelerating the creation of a polished and professional interface.

### 4. Context API

React's Context API was implemented for state management to provide scalability and a straightforward way to manage shared application state.

---

## Features

- **Modern Build System**: Vite ensures fast builds and HMR for a seamless development experience.
- **Responsive UI**: Tailwind CSS provides pre-designed utility classes for quick styling.
- **Reusable Components**: ShadCN UI simplifies the creation of a consistent and polished interface.
- **Efficient State Management**: Context API allows for scalable and maintainable state sharing across components.
- **Filter Functionality in the Loan Section**: Users can filter loan records from the largest to the smallest, ensuring quick and efficient data sorting for better decision-making.

---

## Expanding the ESLint Configuration

For production-grade applications, consider enhancing the ESLint setup with type-aware lint rules:

1. **Update parser options**:
   ```javascript
   export default tseslint.config({
     languageOptions: {
       parserOptions: {
         project: ["./tsconfig.node.json", "./tsconfig.app.json"],
         tsconfigRootDir: import.meta.dirname,
       },
     },
   });
   ```
