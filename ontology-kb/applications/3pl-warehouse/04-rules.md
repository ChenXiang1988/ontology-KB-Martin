# 规则与约束

## 归属规则

- 每条 `Inventory` 必须归属于一个 `Client`
- 每条 `Inventory` 必须关联一个 `SKU`
- 每条 `Inventory` 必须存放在一个 `Location`

## 位置规则

- `Location` 只能属于一个 `Zone`
- `Zone` 只能属于一个 `Warehouse`
- 冷链 SKU 只能放入满足温区要求的 `Location`

## 批次与序列号规则

- 批次管控商品必须关联 `Lot`
- 序列号管控商品必须关联唯一 `SerialNumber`
- 同一 `SerialNumber` 不能重复出现在不同库存记录中

## 作业规则

- `InboundOrder` 需要至少一个 `InboundOrderLine`
- `OutboundOrder` 需要至少一个 `OutboundOrderLine`
- 每个 `OutboundOrderLine` 应能分配到一个或多个 `PickingTask`
- 每个 `Shipment` 必须对应一个 `OutboundOrder`

## 状态规则

- `Available` 表示可用库存
- `Reserved` 表示已被订单占用
- `Damaged` 表示损坏库存，不可发货
- `Quarantine` 表示隔离库存，需人工处理

## 异常规则

- 库存不足时，出库单不能进入待发运状态
- 库位容量不足时，不能分配上架任务
- 盘点差异超过阈值时，需要进入异常处理流程

