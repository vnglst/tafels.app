FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm ci --legacy-peer-deps && npx svelte-kit sync && npm run build && npm prune --omit=dev --legacy-peer-deps
EXPOSE 3000
CMD ["node", "build"]
