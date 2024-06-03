---
outline: [2, 3]
tags:
  - Docker
publishDate: 2022/04/15
---

# Docker进阶

## DockerFile

Dockerfile 就是用来构建 docker 镜像的构建文件。是一个命令参数脚本。

> 构建步骤
>
> 1. 编写一个 Dockerfile 文件
> 2. docker build 构建成为一个镜像
> 3. docker run 运行镜像
> 4. docker push 发布镜像（DockerHub，阿里云镜像仓库...）

很多官方镜像都是基础包，很多功能没有，我们通常会自己构建镜像。

Dockerfile 是面向开发的，我们以后要发布项目，做镜像，就需要编写 Dockerfile

Dockerfile 镜像逐渐成为企业交付的标准，必须掌握的技能。

### Dockerfile 构建过程

基础知识：

1. 每个关键字（指令）都是大写
2. 执行从上到下顺序执行
3. #表示注释
4. 每一个指令都会创建一层镜像并提交

- Dockerfile：构建文件，定义了一切的步骤，源代码
- DokcerImages：通过 Dockerfile 构建生成的镜像，最终发布和运行的产品
- Docker 容器：容器就是镜像运行起来提供服务器

### Dockerfile 指令

Docker Hub 中 99%的镜像都是从`FROM:scratch`开始，然后配置需要的软件来构建。

```
FROM		# 基础镜像，一切从这里开始构建 centos ubuntu...
MAINTAINER	# 镜像的作者、维护者信息：姓名+邮箱
RUN			# 镜像构建的时候需要运行的命令
ADD			# 步骤 比如tomcat压缩包，要添加的内容
WORKDIR		# 镜像的工作目录
VOLUME		# 设置卷，挂载的主机目录
EXPOSE		# 指定对外的端口
CMD			# 指定这个容器启动的时候要运行的命令，只有最后一个会生效，可被替代
ENTRYPOINT	# 指定这个容器启动的时候要运行的命令，可以追加命令
ONBUILD		# 当构建一个被继承的镜像 DockerFile就会运行ONBUILD，触发指令
COPY		# 类似ADD，将文件拷贝到镜像中
ENV			# 构建的时候设置环境变量

```

### 实战：制作一个镜像

基于官方的 centos 制作一个支持 ifconfig/vim/pwd 命令的镜像。

```
# 1. 编写配置文件
FROM centos:centos7
MAINTAINER buzheng<bootcher.one@gmail.com>

ENV MYPATH /usr/local
WORKDIR	$MYPATH

RUN yum -y install vim
RUN yum -y install net-tools

EXPOSE 80

CMD echo $MYPATH
CMD echo "----end----"
CMD /bin/bash

# 2. 通过文件构建镜像
docker build -f dockerfile -t mycentosimage:0.1 .

Successfully built 68ab49e302ab
Successfully tagged mycentosimage:0.1

# 3. 测试运行
[root@VM-0-9-centos test]# docker images
REPOSITORY      TAG       IMAGE ID       CREATED          SIZE
mycentosimage   0.1       68ab49e302ab   56 seconds ago   580MB
<none>          <none>    ba835146a19f   7 minutes ago    231MB
buzhengcentos   0.1       65683d47144f   3 hours ago      231MB
mysql           5.7       f26e21ddd20d   7 days ago       450MB
nginx           latest    12766a6745ee   7 days ago       142MB
centos          centos7   eeb6ee3f44bd   6 months ago     204MB
centos          latest    5d0da3dc9764   6 months ago     231MB
[root@VM-0-9-centos test]# docker run -it mycentosimage:0.1
[root@2e77007613a0 local]# pwd
/usr/local
[root@2e77007613a0 local]# ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.18.0.3  netmask 255.255.0.0  broadcast 172.18.255.255
        ether 02:42:ac:12:00:03  txqueuelen 0  (Ethernet)
        RX packets 8  bytes 656 (656.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

[root@2e77007613a0 local]# vim test

```

### 查看镜像历史

```
[root@VM-0-9-centos test]# docker history 68ab49e302ab
IMAGE          CREATED         CREATED BY                                      SIZE      COMMENT
68ab49e302ab   4 minutes ago   /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "/bin…   0B
0963e6c21fdf   4 minutes ago   /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "echo…   0B
bed4fb59b8ff   4 minutes ago   /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "echo…   0B
b989abd671af   4 minutes ago   /bin/sh -c #(nop)  EXPOSE 80                    0B
e5d03f490af0   4 minutes ago   /bin/sh -c yum -y install net-tools             161MB
e7fd36289006   4 minutes ago   /bin/sh -c yum -y install vim                   216MB
33d036186c24   4 minutes ago   /bin/sh -c #(nop) WORKDIR /usr/local            0B
c964db7d4be4   4 minutes ago   /bin/sh -c #(nop)  ENV MYPATH=/usr/local        0B
e74f5f60158f   4 minutes ago   /bin/sh -c #(nop)  MAINTAINER blcher<bootche…   0B
eeb6ee3f44bd   6 months ago    /bin/sh -c #(nop)  CMD ["/bin/bash"]            0B
<missing>      6 months ago    /bin/sh -c #(nop)  LABEL org.label-schema.sc…   0B
<missing>      6 months ago    /bin/sh -c #(nop) ADD file:b3ebbe8bd304723d4…   204MB

```

