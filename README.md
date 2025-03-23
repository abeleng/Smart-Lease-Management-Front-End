# Lease Calculator App Frontend

## Overview

The Lease Calculator App frontend is built using Next.js and styled with Tailwind CSS. It provides a user-friendly interface for users to sign in, input lease information, get instant calculations, save, edit, delete leases, and share them with other users.

## Technologies Used

- **Next.js**: A React framework for building fast and scalable web applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Project Setup Instructions

### 1. Initialize the Project

- Create a new Next.js project:
  ```bash
  npx create-next-app@latest lease-calculator-app
  cd lease-calculator-app
  ```

- Set up Tailwind CSS for styling:
  ```bash
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```

- Configure Tailwind CSS by adding the paths to all of your template files in the `tailwind.config.js` file:
  ```javascript
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  ```

- Add the Tailwind directives to your CSS file (`styles/globals.css`):
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

### 2. User Authentication

- Set up Next Auth with email and password credentials to handle user authentication.
- Create login and registration pages with Tailwind CSS for styling.
- Protect routes that require authentication by using Next Auth's session management.

### 3. Lease Input Form

- Design a lease input form with Tailwind CSS to ensure a responsive and visually appealing layout.
- Implement form validation with Zod to ensure data integrity.
- Integrate React Hook Form for efficient form handling and state management.

### 4. Live Calculation

- Implement a function to calculate the total lease cost dynamically as the user enters or changes data in the form.

### 5. Saving Lease Information

- Implement a save button that triggers a server action to store lease data.
- Use TanStack Query's useMutation for server-side data mutation.
- Display success/error messages with React Hot Toast for better user experience.

### 6. Fetching Lease Information

- Use Axios with TanStack Query's useQuery to fetch lease data from the server.
- Create a custom Axios instance for API requests to ensure consistency and ease of maintenance.

### 7. Viewing and Managing Leases

- Create a dashboard to list all leases.
- Implement edit and delete functionality using server actions.
- Enable sharing of leases with other users by adding them to the SharedLease model.

### 8. Deployment and Testing

- Deploy the app to a hosting platform like Vercel for easy scaling and management.
- Test the application thoroughly to identify and fix any bugs.
- Conduct user acceptance testing to ensure all features work as expected.

## Conclusion

The Lease Calculator App frontend is built using Next.js and styled with Tailwind CSS, providing a seamless and user-friendly experience for managing leases. By following the setup instructions and utilizing the mentioned technologies, you can create a robust and efficient lease management system.
