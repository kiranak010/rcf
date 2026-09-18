# RCF Admin CMS

A complete, production-ready admin panel and content management system for the RCF website.

## Features

- Secure admin authentication with JWT
- Role-based access control (RBAC)
- Complete admin dashboard with statistics
- Content management for all website sections
- Document management with uploads
- Media library
- Contact enquiry management
- Activity logging
- Public website integration

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (via Prisma ORM)
- **Authentication**: JWT with HTTP-only cookies
- **File Upload**: Local storage with validation

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

3. Initialize the database:
   ```bash
   npm run db:push
   npm run db:seed
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### Default Admin Credentials

- Email: `admin@example.com`
- Password: `admin123`

## Project Structure

```
src/
  app/
    admin/          - Admin panel pages
    api/            - API routes
    (public)/       - Public website pages
  components/
    admin/          - Admin components
    public/         - Public components
    ui/             - Shared UI components
  lib/              - Utilities and helpers
  types/            - TypeScript types
prisma/
  schema.prisma     - Database schema
```

## Admin Routes

- `/admin/login` - Admin login
- `/admin/dashboard` - Dashboard overview
- `/admin/announcements` - Manage announcements
- `/admin/tenders` - Manage tenders
- `/admin/recruitment` - Manage recruitment
- `/admin/products` - Manage products
- `/admin/news` - Manage news
- `/admin/documents` - Manage documents
- `/admin/users` - Manage users
- `/admin/settings` - Site settings
- `/admin/contact` - Contact enquiries
- `/admin/activity` - Activity logs
- `/admin/media` - Media library

## API Routes

- `/api/auth/login` - Admin login
- `/api/auth/session` - Session management
- `/api/announcements` - Announcements CRUD
- `/api/tenders` - Tenders CRUD
- `/api/recruitment` - Recruitment CRUD
- `/api/products` - Products CRUD
- `/api/news` - News CRUD
- `/api/documents` - Documents CRUD
- `/api/users` - Users CRUD
- `/api/contact` - Contact enquiries
- `/api/settings` - Site settings
- `/api/media` - Media library
- `/api/activity` - Activity logs
- `/api/dashboard/stats` - Dashboard statistics

## Security Features

- Password hashing with bcrypt
- HTTP-only cookies for sessions
- CSRF protection
- Rate limiting on login
- Role-based authorization
- Activity logging
- Input validation
- File upload validation

## License

Private - All rights reserved
