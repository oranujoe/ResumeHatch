# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/2d738d7c-753b-4e6e-928e-699e40227642

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2d738d7c-753b-4e6e-928e-699e40227642) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2d738d7c-753b-4e6e-928e-699e40227642) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Chrome Extension (Resume Hatch Assistant)

The repository now contains a companion browser extension under `browser-extension/` that lets you:

1. Capture job postings from any website and send them to your Resume Hatch dashboard.
2. Autofill common application fields using the data you already store in Resume Hatch.
3. Record each submission so your Dashboard KPIs stay up-to-date.

### Build & load in Chrome (dev mode)

```sh
# One-time: install deps
npm i

# Build the extension (outputs to browser-extension/dist)
npm run build:extension
```

1. Visit `chrome://extensions` and enable **Developer Mode**.
2. Click **Load unpacked** and select the `browser-extension/dist` folder.
3. Pin the Resume Hatch icon and try it on a job posting page.

### Development watch mode

```sh
vite build --watch --config browser-extension/vite.config.ts
```

Chrome will auto-reload the background service-worker each time you save.

### Structure

```
browser-extension/
  manifest.json          # Chrome manifest (v3)
  vite.config.ts         # Multi-entry Vite build (popup, content, SW)
  src/
    background.ts        # Service-worker entry
    contentScripts/
      jobScraper.ts      # Injected on all pages, scrapes job data
    popup/
      index.html         # Popup HTML
      index.tsx          # React root
      Popup.tsx          # UI component
```

Future iterations will add site-specific scraping logic, application-form autofill, and Supabase auth token sharing with the main web app.
