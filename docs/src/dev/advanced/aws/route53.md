---
outline: [2, 3]
tags: 
  - AWS
publishDate: 2022/03/04
---

# Route53

## DNS

> Domain name system

- 它的工作是翻译主机名进入目标服务器的 IP
- 是互联网的支持
- DNS 有一个分层的命名结构

### DNS 术语

- 域名注册商：注册域名的地方，比如 Amazon Route53，GoDaddy...
- DNS 记录：A,AAAA,CNAME,NS...
- 区域文件：包含所有 DNS 记录的区域文件，这就是匹配主机名到 IP 地址的方法
- 名称服务器：解决 DNS 查询
- 顶级域 Top Level Domain(TLD)：.com,.us,.cn,.gov,.org...
- 二级域名 Second Level Domain(SLD)：[amazon.com](http://amazon.com/), [google.com](http://google.com/)
  ![DNS 术语](/src/assets/aws-route53-dns.png)

### DNS 如何工作

> 递归询问

- 在我们输入网址后，我们的网络浏览器先会查询本机 hosts
- 然后是 DSN 解析缓存
- 然后向本地的 DNS 服务器(通常是由公司或 ISP 网络服务提供商管理提供)发送查询请求
- 如果没有找到，则本地 DNS 服务器继续向根域名服务器(全球 13 个，由 ICANN 机构管理)发送请求。
- 根域名服务器：也不认识，[但是认识.com](http://xn--gqq717c6p0a5da.com/)，去这个 NS(1.2.3.4)找
- 找到了顶级域名服务器：也不认识，[但是认识.example.com](http://xn--gqq717c6p0a5da.example.com/)，去这个 NS(5.6.7.8)找
- 然后找到了二级域名服务器，这是一个由域名注册商管理的服务器。它会认识这个域名，并把地址返回。
- 找到之后本地 DNS 服务器将会缓存，如果有人再次查询就能立即拿到结果
- 然后本地 DNS 服务器将会把结果返回给浏览器，浏览器就会使用这个 IP 去访问对应的服务器。
  ![DNS 如何工作](/src/assets/aws-route53-dns-work.png)

> ISP
> Internet service provider 网络服务提供商，可以分为很多种：
> 搜索引擎 ISP：百度，谷歌
> 即时通讯 ISP：易信，飞信
> 移动互联网业务 ISP
> 门户 ISP：新浪，搜狐，网易，雅虎
> 电子邮箱 ISP：网易，腾讯，新浪，搜狐，gmail
> 中国三大运营商：电信，移动，联通

## Route53 定义

- 高度可用、可扩展、以及完全托管和权威的 DNS
- 也是一个域名注册商
- 可以检查健康状况
- AWS 中唯一一个提供 100%的可用性 SLA 的服务
- 为什么叫 Route53？是对传统 DNS 端口的引用

## 记录(Records)

- 定义想如何路由流量到一个特定的域
- 每条记录都包括：
  - 域名/子域名：[example.com](http://example.com/)
  - 类型：A 或者 AAAA
  - 值：12.34.56.78
  - 路由策略：如何响应查询
  - TTL：time to live 记录被缓存在 DNS 解析器中的持续时间
- 支持多种 DNS 记录类型：
  - **A / AAAA / CNAM / NS**
  - 了解：CAA / DS / MX / NAPTR / PRT / SOA / TXT / SPF / SRV

### 记录类型

- A：主机名映射到 IPv4
- AAAA：主机名映射到 IPv6
- CNAME：映射主机名到另一个主机名
  - 目标主机名可以是 A 或 AAAA
  - 不能在 Route53 中对 DNS 命名空间或区域定点创建 CNAME：比如不能创建 [example.com](http://example.com/) 但是可以创建 [www.example.com](http://www.example.com/)
- NS：托管区域的名称服务器，它们是服务器的 DNS 名称或 IP 地址，可以响应托管区域的 DNS 查询

### 托管区域

- 是一个容器：用于定义如何路由流量到一个域或者子域
- 有两种类型的托管区域：公共区域和私人区域
- 公共区域：包含了指定在公共网络上如何路由的记录，公共互联网上的任何人都可以查询
- 私有区域：包含了指定在私有网络上如何路由的记录，只可在虚拟私有云或 VPC 中解析这个 URL
- $0.5 1 月/1 区域

### CNAME vs Alias

- AWS 资源暴露了一个 AWS 主机名可能是：[demoroute53alb-148738170.ap-northeast-1.elb.amazonaws.com](http://demoroute53alb-148738170.ap-northeast-1.elb.amazonaws.com/)，[但是我们想要 myapp.domain.com](http://xn--myapp-vl2h3uj54irdce5p421h.domain.com/)
- CNAME：
  - 将主机名指向另一个主机名：[app.mydomain.com](http://app.mydomain.com/) => [blabla.anything.com](http://blabla.anything.com/)
  - 只有一个非根域名时才有效，[不适用于 mydomain.com](http://xn--mydomain-c49lt5b070x1l1c.com/)
- Alias：
  - 将主机名指向一个 AWS 资源，这是 Route53 独有的：[app.mydomain.com](http://app.mydomain.com/) => [blabla.amazonaws.com](http://blabla.amazonaws.com/)
  - **对于根域和非根域都有效** [mydomain.com](http://mydomain.com/)
  - **免费的**
  - 本机健康检查

### 别名记录

- 将一个主机名映射到一个 AWS 资源上
- 对 DNS 功能的扩展
- 可以自动识别资源 IP 地址改变
- 不像 CNAME，可以用于顶级节点
- 对于 AWS 资源总是类型 A 或者 AAAA
- **无法设置 TTL**

### 别名记录资源

- ELB
- CloudFront Distributions
- API Gateway
- Elastic Beanstalk environments
- S3 websites
- VPC interface Endpoints
- Global Accelerator
- 相同托管区域的 Route53 记录
- **不能为 EC2DNS 设置别名**

## 路由策略(Routing Policies)

- 定义 Route53 如何响应 DNS 查询
- Routing 的含义:
  - 和负载均衡的 routing 不同
  - DNS 不会路由任何流量，只会响应 DSN 查询，告诉客户端要走哪条路
- 支持以下路由策略：
  - 简单的 simple
  - 加权的 weighted
  - 故障转移的 failover
  - 基于延迟的 latency based
  - 基于地理位置的 geolocation
  - 多值答案 multi value answer
  - 地理邻近度 geoproximity

### 简单

- 通常路由到单个资源
- 可以在相同的 record 指定多个值，如果返回了多个值，就会被客户端随机选中一个
- 如果启用了别名，只可以指定一个 AWS 资源
- 不能与健康检查关联

### 加权

- 控制到达每个资源的百分比
- 为每个记录分配一个相对权重 流量=特定记录的权重/所有记录权重
- DNS 记录必须有着相同的名字和类型
- 可以与健康检查关联
- 用例：跨地区之间的负载均衡，测试新的应用程序(通过极少的流量)
- **权重为 0 则停止发送流量到特定资源**
- **如果全部记录权重加起来为 0，则所有的记录权重相同**

### 基于延迟

- 记录名称也要相同？
- 重定向到延迟最低的资源
- 对延迟比较关注时很有效
- 延迟是基于用户和资源所在的 AWS 域的
- 所以可能会重定向到其他的域(如果在不同域部署了实例)
- 可以关联健康查询

### 故障转移

- 故障转移记录类型：一个主要的，一个次要的
- 先检查主要的，如果不健康，检查次要的，然后将流量路由到次要的上
- 可以绑定一个健康检查的 ID

### 基于地理位置

- 不同于延迟
- 基于用户的地理位置
- 指定一个特定的位置，然后路由到特定的资源
- 应该创建一个默认的记录，以防未匹配到地理位置
- 用例：网站本地化，限制内容分发，负载均衡等
- 可以关联健康查询

### 多值

- 路由到多个资源
- Route53 返回多个值/资源
- 可以关联到健康检查(只返回健康的)
- 每个多值查询最多返回 8 个记录
- **多值不能用来替代 ELB**

### 地理邻近度

- 基于用户和资源的位置
- 根据偏差来路由
- 改变偏移量来控制到特定区域的流量
  - 增加偏差：更多流量
  - 减少偏差：更少流量
- 资源可以是
  - AWS 资源(指定 AWS 区域)
  - 非 AWS 资源(指定经纬度)
- 必须使用高级 Route53 traffic 才能使用偏差
  ![地理邻近度](/src/assets/aws-route53-near.png)

## 健康检查

- 只能用于公共资源
- 健康检查可以用于自动 DNS 故障转移，有三种方式：
  1. 监控一个公共端点，可以是 app，server 或 AWS 资源
  2. 监控其他健康检查(计算健康检查 Calculated Health Checks)
  3. 监控 ClounWatch Alarm
- 健康检查有自己的指标，也可以在 CloudWatch 指标中查看

### 监控端点

- 大约 15 个全球的 Health Checker 发送请求到公共端点设置的任何路由上，如果返回 200 或者我们定义好的代码，就认为是健康的
  - 健康修改为不健康所需要的阈值(不健康次数)
  - 间隔 - 每隔多久检查一次
  - 支持多种协议：HTTP,HTTPS,TCP
  - 大于 18%的 Health Checker 报告是健康那么 Route53 就认为是健康的，否则就是不健康的
  - 也可以选择 Route53 使用哪些地理位置来检查
- 健康检查只有当端点响应 200 300 状态码才通过
- 可以设置 基于响应的前 5120 个字节的文本来决定是否通过
- 配置路由器/防火墙来允许健康检查程序的请求能进来，检查程序 URL 地址范围：https://ip-ranges.amazonaws.com/ip-ranges.json

### 计算健康检查

- 结合多个健康检查结果为一个结果
- 可以使用逻辑 或/与/非
- 至多可以监控 256 项子检查
- 可以指定多少健康检查通过，父级才算通过
- 用例：不等所有检查都失败就执行维护程序

### 私有托管区域检查

- 所有 Route53 的健康检查程序都在 VPC 之外
- 不能访问私有端点(私有 VPC 或者本地资源)
- 可以创建一个 CloudWatch 指标，并为其分配 CouldWatch 警报，然后创建一个健康检查来检查这个警告

## 第三方域名注册商

即使每个域名注册商通常都带 DNS 功能，但是可以选择其他平台来管理 DNS 服务。
可以从第三方注册域名，然后使用 AWS Route53 来管理 DNS 记录。

1. 在 Route53 中创建一个托管区域
2. 在第三方网站上更新 NS 记录，改成 Route53 的 Name Servers

**域名注册商!=DNS 服务**