### 实战：制作一个 Tomcat 镜像

1、准备镜像文件 tomcat 压缩包，jdk 的压缩包

2、编写 dockerfile 文件

3、docker tag 添加标签

```
FROM centos
MAINTAINER xxx
COPY read.txt /usr/local/readme.txt

ADD jdk-8u11-linux-x64.tar.gz /usr/local # ADD会自动解压
ADD apache-tomcat-9.0.22.tar.gz /usr/local

RUN yum -y install vim
RUN yum -y install net-tools

ENV MYPATH /usr/local
WORKDIR $MYPATH

ENV JAVA_HOME /usr/local/jdk7.8.0_11
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.22
ENV CATALINA_BASH /usr/local/apache-tomcat-9.0.22
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOME/bin

EXPOSE 8080

CMD /usr/local/apache-tomcat-9.0.22/bin/startup.sh && tail -F /usr/local/apache-tomact-9.0.22/bin/logs/catalina.out

```

### 发布自己的镜像

### Docker Hub

```
# 登录
docker login -p [password] -u [username]

[root@VM-0-9-centos test]# docker login -u blcher
Password:
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
<https://docs.docker.com/engine/reference/commandline/login/#credentials-store>

Login Succeeded

# 提交
docker push blcher/diyimage:1.0

# 提交的时候也会一层一层提交镜像

```

### 阿里云

1、创建命名空间

2、创建容器镜像 - 选择本地仓库

3、阿里云里有详细的步骤

![Docker示意](/src/assets/docker-map.png)

## Docker 网络

`ip addr` 查看本机 ip 信息

- 每启动一个容器，都会生成一个网卡
- evth-pair 就是一对虚拟设备接口，他们都是成对出现的，一端连着协议，另一端彼此相连，evth-pair 充当一个桥梁，连接各种虚拟网络设备
- Openstack, Docker 容器之间的连接，OVS 的连接，都是使用 evth-pair 技术

结论：Docker 容器之间可以互相 ping 通，Docker 中的所有网络接口都是虚拟的，虚拟的转发效率高(内网传文件)。只要容器删除，对应的网桥一对就没了。

### Dokcer 容器互联

- -link
  其实就是在 hosts 中增加一个映射
  我们现在已经不建议用--link 了，因为 docker 0 是官方的，我们希望自定义网络。

### 自定义网络

> 查看所有的 docker 网络

```
[root@VM-0-9-centos /]# docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
45b4a6c4f8f4   bridge    bridge    local
73b6bb2bceb4   host      host      local
d6066c357881   none      null      local

```

### 网络模式

- bridge: 桥接 docker（默认）
- none：不配置网络
- host：和宿主机共享网络
- container：容器网络连通（用得少，局限性很大）

### 测试

```
# 我们直接启动的命令 --net bridge，这个就是我们的docker0
docker run -P --name tomcat01 tomcat
docker run -P --name tomcat02 --net bridge tomcat

```

### 创建网络

```
[root@VM-0-9-centos /]# docker network create --driver bridge --subnet 192.168.0.0/16 --gateway 192.168.0.1 mynet

# --driver bridge
# --subnet 192.168.0.0/16 子网
# --gateway 192.168.0.1 网关
# mynet 网络名称
5efd1a4bc96cf9c631f9c68e6956195f5bd0892a4ddf44652880391e77c9e577

[root@VM-0-9-centos /]# docker network inspect mynet
[
    {
        "Name": "mynet",
        "Id": "5efd1a4bc96cf9c631f9c68e6956195f5bd0892a4ddf44652880391e77c9e577",
        "Created": "2022-04-14T22:04:46.32875633+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "192.168.0.0/16",
                    "Gateway": "192.168.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {},
        "Options": {},
        "Labels": {}
    }
]

```

### 为什么要自定义网络

```
# 不使用 --link 也可以ping的通
# 自定义的网络docker都已经帮我们维护好了对应的关系，推荐我们平时这样使用网络。

```

redis/mysql： 不同的集群使用不同的网络，保证集群是安全和健康的

### 网络连通

