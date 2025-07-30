FROM node:24-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
ADD . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile


RUN mkdir tmp
ENTRYPOINT [ "node", "index.mjs" ]
