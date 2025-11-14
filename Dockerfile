FROM node:22-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci --legacy-peer-deps && npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./
RUN npm ci --production --legacy-peer-deps
EXPOSE 3000
CMD ["node", "build"]
