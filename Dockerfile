# Use an official lightweight Nginx image
FROM nginx:alpine

# Copy the contents of the 'public' folder into the Nginx default directory
# /usr/share/nginx/html is the default root for Nginx in this image
COPY public/ /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Nginx runs by default, so we don't need a CMD
# The default CMD is already defined in the base image as 'nginx -g "daemon off;"'