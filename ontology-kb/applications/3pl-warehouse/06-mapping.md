# 系统映射

## 映射原则

- ontology 是语义层，不直接等于数据库表
- 业务对象可以映射到一个或多个系统表
- 同名字段不一定同义
- 同义概念可能分散在多个系统里

## 推荐映射

| Ontology 概念 | 常见系统对象 |
| --- | --- |
| `Client` | 客户主数据表 |
| `Warehouse` | 仓库主数据表 |
| `Zone` | 库区表 |
| `Location` | 库位表 |
| `SKU` | 物料主数据表 / 商品主数据表 |
| `Inventory` | 库存余额表 / 库存明细表 |
| `InboundOrder` | 入库单头表 |
| `InboundOrderLine` | 入库单行表 |
| `OutboundOrder` | 出库单头表 |
| `OutboundOrderLine` | 出库单行表 |
| `Receipt` | 收货单表 |
| `Shipment` | 发运单表 |
| `Task` | 作业任务表 |
| `Lot` | 批次表 |
| `SerialNumber` | 序列号表 |

## 常见语义冲突

- `Inventory` 在系统里可能既指数量，也指明细记录
- `Order` 在不同团队里可能指业务请求，也可能指发运单
- `Location` 可能被叫做库位、储位、bin
- `Carrier` 可能被叫做承运商、物流商、运输商

## 处理方法

- 固定一个主术语
- 记录别名
- 明确每个术语的使用边界
- 记录它对应的系统字段和表

