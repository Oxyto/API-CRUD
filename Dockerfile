FROM node:18-alpine AS build-stage

COPY . .
RUN npm run build
RUN rm -rf src

FROM node:18-alpine AS node-server

EXPOSE 8080
COPY --from=build-stage . .
CMD ["npm", "start"]
