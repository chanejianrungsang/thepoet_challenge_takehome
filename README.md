# The Poet 

A responsive web application for searching and displaying poetry from the PoetryDB API.

## Features

- **Search by Author or Title**: Toggle between searching poems by author name or poem title
- **Poem Cards**: Fixed height cards with automatic truncation for long poems
- **Modal View**: Click "Click to read more..." to view full poems in a modal dialog

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser.

### Building for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## API

This application uses the [PoetryDB API](https://poetrydb.org/) to fetch poems. No API key is required.

## Architecture

- **Angular 17+** with standalone components
- **SCSS** for styling with CSS custom properties
- **RxJS** for reactive programming
- **HttpClient** for API calls
- Component-based architecture with proper separation of concerns

## Components

- `HeaderComponent`: Application title
- `SearchBarComponent`: Search form with radio toggles
- `ErrorDisplayComponent`: Error message display
- `PoemCardComponent`: Individual poem display with truncation
- `PoemModalComponent`: Full poem modal dialog
- `FooterComponent`: Footer section

## Services

- `PoetryService`: Handles API calls to PoetryDB with search functionality

## Live demo

- Demo: 

- Build the app locally to verify:

	npm install
	ng build --configuration production

- The production build artifacts are output to `dist/the-poet-angular`. For a static site deployment on Vercel, point the project to serve the files from that directory (or use the default build step in Vercel to run `ng build` and serve `dist/the-poet-angular`).
