FROM docker.io/node:24-alpine AS build

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest-11

# Copy dependency files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

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
