FROM oven/bun:1 as builder
WORKDIR /app

COPY package.json bun.lock .
RUN bun install --frozen-lockfile

COPY . .

ARG ENV_MODE
RUN bun test
RUN bun run build-$ENV_MODE

FROM lipanski/docker-static-website:latest
COPY --from=builder /app/dist .

# usage: $ docker build --build-arg ENV_MODE=test|dev --tag IMAGE_NAME
#        $ docker run --expose 3000:3000 IMAGE_NAME
