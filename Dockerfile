FROM node:20 as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i --no-package-lock
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]