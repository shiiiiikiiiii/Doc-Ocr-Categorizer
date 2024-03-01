## 后端utils

### 后端数据库

#### 数据库表结构设计

_在`>`中标注的行表示现版本先不设计该表/该字段_

1. **image表：**

  - `id` - 图片唯一标识符
  - `file_key`: sqlalchemy_utils.URLType - 存储在MinIO中的图片文件的唯一标识符
  - `document_id` - 外键关联到document表，表示该图片属于哪个文档

2. **document表：**

  - `id` - 文档唯一标识符
  - `name` - 文档名称
  - `ocr_result` - PgSQL的JSON类型，存储OCR模型提取的key-value形式的结果
  > - `nlp_result` - PgSQL的JSON类型，存储NLP模型提取的key-value形式的结果
  - `category_id` - 文档分类作为外键关联到category表

1. **category表：**

  - `id` - 分类唯一标识符
  - `name` - 分类名称
  - `description` - 分类描述
  > - `library_id` - 文档分类所属文档库作为外键关联到library表

> 1. **library表：**

>   - `id` - 文档库唯一标识符
>   - `name` - 文档库名称
>   - `description` - 文档库描述
>   - `type` - 文档库类型（例如："学生文档库"、"医院文档库"）
>   - `access_level` - 文档库的访问级别(公开/私有)

> 2. **user_library_relation映射表:**

>   - `user_id` - 外键, 关联user表
>   - `document_library_id` - 外键, 关联library表

> 3. **user表：**

>   - `id` - 用户唯一标识符
>   - `username` - 用户名
>   - `password` - 密码（加密存储）
>   - `role` - 用户角色, 区分普通用户和管理员

#### 图片存储

图片存储到MinIO数据库, 供这个表查找

```markdown
**DocumentImages表：**

- `file_key` - 存储在MinIO中的图片文件的唯一标识符
```
