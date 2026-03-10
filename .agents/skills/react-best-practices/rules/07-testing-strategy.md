## 7. 测试策略

### 测试金字塔
```
        ┌─────────┐
        │  E2E    │  Playwright — 关键用户流程
        ├─────────┤
        │ 组件测试 │  Vitest + Testing Library — 组件交互
        ├─────────┤
        │ 单元测试 │  Vitest — 工具函数、hooks、stores
        └─────────┘
```

### 覆盖率目标
- 单元测试：80%+
- 组件测试：70%+
- E2E：覆盖所有关键用户路径

### Vitest 配置
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      exclude: ['node_modules/', 'src/test/', '**/*.d.ts'],
    },
  },
})
```

### Testing Library 规范
```typescript
// src/test/test-utils.tsx — 自定义 render（注入所有 Provider）
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router'

function createTestQueryClient() {
  return new QueryClient({ defaultOptions: { queries: { retry: false } } })
}

export function renderWithProviders(ui: React.ReactElement) {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  )
}
```

**查询优先级：** `getByRole` > `getByLabelText` > `getByText` > `getByTestId`
**事件：** 使用 `userEvent` 而非 `fireEvent`
**API Mock：** 使用 MSW（Mock Service Worker）

### Zustand Store 测试
```typescript
import { renderHook, act } from '@testing-library/react'
import { useAuthStore } from './useAuthStore'

beforeEach(() => {
  useAuthStore.setState({ user: null, token: null, isAuthenticated: false })
})

it('should login user', () => {
  const { result } = renderHook(() => useAuthStore())
  act(() => { result.current.login(mockUser, 'token-123') })
  expect(result.current.isAuthenticated).toBe(true)
})
```

### Playwright E2E 配置
```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  baseURL: 'http://localhost:5173',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'pnpm dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
})
```

### Monorepo 测试编排
```bash
# Turborepo 增量测试（只测试受影响的包）
turbo run test --filter=...[HEAD~1]

# 全量测试
turbo run test

# 单包测试
turbo run test --filter=@my-app/web
```

