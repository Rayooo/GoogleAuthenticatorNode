FROM ubuntu:latest
MAINTAINER Ray 123@qq.com

RUN mkdir -p /GoogleAuthenticator

WORKDIR /GoogleAuthenticator
COPY . /GoogleAuthenticator


# backup old sources.list
# 更换为163的源，国内你懂的
RUN cp /etc/apt/sources.list /etc/apt/sources.list.bac && \
    echo "deb http://mirrors.163.com/ubuntu/ trusty main restricted universe multiverse" > /etc/apt/sources.list && \
    echo "deb http://mirrors.163.com/ubuntu/ trusty-security main restricte universe multiverse" >> /etc/apt/sources.list && \
    echo "deb http://mirrors.163.com/ubuntu/ trusty-updates main restricted universe multiverse" >> /etc/apt/sources.list && \
    echo "deb http://mirrors.163.com/ubuntu/ trusty-proposed main restricted universe multiverse" >> /etc/apt/sources.list && \
    echo "deb http://mirrors.163.com/ubuntu/ trusty-backports main restricted universe multiverse" >> /etc/apt/sources.list && \
    echo "deb-src http://mirrors.163.com/ubuntu/ trusty main restricted universe multiverse" >> /etc/apt/sources.list && \
    echo "deb-src http://mirrors.163.com/ubuntu/ trusty-security main restricted universe multiverse" >> /etc/apt/sources.list && \
    echo "deb-src http://mirrors.163.com/ubuntu/ trusty-updates main restricted universe multiverse" >> /etc/apt/sources.list && \
    echo "deb-src http://mirrors.163.com/ubuntu/ trusty-proposed main restricted universe multiverse" >> /etc/apt/sources.list && \
    echo "deb-src http://mirrors.163.com/ubuntu/ trusty-backports main restricted universe multiverse" >> /etc/apt/sources.list


RUN apt-get update && \
    apt-get install -y nodejs && \
    sed -i "s/localhost:3000/123.206.121.72/" /GoogleAuthenticator/public/js/util.js && \
    sed -i "s/password        : 'root'/password        : 'N9sLsEhi3EejndytqpvqxQzaNd8r'/" /GoogleAuthenticator/config/mysqlConfig.js && \
    sed -i "s/host            : '127.0.0.1'/host            : '123.206.121.72'/" /GoogleAuthenticator/config/mysqlConfig.js


CMD ["nodejs","bin/www"]

EXPOSE 3000

