FROM node:10-slim

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN apt-get update && \
    apt-get install -y yarn \
    curl \
    nano

WORKDIR /var/www/app

COPY docker/app/entrypoint.sh /usr/local/bin/
COPY package.json /var/www/app/
COPY yarn.lock /var/www/app/

RUN npm install -g typescript
RUN npm install -g @nestjs/cli
RUN yarn

RUN chown -R node: /var/www/app

ENTRYPOINT ["sh", "/usr/local/bin/entrypoint.sh"]

CMD ["yarn", "start:prod"]