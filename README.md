# n8n-nodes-wechat

[![GitHub stars](https://img.shields.io/github/stars/malonzhao/n8n-nodes-wechat)](https://github.com/malonzhao/n8n-nodes-wechat/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/malonzhao/n8n-nodes-wechat)](https://github.com/malonzhao/n8n-nodes-wechat/issues)
[![GitHub license](https://img.shields.io/github/license/malonzhao/n8n-nodes-wechat)](https://github.com/malonzhao/n8n-nodes-wechat/blob/main/LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.15-brightgreen)](https://nodejs.org/)
[![npm version](https://img.shields.io/npm/v/n8n-nodes-wechat)](https://www.npmjs.com/package/n8n-nodes-wechat)

此n8n社区节点提供与微信公众号/服务号 API 的集成，实现在n8n工作流中自动化完成多种微信公众号/服务号操作。

[n8n](https://n8n.io/) 是一个 [公平代码许可](https://docs.n8n.io/reference/license/) 的工作流自动化平台。

## 安装

按照 n8n 社区节点文档中的 [安装指南](https://docs.n8n.io/integrations/community-nodes/installation/) 进行操作。

## 配置

### 微信公众号配置要求

要使用此节点，您需要：
1. 拥有已启用API访问的微信公众号
2. 获取 AppID 和 AppSecret
3. 配置服务器URL（用于接收微信推送）

### 凭证设置

在 n8n 中创建微信公众号凭证：
- **AppID (开发者ID)**：您的微信公众号 AppID
- **AppSecret (开发者密码)**：您的微信公众号 AppSecret

凭证将自动处理令牌管理并在令牌过期时刷新令牌。

## 节点说明

### Wechat OfficialAccount Trigger
Webhook 触发器节点，用于接收来自微信公众号的事件。

**配置参数：**
- 令牌：设置与微信公众号配置中相同的令牌
- 消息加解密方式：选择明文模式、兼容模式或安全模式
- AES密钥：兼容模式和安全模式需要（必须与微信公众号配置匹配）

### Wechat OfficialAccount
主节点，提供管理微信公众号的各种操作。

## 功能模块

### 被动回复操作
- 文本回复 - 向用户发送文本回复
- 图片回复 - 向用户发送图片回复
- 语音回复 - 向用户发送语音回复
- 视频回复 - 向用户发送视频回复
- 音乐回复 - 向用户发送音乐回复
- 图文回复 - 向用户发送图文消息回复

### 客服消息操作
- 创建/更新/删除客服账号
- 获取客服账号列表和在线状态
- 创建/关闭客服会话
- 发送客服消息和设置输入状态

### 素材管理操作
- 创建/删除永久素材和临时素材
- 获取素材信息和批量获取
- 上传图片和获取媒体文件

### 用户管理操作
- 获取粉丝列表和用户信息
- 管理用户标签和备注
- 黑名单管理

### 菜单管理操作
- 创建个性化菜单和自定义菜单
- 删除菜单和获取菜单信息

### 消息模板操作
- 创建/删除模板和发送模板消息
- 设置行业信息

### 留言管理操作
- 开启/关闭评论功能
- 管理评论和回复

### 草稿管理操作
- 创建/更新/删除草稿
- 批量获取和统计草稿

### 发布管理操作
- 发布草稿和获取发布信息
- 删除发布内容

## 下一步
1. 新增企业微信支持

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 支持

如有问题或功能请求，请在此仓库中创建 [issue](https://github.com/malonzhao/n8n-nodes-wechat/issues)。

## 贡献

欢迎贡献！请随时提交 pull request 或为 bug 和功能请求创建 issue。