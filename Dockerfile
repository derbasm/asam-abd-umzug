# Multi-stage build for production optimization
FROM node:25-alpine AS base

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN npm install -g pnpm@10.15.0

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# A single lockfile and package manager make image builds reproducible.
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
  pnpm config set store-dir /pnpm/store && \
  pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN pnpm exec prisma generate

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

# Production image: a plain Node base, not `base`, so pnpm and its
# transitive dependencies (tar, minimatch, glob, undici, ...) never end up
# in the runtime image or its vulnerability scan.
FROM node:25-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# The runtime only ever runs `node server.js`. npm/npx/corepack (and their
# own bundled deps, e.g. npm's undici) are build-time tools that Node's
# Alpine image ships by default; drop them so they can't trip the image
# vulnerability scan or grow the attack surface for no runtime benefit.
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack \
  /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack \
  /usr/local/bin/corepack.js

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Create necessary directories with correct permissions
RUN mkdir -p /home/nextjs/.npm /home/nextjs/.npm/_cacache /app/.next/cache /app/.next/cache/images
RUN chown -R nextjs:nodejs /home/nextjs /app/.next
RUN chmod -R 755 /home/nextjs/.npm

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# `next build` traces the runtime dependencies into `.next/standalone`. Do not
# copy the full pnpm dependency tree: it contains development tooling and makes
# the production image both larger and needlessly vulnerable.

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
