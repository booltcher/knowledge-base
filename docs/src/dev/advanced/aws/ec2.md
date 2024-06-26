---
outline: [2, 3]
tags:
  - AWS
publishDate: 2023/03/01
---

# EC2

> Elastic Compute Cloud 弹性云计算 是一种 IaaS(Infrastructure as a Service)

实例每次停止并开启，会重新分配公共 IP

## 用户数据

用户数据用于使用 bash 脚本引导 EC2 实例。该脚本可以包含安装软件/软件包、从 Internet 下载文件或任何想要的命令。只在实例启动时注入一次。

## 实例类型

> https://aws.amazon.com/cn/ec2/instance-types/
> 通用型，计算优化型，内存优化型，加速计算，存储优化，HPC 优化
> https://instances.vantage.sh/ 可以查看实例具体参数

### 实例的命名约束

> m5.2xlarge

m - 实例类，这里 m 是通用类型的实例
5 - 实例的代，会随着时间的推移改进硬件
2xlarge - 实例的大小

### 通用型

> m

如果有一个通用的目的，工作富有多样性，例如 Web 服务器或代码存储库。在计算、内存、网络之间有很好的平衡。

### 计算优化型

> c

针对计算密集型任务进行了优化。批处理数据，媒体转码，高性能网络服务器，机器学习，游戏服务器等。

### 内存优化型

> r、x、High Memory、z

适合在内存中处理大型数据集：关系或高性能非关系数据库，内存数据库，分布式网络级缓存存储，内存数据库，实时处理大型非结构化的数据。

### 存储优化型

> i、G、H

大型数据集进行高顺序读/写访问，高频事务处理系统(OLTP)，搜索优化实例，分布式文件系统

## 安全组(SG)

### 定义

- 安全组是 AWS 云网络安全的基础
- 控制如何允许流量进出实例
- 安全组只包含允许的规则
- 安全组的规则可以被 IP 或安全组引用(互相引用)
- 规范对端口的访问、授权 IP 范围、控制进出
- 安全组与区域/VPC 组合绑定
- 不在实例上，而是在实例外围
- 默认情况下，所以入站流量都被**禁止**，出站流量都被**允许**

### 典型的端口

- 22 = SSH - 登录到 Linux 实例
- 21 = FTP - 上传文件到文件共享
- 22 = SFTP - 使用 SSH 上传文件
- 80 = HTTP - 访问不安全的网站
- 443 = HTTPS - 安全访问网站
- 3389 = RDP - 远程桌面协议，登录到 windows 实例

### 使用 SSH 访问 EC2

- 找到创建实例时下载的 pem 文件并删除其中的空格
- 保证终端在 pem 文件所在目录
- `chmod 0400 ECtutrial.pem`
- `ssh -i EC2Tutorial.pem ec2-user@[instance public IP]`
- whoami 测试
- ping 一下 google.com 测试
- ctrl d 或者 exit 关闭链接

### 使用 EC2 Instance Connect 访问

选中实例后直接点击右上方的连接，会打开一个新的标签页
输入略有延迟

## 实例启动类型

### 按需

### 专用主机

最贵的

### 预留

可以将 EC2 预留实例预留 1 或 3 年。

### Spot Instance

Spot 实例适用于短期工作负载，这是最便宜的 EC2 购买选项。但是，它们不太可靠，因为您可能会丢失 EC2 实例。

如果想终止 spot 实例，需要先取消 Spot request，然后终止关联的 Spot instances，如果先终止了实例，他会重新请求你需要个数的实例。

### Spot Fleets(Spot 队列)

> 省钱的终极方法

- Spot 队列是一组 Spot 实例和可选的按需实例。它允许您以最低价格自动请求 Spot 实例。
- Spot Fleets 会尽可能地在设置的价格限制内，达到目标容量。所以可能会有不同操作系统和可用性区域。我们需要定义多个启动池，然后 Spot Fleets 会选择最适合的池，当到达了预算或目标容量时，它将不再启动实例。
- 定义一个策略来分配 Spot 实例：
  - 最低价： Spot Fleets 会启动来自最低价池的实例
  - 多样性：被分发在所有的池中(翻译奇怪)
  - 容量优化 capacityOptimized

## 私有 vs 公有 IP

网络分为 IPv4 和 IPv6。IPv4 比较常见，是最常用的在线格式，IPv6 更适用于物联网。
如果一台电脑有公有 IP，就可以在互联网中访问，如果只有私有 IP，就只能在专用网络中访问。

