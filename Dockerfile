# Step 1: Build Stage
FROM node:22.18.0 AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npx patch-package && grep '\\x1b' node_modules/ansi-color/lib/ansi-color.js
COPY . .
RUN npm run build

# Step 2: Production Stage
FROM node:22.18.0 AS runner

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000
ENV NODE_ENV=production

CMD ["npm", "start"]
