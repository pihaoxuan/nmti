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

## 八、下一步行动

**现在就开始？**

我可以：
1. 先帮你搭建 Vue 3 项目骨架
2. 或者先完善题目数据（把 25 道题精修一遍）

你选哪个？
