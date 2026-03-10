## 5. Git 提交约定

### Conventional Commits 格式
```
<type>(<scope>): <description>

[可选 body]

[可选 footer]
```

### Type 类型
| Type | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `refactor` | 重构（不改变功能） |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `docs` | 文档变更 |
| `style` | 代码格式（不影响逻辑） |
| `chore` | 构建/工具/依赖变更 |
| `ci` | CI/CD 配置变更 |

### Scope 定义（React 项目）
`auth`, `ui`, `api`, `store`, `test`, `config`, `deps`, `router`, `i18n`

### 中文示例
```
feat(auth): 添加用户登录功能
fix(cart): 修复购物车数量更新竞态条件
refactor(api): 将验证逻辑提取到中间件
test(user): 添加用户注册单元测试
chore(deps): 升级 React 至 v19
perf(list): 大列表添加虚拟滚动优化
```

### 分支命名
- `feature/<scope>-<description>` — 新功能
- `fix/<scope>-<description>` — Bug 修复
- `hotfix/<description>` — 紧急修复
- `refactor/<description>` — 重构
- `docs/<description>` — 文档
- `test/<description>` — 测试

### Husky + commitlint + lint-staged 配置
```json
// package.json（根目录）
{
  "scripts": {
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,yaml}": ["prettier --write"]
  }
}
```

```javascript
// commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['auth', 'ui', 'api', 'store', 'test', 'config', 'deps', 'router', 'i18n']],
  },
}
```

