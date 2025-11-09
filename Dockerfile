# Stage 1: Build the SvelteKit application
FROM node:22-alpine as web-builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Stage 2: Build the functions
FROM node:22-alpine as functions-builder

WORKDIR /app/functions
COPY functions/package.json functions/package-lock.json ./
RUN yarn install --frozen-lockfile --production

# Stage 3: Final image with nginx and node
FROM nginx:alpine

# Install Node.js and supervisor
RUN apk add --no-cache nodejs supervisor

# Copy built SvelteKit app
COPY --from=web-builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy functions
WORKDIR /app/functions
COPY --from=functions-builder /app/functions/node_modules ./node_modules
COPY --from=functions-builder /app/functions/package.json ./
COPY functions/bigheads.js ./

# Copy supervisor configuration
COPY supervisord.conf /etc/supervisord.conf

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
