FROM node:18-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .
# Omit --production flag for TypeScript devDependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

COPY lib ./lib
COPY pages ./pages
COPY styles ./styles
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .

ENV NEXT_TELEMETRY_DISABLED 1

ARG LASTFM_USER
ENV LASTFM_USER=${LASTFM_USER}
ARG LASTFM_APIKEY
ENV LASTFM_APIKEY=${LASTFM_APIKEY}

# Build Next.js based on the preferred package manager
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm build; \
  else yarn build; \
  fi

# Note: It is not necessary to add an intermediate step that does a full copy of `node_modules` here
ARG LASTFM_USER
ENV LASTFM_USER=${LASTFM_USER}
ARG LASTFM_APIKEY
ENV LASTFM_APIKEY=${LASTFM_APIKEY}

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "run", "start"]
