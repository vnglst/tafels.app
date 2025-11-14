FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm ci --legacy-peer-deps && npm run build && npm prune --production --legacy-peer-deps
EXPOSE 3000
CMD ["node", "build"]
