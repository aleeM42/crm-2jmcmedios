<div align="center">

[![skills.sh compatible](https://img.shields.io/badge/skills.sh-compatible-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQxIDAtOC0zLjU5LTgtOHMzLjU5LTggOC04IDggMy41OSA4IDgtMy41OSA4LTggOHoiLz48L3N2Zz4=)](https://skills.sh)
[![Version](https://img.shields.io/badge/version-1.0.0-06B6D4?style=for-the-badge)](https://github.com/trsoliu/react-best-practices/releases)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/trsoliu/react-best-practices?style=for-the-badge&color=yellow)](https://github.com/trsoliu/react-best-practices)

**让 AI Agent 按照企业级标准帮你写 React 代码** 🚀

[🐛 Report Bug](https://github.com/trsoliu/react-best-practices/issues) · [✨ Request Feature](https://github.com/trsoliu/react-best-practices/issues)

</div>

---

## ✨ 简介

react-best-practices 是一个 [skills.sh](https://skills.sh) 兼容的 Skill 包，为 AI Agent 提供 **React 项目开发的完整规范体系**。安装后，Agent 在编写代码、创建项目、审查 PR、生成文档时会自动遵循这套规范——无需手动提醒。

<table>
<tr>
<td width="50%">

### 💡 没有 Skill 时
- Agent 生成的代码风格不统一 😩
- 项目结构随意，缺乏规范 📁
- Git 提交信息混乱 📝
- 没有测试策略，覆盖率低 🧪
- 文档缺失或格式不一 📄

</td>
<td width="50%">

### 🎉 安装 Skill 后
- 代码严格遵循 TypeScript + React 最佳实践 ✨
- Feature-Based 目录结构，清晰可维护 🏗️
- Conventional Commits 规范提交 📋
- Vitest + Playwright 完整测试体系 ✅
- PRD / HLD / LLD / ADR 标准文档模板 📖

</td>
</tr>
</table>

---

## 🎯 核心特性

<table>
<tr>
<td align="center" width="33%">
<br><b>🏗️ Monorepo 架构</b>
<br><sub>pnpm + Turborepo 工程化方案<br>多包管理、构建编排、依赖优化</sub>
</td>
<td align="center" width="33%">
<br><b>📐 编码规范</b>
<br><sub>TypeScript 严格模式<br>React / Zustand / TanStack Query 模式约束</sub>
</td>
<td align="center" width="33%">
<br><b>🧪 测试策略</b>
<br><sub>Vitest 单元 + Testing Library 集成<br>Playwright E2E，含覆盖率要求</sub>
</td>
</tr>
<tr>
<td align="center" width="33%">
<br><b>📋 Git 规范</b>
<br><sub>Conventional Commits + 分支策略<br>Husky + lint-staged 自动校验</sub>
</td>
<td align="center" width="33%">
<br><b>📄 文档体系</b>
<br><sub>7 种标准模板<br>PRD / BRD / HLD / LLD / API / ADR / PR</sub>
</td>
<td align="center" width="33%">
<br><b>🔄 工作流</b>
<br><sub>Feature / Bugfix / Release / CI-CD<br>四种标准开发流程</sub>
</td>
</tr>
</table>

---

## 🛠️ 技术栈

本 Skill 围绕以下技术栈设计规范：

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | React | 18+ |
| 语言 | TypeScript | 5+ |
| 状态管理 | Zustand | 4+ |
| 数据请求 | TanStack Query | 5+ |
| 路由 | React Router | 6+ |
| 样式 | Tailwind CSS | 3+ |
| 组件库 | Shadcn/ui | latest |
| 单元测试 | Vitest | latest |
| E2E 测试 | Playwright | latest |
| 包管理 | pnpm | 8+ |
| 构建编排 | Turborepo | latest |

---

## 📋 规范章节

Skill 包含 10 条独立规则，覆盖 React 项目开发全生命周期：

| # | 规则文件 | 说明 |
|---|---------|------|
| 01 | `rules/01-tech-stack.md` | **技术栈选型** — 核心技术栈定义与版本要求 |
| 02 | `rules/02-monorepo-architecture.md` | **Monorepo 架构** — pnpm workspace + Turborepo 目录结构与配置 |
| 03 | `rules/03-feature-based-structure.md` | **Feature-Based 结构** — 应用内按功能模块组织，命名规范与目录约定 |
| 04 | `rules/04-coding-standards.md` | **编码规范** — TypeScript 严格模式、React 组件模式、Zustand / TanStack Query 模式 |
| 05 | `rules/05-git-conventions.md` | **Git 提交约定** — Conventional Commits、分支策略、Husky + lint-staged |
| 06 | `rules/06-changelog-management.md` | **Changelog 管理** — Changesets 工作流、版本策略、CI 自动发版 |
| 07 | `rules/07-testing-strategy.md` | **测试策略** — Vitest 单元 / Testing Library 集成 / Playwright E2E，覆盖率要求 |
| 08 | `rules/08-code-review-checklist.md` | **代码审查清单** — 功能、性能、安全、可维护性检查项 |
| 09 | `rules/09-workflows.md` | **工作流** — Feature / Bugfix / Release / CI-CD 四种标准流程 |
| 10 | `rules/10-documentation-management.md` | **文档管理** — docs/ 目录结构、文档类型定义、生命周期管理 |

---

## 📦 文档模板

内置 7 个标准文档模板，Agent 创建文档时自动套用：

| 模板 | 文件 | 适用场景 |
|------|------|---------|
| 产品需求文档 | `assets/templates/PRD-template.md` | 新功能需求定义 |
| 业务需求文档 | `assets/templates/BRD-template.md` | 业务目标与范围 |
| 概要设计 | `assets/templates/HLD-template.md` | 系统架构与模块划分 |
| 详细设计 | `assets/templates/LLD-template.md` | 接口定义与数据结构 |
| API 设计 | `assets/templates/API-template.md` | RESTful API 接口规范 |
| 架构决策记录 | `assets/templates/ADR-template.md` | 技术选型决策与理由 |
| Pull Request | `assets/templates/PR-template.md` | PR 描述与审查要点 |

---

## 🚀 安装

<details open>
<summary><b>📦 方式一：npx 安装（推荐）</b></summary>

```bash
# 全局安装
npx skills add trsoliu/react-best-practices -g -y

# 项目级安装
npx skills add trsoliu/react-best-practices -y
```

</details>

<details open>
<summary><b>📥 方式二：下载 .skill 文件</b></summary>

从 [Releases](https://github.com/trsoliu/react-best-practices/releases) 下载 `react-best-practices.skill`，放入 skills 目录。

</details>

<details open>
<summary><b>📂 方式三：克隆仓库</b></summary>

```bash
git clone https://github.com/trsoliu/react-best-practices.git
npx skills add ./react-best-practices -g -y
```

</details>

### 更新

```bash
npx skills update trsoliu/react-best-practices
```

### 卸载

```bash
npx skills remove react-best-practices
```

---

## 💬 使用方式

安装后，AI Agent 会在以下场景自动激活本 Skill：

| 场景 | 触发示例 |
|------|---------|
| 创建项目 | "帮我初始化一个 React + TypeScript 项目" |
| 编写代码 | "写一个用户列表组件" |
| 代码审查 | "帮我 review 这个 PR" |
| Git 提交 | "帮我提交代码" |
| 写测试 | "给这个组件写单元测试" |
| 创建文档 | "帮我写一个 PRD" / "创建 ADR" |
| 架构设计 | "设计一下这个功能的架构" |

你也可以主动引用：

```
请按照 react-best-practices 规范帮我创建一个新的 feature 模块
```

---

## 🏗️ Skill 结构

```
react-best-practices/
├── 📄 SKILL.md                     # 主 Skill 文件（725 行完整规范）
├── 📄 AGENTS.md                    # Agent 触发条件与行为约束
├── 📄 README.md                    # 项目说明
├── 📄 CHANGELOG.md                 # 变更日志
├── 📄 LICENSE                      # MIT 许可证
├── 📄 metadata.json                # 元数据
├── 📄 react-best-practices.skill   # Zip 打包分发文件
├── 📂 rules/                       # 10 条独立规则
│   ├── 01-tech-stack.md
│   ├── 02-monorepo-architecture.md
│   ├── 03-feature-based-structure.md
│   ├── 04-coding-standards.md
│   ├── 05-git-conventions.md
│   ├── 06-changelog-management.md
│   ├── 07-testing-strategy.md
│   ├── 08-code-review-checklist.md
│   ├── 09-workflows.md
│   └── 10-documentation-management.md
└── 📂 assets/templates/            # 7 个文档模板
    ├── PRD-template.md
    ├── BRD-template.md
    ├── HLD-template.md
    ├── LLD-template.md
    ├── API-template.md
    ├── ADR-template.md
    └── PR-template.md
```

---

## 🤖 兼容性

支持所有 [Agent Skills 规范](https://agentskills.io) 兼容的 AI 编码助手：

<table>
<tr>
<td align="center"><b>Claude Code</b></td>
<td align="center"><b>Cursor</b></td>
<td align="center"><b>Cline</b></td>
<td align="center"><b>Windsurf</b></td>
</tr>
<tr>
<td align="center"><b>GitHub Copilot</b></td>
<td align="center"><b>Gemini CLI</b></td>
<td align="center"><b>Codex</b></td>
<td align="center"><b>40+ 更多</b></td>
</tr>
</table>

---

## ❓ FAQ

<details open>
<summary><b>这个 Skill 会修改我的项目代码吗？</b></summary>

**不会。** Skill 只是为 AI Agent 提供规范指导，Agent 在生成代码时会遵循这些规范。它不会自动修改你的现有代码。

</details>

<details open>
<summary><b>可以只使用部分规则吗？</b></summary>

**可以。** 每条规则都是独立的 Markdown 文件，你可以根据项目需要删除或修改 `rules/` 目录下的任意规则文件。

</details>

<details open>
<summary><b>支持英文项目吗？</b></summary>

Skill 的规范内容是中文编写的，但 Agent 会根据你的对话语言自动调整输出。如果你用英文提问，Agent 会用英文回复并遵循相同的规范。

</details>

<details open>
<summary><b>如何自定义文档模板？</b></summary>

直接编辑 `assets/templates/` 目录下的模板文件即可。Agent 创建文档时会使用你修改后的模板。

</details>

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Made with ❤️ by [trsoliu](https://github.com/trsoliu)**

<a href="https://github.com/trsoliu/react-best-practices">
<img src="https://img.shields.io/badge/GitHub-trsoliu/react--best--practices-181717?style=for-the-badge&logo=github" alt="GitHub">
</a>

⭐ **觉得有用就 Star 一下吧！** ⭐

</div>
