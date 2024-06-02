---
outline: [2, 3]
tags: Docker
publishDate: 2022/04/18
---

# Docker 实战

## 实战：MongoDB

```yaml
version: "3.1"
services:
  mongo:
    image: mongo
    ports:
      - 27017:27017

  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - 8081:8081
```

## 实战：启动一个 WordPress 博客

```shell
# 1. 创建项目
mkdir my_wordpress
cd my_wordpress/

# 2. 创建docker-compose.yml
version: "3.9"

services:
  db:
    image: mysql:5.7
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: somewordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    volumes:
      - wordpress_data:/var/www/html
    ports:
      - "8000:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
volumes:
  db_data: {}
  wordpress_data: {}

# 3. 启动
docker-compose up -d

# 4. 访问
http://localhost:8000
```
