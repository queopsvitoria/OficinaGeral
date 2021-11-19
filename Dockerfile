FROM node:latest as angular
WORKDIR /app
COPY packge.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/request-http /user/share/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf


#docker ruild -t curso-angular .
#docker run -p 8081:80 curso-angular
