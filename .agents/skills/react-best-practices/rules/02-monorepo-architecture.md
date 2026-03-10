## 2. Monorepo 项目架构规范

采用 pnpm workspace + Turborepo，推荐目录结构：

```
my-react-app/
├── pnpm-workspace.yaml       # workspace 配置
├── turbo.json                 # Turborepo 任务管道配置
├── package.json               # 根 package.json（scripts + devDeps）
├── .changeset/                # Changesets 配置
├── .husky/                    # Git hooks
├── apps/                      # 应用层
│   ├── web/                   # 主 Web 应用
│   │   ├── src/
│   │   │   ├── app/           # 入口、路由配置、全局 Provider
│   │   │   ├── features/      # 按功能模块组织（核心）
│   │   │   │   └── auth/
│   │   │   │       ├── components/
│   │   │   │       ├── hooks/
│   │   │   │       ├── api/
│   │   │   │       ├── stores/
│   │   │   │       ├── types/
│   │   │   │       └── index.ts
│   │   │   ├── components/    # 应用级通用组件
│   │   │   ├── hooks/         # 应用级通用 hooks
│   │   │   ├── lib/           # 工具函数、API 客户端、Query 配置
│   │   │   └── test/          # 测试工具、setup、mocks
│   │   ├── e2e/               # Playwright E2E 测试
│   │   ├── vite.config.ts
│   │   └── package.json
│   └── docs/                  # 文档站（可选）
├── packages/                  # 共享包
│   ├── ui/                    # 共享 UI 组件库
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── utils/                 # 共享工具函数
│   ├── tsconfig/              # 共享 TypeScript 配置
│   │   ├── base.json
│   │   ├── react.json
│   │   └── package.json
│   └── eslint-config/         # 共享 ESLint 配置
│       ├── index.js
│       └── package.json
├── docs/                      # 项目文档（需求/设计/ADR/指南）
└── tooling/                   # 工具配置（可选）
    └── prettier-config/
```

### 关键配置示例

**pnpm-workspace.yaml：**
```yaml
packages:
  - "apps/*"
  - "packages/*"
  - "tooling/*"
```

**turbo.json：**
```json
{
  "tasks": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "lint": { "dependsOn": ["^build"] },
    "typecheck": { "dependsOn": ["^build"] },
    "test": { "dependsOn": ["^build"] },
    "dev": { "cache": false, "persistent": true }
  }
}
```

**包间依赖（package.json）：**
```json
{
  "dependencies": {
    "@my-app/ui": "workspace:*",
    "@my-app/utils": "workspace:*"
  }
}
```

