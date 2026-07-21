# Learnity

Learnity is a polished online-course learning dashboard built with React, Vite, Tailwind CSS, and mock JSON data. It includes a responsive two-column shell, dashboard overview, course catalog, and lesson experience ready for deployment on Vercel.

![Learnity preview](https://via.placeholder.com/1200x700?text=Learnity+Preview)

## Tech Stack
- React 18
- Vite
- Tailwind CSS
- React Router v6
- lucide-react
- Recharts

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```text
src/
  components/      # Reusable layout and UI pieces
  data/            # Mock JSON for user, courses, tasks, activities, and lessons
  pages/           # Dashboard, Courses, and Lesson views
  App.jsx          # Router and route configuration
  main.jsx         # App entry point
```

## Editing Mock Data

Update the JSON files in [src/data](src/data) to change the sample content:
- [src/data/user.json](src/data/user.json)
- [src/data/courses.json](src/data/courses.json)
- [src/data/tasks.json](src/data/tasks.json)
- [src/data/activities.json](src/data/activities.json)
- [src/data/lessons.json](src/data/lessons.json)

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo-name)

Or from the terminal:

```bash
vercel --prod
```

Vercel project settings should use:
- Build Command: `npm run build`
- Output Directory: `dist`
