---
outline: [2, 3]
tags: 
  - AWS
publishDate: 2022/02/28
---

# IAM

[Docs](https://docs.aws.amazon.com/zh_cn/index.html)

> **Identity and access management**

Global service

## 作用

服务 - 安全性、身份和合规性 - IAM
IAM**委托人**都必须进行身份验证才能发送请求，执行操作(少数例外)；
**委托人**是对 AWS 资源和服务执行动作或操作的用户或应用程序；
策略决定是否**授权**请求：基于身份策略，基于资源策略

AWS 中与资源的交互本质都是调用 AWS 的 API：

- EC2: `RunInstances`
- S3: `GetBucket`
- IAM: `CreateUser`

## 用户、组、角色和策略

创建一个 AIM 组，并添加用户到组里，为组设置策略，也就为所有组内用户添加了身份或资源的权限。

角色是 IAM 的一种身份，可以让需要的人代入进来，从而拥有相应的权限。

### IAM 用户

注册时创建的是一个根用户，根用户拥有最大的权限，AWS 最佳实践在日常使用 AWS 时避免 直接使用根用户，并为根用户启用多因素身份验证(MFA)。
最多可在 IAM 中创建 5000 个个人用户，个人用户在创建后默认没有任何权限。

- 用户名
- ARN

### IAM 组

管理员组，开发组，运营组。可以统一管理组内的用户。
组是用户的集合，一个用户最多可以是 10 个组的成员。
一个用户可以属于多个组。

### IAM 角色

可以让用户，应用程序和服务代入。
一旦代入到这个角色后，他们的身份就变成了这个角色，并拥有了分配给这个角色的权限。

### 权限

- 用户或组可以通过 JSON 来分配权限，这个 JSON 文档可称为策略
- 策略定义了这些用户可使用的权限
- 应遵循**最小权限原则**，不要给用户不需要的或不必要的权限。(Dont give more permissions than a user needs)。

### 策略

策略定义权限的内容，是定义权限的文档，采用 JSON 格式编写。
默认情况下策略都是**隐式拒绝的**。

```
Version: 策略语言版本，就是2012-10-17
Id: 可选，标识策略的Id
Statement：一个或多个单独的Statement，必须的。
	Sid: statements的Id
	Effect: 是否允许(Allow/Deny)
	Principal: 策略适用于的账户、用户、角色
	Action: 将要使用的API的列表
	Resource: 将要使用的资源列表

```

### 身份策略

可以分配给用户、组和角色。
控制这个身份，在什么条件下、对哪些资源，可以执行哪些操作。
权限策略是基于资源的策略。

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "*",
      "Resource": "**"
    }
  ]
}
```

### 内联策略

与身份之间是一对一关系。直接添加到用户、组或角色上的。删除身份将同时删除策略。

### 托管策略

> AWS 托管策略：内置的无法修改
> 客户托管策略：自定义的

可以添加给多个身份。

### 资源策略

可以分配给特定的资源，比如 S3 存储桶。
授予指定的委托人在指定的资源上，执行特定的操作的权限。
信任策略是基于资源的策略。

```json
{
	"Version": "2012-10-17",
	"Id": "S3PolicyIdl”,
	"Statement": [
	"Sid": "statement1"
	“Effect": “Deny'
	“Principal": "*",
	"Action": ["s3:*"],
	"Resource"：“arn:awS:s3:::examplebucket/",
	"Condition": {
		"NotIpAddress": {
			"ans:SourceIp": "192.168.143.188/32"
		}
	}
}

```

### 创建用户

IAM - 用户 - 创建用户 - 设置权限

- 添加到组
- 复制其他用户权限
- 直接附加策略
  创建组 - 输入组名 - 选中策略 - 创建组确认
  添加标签(通过 key-value)标识用户 - `key: department, value: Admins` - 往后可以用此标签来检索。

> 标签在 AWS 很常见，帮助我们附加一些额外的信息，但是不会影响账户的运作。

## 账号配置

右侧 aws 账户显示账户别名，默认和账户 ID 相同。
别名可用于：使用 IAM 账户登录时，需要输入 ID 或者别名。

### 设置账单预算

账单 - budgets - 创建预算 使用 0 预算模版

### 账单警报

> 账单仪表盘 - 菜单栏 可以看到哪些服务产生了多少费用
> Free tier 可以看到免费套餐的使用占比

1. 账户 - IAM 用户和角色访问账单信息的权限 - 编辑 - 激活
2. 账单首选项 - 勾选所有三个复选框 - 保存首选项
3. 服务 - 管理与监管 - cloudwatch(当订单金额到达阈值，通过 SNS 发送消息触发报警)
4. 账单服务存储在美国东部(弗吉尼亚北部)，所以要切换 region 到这个区域。
5. 侧栏警报 - 账单 - 创建警报 - 选择指标 - 账单 - 总估算 -USD - 选择指标 - 大于 1USD 下一步 - 创建新主题 - booltcher-root-billing-alaram 和邮箱，新建主题 - 警报名称 booltcher-root-billing-alaram - 创建警报 - 控制台提示有些订阅在等待确认 - 去邮箱确认一下(有可能是垃圾邮件)。

## 身份认证方式

### 强密码策略

账户设置 - 密码策略 - 编辑以增强密码强度 - 强制定期修改密码

### 多因素身份验证(MFA)

> Multi Factor Authentication
> 账号密码
> 物理设备或 APP，可以不断生成令牌
> 指纹、视网膜等生物识别技术(AWS 不支持)

### MFA 设备

虚拟 MFA: 手机应用 Google Authenticator(phone only), Authy(multi-device)
物理 MFA:

- U2F(Universal 2nd Factor)安全密钥 Yubico, YubiKey
- 在第三方自行购买：Gemalto
- 第三方：政府云 GovCloud 提供一个特殊的秘钥卡 SurePassID

### 实操

IAM - 账户设置 - 编辑密码策略
我的账号证书 - 激活 MFA - 选中虚拟 - 起名 AWS_MFA_DEVICE - [可用 APP 列表](https://aws.amazon.com/cn/iam/features/mfa/?audit=2019q1) - 扫码添加

## CLI 访问

访问 AWS 的三种途径：

- AWS 管理控制台：被密码+MFA 保护
- AWS Command Line Interface(CLI)：被 access keys 访问密钥保护
- AWS Software Developer Kit(SDK)：被 access keys 保护

### 何为 AWS CLI

- 使我们可以通过命令行 shell 与 AWS 服务交互的工具
- 可以直接访问 AWS 服务的公共 API
- 可以开发脚本以管理我们的资源，自动执行某些操作
- 开源的：https://github.com/aws/aws-cli
- 管理控制台的替代方案

### 何为 AWS SDK

- AWS Software Developer Kit 软件开发工具包
- 特定于语音的一套 API
- 编程的方式访问 AWS 服务
- 内嵌入我们的应用程序的
- 支持各种编程语言和系统：JavaScript，Python，PHP，.NET，Ruby，Java，Go，Nodejs，C++；移动端 SDK Android，IOS；物联网 loT SDK 传感器等

### 安装 CLI

https://docs.aws.amazon.com/zh_cn/cli/latest/userguide/getting-started-install.html
终端校验：

```bash
aws --version

```

### 密钥

> Access keys

用户对自己的密钥负责，且像密码一样不应与其他人分享。

### 生成密钥

用户 - 安全凭证 - 创建访问密钥 - CLI

### 配置 CLI

```bash
aws configure

access key ID
secret access key
region: ap-east-1

# 测试
aws iam list-users

```

## 访问顾问

> Access Advisor

在用户 - 访问顾问选项卡 - 可以看到用户访问服务的历史，用于决定是否应该回收一部分权限。

## Region
::: tip
Region 的概念：
AWS 的 regions 遍布全球各地，每个 regions 都有一个名称映射到一个区域代码(us-east-1, eu-west-3)。一个 Region 是一个数据中心的集群，大多数 AWS 服务是特定区域限定的。比如：我们在 A 使用了某服务，切换到 region B 时，这项服务是新的。一个 Region 有多个 AZ(可用区 Avaliaility zone)比如 ap-east-1a，ap-east-1b，ap-east-1c。

**如何选择 Region？**
视情况而定，取决于数据想保存的位置、延迟的长短等。也不是所有 region 都有全部的服务，也有一些服务是全球可用 Global。且服务可能会因为 region 的不同而有不同的价格。每个地区可能有多个可用的 regions。

**查看可用服务：**[Regional services list](https://aws.amazon.com/pt/about-aws/global-infrastructure/regional-product-services/?p=ngi&loc=4)

[CloudFront](https://aws.amazon.com/cn/cloudfront/features/?whats-new-cloudfront.sort-by=item.additionalFields.postDateTime&whats-new-cloudfront.sort-order=desc)
![AWS Region](/src/assets/aws-region.png)
:::
