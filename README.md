# Onboarding Wizard

A multi-step onboarding wizard application built with React, TypeScript, and Tailwind CSS. This application guides users through a comprehensive onboarding process, collecting email, personal details, home address, and financial information with form validation and data persistence.

> **🌐 Live Demo**: [View on GitHub Pages](https://alonzo245.github.io/onboarding-form-data/)

## Features

- **Multi-step Form Wizard**: Step-by-step onboarding process with navigation controls
- **Mobile-First Design**: Built with a mobile-first approach, ensuring optimal user experience on all screen sizes
- **Form Validation**: Real-time validation using Zod schemas with user-friendly error messages
- **Data Persistence**: Automatic saving to `localStorage` to preserve user input across page refreshes
- **Email Pre-filling**: Comprehensive data pre-filling based on email lookup (supports all fields including addresses)
- **Progress Tracking**: Visual stepper navigation showing current progress and preventing navigation to future steps
- **Step Access Protection**: Automatic redirect to the last valid step when attempting to access future steps via URL
- **Accessible Components**: Built with `react-aria-components` for full keyboard navigation and screen reader support
- **Date Picker**: Interactive calendar popup for date selection with internationalization support
- **Responsive Design**: Mobile-first design with Tailwind CSS for optimal experience on all devices
- **Success Celebration**: Confetti animation and thank you page upon successful submission
- **Toast Notifications**: User feedback via `react-toastify` for success and error states

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zod** - Schema validation
- **React Query** - Data fetching and caching
- **React Aria Components** - Accessible UI components with full keyboard and screen reader support
- **React Toastify** - Toast notifications
- **Canvas Confetti** - Celebration animations
- **Zustand** - Lightweight state management
- **clsx** - Conditional class names

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager

## Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:

2. **Install dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

## Running Locally

### Development Server

Start the development server:

Using npm:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### GitHub Pages Deployment

The project is configured for automatic deployment to GitHub Pages via GitHub Actions.

**Setup Instructions:**

1. **Enable GitHub Pages** in your repository settings:

   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **The deployment workflow** (`.github/workflows/deploy.yml`) will automatically:

   - Build the project on every push to `main` branch
   - Deploy to GitHub Pages
   - The app will be available at: `https://alonzo245.github.io/onboarding-form-data/`

3. **Base Path Configuration:**

   - The `BASE_URL` is set to `/onboarding-form-data` in the router configuration
   - This ensures all assets (CSS, JS) are correctly referenced with the proper base path
   - The base path is automatically configured in `vite.config.ts` to use the `BASE_URL` environment variable
   - The router is configured to handle the base path correctly

4. **Manual Deployment:**
   - Go to Actions tab in GitHub
   - Select "Deploy to GitHub Pages" workflow
   - Click "Run workflow"

**Note:** After enabling GitHub Pages, the first deployment may take a few minutes. Subsequent deployments happen automatically on each push to `main`.

### Build for Production

To create a production build:

Using npm:

```bash
npm run build
```

Or using yarn:

```bash
yarn build
```

The built files will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

Using npm:

```bash
npm run preview
```

Or using yarn:

```bash
yarn preview
```

## Project Structure

```
onboarding-wizard/
├── src/
│   ├── routes/
│   │   └── onboarding-form-data/
│   │       ├── OnboardingWizard.tsx    # Main wizard container component
│   │       ├── components/
│   │       │   ├── Header.tsx           # Stepper navigation component
│   │       │   ├── Footer.tsx           # Navigation footer component
│   │       │   ├── Step.tsx             # Step wrapper component
│   │       │   └── steps/
│   │       │       ├── Email.tsx        # Email input step
│   │       │       ├── PersonalDetails.tsx # Personal information step
│   │       │       ├── HomeAddress.tsx   # Home address step
│   │       │       ├── FinancialDetails.tsx # Financial information step
│   │       │       ├── Review.tsx       # Review and submit step
│   │       │       └── ThankYou.tsx     # Success page
│   │       ├── config/
│   │       │   └── stepsConfig.ts       # Step configuration and default data
│   │       ├── hooks/
│   │       │   ├── useOnboardingPersistence.ts # Data persistence hook
│   │       │   └── useOnboardingSubmit.ts # Form submission hook
│   │       ├── queries/
│   │       │   └── submitOnboarding.ts  # React Query mutation for submission
│   │       ├── store/
│   │       │   └── errorsStore.ts       # Zustand store for error management
│   │       ├── validation/
│   │       │   └── schemas.ts           # Zod validation schemas
│   │       ├── constants.tsx             # Step constants and types
│   │       └── types.ts                 # TypeScript type definitions
│   ├── mocks/
│   │   ├── api.ts                       # Mock API functions
│   │   ├── countries.json               # Country data
│   │   └── me.json                      # Sample user data
│   ├── router.tsx                       # React Router configuration
│   ├── main.tsx                         # Application entry point
│   ├── index.css                        # Global styles and Tailwind directives
│   └── constants.ts                     # Application constants
├── index.html                           # HTML template
├── package.json                         # Dependencies and scripts
├── tailwind.config.ts                   # Tailwind CSS configuration
├── postcss.config.js                    # PostCSS configuration
├── tsconfig.json                        # TypeScript configuration
└── vite.config.ts                       # Vite configuration
```

## Wizard Steps

1. **Email** - Enter email address with optional pre-filling
2. **Personal Details** - First name, last name, and date of birth (with calendar picker)
3. **Home Address** - Country, city, street, house number, and postal code (with accessible select components)
4. **Financial Details** - Income, expenses, assets, liabilities, and net worth
5. **Review & Submit** - Review all entered information before submission
6. **Thank You** - Success page with submitted data and celebration animation

## Key Features Explained

### Form Validation

- Each step has its own validation schema using Zod
- Errors are displayed only after user interaction (on blur or when clicking "Next")
- Validation prevents navigation to the next step until all required fields are valid
- First name and last name fields are restricted to alphabetic characters only

### Data Persistence

- All form data is automatically saved to `localStorage` as the user types
- Data persists across page refreshes
- Submitted data is stored separately and cleared after viewing the thank you page

### Email Pre-filling

- Comprehensive pre-filling supports all wizard fields including:
  - Personal details (first name, last name, date of birth)
  - Financial information (income, expenses, assets, liabilities, net worth)
  - Home address (all address fields)
- Case-insensitive field matching for flexible data formats

### Progress Control

- Users can only navigate to steps they've already completed
- The `furthestStep` state tracks the highest step reached
- Navigation links to future steps are disabled until reached
- Direct URL access to future steps automatically redirects to the last valid step
- Step access protection ensures users cannot skip ahead by manipulating the URL

### Responsive Design

- **Mobile-First Approach**: The entire wizard is designed mobile-first, ensuring the best experience on small screens while gracefully scaling up to larger devices
- Horizontal scrolling stepper on mobile devices
- Active step automatically centers in the mobile stepper view
- Full-width buttons on mobile for better touch targets
- Side-by-side button layout on mobile for easier navigation
- Optimized spacing and typography that adapts to screen size

## Development Notes

- The application uses mock API functions located in `mocks/api.ts`
- Country data is loaded from a static JSON file (`mocks/countries.json`)
- Form state is managed using React refs for step data and Zustand for error state
- Data persistence is handled via `localStorage` through the `useOnboardingPersistence` hook
- TypeScript strict mode is enabled for better type safety
- Date inputs use `react-aria-components` DatePicker with popup calendar for better UX
- Select components use `react-aria-components` for accessibility and consistent styling
- All form components are built with accessibility in mind, supporting keyboard navigation and screen readers
- Error state management is centralized using Zustand store (`errorsStore.ts`)
- React Query is used for form submission with proper loading and error handling

## Browser Support

The application supports all modern browsers that support ES6+ features, including:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.
