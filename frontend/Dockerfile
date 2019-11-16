
FROM node:10.16.0-alpine

WORKDIR /frontend

COPY . /frontend

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

# RUN npm install pm2 -g

RUN npm install nodemon -g

RUN npm install

EXPOSE 8080

# CMD ["npm","run","dev"]
CMD ["npm","run","serve"]
# CMD /wait && npm run dev
# CMD /wait && npm run start
# CMD ["npm","run","start"]
