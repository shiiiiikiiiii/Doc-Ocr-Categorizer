## API列表

### 文档相关API

1. **上传文档：**
   
   - `POST /upload` - 上传扫描版文档图片，自动进行OCR和NLP处理，自动分类。

2. **获取文档详情：**
   
   - `GET /documents/{id}` - 获取特定文档的OCR和NLP识别结果。

3. **获取用户文档列表：**
   
   - `GET /documents` - 获取当前用户可访问的所有已上传文档的列表和基本信息。

4. **根据名称检索文档：**
   
   - `GET /documents/search?name={name}` - 根据名称检索文档。

5. **删除文档：**
   
   - `DELETE /documents/{id}` - 删除特定文档（需要权限控制）。

6. **修改文档所属分类：**
   
   - `POST /documents/{id}/category` - 手动修改特定文档所属的类别。

7. **修改文档所属文档库：**
   
   - `POST /documents/{id}/library` - 手动修改特定文档所属的文档库.

### 文档分类相关API

1. **获取文档分类列表：**
   
   - `GET /categories` - 获取当前用户可访问的所有文档分类信息。

2. **添加文档分类：**
   
   - `POST /categories` - 手动添加文档分类。

3. **修改文档分类：**
   
   - `PATCH /categories/{id}` - 手动修改特定文档分类。

4. **删除文档分类：**
   
   - `DELETE /categories/{id}` - 删除特定文档分类（需要权限控制）.

5. **检索特定文档分类下的所有文档：**
   
   - `GET /categories/{id}/documents` - 检索特定文档分类下的所有文档。

### 文档库相关API

1. **获取文档库列表：**
   
   - `GET /document-libraries` - 获取当前用户有权限访问的所有文档库。

2. **获取文档库详情：**
   
   - `GET /document-libraries/{id}` - 获取特定文档库的详细信息。

3. **添加文档库：**
   
   - `POST /document-libraries` - 添加新的文档库。

4. **修改文档库：**
   
   - `PATCH /document-libraries/{id}` - 修改特定文档库的信息。

5. **删除文档库：**
   
   - `DELETE /document-libraries/{id}` - 删除特定文档库（需要权限控制）.

6. **检索特定文档库下的所有文档分类：**
   
   - `GET /document-libraries/{id}/categories` - 检索特定文档库下的所有文档分类。
   

### 访问权限API

1. `分配访问权限:`
   - `POST /user-libraries:` 管理员为用户分配文档库的访问权限
   

2. `删除访问权限`
   - `DELETE /user-libraries:` 管理员删除用户的文档库访问权限

### 用户相关API

1. **用户注册**

   - `POST /users` - 提交用户名、密码等注册新用户。

2. **用户登录**

   - `POST /login` - 使用用户名密码登录。

3. **获取用户详情**

   - `GET /users/{userId}` - 获取指定用户的详细信息。

4. **更新用户信息**

   - `PATCH /users/{userId}` - 更新指定用户的信息。

5. **删除用户**

   - `DELETE /users/{userId}` - 删除指定用户(需要管理权限)。
