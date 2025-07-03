# DevMatter Web

[![Docker Pulls](https://img.shields.io/docker/pulls/adityavinodh/dev-matter-web)](https://hub.docker.com/r/adityavinodh/dev-matter-web)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A modern, responsive web interface for DevMatter - a lightweight, self-hostable platform for managing your applications and automating repetitive development tasks.

## Overview

DevMatter Web is the frontend application built with SvelteKit that provides an intuitive interface for managing your development workflows. It connects to the DevMatter API to offer a seamless experience for handling form submissions, notifications, and project management.

## Features

### 📋 Forms Management
- **Custom Schema Definition**: Create and manage forms with your own schema structure
- **Real-time Submissions**: View form submissions as they happen
- **Mobile-Responsive Design**: Clean, mobile-first interface for managing submissions on any device
- **Instant Notifications**: Get notified immediately when new submissions occur

### 🎨 Modern UI/UX
- **Tailwind CSS**: Beautiful, responsive design system
- **Component Library**: Built with bits-ui for consistent, accessible components
- **Dark/Light Mode**: Automatic theme switching based on user preference
- **Icons**: Lucide icons for a clean, professional look

### 📊 Analytics & Monitoring
- **PostHog Integration**: Built-in analytics and user behavior tracking
- **Toast Notifications**: Elegant notifications with svelte-sonner
- **Performance Optimized**: Built with Vite for fast development and optimized builds

## Quick Start

### Cloud Hosting
Get started immediately with our hosted version at [devmatter.app](https://devmatter.app)

### Self-Hosting with Docker
```bash
docker run -d \
  --name dev-matter-web \
  -p 3000:3000 \
  -e API_URL="http://your-api-server:3000" \
  adityavinodh/dev-matter-web
```

## Local Development Setup

### Prerequisites
- Node.js 20+ and pnpm (recommended) or npm
- DevMatter API server running (see [dev-matter](https://github.com/aditya-vinodh/dev-matter))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aditya-vinodh/dev-matter-web.git
   cd dev-matter-web
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Configure your environment**
   Edit `.env` with your configuration:
   ```bash
   API_URL=http://localhost:3000
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `API_URL` | ✅ | URL of the DevMatter API server | `http://localhost:3000` |

## Development Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run type checking
pnpm check

# Run type checking in watch mode
pnpm check:watch

# Format code
pnpm format

# Lint code
pnpm lint

# Build and push Docker image
pnpm deploy
```

## Project Structure

```
dev-matter-web/
├── src/
│   ├── lib/           # Shared components and utilities
│   ├── routes/        # SvelteKit routes
│   ├── app.html       # HTML template
│   └── app.pcss       # Global styles
├── static/            # Static assets
├── docker/            # Docker configuration
├── tailwind.config.js # Tailwind CSS configuration
├── vite.config.js     # Vite configuration
└── svelte.config.js   # Svelte configuration
```

## Technology Stack

- **Framework**: SvelteKit 2.x
- **Styling**: Tailwind CSS 4.x
- **Components**: bits-ui
- **Icons**: Lucide Svelte
- **Analytics**: PostHog
- **Notifications**: svelte-sonner
- **Build Tool**: Vite 6.x
- **Language**: TypeScript

## Docker Support

### Multi-platform Build
The project supports multi-platform Docker builds for both AMD64 and ARM64 architectures:

```bash
docker buildx build --platform linux/amd64,linux/arm64 -t adityavinodh/dev-matter-web --push .
```

### Development with Docker
```bash
# Build the image
docker build -t dev-matter-web .

# Run the container
docker run -p 3000:3000 -e API_URL=http://localhost:3000 dev-matter-web
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our coding standards
4. Run tests and linting (`pnpm lint && pnpm check`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines
- Use TypeScript for type safety
- Follow the existing code style (Prettier + ESLint)
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## Deployment

### Production Build
```bash
pnpm build
```

### Using SvelteKit Adapter
The project uses `@sveltejs/adapter-node` for Node.js deployment. The built application can be deployed to any Node.js hosting provider.

## Support

- 📧 [Contact form](https://devmatter.app/contact)
- 🐛 Issues: [GitHub Issues](https://github.com/aditya-vinodh/dev-matter-web/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/aditya-vinodh/dev-matter-web/discussions)
- 📚 Documentation: [DevMatter Docs](https://docs.devmatter.app)

## Related Projects

- [DevMatter API](https://github.com/aditya-vinodh/dev-matter) - Backend API server

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using SvelteKit for developers who want to focus on building, not managing.
