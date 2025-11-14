# Testing Guide

## Running Tests

```bash
# Run all tests
deno task test

# Run tests with coverage
deno task test:coverage

# Generate HTML coverage report
deno task coverage

# Run specific test file
deno test src/services/chat/ping_test.ts

# Run with watch mode
deno test --allow-net --watch
```


## CI/CD

Tests run automatically in GitHub Actions:

- Type checking
- Linting (format check)
- Unit tests with coverage
- Coverage uploaded to Codecov

See `.github/workflows/ci.yml` for details.
