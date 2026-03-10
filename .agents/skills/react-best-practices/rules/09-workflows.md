## 9. 内置工作流

### 功能开发工作流（Feature Workflow）
```
需求确认 → 创建分支 → [编写 ADR] → 编码 → 测试 → 自查 → PR → CI → Review → 合并
```
1. 确认需求文档（PRD）已评审通过
2. 从 `main` 创建 `feature/<scope>-<desc>` 分支
3. 如涉及架构变更，先编写 ADR
4. 编码实现（遵循第 3、4 章规范）
5. 编写测试（遵循第 7 章策略）
6. 对照第 8 章代码审查清单自查
7. `pnpm changeset` 添加变更记录
8. 提交 PR，填写 PR 模板
9. CI 自动运行：lint → typecheck → test → build
10. Code Review 通过后合并

### Bug 修复工作流（Bugfix Workflow）
```
复现 → 创建分支 → 写失败测试 → 修复 → 回归 → PR → 合并
```
1. 复现问题，记录复现步骤
2. 从 `main` 创建 `fix/<scope>-<desc>` 分支
3. 先写一个能复现 bug 的失败测试用例
4. 修复代码使测试通过
5. 运行回归测试确认无副作用
6. `pnpm changeset`（patch 版本）
7. 提交 PR → 合并

### 发版工作流（Release Workflow）
```
changeset version → 更新版本 → CI → tag → 发布 → 通知
```
1. `pnpm changeset version` — 更新版本号和 CHANGELOG
2. 提交版本变更 commit
3. CI 自动构建 + 全量测试
4. 打 git tag
5. GitHub Release 发布（自动/手动）
6. 通知相关方（Slack/飞书/邮件）

### CI/CD Pipeline 工作流
```yaml
# PR 触发
lint → typecheck → unit test → build → preview deploy

# 合并 main 触发
full test → build → staging deploy

# tag 触发
build → production deploy
```

**GitHub Actions 模板（Monorepo 适配）：**
```yaml
# .github/workflows/ci.yml
name: CI
on:
  pull_request:
    branches: [main]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm turbo lint typecheck test build
```

