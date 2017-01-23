FROM ubuntu:latest
MAINTAINER Ray 123@qq.com

RUN mkdir -p /GoogleAuthenticator

WORKDIR /GoogleAuthenticator
COPY . /GoogleAuthenticator

RUN apt-get update && \
    apt-get install -y nodejs && \
    apt-get install -y npm && \
    npm install --registry=https://registry.npm.taobao.org

RUN node /GoogleAuthenticator/bin/www
EXPOSE 3000

