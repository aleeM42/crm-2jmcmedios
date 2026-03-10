## 8. 代码审查清单

### 功能
- [ ] 功能是否按需求正确实现
- [ ] 边界情况是否处理（空值、空数组、超长输入）
- [ ] 错误状态是否优雅处理（loading / error / empty）
- [ ] 是否有对应的需求文档或 issue 关联

### 代码质量
- [ ] 无 `any` 类型使用
- [ ] 组件职责单一，不超过 200 行
- [ ] 无不必要的 re-render（检查 selector、memo 使用）
- [ ] 复杂逻辑已提取为自定义 Hook
- [ ] 无硬编码的魔法数字/字符串（提取为常量）
- [ ] 命名清晰，符合命名规范

### 性能
- [ ] 大列表使用虚拟化（如 @tanstack/react-virtual）
- [ ] 图片使用懒加载
- [ ] 避免不必要的 useEffect
- [ ] useMemo/useCallback 用于昂贵计算和稳定引用
- [ ] 避免在 render 中创建新对象/数组

### 测试
- [ ] 新功能有对应测试
- [ ] 测试覆盖率未下降
- [ ] 测试命名描述行为而非实现
- [ ] Mock 范围最小化

### 无障碍
- [ ] 语义化 HTML 标签（button、nav、main、section）
- [ ] 键盘可导航（Tab、Enter、Escape）
- [ ] ARIA 标签完整（aria-label、role）
- [ ] 颜色对比度达标（WCAG AA 4.5:1）

