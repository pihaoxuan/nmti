# NMTI 实施计划

## 目标

将 NMTI（牛马型人格测试）做成一个可公开访问的网站，对标 sbti.unun.dev

---

## 一、技术选型

| 组件 | 选择 | 理由 |
|------|------|------|
| 前端框架 | **Vue 3 + Vite** | sbti 用的 Vue，生态好，打包快 |
| UI 样式 | **TailwindCSS** | 原子化，开发快，风格一致 |
| 托管平台 | **Cloudflare Pages** | 免费、快、支持自定义域名 |
| 域名 | **DNS.HE → Cloudflare 代理** | 免费 DNS，Cloudflare CDN 加速 |
| 图片生成 | **html2canvas** | 可选，生成分享图片 |

**最终架构：**
```
用户 → Cloudflare CDN → Cloudflare Pages (静态文件)
                    → DNS.HE (域名解析)
```

---

## 二、开发阶段（预估 2-3 天）

### 阶段 1：数据准备（0.5 天）

**任务：**
- [ ] 确定最终题目（25-31 道）
- [ ] 编写 `questions.js` 数据文件
- [ ] 确定维度计算逻辑
- [ ] 编写 16 种牛马类型的描述文案

**产出：**
```
src/data/
├── questions.js      # 题目数据
├── types.js          # 16种牛马类型描述
└── calculator.js     # 计算逻辑
```

### 阶段 2：前端开发（1-1.5 天）

**任务：**
- [ ] 搭建 Vue 3 + Vite 项目
- [ ] 实现首页组件（口号 + 开始按钮）
- [ ] 实现测试页组件（题目渲染 + 选项交互）
- [ ] 实现结果页组件（类型展示 + 分享按钮）
- [ ] 移动端适配
- [ ] 添加简单的动画效果

**产出：**
```
src/
├── main.js
├── App.vue
├── components/
│   ├── HomePage.vue
│   ├── TestPage.vue
│   ├── ResultPage.vue
│   └── QuestionItem.vue
├── data/
│   └── ... (阶段1)
└── assets/
    └── style.css
```

### 阶段 3：部署上线（0.5 天）

**任务：**
- [ ] Cloudflare Pages 创建项目
- [ ] 配置自定义域名（通过 DNS.HE）
- [ ] 测试 HTTPS 和访问速度
- [ ] 添加网站统计（可选：Cloudflare Analytics / 百度统计）

---

## 三、详细执行步骤

### Step 1：本地开发环境

```bash
# 创建项目
cd ~/projects
npm create vite@latest nmti -- --template vue
cd nmti
npm install

# 安装依赖
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 启动开发服务器
npm run dev
```

### Step 2：Cloudflare Pages 部署

**方式 A：Git 自动部署（推荐）**
1. 将代码推送到 GitHub
2. Cloudflare Dashboard → Pages → Create a project
3. 连接 GitHub 仓库
4. 配置构建命令：
   - Build command: `npm run build`
   - Build output directory: `dist`
5. 等待自动部署完成

**方式 B：直接上传**
```bash
npm run build
# Cloudflare Dashboard → Pages → Direct Upload
```

### Step 3：域名配置

**在 DNS.HE 操作：**
1. 添加 A 记录或 CNAME 记录
2. 指向 Cloudflare Pages 的地址

**在 Cloudflare 操作：**
1. Pages 项目 → Custom domains → Add domain
2. 输入你的域名
3. 等待 SSL 证书自动配置

---

## 四、文件结构

```
nmti/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
├── README.md
├── public/
│   └── favicon.ico
└── src/
    ├── main.js
    ├── App.vue
    ├── components/
    │   ├── HomePage.vue        # 首页
    │   ├── TestPage.vue        # 测试页
    │   ├── ResultPage.vue      # 结果页
    │   └── QuestionItem.vue    # 单道题组件
    ├── data/
    │   ├── questions.js        # 题目数据
    │   ├── types.js            # 16种类型
    │   └── calculator.js       # 计算逻辑
    ├── utils/
    │   └── share.js            # 分享功能
    └── assets/
        └── style.css
```

---

## 五、核心代码模块

### 5.1 题目数据结构

```javascript
// src/data/questions.js
export const questions = [
  {
    id: 1,
    dimension: 'S',  // S=卷度, L=忠诚度, E=能量, P=痛苦值
    text: '领导在群里发了一条通知，没人回复。你：',
    options: [
      { text: '表情包秒回 +1', scores: { S: 3, L: 2 } },
      { text: '等，等别人先回', scores: { S: 1, L: 1 } },
      { text: '装作没看到', scores: { S: 0, L: 0 } }
    ]
  },
  // ... 更多题目
]
```

### 5.2 结果计算

```javascript
// src/data/calculator.js
export function calculateResult(answers) {
  const scores = { S: 0, L: 0, E: 0, P: 0 }

  answers.forEach((answer, index) => {
    const question = questions[index]
    const selectedOption = question.options[answer]
    Object.entries(selectedOption.scores).forEach(([dim, score]) => {
      scores[dim] += score
    })
  })

  // 根据分数确定类型
  const type =
    (scores.S > threshold ? 'S' : 'N') +
    (scores.L > threshold ? 'L' : 'C') +
    (scores.E > threshold ? 'E' : 'I') +
    (scores.P > threshold ? 'P' : 'A')

  return { type, scores }
}
```

### 5.3 分享功能

```javascript
// src/utils/share.js
export function shareResult(type) {
  const url = `${window.location.origin}?ref=${type}`
  const text = `我是${type}型牛马！测测你是哪种牛马？`

  if (navigator.share) {
    navigator.share({ title: 'NMTI 牛马型人格测试', text, url })
  } else {
    // 复制链接到剪贴板
    navigator.clipboard.writeText(url)
    alert('链接已复制！')
  }
}
```

