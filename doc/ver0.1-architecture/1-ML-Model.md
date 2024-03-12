## OCR与NLP具体模型选择和调试计划

1. _由于PaddleOCR部署和调用不是很方便,_ 选用了基于PaddleOCR, 但是更方便部署的**RapidOCR**
2. 使用**intfloat/multilingual-e5-large-instruct**模型, 使用**sentence-embedding**方法, 将OCR结果提取为向量

### 推荐算法进行文档分类推荐

1. 可以结合内容相似性,比如使用NLP模型提取的文本特征,计算不同文档之间的相似度,以改进协同过滤算法。
2. 可以定期重新计算文档相似性,并基于最新的用户行为数据更新推荐结果,使分类推荐不断优化。
