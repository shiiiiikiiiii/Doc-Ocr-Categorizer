## API列表

### 文档相关API

1. **上传文档：**
   
   - `POST /upload` - 上传扫描版文档图片，自动进行OCR和NLP处理，自动分类。

2. **获取文档列表：**
   
   - `GET /documents` - 获取所有已上传文档。

3. **获取文档详情：**
   
   - `GET /documents/{id}` - 获取特定文档的各种信息, 包括所属分类, OCR识别结果等。

4. **删除文档：**
   
   - `DELETE /documents/{id}` - 删除特定文档。

5. **根据名称检索文档：**
   
   - `GET /documents/search/{search_name}` - 根据名称检索文档。

6. **修改文档：**
   
   - `PATCH /documents/{id}` - 手动修改特定文档的信息, 如名称, 所属的类别。

### 图片相关API

1. **根据文档ID获取图片URL：**

   - `GET /images/{document_id}` - 根据文档ID获取对应图片URL。

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

## openapi.json

```json
{"openapi":"3.1.0","info":{"title":"FastAPI","version":"0.1.0"},"paths":{"/upload":{"post":{"summary":"Upload Document","operationId":"upload_document_upload_post","requestBody":{"content":{"multipart/form-data":{"schema":{"$ref":"#/components/schemas/Body_upload_document_upload_post"}}},"required":true},"responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{"$ref":"#/components/schemas/PyDocumentRtn"}}}},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/HTTPValidationError"}}}}}}},"/documents":{"get":{"summary":"Get Documents","operationId":"get_documents_documents_get","responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{"items":{"$ref":"#/components/schemas/PyDocumentRtn"},"type":"array","title":"Response Get Documents Documents Get"}}}}}}},"/documents/{id}":{"get":{"summary":"Get Document","operationId":"get_document_documents__id__get","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer","title":"Id"}}],"responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{"$ref":"#/components/schemas/PyDocumentRtn"}}}},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/HTTPValidationError"}}}}}},"delete":{"summary":"Delete Document","operationId":"delete_document_documents__id__delete","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer","title":"Id"}}],"responses":{"204":{"description":"Successful Response"},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/HTTPValidationError"}}}}}}},"/documents/search/{search_name}":{"get":{"summary":"Search Documents","operationId":"search_documents_documents_search__search_name__get","parameters":[{"name":"search_name","in":"path","required":true,"schema":{"type":"string","title":"Search Name"}}],"responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{"type":"array","items":{"$ref":"#/components/schemas/PyDocumentRtn"},"title":"Response Search Documents Documents Search  Search Name  Get"}}}},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/HTTPValidationError"}}}}}}},"/documents/{document_id}":{"patch":{"summary":"Update Document","operationId":"update_document_documents__document_id__patch","parameters":[{"name":"document_id","in":"path","required":true,"schema":{"type":"integer","title":"Document Id"}}],"requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","title":"Update Data"}}}},"responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{"$ref":"#/components/schemas/PyDocumentRtn"}}}},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/HTTPValidationError"}}}}}}},"/images/{document_id}":{"get":{"summary":"Get Image By Category","operationId":"get_image_by_category_images__document_id__get","parameters":[{"name":"document_id","in":"path","required":true,"schema":{"type":"integer","title":"Document Id"}}],"responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{}}}},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/HTTPValidationError"}}}}}}},"/categories":{"get":{"summary":"Get Categories","operationId":"get_categories_categories_get","responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{"items":{"$ref":"#/components/schemas/PyCategory"},"type":"array","title":"Response Get Categories Categories Get"}}}}}},"post":{"summary":"Create Category","operationId":"create_category_categories_post","requestBody":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/PyCategoryInput"}}},"required":true},"responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{"$ref":"#/components/schemas/PyCategory"}}}},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/HTTPValidationError"}}}}}}},"/categories/{id}":{"patch":{"summary":"Update Category","operationId":"update_category_categories__id__patch","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer","title":"Id"}}],"requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","title":"Update Data"}}}},"responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{"$ref":"#/components/schemas/PyCategory"}}}},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/HTTPValidationError"}}}}}},"delete":{"summary":"Delete Category","operationId":"delete_category_categories__id__delete","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer","title":"Id"}}],"responses":{"204":{"description":"Successful Response"},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/HTTPValidationError"}}}}}}},"/categories/{category_id}/documents":{"get":{"summary":"Get Documents By Category","operationId":"get_documents_by_category_categories__category_id__documents_get","parameters":[{"name":"category_id","in":"path","required":true,"schema":{"type":"integer","title":"Category Id"}}],"responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{"type":"array","items":{"$ref":"#/components/schemas/PyDocumentRtn"},"title":"Response Get Documents By Category Categories  Category Id  Documents Get"}}}},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/HTTPValidationError"}}}}}}}},"components":{"schemas":{"Body_upload_document_upload_post":{"properties":{"file":{"type":"string","format":"binary","title":"File"}},"type":"object","required":["file"],"title":"Body_upload_document_upload_post"},"HTTPValidationError":{"properties":{"detail":{"items":{"$ref":"#/components/schemas/ValidationError"},"type":"array","title":"Detail"}},"type":"object","title":"HTTPValidationError"},"PyCategory":{"properties":{"id":{"type":"integer","title":"Id"},"name":{"type":"string","title":"Name"},"description":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Description"}},"type":"object","required":["id","name","description"],"title":"PyCategory"},"PyCategoryInput":{"properties":{"name":{"type":"string","title":"Name"},"description":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Description"}},"type":"object","required":["name","description"],"title":"PyCategoryInput"},"PyDocumentRtn":{"properties":{"id":{"type":"integer","title":"Id"},"name":{"type":"string","title":"Name"},"ocr_result":{"items":{"type":"object"},"type":"array","title":"Ocr Result"},"category_id":{"type":"integer","title":"Category Id"}},"type":"object","required":["id","name","ocr_result","category_id"],"title":"PyDocumentRtn"},"ValidationError":{"properties":{"loc":{"items":{"anyOf":[{"type":"string"},{"type":"integer"}]},"type":"array","title":"Location"},"msg":{"type":"string","title":"Message"},"type":{"type":"string","title":"Error Type"}},"type":"object","required":["loc","msg","type"],"title":"ValidationError"}}}}
```