---

## 六、预算估算

| 项目 | 费用 |
|------|------|
| Cloudflare Pages | 免费 |
| Cloudflare CDN | 免费 |
| DNS.HE | 免费 |
| 域名 | 自费（约 $10/年） |
| **总计** | **约 10 美元/年** |

---

## 七、时间线

| 时间 | 任务 |
|------|------|
| Day 1 上午 | 确定题目 + 数据文件 |
| Day 1 下午 | 搭建项目 + 首页 + 测试页 |
| Day 2 上午 | 结果页 + 计算逻辑 |
| Day 2 下午 | 样式优化 + 移动端适配 |
| Day 3 上午 | Cloudflare 部署 + 域名配置 |
| Day 3 下午 | 测试 + 修复 Bug |

---

## 九、移动端适配与兼容性修复计划（2026-04-12）

### 问题清单

| 问题 | 描述 | 优先级 |
|------|------|--------|
| 微信无法访问 | 需要在根目录放置验证文件 | P0 |
| 苹果手机打不开 | iOS Safari 兼容性问题（具体原因待确认） | P0 |
| 首页手机排版丑 | 间距、字号、按钮布局问题 | P1 |

### 9.1 微信验证文件

**操作：** 创建 `public/9bbc7c100a6b2951c7360114703f6d87.txt`

**内容：**
```
9a3a9e266e168e5e7ffd9dede7a5a5e43ea134d4
```

**说明：** `public/` 目录下的文件会在 `npm run build` 时自动复制到 `dist/`，部署后可通过 `https://nmtt.ccwu.cc/9bbc7c100a6b2951c7360114703f6d87.txt` 访问。

---

### 9.2 iOS Safari 兼容性修复

**修改文件：** `index.html`

**添加 meta 标签：**
```html
<!-- 优化 viewport，适配 iPhone X 刘海屏 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no">

<!-- iOS Web App 支持 -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">

<!-- 禁止自动识别电话号码 -->
<meta name="format-detection" content="telephone=no">

<!-- 主题色 -->
<meta name="theme-color" content="#f59e0b">
```

**修改文件：** `vite.config.js`

**添加构建目标：**
```js
export default defineConfig({
  plugins: [vue()],
  build: {
    target: ['es2015', 'safari11'],  // 兼容 iOS 11+
    cssTarget: 'safari11'
  }
})
```

---

### 9.3 首页移动端样式优化

**修改文件：** `src/components/HomePage.vue`

**优化内容：**

1. **标题字号响应式**
   - 大屏：`text-5xl md:text-7xl`（已有）
   - 优化：小屏幕下 `text-4xl`，更紧凑

2. **按钮区域**
   - 当前：`flex-col sm:flex-row`（已有）
   - 优化：增加小屏幕下的按钮宽度，让按钮更易点击
   - 添加 `w-full sm:w-auto` 让按钮在小屏幕下撑满

3. **间距调整**
   - 标题区域 `mb-8` → `mb-6`（小屏幕）
   - 牛马图标 `text-8xl` → `text-6xl sm:text-8xl`
   - 底部版权区域在小屏幕下更紧凑

4. **模态框优化**
   - 在小屏幕下增加内边距
   - 输入框更大的点击区域

---

### 9.4 全局移动端样式增强

**修改文件：** `src/style.css`

**添加内容：**
```css
/* 安全区域适配（iPhone X 刘海屏） */
@supports (padding: env(safe-area-inset-bottom)) {
  body {
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    padding-bottom: env(safe-area-inset-bottom);
  }
}

/* 触摸优化 */
button, a, label {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

/* 滚动优化 */
html {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

/* 防止 iOS Safari 双击缩放 */
body {
  touch-action: pan-y;
}
```

---

### 9.5 部署同步流程

**当前部署方式：** Cloudflare Pages + GitHub 仓库

**同步步骤：**

```bash
# 1. 本地修改代码后，构建测试
npm run build
npm run preview  # 本地预览

# 2. 确认无误后，提交并推送
git add .
git commit -m "fix: 移动端适配与iOS兼容性修复"
git push origin main

# 3. Cloudflare Pages 会自动检测推送并重新部署
#    （无需手动操作，约 1-2 分钟生效）
```

**手动部署（紧急情况）：**

如果自动部署失败，可以在 Cloudflare Dashboard 手动触发：
1. 进入 Cloudflare Pages 项目
2. 点击「View details」→「Retry deployment」

**本地直接推送 dist（不推荐）：**
```bash
# 使用 wrangler 直接部署
npx wrangler pages deploy dist --project-name=nmti
```

---

### 9.6 执行检查清单

- [ ] 创建微信验证文件 `public/9bbc7c100a6b2951c7360114703f6d87.txt`
- [ ] 更新 `index.html` 添加 iOS 兼容 meta 标签
- [ ] 更新 `vite.config.js` 添加构建目标
- [ ] 优化 `src/components/HomePage.vue` 移动端样式
- [ ] 更新 `src/style.css` 添加移动端增强样式
- [ ] 本地构建测试 `npm run build && npm run preview`
- [ ] 提交代码并推送到 GitHub
- [ ] 等待 Cloudflare Pages 自动部署完成
- [ ] 测试微信访问、iOS Safari 访问

---

### 9.7 预期效果

| 平台 | 修复前 | 修复后 |
|------|--------|--------|
| 微信 | 无法访问 | 正常访问 |
| iOS Safari | 可能白屏/打不开 | 正常加载 |
| 手机首页 | 间距不合理，排版丑 | 紧凑美观，易操作 |
| iPhone X 系列 | 刘海屏遮挡内容 | 安全区域适配 |

---

**审核通过后，我将按上述清单逐项执行。**
