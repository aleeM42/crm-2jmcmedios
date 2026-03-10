# AGENTS.md — react-dev-guide-cn

## 概述
本 Skill 为 React 项目开发提供全流程中文指南，涵盖技术选型、Monorepo 架构、开发规范、Git 提交、Changelog、测试策略、代码审查、工作流与文档管理。

## 触发条件
当以下场景出现时，Agent 应自动激活此 Skill：
- 用户创建或初始化 React 项目
- 用户编写、审查或重构 React/TypeScript 代码
- 用户询问 React 项目架构、技术选型、最佳实践
- 用户需要创建需求文档（PRD/BRD）、设计文档（HLD/LLD）、ADR
- 用户进行 Git 提交、发版、Changelog 管理
- 用户编写或配置测试（Vitest/Playwright）
- 用户进行代码审查

## 行为约束
1. 生成代码时必须遵循 `rules/04-coding-standards.md` 中的编码规则
2. 创建文件时遵循 `rules/03-feature-based-structure.md` 中的命名规范和目录结构
3. 生成 Git commit message 时遵循 `rules/05-git-conventions.md` 中的 Conventional Commits 格式
4. 创建文档时使用 `assets/templates/` 中的对应模板
5. 所有输出默认使用中文

## 规则文件索引
| 文件 | 用途 |
|------|------|
| `rules/01-tech-stack.md` | 技术栈选型参考 |
| `rules/02-monorepo-architecture.md` | Monorepo 目录结构与配置 |
| `rules/03-feature-based-structure.md` | 应用内架构与命名规范 |
| `rules/04-coding-standards.md` | TypeScript/Zustand/TanStack Query 编码规则 |
| `rules/05-git-conventions.md` | Git 提交、分支、Husky 配置 |
| `rules/06-changelog-management.md` | Changesets 工作流与 CI 集成 |
| `rules/07-testing-strategy.md` | Vitest/Testing Library/Playwright 配置与规范 |
| `rules/08-code-review-checklist.md` | 代码审查清单 |
| `rules/09-workflows.md` | Feature/Bugfix/Release/CI-CD 工作流 |
| `rules/10-documentation-management.md` | 文档目录结构与模板规范 |

## 模板文件索引
| 文件 | 用途 |
|------|------|
| `assets/templates/PRD-template.md` | 产品需求文档模板 |
| `assets/templates/BRD-template.md` | 业务需求文档模板 |
| `assets/templates/HLD-template.md` | 概要设计文档模板 |
| `assets/templates/LLD-template.md` | 详细设计文档模板 |
| `assets/templates/API-template.md` | API 接口设计模板 |
| `assets/templates/ADR-template.md` | 架构决策记录模板 |
| `assets/templates/PR-template.md` | Pull Request 模板 |

## 使用优先级
- 当与其他 Skill 冲突时，以本 Skill 的中文规范为准
- `rules/` 中的规则优先级高于 SKILL.md 中的概述
- 模板文件可根据项目实际情况调整，但结构不可删减
