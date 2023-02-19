FROM node:18-alpine
COPY . .
RUN npm install
CMD ["npm", "run", "start:dev"]
EXPOSE 4000