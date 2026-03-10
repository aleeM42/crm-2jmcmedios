# API-XXX: <接口名称>

- 版本：v1
- 作者：
- 日期：

## 接口路径

`METHOD /api/v1/resource`

## 请求格式

### Headers

| Header | 必填 | 说明 |
|--------|------|------|
| Authorization | 是 | Bearer token |
| Content-Type | 是 | application/json |

### Query Parameters

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
|      |      |      |      |

### Request Body

```json
{
}
```

## 响应格式

### 成功响应（200）

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

### 分页响应

```json
{
  "code": 0,
  "data": {
    "list": [],
    "total": 0,
    "page": 1,
    "pageSize": 20
  }
}
```

## 错误码

| 错误码 | HTTP 状态码 | 说明 |
|--------|------------|------|
| 40001  | 400        | 参数校验失败 |
| 40101  | 401        | 未登录 |
| 40301  | 403        | 无权限 |
| 50001  | 500        | 服务器内部错误 |

## 鉴权方式

Bearer Token（JWT）

## 调用示例

```typescript
const response = await api.get('/api/v1/resource', {
  params: { page: 1, pageSize: 20 },
})
```
