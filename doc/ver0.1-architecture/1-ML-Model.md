## OCR与NLP具体模型选择和调试计划

1. _由于PaddleOCR部署和调用不是很方便,_ 选用了基于PaddleOCR, 但是更方便部署的**RapidOCR**
2. 使用**intfloat/multilingual-e5-large-instruct**模型, 使用**sentence-embedding**方法, 将OCR结果提取为向量

### 推荐算法进行文档分类推荐

- 使用PgSQL插件**pgvector**, 实现基于向量相似度的推荐