### 公有 IP

```
- 公有IP是唯一的，可以用来标识机器
- 可以很容易被地理定位到

```

### 私有 IP

```
- 只能在专用网络中识别
- 专有网络内唯一
- 不同的专有网络内可以相同
- 通过NAT设备连接到互联网，并充当代理的互联网网关
- 只有指定范围的IP可以作为私有IP

```

> 所以当我们使用 SSH 访问 EC2 实例时，我们只能访问公有 IP，因为我们不在一个专有网络。

![EC2](/src/assets/aws-ec2-privte-ip.png)

### 弹性 IP

> 停止一个 EC2 实例，会改变它的公有 IP

如果你想拥有固定的公有 IP，可以使用弹性 IP。
弹性 IP 是一个 IPv4，只要不删除可以一直存在。
可以通过快速转移弹性 IP 到其他实例来掩盖实例或软件的错误。
一个账户中可以有五个弹性 IP。
但我们应该避免使用弹性 IP，他们经常被称为糟糕的架构决策。
相反，我们应该使用随机的公有 IP，并为其分配一个 DNS 名称。
或者使用负载均衡而不是公有 IP。

## 置放群组

> Placement Groups

### 集群

高性能、高风险
同一个机架(Rack)，相同的硬件，同一个可用区(AZ)。超低延迟。但是如果硬件出现故障，所有 EC2 实例都同时不可用。

适用场景：大数据工作需要快速完成，应用程序需要极低延迟、高网络吞吐量(高带宽)。

### 分布(Spread)

降低风险
可以在不同的 AZ，不同的硬件上。
每个 AZ 每个组最多 7 个实例，所以如果一个应用很大，就不适用了。

适用场景：关键应用，尽可能避免风险

### 分区

> Partitions

每个 AZ 至多可以有 7 个分区。
可以跨一个 region 的多个 AZ。
分散在不同的分区。依赖着不同的硬件机架。

适用场景：分区感知的大数据应用，可以用分区感知来分发数据。HBase，Cassandra，Kafka

## 弹性网络接口

> Elastic network interface
> 推荐阅读，更多知识：https://aws.amazon.com/cn/blogs/aws/new-elastic-network-interfaces-in-the-virtual-private-cloud/

- 是 VPC 中的逻辑组件，代表一个虚拟网卡。它们是 EC2 实例可以访问网络的原因，但它们也可以在 EC2 之外使用。
- 每个 ENI 可以有以下属性：
  - 一个主要的私有 IPv4，一个或多个次级 IPv4
  - 每个私有 IPv4 可以有一个弹性 IP
  - 一个或多个安全组
  - 一个 Mac 地址
- 可以独立创建 ENI，并且附加他们或从实例中移出，以进行故障转移。
- 绑定到特性的 AZ。这意味着在特定 AZ 中创建的 ENI 只能绑定到该 AZ 上。
- 随实例启动所创建的 ENI 会在实例停止时被自动删除

## 休眠(Hibernate)

> 实例各状态：
> 停止：磁盘上的数据会依旧保留
> 终止：实例连同卷一起被销毁
> 启动：启动操作系统，运行用户数据，应用系统启动，缓存被预热

休眠：不管内存中是什么，内存的状态将被保留，这意味着实例启动速度更快，因为操作系统没有停止。RAM 的内容会被写入 EBS 卷中的文件中，这意味着必须加密根 EBS 卷，并且它必须有足够的空间来容纳 RAM。

使用场景：

- 长时间运行的进程
- 保存 RAM 状态
- 服务需要时间来初始化

> 关于 EC2 休眠：
>
> - 支持各种实例系列：c3/c4/c5/i3/m3/m4/r3/r4/t2/t3
> - 实例 RAM 大小：必须小于 150GB
> - 实例大小：不支持裸金属服务器
> - AMI：适用于许多操作系统
> - Root Volume：必须是 EBS，加密的，无实例存储，大
> - 适用于各种类型：按需实例，预留实例，竞价实例
> - 不超过 60 天(虽然可以改变)

## 存储

### EC2 Instance Store

- EBS 只是网络驱动器
- 如果想要一个更高性能的硬硬件磁盘，就是 EC2 Instance Store。
- 有更好的 I/O 性能
- 不过停止或终止 EC2 实例时会丢失存储，所以它也被称为临时存储。
- 适合场景：buffer、cache、临时数据、临时内容
- 如果 EC2 实例失败，那么连接到它的硬件也会失败。

