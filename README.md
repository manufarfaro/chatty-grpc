# chatty-grpc

![CI](https://github.com/manufarfaro/chatty-grpc/workflows/CI/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Deno](https://img.shields.io/badge/deno-2.5.6-blue.svg)

Some dummy chat app to test around grpc technology in deno.

## Prerequisites

- **Deno** 2.5.6+
  ([Install Deno](https://deno.land/manual/getting_started/installation))
- **Buf** (for proto generation)
  ([Install Buf](https://buf.build/docs/installation))
- **Docker** & **Docker Compose** (optional, for containerized deployment)
- **Make** (optional, for convenience commands)

## Quick Start

```bash
# Run the app
deno run src/main.ts

# Run in watch mode
deno task dev
```

## Testing

```bash
# Run all tests
deno task test

# Run tests with coverage
deno task test:coverage


# Run specific test file
deno test src/services/chat/ping_test.ts
```

## Build

```bash
# Compile for your machines only
deno task compile

# Compile for all platforms
deno task compile:all
```

## Docker Deployment

Deploy using Make commands:

```bash
# Rebuild the image
make build

# Build and start the service
make up

# Stop the service
make down
```

The service will be available at `http://localhost:8080`

## CI/CD

Tests run automatically in GitHub Actions:

- Type checking
- Linting (format check)
- Unit tests with coverage
- Coverage uploaded to Codecov

See `.github/workflows/ci.yml` for details.

## Development

Built with [Deno](https://deno.land/) 🦕
