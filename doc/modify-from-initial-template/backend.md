1. template项目文件

  ```sh
  ~/DocOcrCategorizeer/src/backend$ ls
  Dockerfile  alembic.ini  docker-compose.yml  postman         readme.md     scripts    tests
  LICENSE     app          poetry.lock         pyproject.toml  run_debug.sh  setup.cfg

  ~/DocOcrCategorizeer/src/backend/app$ ls
  __init__.py  __pycache__  api  core  db  main.py  models  resources  services
  ```

2. 调整

  ```markdown
  1\. 保留下来复用的部分:

  - 主程序main.py,包括FastAPI的实例化和启动代码

  - 核心逻辑代码app/core目录下的配置、日志等模块

  - 数据库访问层app/db目录下的代码

  - Pydantic模型和Schema的基类app/models/rwschema.py

  - 工具类和基类等公共代码

  2\. 需要删除的部分:

  - app/api/routes目录下的所有现有路由

  - app/models/domain和app/models/schemas下的现有模型类

  - app/services下的现有业务逻辑代码

  - app/db/queries下的现有SQL

  3\. 可以忽略的部分:

  - 测试用例,可以先忽略

  - 一些辅助脚本,比如docker镜像构建等

  4\. 然后针对自己的需求新增:

  - app/api/routes下新增路由 

  - app/models下新增模型类

  - app/services下新增业务逻辑

  - app/db/queries下新增SQL

  - 必要的单元测试用例
  ```
