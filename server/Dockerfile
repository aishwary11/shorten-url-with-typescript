FROM node:16-alpine
WORKDIR /app

# install app dependencies
COPY package*.json ./
RUN npm install -f

# copy app source code
COPY . .

# build app
RUN npm run build
CMD ["npm", "start"]