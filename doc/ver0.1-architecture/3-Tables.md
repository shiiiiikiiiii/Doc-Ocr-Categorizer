## 后端utils

### 后端数据库

#### 数据库表结构设计

1. **image表：**

  - `id` - 图片唯一标识符
  - `file_key`: sqlalchemy.URLType - 存储在MinIO中的图片文件的唯一标识符
  - `document_id` - 外键关联到document表，表示该图片属于哪个文档

2. **document表：**

  - `id` - 文档唯一标识符
  - `name` - 文档名称
  - `ocr_result` - PgSQL的JSON类型，存储OCR模型提取的key-value形式的结果
  - `category_id` - 文档分类作为外键关联到category表

1. **category表：**

  - `id` - 分类唯一标识符
  - `name` - 分类名称
  - `description` - 分类描述


#### 图片存储

图片存储到MinIO数据库, 供这个表查找

```markdown
**DocumentImages表：**

- `file_key` - 存储在MinIO中的图片文件的唯一标识符
```
