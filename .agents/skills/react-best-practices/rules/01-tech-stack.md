## 1. 技术栈选型指南

| 领域 | 选型 | 理由 |
|------|------|------|
| 语言 | TypeScript 5.x（strict mode） | 类型安全，减少运行时错误 |
| UI 框架 | React 18/19 | 生态成熟，社区活跃 |
| 包管理 | pnpm | workspace 原生支持，磁盘效率高，严格依赖隔离 |
| Monorepo | Turborepo | 增量构建、任务编排、远程缓存，与 pnpm 深度集成 |
| 客户端状态 | Zustand | 轻量（~1KB），API 简洁，无 Provider 嵌套 |
| 服务端状态 | TanStack Query | 缓存、重试、乐观更新、后台刷新一站式解决 |
| 路由 | React Router v7 | 通用 SPA 路由，类型安全，数据加载内置 |
| 样式 | Tailwind CSS + CSS Modules | 原子化 CSS 提效 + 模块化隔离 |
| 表单 | React Hook Form + Zod | 非受控高性能 + schema 验证复用 |
| HTTP | Axios / ky | 拦截器、取消请求，配合 TanStack Query |
| 构建 | Vite | 极速 HMR，ESM 原生支持 |
| 单元/组件测试 | Vitest + Testing Library | Vite 生态原生，API 兼容 Jest |
| E2E 测试 | Playwright | 多浏览器、自动等待、trace 调试 |
| 代码质量 | ESLint + Prettier + typescript-eslint | 统一风格，自动格式化 |
| Git Hooks | Husky + lint-staged + commitlint | 提交前自动检查，规范 commit message |
| 版本管理 | Changesets | 原生支持 monorepo 多包版本，自动生成 CHANGELOG |

