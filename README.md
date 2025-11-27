# Portfolio Frontend - Rainbow Theme

A modern, responsive portfolio website built with React featuring a stunning rainbow-themed UI design.

## Live Demo

- **Frontend URL**: [Your deployed frontend URL here]
- **Backend API URL**: [Your deployed API URL here]

## Features

- Beautiful rainbow-themed UI design
- Fully responsive layout
- User authentication (Register/Login/Logout)
- Protected admin dashboard
- Projects gallery
- Blog with comments
- Contact form
- Dark mode by default

## Tech Stack

- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Styling**: Custom CSS with Rainbow Theme

## Pages

### Public Routes
- `/` - Home page with hero section and about
- `/projects` - Projects gallery
- `/blog` - Blog posts list
- `/blog/:id` - Individual blog post with comments
- `/contact` - Contact form
- `/login` - User login
- `/register` - User registration

### Protected Routes
- `/admin` - Admin dashboard (requires authentication)
  - Manage projects (Create, Update, Delete)
  - Manage blog posts (Create, Update, Delete)
  - View contact messages

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── api/
│   └── api.js          # API configuration and endpoints
├── components/
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Site footer
│   ├── ProjectCard.jsx # Project display card
│   ├── BlogPostCard.jsx # Blog post card
│   └── ProtectedRoute.jsx # Auth guard component
├── context/
│   └── AuthContext.jsx # Authentication context
├── pages/
│   ├── Home.jsx        # Landing page
│   ├── Projects.jsx    # Projects gallery
│   ├── Blog.jsx        # Blog list
│   ├── BlogPost.jsx    # Single blog post
│   ├── Contact.jsx     # Contact form
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   └── Admin.jsx       # Admin dashboard
├── App.jsx             # Main app component
└── App.css             # Rainbow theme styles
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| VITE_API_URL | Backend API base URL |

## Connecting to Backend

This frontend is designed to work with the Portfolio & Blog API. Make sure to:

1. Deploy the backend API first
2. Update `VITE_API_URL` with your deployed API URL
3. Ensure CORS is properly configured on the backend

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variable: `VITE_API_URL=<your-api-url>`
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Create new site from Git in Netlify
3. Set environment variable in Site settings
4. Build command: `npm run build`
5. Publish directory: `dist`

## Rainbow Theme Colors

The UI uses a carefully selected rainbow color palette:

```css
--rainbow-1: #ff6b6b;  /* Red/Coral */
--rainbow-2: #feca57;  /* Yellow/Gold */
--rainbow-3: #48dbfb;  /* Cyan */
--rainbow-4: #ff9ff3;  /* Pink */
--rainbow-5: #54a0ff;  /* Blue */
--rainbow-6: #5f27cd;  /* Purple */
--rainbow-7: #00d2d3;  /* Teal */
```

## Key Features

### Authentication
- JWT-based authentication
- Persistent login with localStorage
- Auth-aware navigation
- Protected routes redirect to login

### Admin Dashboard
- Tab-based interface
- Real-time CRUD operations
- Form validation
- Success/Error notifications

### Responsive Design
- Mobile-first approach
- Breakpoints: 1024px, 768px, 480px
- Flexible grid layouts
- Touch-friendly interactions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