### EBS

> Elastic Block Store

### 定义

- 是一个网络驱动器(非物理驱动器)，可以在实例运行时附加于实例。
- 可以用于持久化数据，即使实例终止之后，我们也可以重新启动一个实例以挂载之前的卷来取回数据。
- 同时仅能挂载到一个实例上(CCP level)，但是可以从一个实例中分离出来并连接到另一个上。
- 绑定到特定 AZ，所以不能绑定给不同 AZ 的实例
- 可类比理解为：网络 U 盘。
- 免费套餐：每月 30GB 的免费 EBS 存储空间(SSD)
- 必须提前配置容量 GB IOPS(I/O per second)

### 终止时删除

这是一个配置项。
默认随实例创建所生成的 EBS 卷会跟随实例的终止一起被删除。可以在创建实例时，通过存储栏的高级选项来设置。
这项配置只会对配置了的 EBS 生效。

### 卷类型

> https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/ebs-volume-types.html

EBS 卷有六种类型：

- gp2/gp3(SSD)：通用的 SSD 卷，是平衡价格和各种工作负载的性能。
- io1/io2(SSD)：最高性能的 SSD 卷，适用于关键任务，低延迟和高吞吐量。
- st1(HHD)：低成本硬盘。适用于频繁访问的吞吐量密集型。
- sc1(HHD)：最低成本的 HDD 卷，适用于访问频率较低的服务。
  只有 gp2 和 gp3，io2 和 io3 可以用作引导卷。根操作系统在何处运行。

### General Purpose SSD

- 低延迟，高性价比
- 用于操作系统启动卷，虚拟桌面，开发和测试环境。
- 大小在 1GB - 16TB 之间
- gp3 可以独立设置 IOPS，但是 gp2 适合存储量关联的。上限 16000IOPS。

### Provisioned IOPS(PIOPS) SSD

- 关键业务
- 超过 16000IOPS 的应用程序
- 存储性能和一致性很敏感。
- io1/io2:
  - 4GB-16TB
  - **Nitro 的 EC2 实例上限 64000IOPS**，其他的 32000
  - 可以独立增加配置 IOPS
  - io1 vs io2：io2 有更高的耐用性和更高的 IOPS，与 io1 价格相同
- io2 Block Express
  - 4GB-16TB
  - 性能更高的卷，亚毫秒级的延迟
  - 最大 IOPS 256000
- 支持 EBS 多附加

### Hard Disk Drive(SSD)

- 不能作为引导卷
- 125GB - 16TB
- st1：吞吐量优化 HDD
  - 大数据，数据仓库，日志处理
  - 每秒 500MB - 最大 IOPS 500
- sc1：冷硬盘 Cold HDD
  - 不经常访问的数据
  - 考虑最低的成本时
  - 最大吞吐量是 250MB/s - 最大 IPOS 也是 250
-

### 多重挂载(附加)

- 将同一个 EBS 卷附加到同一个 AZ 中的多个 EC2 实例
- 每个实例有完整的读写权限
- 使用：
  - 对于 Linux 应用程序集群中有更高的应用程序可用性（例如：Teradata）
  - 或者应用程序必须管理并发权限操作
  - 同一时间至多附加至 16 个 EC2 实例上
  - 必须使用集群感知的文件系统，不能是 XFS 或 EX4 的文件系统

### 加密

- 当创建一个加密的 EBS 卷，你会得到以下：
  - 卷内静止的数据被加密
  - 势力之间传输的所有数据加密
  - 所有的快照都将被加密
  - 所有通过快照创建的内容都是加密的
- 加密和解密是被 EC2 和 EBS 在幕后透明处理的，我们无需任何额外操作
- 加密对于延迟的影响很小
- 利用了 KMS 的密钥(AES-256)
- 复制未加密的快照时会启动加密
- 加密的快照卷是加密的

### 如何加密 EBS 卷

- 创建一个卷的快照
- 通过复制功能加密快照
- 从快照创建一个新的卷，卷也会被加密
- 再将加密的卷附加到原实例上

### 快照

- 是一个 EBS 卷的备份
- 不是必须，但是建议
- 可以跨 AZ 甚至 Region 复制快照，这就是跨区传输 EBS 的方式。

### 快照的作用

