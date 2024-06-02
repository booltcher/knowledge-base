---
outline: [2, 3]
tags: AWS
publishDate: 2022/03/22
---

# CloudFront

> &AWS Global Accelerator

- 是一个 CDN
- 通过将内容缓存到不同的 edge，提高了读性能
- 改善用户体验
- 全球 216 个接入点(AWS 还在不断增加)
- DDoS 保护(使用了 Shield 和 AWS Web 应用防火墙)

## Origins

- S3 Bucket
  - 分发文件并缓存
  - OAC(Origin Access Control)来提升安全性，用于替代 OAI(Origin Access Identity)
  - Cloud 可以被用于入口(入境)来上传文件到 S3
- 任何自定义的 HTTP 源
  - Application load balancer
  - EC2 实例
  - S3 网站(得先将 Bucket 启用为静态 S3 网站)
  - 任何 HTTP 后端

## CloudFront vs S3 跨区域复制

- CloudFront
  - 全球边缘网络(216 个)
  - 文件将被缓存在一定 TTL(一天)内
  - 对于需要全球可用的静态内容很有用
- 跨区域复制
  - 必须为每个区域设置，所以不是每一个地区
  - 没有缓存，文件被几乎实时更新
  - 只读
  - 对于需要在几个区域内低延迟的动态内容很有用

## 将 EC2 或 ALB 作为源

- EC2 必须是公开的，因为 CloudFront 没有 VPC
- ALB 必须是公开的，但是 ALB 里的 EC2 可以是私有的，因为 ALB 和 EC2 之间是有 VPC 的
- 还需要设置安全组来允许公共 IP 的访问

## 地理限制

- 可以限制谁可以访问分发
  - 允许列表：批准的国家/地区列表
  - 阻止列表
- 使用第三方 Geo-IP 数据库来决定着国家
- 用例：版权法来控制对内容的访问

## 价格

- CLoudFront 边缘位置遍布全球
- 每个边缘位置的数据输出成本会有所不同
- 可以为了降低成本减少边缘位置的数量
- 三种价格等级：
  - Price Class All：所有地区，做好的性能，最贵
  - Price Class 200：大多数区域，但是不包括最贵的区域
  - Price Class 100：只有最便宜的地区

## 缓存失效

- 更新了源，CloudFront 不知道所以它只会在 TTL 失效后更新
- 所以可以强制全部或部分缓存刷新，通过缓存失效来绕过 TTL
- 可以指定全文件(\*)或一个特定的路径

## GlobalAccelerator

> AWS 全球加速器

### Unicast IP vs Anycast IP

- Unicast IP：一台服务器拥有一个 IP
- Anycast IP：所有服务器拥有相同的 IP，并且客户端将被路由到最近的一个
- 全球加速器就是使用了 Anycast IP 的原理

### 原理

- 充分利用 AWS 内部网络去路由到应用
- 为应用创建 2 个 Anycast IP
- AnycastIP 发送流量到边缘位置
- 边缘位置发送流量到应用

### 特性

- 适用于弹性 IP，EC2，ALB，NLB，可以是公共的，也可以是私有的
- 一致的表现：
  - 智能路由到延迟最低，用快速的区域故障
  - 客户端缓存没有问题（因为 IP 不会改变）
  - 内部 AWS 网络
- 健康检查
  - 加速器将为应用进行健康检查
  - 帮助确保应用是全球的(一分钟内自动进行故障转移到一个健康的端口)
- 安全：
  - 只有两个额外的 IP 需要进入白名单
  - 得益于 AWS Shield 的 DDoS

## CloudFront vs 全球加速器

- 都使用了 AWS 全球网络和遍布全球的边缘位置
- 都为 DDoS 集成了 AWS Shield

### 差异：

- CloudFront：
  - 对于可缓存的资源(比如图片和视频)提高了性能
  - 动态内容(比如 API 加速和动态站点交付)
  - 偶尔从源获取内容，大多数时候从 CloudFront 缓存中提取内容，所以是边缘提供内容
- Global Accelerator：
  - 通过 UDP 或 TCP 提高了更广泛应用的性能
  - 无缓存，所有请求都到了源应用
  - 适用于无 HTTP 用例：游戏、物联网、IP 语音
  - HTTP 用例：需要全局静态 IP 地址
  - 更高的确定性和更快的故障区域转移
