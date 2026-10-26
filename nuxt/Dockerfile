FROM node:22-bookworm-slim
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY .output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
