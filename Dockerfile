FROM node:22.23.4-alpine3.23@sha256:206878a60dc7014193f418ab9259b6110c15fbd514b3044a267be706509944e4
WORKDIR /app
COPY . .
RUN npm ci --legacy-peer-deps && npx svelte-kit sync && npm run build && npm prune --omit=dev --legacy-peer-deps
EXPOSE 3000
CMD ["node", "build"]
