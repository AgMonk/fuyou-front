FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --registry=https://registry.npm.taobao.org
COPY . .
RUN npm --version
RUN npm run build

# production stage
FROM nginx:latest as production-stage
COPY nginx.conf  /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



###########################
#
#FROM nginx
#COPY ./dist/ /usr/share/nginx/html/
#COPY nginx.conf /etc/nginx/nginx.conf