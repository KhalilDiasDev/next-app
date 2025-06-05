# Install dependencies only when needed
FROM node:18-alpine AS deps

WORKDIR /app
COPY .npmrc ./
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
# ENV NPM_CONFIG_PRODUCTION=true
ENV NODE_ENV=production
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files and run with PM2
# FROM keymetrics/pm2:18-alpine AS runner
FROM node:18-alpine AS runner

ARG X_TAG
WORKDIR /app
RUN apk add --no-cache git
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
# ENV PM2_PUBLIC_KEY 1cqpio13cyqye1o
# ENV PM2_SECRET_KEY vmmrb2t5azv73tb

# COPY --from=builder /app/ecosystem.config.cjs ./ecosystem.config.cjs
# CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]
# CMD ["pm2-runtime", "start", "node_modules/.bin/next", "--", "start"]
CMD ["node_modules/.bin/next", "start"]