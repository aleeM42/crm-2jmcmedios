## 4. 开发约束与规范

### TypeScript 严格配置
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### 编码规则
- 禁止使用 `any`，用 `unknown` + 类型守卫替代
- `interface` 用于组件 Props 和对象结构，`type` 用于联合类型和工具类型
- 优先使用命名导出（`export function`），避免默认导出
- 组件文件不超过 200 行，超出则拆分子组件或提取 Hook
- 超过 10 行的逻辑提取为自定义 Hook
- 使用判别联合（discriminated unions）管理复杂状态

### Zustand 规范
```typescript
// ✅ 推荐：单 store 单领域，actions 与 state 分离
interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

interface AuthActions {
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        login: (user, token) => set({ user, token, isAuthenticated: true }),
        logout: () => set({ user: null, token: null, isAuthenticated: false }),
      }),
      { name: 'auth-storage' }
    )
  )
)

// ✅ 使用 selector 防止不必要的 re-render
const user = useAuthStore((s) => s.user)
```

### TanStack Query 规范
```typescript
// ✅ Query Key Factory 模式
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: UserFilters) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
}

// ✅ 自定义 Hook 封装
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => fetchUser(id),
    staleTime: 5 * 60 * 1000, // 5 分钟
  })
}
```

