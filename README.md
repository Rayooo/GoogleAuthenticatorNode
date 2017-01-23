# GoogleAuthenticatorNode

后端Node

数据库Mysql

两步验证的第三方库  spreakeasy  https://github.com/speakeasyjs/speakeasy

第三方二维码生成网站 http://qr.liantu.com/api.php?&w=400&text=TEXT

密码加盐hash，用户创建账户或每次修改密码时，都应该重新生成新的盐值进行加密。

密码加盐hash第三方库  https://github.com/davidwood/node-password-hash

设置token和refreshToken，用每隔一段时间用refreshToken去更换token

用GitHub的WebHook进行自动部署，在util中webHook.js中

GitHubWebHook的第三方库  https://github.com/rvagg/github-webhook-handler

shelljs 执行shell的第三方库  https://www.npmjs.com/package/shelljs


1.数据库建表:

CREATE DATABASE google_auth;

use google_auth;

CREATE TABLE IF NOT EXISTS user(
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  create_date TIMESTAMP NULL DEFAULT now(),
  password TEXT NOT NULL,
  secret_key TEXT,
  token TEXT,
  token_create_time TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

2.开启服务

npm install

node bin/www