- EBS Snapshot Archive：一般快照放在标准层存储，可以移动到 archive tier 归档层，会便宜 75%，但是需要 24 到 72 小时才能恢复。
- Recycle Bin for EBS Snapshots：为 EBS 提供回收站，先创建一个保留规则，还可以设置回收站的保留时间 1 天~1 年
- Fast Snapshot Restore：快速恢复，这个功能要花很多钱

### EFS

> Elastic File System

### 定义

- 网络文件系统，可以被挂载到很多 EC2 实例上
- 同时多 AZ 可用
- 高可用性，高可扩展性，很贵(gp2 的 3 倍)，按使用付费
- 用于：内容管理，网络服务，数据共享，WordPress
- 使用 NFSv4.1 协议
- 只兼容于基于 Linux 的 AMI，不与 Windows 兼容
- 可以使用 KMS 静态加密
- POSIX 文件系统，有一个标准文件 API
- 不用提前规划容量，文件系统会自动缩放，按用量付费

### 性能

- EFS 规模
  - 10GB 以上吞吐量，1000s 并发 NFC 客户端
  - 可自动到 PB 级网络文件系统
- 性能模式
  - 一般用途：延迟敏感的用例，比如 web 服务器，cms 等
  - 最高 I/O：高延迟的网络文件系统，吞吐量更高，并且它是高度并行的，比如大数据应用，媒体处理需求
- 吞吐量模式
  - 突增：为具有基本性能要求的工作负载提供可随存储量扩展的吞吐量。
  - 预置：如果您可以估算工作负载的吞吐量需求，请使用此模式。在预置模式下，您可以配置文件系统的吞吐量并为预置的吞吐量付费。
  - 弹性：您的吞吐量会自动扩展，您只需按实际使用量付费。

### 存储级别

- 生命周期管理：可以设置存储层级，几天后到不同的层级
  - 比如标准层是常访问的文件
  - 还有不常访问的层 IA(Intelligent-Tiering)内建智能分层，低价格；要启用 EFS-IA 必须使用生命周期策略
- 可用性和耐用性
  - 标准：多 AZ，适合生产，如果 Az 倒闭，不会影响 EFS
  - 一个 AZ：适合开发，备份默认启用
- 可能节省 90%的开销

### EBS vs EFS

### EBS 一览

- EBS 卷
  - 一次只能附加到一个实例上，特殊情况(io2/io1)
  - 锁定在 AZ 级别
  - gp2：磁盘容量增加则 IO 增加
  - io2：可以独立设置 IO
- 跨 AZ 迁移 EBS
  - 创建快照
  - 将快照恢复到另一个 AZ 中
  - 使用 EBS 卷备份（不应在应用处理大量流量时执行，会很影响性能）
- 默认情况下实例的根 EBS 卷会跟随实例的终止一起被删除

### EFS 一览

- 多实例共享
- 跨 AZ
- 价格高于 EBS，但是可以使用 AI 层来节省成本

## 映像(AMI)

> AMI = Amazon Machine Image

### 定义

用于打包要安装的软件。为特定的域创建，无法在另一个 AWS 区域使用 AMI 启动 EC2 实例，但可以将 AMI 复制到目标 AWS 区域，然后使用它来创建 EC2 实例。

- 官方提供的 AMI
- 自己编写的 AMI
- 来自 AWS Marketplace 的 AMI，也有人出售

### 操作

- 启动一个 EC2 实例并对其进行自定义
- 停止实力
- 创建 AMI - 同时也会创建出 EBS 快照
- 从其他 AMI 启动

## 可伸缩性和高可用性

### 可伸缩性

一个应用程序/系统可以通过适配处理更大的负载

- 两种可伸缩性：垂直和水平可伸缩性

垂直可扩展性：升级底层实例类型，这在分布式系统很常见，比如数据库。但是因为这是以硬件限制为基础，所以垂直伸缩也有限度。

水平可拓展性：也称为弹性。 提升数量，得益于云服务很容易能水平拓展。

### 高可用性

将应用程序或系统运行在至少两个数据中心，或 AWS 的两个 AZ，为了能够在数据中心丢失时幸存下来。

### 负载均衡(ELB)

> Elastic Load Balance

是一台或一组服务器，用来转发流量到下游的多个服务器。

### 为什么要 ELB

- 分发负载到多个下游实例
- 只用暴露出一个公共的访问点
- 无缝处理故障
- 可以对实例定期做健康检查
- 为网站提供 HTTPS
- Cookie 强制粘性
- 跨 AZ 高可用性
- 分离公共流量与私有流量

### 健康检查

