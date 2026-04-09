# Ontology 速查版

## 一句话定义

ontology 是对某个领域的概念、关系和约束进行形式化表示的知识结构。

## 你可以把它理解成什么

- 不是数据库表
- 不是普通词表
- 不是简单分类树
- 是领域语义的显式模型

## 核心组成

| 组件 | 含义 | 例子 |
| --- | --- | --- |
| Class | 概念类别 | `SKU`、`Inventory` |
| Instance | 具体个体 | `SKU-001`、`ClientA` |
| Property | 属性 | `name`、`status` |
| Relation | 关系 | `storedAt`、`creates` |
| Axiom | 约束/规则 | 冷链 SKU 只能进冷库 |
| Hierarchy | 层级结构 | `Vehicle -> Truck` |

## 三个常见标准

| 标准 | 作用 |
| --- | --- |
| RDF | 描述事实关系 |
| OWL | 定义语义和约束 |
| SPARQL | 查询语义数据 |

## 什么时候需要 ontology

- 术语口径混乱
- 多系统语义不一致
- 需要规则校验
- 需要知识组织和查询
- 需要把业务知识长期维护

## 怎么开始

1. 选一个小范围场景
2. 列出核心术语
3. 区分类、关系、属性、约束
4. 写出业务规则
5. 用真实问题验证
6. 再决定是否形式化

## 最常见的坑

- 只做词表，不做关系
- 把 schema 当 ontology
- 概念粒度混乱
- 过度建模
- 不接真实业务问题

## 当前知识库结构

- 基础认知
- 核心概念
- 建模方法
- 形式化语义
- 建模模式
- 评估与治理
- 反模式
- 工具与工作流
- 学习路线
- 应用案例库

## 推荐阅读顺序

1. [Ontology 概览](./01-ontology-overview.md)
2. [核心概念](./02-core-concepts.md)
3. [建模方法](./03-modeling-method.md)
4. [形式化语义](./11-formal-semantics.md)
5. [本体建模模式](./12-modeling-patterns.md)
6. [评估与治理](./13-evaluation-and-governance.md)
7. [常见反模式](./14-common-anti-patterns.md)
8. [工具与工作流](./15-tooling-and-workflow.md)

