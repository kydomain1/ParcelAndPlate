# Cloudflare Pages 502 错误故障排除指南

## 问题：HTTP 502 Bad Gateway

502 错误表示 Cloudflare Pages 无法正确处理请求。这通常是配置问题，而不是代码问题。

## 立即检查项（按顺序执行）

### 1. 检查 Cloudflare Pages 项目设置

**路径**：Cloudflare Dashboard → Pages → 你的项目 → Settings → Builds & deployments

**必须设置如下：**
- ✅ **构建命令**：**完全留空**（不要填写任何内容，包括空格）
- ✅ **构建输出目录**：**完全留空**（不要填写任何内容）
- ✅ **根目录**：**完全留空**（不要填写任何内容）
- ✅ **Node.js 版本**：不需要设置

**重要**：如果这些字段中有任何内容，请清空它们！

### 2. 检查项目是否已成功部署

**路径**：Cloudflare Dashboard → Pages → 你的项目 → Deployments

**检查：**
- 最新的部署状态是否为 "Success"（成功）？
- 如果状态是 "Failed"（失败），点击查看错误日志
- 如果状态是 "Building"（构建中），等待完成

**如果部署失败：**
- 点击失败的部署
- 查看 "Build Logs"（构建日志）
- 复制错误信息

### 3. 重新部署项目

**方法 1：通过 GitHub 触发**
- 在 GitHub 上对项目做一个小改动（比如修改 README.md）
- 提交并推送，这会自动触发 Cloudflare Pages 重新部署

**方法 2：手动重新部署**
- 在 Cloudflare Pages 项目中
- 点击 "Retry deployment" 或 "Create deployment"
- 选择最新的提交

### 4. 检查自定义域名绑定

**路径**：Cloudflare Dashboard → Pages → 你的项目 → Custom domains

**检查：**
- `parcelandplate.top` 是否已添加到自定义域名列表？
- 域名状态是否为 "Active"（活跃）？
- 如果域名未添加，点击 "Set up a custom domain" 添加

**DNS 设置检查：**
- 进入 Cloudflare Dashboard → DNS
- 检查是否有 `parcelandplate.top` 的 CNAME 记录
- CNAME 应该指向你的 Pages 项目（例如：`xxx.pages.dev`）
- 代理状态应该是 "已代理"（橙色云朵）

### 5. SSL/TLS 设置

**路径**：Cloudflare Dashboard → SSL/TLS

**必须设置：**
- 加密模式：**Full** 或 **Full (strict)**
- **不要使用 "Flexible" 模式**（这会导致 502 错误）

**等待 SSL 证书生成：**
- 添加自定义域名后，Cloudflare 会自动生成 SSL 证书
- 这可能需要 5-15 分钟
- 在 SSL/TLS 设置中检查证书状态

### 6. 清除缓存

**路径**：Cloudflare Dashboard → Caching → Configuration

**操作：**
- 点击 "Purge Everything"（清除所有内容）
- 等待 1-2 分钟

### 7. 检查防火墙规则

**路径**：Cloudflare Dashboard → Security → WAF

**检查：**
- 是否有防火墙规则阻止了访问？
- 临时禁用所有自定义规则进行测试
- 检查是否有 IP 访问规则阻止了你的 IP

## 常见错误原因

### ❌ 错误：设置了构建命令
- **问题**：在构建命令中填写了 `npm install` 或其他命令
- **解决**：清空构建命令字段

### ❌ 错误：构建输出目录设置错误
- **问题**：设置了 `dist`、`build` 或 `public` 等目录
- **解决**：清空构建输出目录字段（静态网站文件在根目录）

### ❌ 错误：SSL 模式为 "Flexible"
- **问题**：SSL/TLS 模式设置为 "Flexible"
- **解决**：改为 "Full" 或 "Full (strict)"

### ❌ 错误：域名未正确绑定
- **问题**：域名未添加到 Pages 项目的自定义域名列表
- **解决**：在 Pages 项目中添加自定义域名

### ❌ 错误：DNS 记录错误
- **问题**：DNS 记录指向错误或未启用代理
- **解决**：检查 DNS 记录，确保指向正确的 Pages 项目

## 验证步骤

完成以上步骤后：

1. **等待 5-10 分钟**让所有更改生效
2. **清除浏览器缓存**（Ctrl+Shift+Delete）
3. **使用无痕模式**访问网站
4. **检查部署日志**确保没有错误

## 如果问题仍然存在

1. **查看 Cloudflare Pages 部署日志**
   - 进入 Pages 项目 → Deployments
   - 点击最新的部署
   - 查看 "Build Logs" 和 "Runtime Logs"

2. **检查 GitHub 仓库**
   - 确保所有文件都已推送到 GitHub
   - 检查文件结构是否正确

3. **联系 Cloudflare 支持**
   - 提供部署日志和错误信息
   - 说明你已经尝试的步骤

## 正确的项目结构

你的项目应该是这样的：
```
ParcelAndPlate/
├── index.html
├── about.html
├── article.html
├── product.html
├── contact.html
├── privacy.html
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   ├── main.js
│   ├── article.js
│   └── product.js
├── images/
│   └── ...
├── _headers
└── README.md
```

**注意**：所有文件都在根目录，不需要 `dist`、`build` 或 `public` 目录。

