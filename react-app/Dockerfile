# syntax=docker/dockerfile:1

FROM nginx:1.23.1
COPY public /usr/share/nginx/html
COPY nginx.conf.example /etc/nginx/nginx.conf
EXPOSE 9000 