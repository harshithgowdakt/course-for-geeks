FROM node:13-alpine

ARG USER_NAME=harshith

WORKDIR /home/${USER_NAME}/course-for-geeks
COPY package*.json ./
RUN npm ci 
COPY . .
RUN npm run build

EXPOSE 8080
ENTRYPOINT ["npm", "start"]
