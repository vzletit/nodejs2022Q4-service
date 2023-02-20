FROM node:18-alpine
COPY . .
RUN npm ci --omit=dev
CMD ["npm", "run", "start:dev"]
EXPOSE 4000