FROM node:18.14.2-alpine3.17

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install

COPY . .

EXPOSE 8080

ENV TOKEN_SECRET 95761ff1afc1f47831d685507ca3b750a57ca445606020e2e21b8f3cce20c1675eaa7a23780984a7c57d29ecd694fd3092931ff3c7d21794965eebcf51efb458

CMD [ "node", "server.js" ]