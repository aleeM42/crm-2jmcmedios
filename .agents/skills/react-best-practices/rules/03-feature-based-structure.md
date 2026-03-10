## 3. 应用内架构规范（feature-based）

每个 app 内部按功能模块组织，遵循以下命名规范：

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| 组件 | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase + `use` 前缀 | `useAuth.ts` |
| Stores | camelCase + `use` 前缀 + `Store` 后缀 | `useAuthStore.ts` |
| 工具函数 | camelCase | `formatDate.ts` |
| 类型文件 | PascalCase | `User.ts` |
| 常量 | UPPER_SNAKE_CASE | `API_BASE_URL` |
| 测试文件 | 与源文件同名 + `.test` | `useAuth.test.ts` |

### Import 排序规则
```typescript
// 1. 外部依赖
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// 2. 内部包（monorepo）
import { Button } from '@my-app/ui'

// 3. 相对路径
import { useAuthStore } from '../stores/useAuthStore'

// 4. 类型导入
import type { User } from '../types/User'
```

### Barrel file 策略
- 每个 feature 模块提供 `index.ts` 作为公共 API 出口
- 禁止跨 feature 直接引用内部文件，必须通过 `index.ts`
- `packages/` 下的共享包必须有 `index.ts` 导出
- 大型项目避免深层嵌套的 barrel re-export（影响 tree-shaking）

