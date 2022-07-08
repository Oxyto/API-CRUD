FROM node:18-alpine

EXPOSE 8080
COPY . .
CMD ["npm", "start"]