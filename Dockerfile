FROM denoland/deno:2.5.6 AS builder

WORKDIR /app

COPY . .

RUN deno compile \
    --output=/app/chatty-grpc \
    --allow-net \
    --allow-env \
    --allow-sys \
    src/main.ts

FROM gcr.io/distroless/cc-debian12:latest

WORKDIR /app

COPY --from=builder /app/chatty-grpc /app/chatty-grpc

USER nonroot:nonroot

CMD ["/app/chatty-grpc"]
