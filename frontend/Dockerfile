# pull official base image
FROM node:14-alpine AS development

ENV NODE_ENV development

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["yarn", "start"]