# 概念模型

## 主数据

### Client

委托仓储服务的客户。

### Warehouse

仓库实体，承载库区和库位。

### SKU

库存单位，表示可管理的商品粒度。

### Carrier

承运商，负责运输或发运环节。

### Supplier

供应商，通常用于入库来源追踪。

## 业务单据

### InboundOrder

入库单，表示客户希望将货物送入仓库的业务意图。

### OutboundOrder

出库单，表示客户希望从仓库发货的业务意图。

### Receipt

收货结果，表示入库执行已经完成或部分完成。

### Shipment

发运结果，表示出库执行已经完成或部分完成。

### InventoryCountOrder

盘点单，用于核对账实是否一致。

## 作业任务

### ReceivingTask

收货作业任务。

### PutawayTask

上架作业任务。

### PickingTask

拣货作业任务。

### PackingTask

包装作业任务。

### LoadingTask

装车作业任务。

### ReplenishmentTask

补货作业任务。

## 库存资源

### Inventory

库存事实记录，必须关联客户、SKU 和库位。

### Lot

批次信息，用于批次管控。

### SerialNumber

序列号，用于单件唯一识别。

### Pallet

托盘，承载库存的物流单元。

### Container

周转箱或容器。

### Zone

库区，仓库内的功能区域。

### Location

库位，库存实际存放点。

## 关键关系

- `Client` 创建 `InboundOrder`
- `Client` 创建 `OutboundOrder`
- `InboundOrder` 包含 `InboundOrderLine`
- `OutboundOrder` 包含 `OutboundOrderLine`
- `InboundOrderLine` 指向 `SKU`
- `OutboundOrderLine` 指向 `SKU`
- `Warehouse` 包含 `Zone`
- `Zone` 包含 `Location`
- `Inventory` 存放于 `Location`
- `Inventory` 归属于 `Client`
- `Inventory` 对应 `SKU`
- `Shipment` 由 `Carrier` 承运

## 建模说明

- `Order` 表示业务请求
- `Receipt` 和 `Shipment` 表示执行结果
- `Task` 表示作业动作
- `Inventory` 表示当前可管理的库存事实

