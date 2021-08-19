# build environment
FROM node:14.16.0 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install react-scripts@ -g
COPY . /usr/src/app
RUN npm run build

# production environment
FROM nginx:1.15.8-alpine
RUN apk add curl
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/
COPY nginx/start-docker.sh /usr/local/bin/
RUN chmod 777 /usr/local/bin/start-docker.sh
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
ENV API_URL host.docker.internal
CMD /usr/local/bin/start-docker.sh