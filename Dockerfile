FROM node:14-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install -g typescript --silent

# add app
COPY . ./

# start app
CMD ["npm", "run", "start"]

#FROM nginx:1.17
#COPY build/ /usr/share/nginx/html
#
#COPY nginx.conf /etc/nginx/conf.d/default.conf
## Expose port
#EXPOSE 3000
## Start nginx
#CMD ["nginx", "-g", "daemon off;"]