FROM node:18-alpine as builder

WORKDIR /usr/src
COPY . .
RUN yarn
RUN yarn run build

FROM nginx:1.17.1

COPY --from=builder /usr/src/.output/public /var/www/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost/health-check || exit 1