# BTEC Smart Platform Frontend

Modern, production-ready React frontend application for the BTEC Smart Platform with complete feature implementation.

## 🚀 Features

- ⚛️ **React 19+ with TypeScript** - Type-safe development
- 🎨 **Tailwind CSS v4** - Modern design system with dark mode support
- 🔄 **React Router v7** - Client-side routing with protected routes
- 🗃️ **Zustand** - Lightweight state management
- 🎭 **Framer Motion** - Smooth animations and transitions
- 📡 **Axios** - API integration ready
- 🎯 **RTL Support** - Ready for Arabic language
- 📱 **Responsive Design** - Mobile-first approach
- 🌙 **Dark Mode** - Built-in theme switching

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+ and npm

### Installation Steps

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Pages

- **Login** - Modern authentication with gradient background
- **Dashboard** - Stats cards, charts placeholder, recent activities
- **Upload** - Drag & drop file upload with progress tracking
- **Results** - Sortable data table with filters and export
- **Students** - CRUD operations with search and modal details
- **Assignments** - Assignment cards with status tracking

## 🎨 UI Components

All components are fully typed and reusable:

- Button (multiple variants and sizes)
- Card (with glass morphism support)
- Table (sortable, selectable)
- Input (with icons and validation)
- Modal (animated with backdrop)
- Alert (auto-dismiss)
- Loader (spinner and skeleton)

## 🔐 Authentication

Mock authentication system - login with any email/password in development mode.

## 📡 API Integration

Configure your API base URL in `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

API services are ready for backend integration:
- Authentication
- File upload
- Student CRUD
- Results management
- Assignment tracking

## 🌐 Language & Theme

- **RTL Support**: Toggle between English and Arabic
- **Dark Mode**: Switch themes via navbar
- Both preferences are persisted in localStorage

## 📝 Environment Variables

See `.env.example` for all available configuration options.

## 👨‍💻 Development Notes

### Known Issues

- Production build requires TypeScript configuration adjustment
- Development server works perfectly with all features

### Tech Stack

- React 19.2.0
- TypeScript 5.9.3
- Tailwind CSS 4.1.18
- React Router 7.11.0
- Zustand 5.0.9
- Framer Motion 12.23.26
- Axios 1.13.2
- Vite 7.2.4

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ for BTEC Smart Platform**
