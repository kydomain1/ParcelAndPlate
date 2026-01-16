# Cloudflare Pages 部署指南

## 部署步骤

1. **登录 Cloudflare Dashboard**
   - 进入 Pages 部分
   - 创建新项目或连接 Git 仓库

2. **构建配置（重要！）**
   - 构建命令：**留空**（静态网站无需构建）
   - 构建输出目录：**留空** 或 `/`（根目录）
   - 根目录：**留空** 或 `/`（根目录）
   - **注意**：不要设置任何构建命令，否则会导致 502 错误

3. **环境变量**
   - 无需设置环境变量

4. **DNS 设置**
   - 确保域名已添加到 Cloudflare
   - SSL/TLS 模式设置为 "Full" 或 "Full (strict)"
   - 确保 DNS 记录正确指向 Cloudflare Pages

5. **重要检查项**
   - ✅ 确保所有外部资源使用 HTTPS
   - ✅ 检查 `_redirects` 文件已创建
   - ✅ 检查 `_headers` 文件已创建
   - ✅ 验证域名 SSL 证书状态

## 常见问题解决

### HTTP 502 错误

如果遇到 502 Bad Gateway 错误，请按以下步骤检查：

1. **检查 Cloudflare Pages 项目状态**
   - 进入 Cloudflare Dashboard > Pages
   - 检查项目是否已成功部署
   - 查看构建日志是否有错误
   - 确保项目状态为 "Active"

2. **检查域名绑定**
   - 在 Pages 项目设置中，检查自定义域名是否正确绑定
   - 确保域名已添加到 Cloudflare（DNS 管理）
   - 检查 DNS 记录类型：
     - 对于根域名：使用 CNAME 指向 `pages.dev` 子域名
     - 或使用 A 记录指向 Cloudflare Pages IP

3. **SSL/TLS 设置**
   - 进入 SSL/TLS 设置
   - 确保模式为 "Full" 或 "Full (strict)"
   - 等待 SSL 证书自动生成（可能需要几分钟）

4. **检查构建配置**
   - 构建命令：留空
   - 构建输出目录：`/` 或留空
   - 根目录：`/` 或留空
   - Node.js 版本：不需要（静态网站）

5. **清除缓存和重新部署**
   - 在 Pages 项目中点击 "Retry deployment"
   - 清除 Cloudflare 缓存
   - 等待 5-10 分钟让更改生效

6. **检查 DNS 传播**
   - 使用在线工具检查 DNS 记录是否正确
   - 确保所有 DNS 记录都指向 Cloudflare

### ERR_CONNECTION_CLOSED 错误

如果遇到连接关闭错误，请检查：

1. **SSL/TLS 设置**
   - 在 Cloudflare Dashboard > SSL/TLS
   - 将加密模式设置为 "Full" 或 "Full (strict)"
   - 不要使用 "Flexible" 模式

2. **DNS 配置**
   - 确保 A 记录或 CNAME 记录正确
   - 代理状态应该是 "已代理"（橙色云朵）

3. **防火墙规则**
   - 检查是否有防火墙规则阻止了访问
   - 在 Cloudflare Dashboard > Security > WAF 中检查

4. **清除缓存**
   - 在 Cloudflare Dashboard > Caching > Configuration
   - 点击 "Purge Everything" 清除所有缓存

5. **等待 DNS 传播**
   - DNS 更改可能需要几分钟到几小时才能生效
   - 使用 `nslookup` 或在线工具检查 DNS 记录

## 文件说明

- `_redirects`: 处理路由重定向，确保所有请求都能正确路由
- `_headers`: 设置安全头和内容类型，确保资源正确加载


