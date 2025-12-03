# Dockerization Guide

## Building the Docker Image

Build the Docker image from the project root:

```bash
docker build -t collaborative-coding-platform .
```

## Running the Container

Run the container:

```bash
docker run -p 3000:3000 collaborative-coding-platform
```

Access the application at `http://localhost:3000`

## Environment Variables

You can pass environment variables to the container:

```bash
docker run -p 3000:3000 \
  -e PORT=3000 \
  -e NODE_ENV=production \
  collaborative-coding-platform
```

## Docker Compose (Optional)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

## Base Image

**Base Image Used**: `node:18-alpine`

This is a lightweight Node.js image based on Alpine Linux, providing:
- Small image size (~40MB base)
- Node.js 18 LTS
- npm package manager
- Security updates from Alpine

## Multi-stage Build

The Dockerfile uses a multi-stage build:

1. **Stage 1** (client-builder): Builds the React frontend
2. **Stage 2** (production): Sets up the server and serves the built client

This approach:
- Reduces final image size
- Keeps development dependencies out of production
- Optimizes build time with layer caching
