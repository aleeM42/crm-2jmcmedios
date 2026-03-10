# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-02-27

### 🚀 Initial Release

**React 项目开发全流程 Skill，符合 [skills.sh](https://skills.sh) 标准发布。**

#### Skill 核心

- **SKILL.md**：725 行完整规范，含 agentskills.io 标准 frontmatter（name / version / description / tags / globs / compatibility）
- **AGENTS.md**：Agent 触发条件与行为约束定义
- **react-best-practices.skill**：Zip 打包分发文件，可直接用于离线安装

#### 10 条规则（rules/）

| 规则 | 说明 |
|------|------|
| `01-tech-stack.md` | 技术栈选型：React 18+ / TypeScript 5+ / Zustand / TanStack Query / Tailwind CSS / Shadcn/ui |
| `02-monorepo-architecture.md` | Monorepo 架构：pnpm workspace + Turborepo，含目录结构与 turbo.json 配置 |
| `03-feature-based-structure.md` | Feature-Based 应用结构：按功能模块组织，命名规范与目录约定 |
| `04-coding-standards.md` | 编码规范：TypeScript 严格模式、React 组件模式、Zustand Store 模式、TanStack Query 模式 |
| `05-git-conventions.md` | Git 约定：Conventional Commits、分支策略（GitFlow 简化版）、Husky + lint-staged |
| `06-changelog-management.md` | Changelog 管理：Changesets 工作流、版本策略、CI 自动发版 |
| `07-testing-strategy.md` | 测试策略：Vitest 单元测试 / Testing Library 集成测试 / Playwright E2E，覆盖率要求 |
| `08-code-review-checklist.md` | 代码审查清单：功能、性能、安全、可维护性检查项 |
| `09-workflows.md` | 工作流：Feature / Bugfix / Release / CI-CD 四种标准流程 |
| `10-documentation-management.md` | 文档管理：docs/ 目录结构、文档类型定义、生命周期管理 |

#### 7 个文档模板（assets/templates/）

| 模板 | 用途 |
|------|------|
| `PRD-template.md` | 产品需求文档 |
| `BRD-template.md` | 业务需求文档 |
| `HLD-template.md` | 概要设计文档 |
| `LLD-template.md` | 详细设计文档 |
| `API-template.md` | API 接口设计文档 |
| `ADR-template.md` | 架构决策记录 |
| `PR-template.md` | Pull Request 模板 |

#### 兼容性

- 支持 40+ AI Agent 平台：Claude Code、Cursor、Cline、Windsurf、GitHub Copilot、Gemini CLI 等
- 符合 [agentskills.io](https://agentskills.io) 开放规范
- 通过 `npx skills add` 一键安装