- 健康检查对于负载均衡很重要
- 它们可以使 ELB 知道哪个实例是可用的，是可以回复的
- 通过使用一个端口和路由来检查健康(比如：HTTP 协议/4567 端口/health endpoint 端点)
- 如果实例的响应不是 200(OK)，就会被标记为不健康，ELB 就不会发送流量到它上

### 类型

AWS 有四种弹性负载均衡器，推荐使用新一代，一些 ELB 可以设置为内部或公共访问：

- Classic Load Balancer(v1)：ELB，不推荐用，即将被弃用
- Application load balancer(v2)：ALB
- Network load balancer(v2)：NLB
- Gateway load balancer：GWLB，运行在网络层，所以有三个 IP 协议

### 负载均衡安全组

![负载均衡安全组](/src/assets/aws-load-balance-safe-group.png)
ELB 允许任何 IP 通过 HTTP 或 HTTPS 访问 80/443 所构成的安全组。
而实例只应允许 Source 为上面安全组的访问。

### ALB

- 处于 OSI 的第七层：应用层
- HTTP
- 跨机器地负载均衡到多个 HTTP 应用程序
- 负载均衡到同一个机器的多个应用程序
- 支持 HTTP/2 和 websocket
- 支持重定向，比如 HTTP 到 HTTPS
- 支持路由到多个目标组和其他目标组：
  - 可以基于 URL 里的路径来路由
  - 可以基于 hostname 里的路径来路由
  - 可以基于查询字符串，Headers 里的路径来路由
- 很好的适用于微服务和基于容器的应用(比如 Docker 和 AWS 的 ECS)
- 因为有端口映射功能允许重定向到 ECS 的动态端口
- 作为对比，同样的功能用 CLB 可能要多个才能做到
- **虽然 Application Load Balancer 提供静态 DNS 名称，但不提供静态 IP**
- **使用 Application Load Balancer 将流量分配到您的 EC2 实例时，您将从中接收请求的 IP 地址将是 ALB 的私有 IP 地址。为了获取客户端的 IP 地址，ALB 添加了一个名为“X-Forwarded-For”的附加标头，其中包含客户端的 IP 地址。**

### ALB 目标组

- EC2
- ECS 任务
- Lambda functions
- IP 地址(必须是私有地址)
- 目标组层面的健康检查

### NLB

- 处理 OSI 的第四层：传输层
- 支持 TCP & UDP
- 延迟低，性能高
- 每个 AZ 只有一个静态 IP，可以为每个 AZ 分配一个弹性 IP，使用一组静态 IP 公开应用程序
- 只有网络负载均衡器同时提供静态 DNS 名称和静态 IP
- 健康检查支持 TCP HTTP HTTPS 协议

### NLB 目标组

- EC2
- IP 地址 - 必须是私有 IP
- ALB：得益于 NLB 我们可以得到一个固定的 IP，然后得益于 ALB 我们可以处理 HTTP 类型的流量，所以将 NLB 置于 ALB 之前是一种很有用的组合。

### GWLB

- 处于 OSI 的第三层：网络层
- 部署，扩展和管理第三方网络的虚拟应用
- 防火墙，入侵检测，预防系统，深度数据包检测系统等
- 在 6081 上使用 GENEVE 协议

### GWLB 目标组

- EC2 实例
- IP 地址 - 必须是私有 IP

### 粘性会话

- 相同的客户端总是会被负载均衡器重定向到相同的实例
- 可在 CLB 和 ALB 上启用
- 一个可控过期时间的 cookie
- 用例：确保不会丢失会话内容，比如用户登录
- 使用粘性对话可能会对用例带来不平衡

### Cookie

- 基于应用的 Cookie
  - 自定义名字：不能使用 AWSALB，AWSALBAPP，AWSALBTG
  - 应用程序生成的
- 基于持续时间的 Cookie
  - 由 LB 生成
  - 名字是 AWSALB for ALB，AWSELB for CLB

### 跨区域平衡

真正的在所有实例之间“平衡”
可以在目标组级别禁用

- ALB：默认启用，无需为区间数据传输支付，只能在目标组关闭
- NLB：默认禁用，为区间数据传输支付
- CLB：默认禁用，无需为区间数据传输支付

### SSL/TLS 基础

