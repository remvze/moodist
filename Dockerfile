FROM docker.io/node:20-alpine3.18 AS build

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest-10

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy rest of the project
COPY . .

# Build the app
RUN pnpm run build

FROM docker.io/caddy:latest

COPY ./Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /var/www/html

EXPOSE 8080
