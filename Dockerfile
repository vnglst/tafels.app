# The export is built, checked and committed in this repository before release.
FROM nginx:stable-alpine
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN nginx -t
EXPOSE 80