- SSL 证书允许客户端和负载均衡器之间的传输被加密，这成为飞行中加密，只能由发送者和接受者解密
- SSL 指的是 Secure Sockets Layer， 用于加密传输连接
- TLS 指的是 Transport Layer Security， 是 SSL 的较新版本
- 如今，TLS 是主要使用的证书，但是人们通常仍然称其为 SSL
- 公共 SSL 证书由 CA(Certificate Authorities：Comodo, Symantec, GoDaddy, GlobalSign, Disgicert, Letsencrypt, etc)颁发
- SSL 证书会有一个过期日期，设置的必须是更新的

### BL 的 SSL 证书

- 负载均衡器将加载 x.509 证书
- 可以通过 AWS 的 ACM(AWS Certificate Manager)来管理证书
- 可以生成上传自己的证书
- HTTPS 监听器：
  - 必须指定默认的证书
  - 可以添加一个可选证书列表来支持多个 domain
  - 客户端可以使用 SNI(Server Name Indication)去指定到达的主机名
  - 可以指定一个安全策略去支持老版本的 SSL 和 TLS

### SNI

> 只可用于 ALB NLB(新一代) 和 CloudFront，也不生效于 CLB
> https://aws.amazon.com/blogs/aws/new-application-load-balancer-sni/

- SNI 解决了一个很重要的问题：如何加载多个 SSL 证书到一台网络服务器上，以便该服务器可以服务于多个网站
- 是一个更新的协议，要求客户端指示初次 SSL 我手中的目标服务器主机名，服务器会找到正确的证书或返回默认证书

### ELB 的 SSL 证书

- CLB v1：仅支持一个 SSL 证书，多个主机名要多个 SSL 证书和多个 CLB
- ALB v2：支持多个 SSL 证书监听器，使用 SNI 确保生效
- NLB v2：支持多个 SSL 证书监听器，使用 SNI 确保生效

### 连接耗尽

- 特性名称
  - 连接排空 for CLB
  - 注销延迟 for ALB NLB
- 含义是，可以在注销实例时或标记为不健康时，给实例一个时间去完成飞行请求或活动请求
- 在注销的同时停止发送新的请求到实例
- 可以被禁用
- 如果请求很短就设置低点

### 自动缩放组(ASG)

> Auto Scaling Group

### 定义

- 在现实中，我们网站和应用的访问和负载可能会不断变化
- 在云中，我们可以快速创建或者摆脱一个实例
- ASG 的目标就是：
  - 添加实例(横线扩展)以匹配增加的负载
  - 或删除实例以匹配减少的负载
  - 确保我们有一个运行中实例的最大值和最小值
  - 自动为负载均衡器注册新的实例
  - 当一个实例不健康或被终止时，重新创建一个实例去代替
- ASG 是免费的，只为 EC2 付费

### ASG 的属性

- 启动模版(启动一个实例可能需要的参数)：
  - AMI + 实例类型
  - EC2 用户数据
  - EBS 卷
  - 安全组
  - SSH key pair
  - IAM 角色
  - 网络和子网信息
  - 负载均衡器
- 最小/大和初始容量
- 扩展策略(比如和 CloudWatch 配合)
  - 根据 CloudWatch 的警报来缩放
  - 一个监控的指标，比如平均 CPU
  - 比如平均 CPU 太高了，你需要添加 EC2 实例，这时候警报会触发，并触发扩展行为

### 自动缩放策略

- 动态缩放策略
  - 目标跟踪缩放(Target Tracking)：
    - 设置最简单
    - 比如：希望 ASG 的 CPU 保持在 40%上下
  - 简单和步数缩放(Simple/Step)
    - 当 CloudWatch 警报(比如 CPU>70%)被触发，就添加两个容量单位
    - 当 CloudWatch 警报(比如 CPU<30%)被触发，就移除一个容量单位
- 预期缩放(Schedeled)
  - 根据已知的用户模式预料
  - 比如：在每周五下午五点，增加最小容量到 10
- 预测缩放(Predictive)
  - 不断做出预测，会根据历史负载随着时间的推移进行分析，根据预测提前扩展，这是机器学习驱动的，一种未来的、放手的方法！
    ![自动缩放](/src/assets/aws-ec2-auto-scale.png)

### 好的监控指标

- CPU 利用率：如果实例的 CPU 变得更高了说明实例得到了更多利用
- 请求次数：适用于特定的应用
- 网络输入/输出：到达某个特定的阈值
- 自定义指标

### 自动缩放冷却

- 再一次缩放发生后，会有一段冷却时间，一般 5 分。
- 冷却期间不会启动或者终止额外的实例
- 因此，最好使用现成的 AMI 以让实例可以快速启动来更快地满足要求
