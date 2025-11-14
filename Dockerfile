FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies
RUN npm prune --production --legacy-peer-deps

# Expose the port SvelteKit runs on
EXPOSE 3000

# Set environment variable for production
ENV NODE_ENV=production

# Start the application
CMD ["node", "build"]
