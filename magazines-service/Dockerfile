#
# ---- Base Node ----

FROM node:13-alpine AS base

RUN apk add --no-cache tini

ENV appdir /server/
RUN mkdir -p ${appdir}
WORKDIR ${appdir}
COPY package*.json ${appdir}

#
# ---- Dependencies ----
FROM base AS dependencies
# install node packages
# RUN npm install -g @nestjs/cli
RUN npm install 
RUN npm install --only=dev
# If you are building your code for production
# RUN npm ci --only=production

# ---- Build ----
FROM dependencies AS build
COPY . .


#
# ---- Release ----
FROM build AS release
EXPOSE 3000
CMD ["tini","npm", "run", "start"]