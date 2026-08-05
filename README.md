#MovieBox

MovieBox is a modern OTT streaming platform built with **Next.js**, **React**, and **TypeScript**. The project was developed as part of a frontend technical assessment based on the provided Figma design.

The application integrates with the **TMDB API** to display real movie data while focusing on responsive UI, reusable components, clean code, and an interactive user experience.

---

## 🚀 Live Demo

https://ott-platform-kxx6qcfor-rahaf4.vercel.app

---

## ✨ Features

- Responsive design across desktop, tablet, and mobile devices.
- TMDB API integration for fetching real movie data.
- Dynamic movie genres filtering.
- Interactive hero section that updates based on the selected genre.
- Reusable React components for maintainable architecture.
- Optimized image loading using Next.js Image.
- Clean and scalable project structure.
- Built with TypeScript and Tailwind CSS.

---

## 🎯 Interactive Feature

### Genre Filtering

The interactive filtering feature is implemented on the **Movies & Shows** page.

### User Flow

- The page initially displays movies from all available categories.
- Users can browse different genres such as **Action**, **Adventure**, **Comedy**, **Drama**, and **Horror**.
- Selecting a genre highlights the active category.
- The featured hero section updates dynamically to display a movie from the selected genre, including its:
  - Poster
  - Title
  - Description
- The movie slider refreshes automatically to display movies that belong only to the selected genre.
- Users can switch between genres at any time for a smooth browsing experience.

---

##Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- TMDB API

---

##Project Structure

```text
app/
components/
services/
public/
styles/
```

---

## ⚙️ Getting Started

### Clone the repository

```bash
git clone <repository-url>
```

### Install dependencies

```bash
npm install
```

### Create a `.env.local` file

Add your TMDB credentials:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_api_key
NEXT_PUBLIC_TMDB_ACCESS_TOKEN=your_access_token
```

### Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

##Production Build

```bash
npm run build
npm start
```

---

##Notes

This implementation focuses on delivering the core application experience while fulfilling the required evaluation criteria, including:

- Responsive design
- TMDB API integration
- Reusable components
- Clean code structure
- Interactive filtering
- Pixel-accurate implementation based on the provided Figma design

---

## Developed By

**Rahaf Saad Alshammari**
