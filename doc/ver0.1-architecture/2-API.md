## API列表

### 文档相关API

1. **上传文档：**
   
   - `POST /upload` - 上传扫描版文档图片，自动进行OCR和NLP处理，自动分类。

2. **获取文档详情：**
   
   - `GET /documents/{id}` - 获取特定文档的OCR识别结果。

3. **获取文档列表：**
   
   - `GET /documents` - 获取所有已上传文档。

4. **根据名称检索文档：**
   
   - `GET /documents/search?name={name}` - 根据名称检索文档。

5. **删除文档：**
   
   - `DELETE /documents/{id}` - 删除特定文档。

6. **修改文档所属分类：**
   
   - `POST /documents/{id}/category` - 手动修改特定文档所属的类别。

### 文档分类相关API

1. **获取文档分类列表：**
   
   - `GET /categories` - 获取所有文档分类。

2. **添加文档分类：**
   
   - `POST /categories` - 手动添加文档分类。

3. **修改文档分类：**
   
   - `PATCH /categories/{id}` - 手动修改特定文档分类。

4. **删除文档分类：**
   
   - `DELETE /categories/{id}` - 删除特定文档分类.

5. **检索特定文档分类下的所有文档：**
   
   - `GET /categories/{id}/documents` - 检索特定文档分类下的所有文档。
