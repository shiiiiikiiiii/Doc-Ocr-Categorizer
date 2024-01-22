## 后端代码与数据库

### FastAPI项目结构

#### 文件结构

```
├── app
│   ├── main.py 
│   ├── routes
│   │   ├── api
│   │   │   ├── endpoints
│   │   │   │   ├── document.py
│   │   │   │   ├── category.py
│   │   │   │   ├── library.py
│   │   │   ├── __init__.py
│   │   ├── __init__.py
│   ├── models
│   │   ├── __init__.py  
│   │   ├── document.py
│   │   ├── category.py
│   │   ├── library.py
│   ├── services 
│   │   ├── __init__.py
│   │   ├── document.py
│   │   ├── category.py
│   │   ├── library.py
│   ├── core
│       ├── config.py
│       ├── __init__.py
├── tests
│   ├── __init__.py
│   ├── test_routes.py
├── alembic
├── alembic.ini
├── requirements.txt
├── README.md
```

#### 讲解

- `main.py` 为FastAPI应用的主入口。
- `/routes/api/endpoints` 存放路由文件。
- `/models` 存放模型类。
- `/services` 包含服务层逻辑。
- `/core` 包含配置等组件。
- `/alembic` 用于管理数据库迁移。 

### 后端数据库

#### 数据库表结构设计

1. **Users表：**
   
   - `id` - 用户唯一标识符
   - `username` - 用户名
   - `password` - 密码（加密存储）
   - `role` - 用户角色, 区分普通用户和管理员

2. **Documents表：**
   
   - `id` - 文档唯一标识符
   - `name` - 文档名称
   - `upload_date` - 文档上传日期
   - `category_id` - 文档分类的外键关联到Categories表
   - `library_id` - 文档所属文档库的外键关联到DocumentLibraries表
   - `nlp_results` - PgSQL的JSON类型，存储NLP模型提取的key-value形式的结果

3. **DocumentImages表：**
   
   - `id` - 图片唯一标识符
   - `document_id` - 外键关联到Documents表，表示该图片属于哪个文档
   - `file_key` - 存储在MinIO中的图片文件的唯一标识符
   - `ocr_results` - PgSQL的JSON类型，存储OCR模型提取的key-value形式的结果

4. **Categories表：**
   
   - `id` - 分类唯一标识符
   - `name` - 分类名称
   - `description` - 分类描述

5. **DocumentLibraries表：**
   
   - `id` - 文档库唯一标识符
   - `name` - 文档库名称
   - `type` - 文档库类型（例如："学生文档库"、"医院文档库"）
   - `description` - 文档库描述
   - `access_level` - 文档库的访问级别(公开/私有)


6. **UserDocumentLibraries映射表:**
   - `user_id` - 外键, 关联Users表
   - `document_library_id` - 外键, 关联DocumentLibraries表

#### 图片存储

图片存储到MinIO数据库, 供这个表查找

```
**DocumentImages表：**

- `file_key` - 存储在MinIO中的图片文件的唯一标识符
```
