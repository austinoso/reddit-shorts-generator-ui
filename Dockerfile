FROM jrottenberg/ffmpeg:4.4-scratch AS ffmpeg

FROM node:16
COPY --from=ffmpeg / /
WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . ./

FROM node:16 AS builder
WORKDIR /app
COPY ./videoGenerator ./videoGenerator
COPY ./client ./client
RUN cd videoGenerator && npm install && npm run build
RUN cd client && npm install && npm run build

FROM mongo
WORKDIR /app
# COPY ./init-mongo.sh /docker-entrypoint-initdb.d/
VOLUME /data/db
EXPOSE 27017

FROM node:16
WORKDIR /app
COPY --from=builder /app/videoGenerator/dist ./videoGenerator/dist
COPY --from=builder /app/client/dist ./client/dist
COPY package*.json ./
RUN npm install --only=production
COPY . ./

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# RUN apt-get -y update
# RUN apt upgrade -y
# RUN apt-get install -y software-properties-common 
# RUN sed -i "/^# deb.*multiverse/ s/^# //" /etc/apt/sources.list
# RUN sed -i "/^# deb.*universe/ s/^# //" /etc/apt/sources.list
# RUN apt upgrade -y
# RUN apt-get update && apt-get install -y \
#   libcairo2-dev \
#   libpango1.0-dev \
#   libjpeg-dev \
#   libgif-dev \ 
#   librsvg2-dev \
#   libxi-dev \
#   libglu1-mesa-dev \
#   libglew-dev \
#   python2.7 \
#   python-pip \
#   xvfb
# RUN apt-get install gnupg wget -y && \
#   wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
#   sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
#   apt-get update && \
#   apt-get install google-chrome-stable -y --no-install-recommends && \
#   rm -rf /var/lib/apt/lists/*

RUN npm install -g typescript && npm install -g ts-node
CMD ["ts-node", "main.ts"]

EXPOSE 7777
EXPOSE 7778


# RUN npm run start
