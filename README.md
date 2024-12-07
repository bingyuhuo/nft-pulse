# NFT Pulse - NFT项目社交热度分析平台

基于社交媒体数据的 NFT 项目实时热度分析平台,帮助用户捕捉市场趋势。

## 主要功能

- 实时热度排行榜
- 社交媒体数据分析
- 情感分析
- 趋势预测

## 技术栈

- Next.js 13
- TypeScript
- Prisma
- Twitter API
- Tailwind CSS
- shadcn/ui

## 开发环境设置

1. 克隆项目

bash
git clone https://github.com/你的用户名/nft-pulse.git
cd nft-pulse

2. 安装依赖
bash
npm install

3. 环境变量配置
复制 .env.example 到 .env.local 并填写必要的环境变量:

TWITTER_BEARER_TOKEN=your_twitter_token
DATABASE_URL=your_database_url

4. 启动开发服务器

```bash
npm run dev
```

## 项目结构

```
nft-pulse/
├── app/                # Next.js 13 应用路由
├── components/         # React 组件
├── lib/               # 工具函数和服务
├── prisma/            # 数据库模型
└── public/            # 静态资源
```

## API 文档

主要 API 端点:
- GET /api/analysis/heat-ranking - 获取项目热度排行
- GET /api/analysis/sentiment - 获取情感分析数据
- GET /api/analysis/trends - 获取趋势数据

## 贡献指南

欢迎提交 Pull Request 和 Issue!

## 许可证

MIT
```






