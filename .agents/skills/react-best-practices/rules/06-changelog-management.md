## 6. Changelog 管理规范

### 工具选型：Changesets
Changesets 原生支持 monorepo 多包版本管理，与 pnpm workspace 深度集成。

### 初始化
```bash
pnpm add -Dw @changesets/cli
pnpm changeset init
```

### 日常流程
```bash
# 1. 开发完成后，添加变更记录
pnpm changeset
# 交互式选择：影响的包 → 版本类型（patch/minor/major）→ 变更描述

# 2. 发版时，消费变更记录
pnpm changeset version
# 自动更新各包 package.json 版本号 + 生成 CHANGELOG.md

# 3. 发布
pnpm changeset publish
```

### 版本号规则（SemVer）
| 变更类型 | 版本号 | 示例 |
|---------|--------|------|
| Breaking Change | major | 1.0.0 → 2.0.0 |
| 新功能 | minor | 1.0.0 → 1.1.0 |
| Bug 修复 | patch | 1.0.0 → 1.0.1 |

### CI/CD 集成（GitHub Actions）
```yaml
# .github/workflows/release.yml
name: Release
on:
  push:
    branches: [main]
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
      - run: pnpm install --frozen-lockfile
      - uses: changesets/action@v1
        with:
          publish: pnpm changeset publish
          version: pnpm changeset version
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

