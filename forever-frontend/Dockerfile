FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Pass in the build-time environment variable for the API URL
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the React application
RUN npm run build

# Serve the application using NGINX
FROM nginx:alpine
# Copy the custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built assets from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