```
# 测试 打通docker0的容器 连通 mynet
[root@VM-0-9-centos /]# docker network connect mynet tomcat02
[root@VM-0-9-centos /]# docker network inspect mynet
[
    {
        "Name": "mynet",
        "Containers": {
            "28b569933ea6ff08c52f10c42bf6e8afbaf44ee6c1db6e1354fe8f52dfb8dc4b": {
                "Name": "tomcat-net-2",
                "EndpointID": "cfda030598599d72473b393d689086c88d992b10e026f432778e05cca1ad384f",
                "MacAddress": "02:42:c0:a8:00:02",
                "IPv4Address": "192.168.0.2/16",
                "IPv6Address": ""
            },
            "4eee2c17ee2050bcb0148e7d0d559325ed4deb51bbe74fce93633e51b3574771": {
                "Name": "tomcat02",
                "EndpointID": "b56abb729ca1fedb5d9a97ba9e15b1382d2d51124f2e34c0cb88e793668625e3",
                "MacAddress": "02:42:c0:a8:00:03",
                "IPv4Address": "192.168.0.3/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]
# 连通之后将tomcat02放到了mynet网络下
# 也就是一个容器 两个ip地址

```

**结论：假设要跨网络去操作别人，就需要用 docker network connect 连通！**

![Docker流程](/src/assets/docker-flow.png)

## Docker Compose

DockerFile build run 手动操作，单个容器，n 多个微服务，依赖关系，难以操作。

轻松高效管理容器。定义运行多个容器。

**批量容器编排。**

### Compose 三步骤

1. DockerFile 保证我们的项目在任何地方可以运行
2. docker-compose.yml
3. 启动 `docker-compose up`

### 安装

1. 下载

```shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 国内地址
curl -L https://get.daocloud.io/docker/compose/releases/download/1.29.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
```

2. 授权

```shell
sudo chmod +x /usr/local/bin/docker-compose
```

3. 查看是否安装成功

```shell
[root@VM-0-9-centos bin]# docker-compose version
docker-compose version 1.29.2, build 5becea4c
docker-py version: 5.0.0
CPython version: 3.7.10
OpenSSL version: OpenSSL 1.1.0l  10 Sep 2019

```

### 初体验

官方 demo：python 计数器应用。

#### 1. 创建应用

```shell
# 创建目录
[root@VM-0-9-centos home]# mkdir composetest
[root@VM-0-9-centos home]# cd composetest/

# 创建app.py
vim app.py
-----
import time

import redis
from flask import Flask

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)

# 创建requirements.txt
flask
redis
```

#### 2. 创建 DockerFile

```shell
# syntax=docker/dockerfile:1
FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run"]
```

#### 3. Compose 中定义 services

```shell
vim docker-compose.yml
---
version: "3.9"
services:
  web:
    build: .
    ports:
      - "8000:5000"
  redis:
    image: "redis:alpine"
```

```shell
[root@VM-0-9-centos composetest]# ll
total 16
-rw-r--r-- 1 root root 514 Apr 15 00:04 app.py
-rw-r--r-- 1 root root 111 Apr 15 00:08 docker-compose.yml
-rw-r--r-- 1 root root 278 Apr 15 00:07 Dockerfile
-rw-r--r-- 1 root root  12 Apr 15 00:05 requirements.txt

```

#### 4. 构建

```shell
docker-compose up
---

[root@VM-0-9-centos ~]# docker ps
CONTAINER ID   IMAGE             COMMAND                  CREATED              STATUS              PORTS                                       NAMES
0adfcdb14748   composetest_web   "flask run"              About a minute ago   Up About a minute   0.0.0.0:8000->5000/tcp, :::8000->5000/tcp   composetest_web_1
ae7ca75cd778   redis:alpine      "docker-entrypoint.s…"   About a minute ago   Up About a minute   6379/tcp                                    composetest_redis_1
---

[root@VM-0-9-centos ~]# curl localhost:8000
Hello World! I have been seen 1 times.
[root@VM-0-9-centos ~]# curl localhost:8000
Hello World! I have been seen 2 times.
[root@VM-0-9-centos ~]# curl localhost:8000
Hello World! I have been seen 3 times.
[root@VM-0-9-centos ~]# curl localhost:8000
Hello World! I have been seen 4 times.
[root@VM-0-9-centos ~]#

# 成功！
```

#### 5. 停止

```shell
docker-compose down
Ctrl + c
```

### Yaml 规则

[官方文档](https://docs.docker.com/compose/compose-file/build/)

```shell
# 3层
version: # 版本

services: # 服务
	# 服务1
	web
		images
		build
		network
    # 服务2
    redis

# 其他配置
volumes...
networks...
configs...
```

## Docker Swarm

集群的方式部署。
