1. template项目文件

  ```sh
  ~/DocOcrCategorizeer/src/frontend$ ls
  LICENSE    assets  jest.config.js  mock          package-lock.json  public  scripts
  README.md  docs    manifest.json   node_modules  package.json       run.sh  src

  ~/DocOcrCategorizeer/src/frontend/src$ ls
  components  e2e  layouts  locales  models  pages  plugins  services  themes  utils
  ```

2. 调整

  ```markdown
  1\. 可以保留复用的部分:

  - src/utils目录下的工具函数,如请求处理函数request.js等。

  - src/components目录下的通用组件,如Layout布局组件等。

  - src/services目录下的接口请求层抽象。

  - 项目的总体技术架构和配置,如webpack配置,路由管理等。

  2\. 需要删除的:

  - src/pages目录下的所有页面组件

  - src/models目录下的redux数据模型

  - src/services里无关的接口请求代码

  3\. 可以忽略的:

  - src/e2e目录下的端对端测试

  - 不相关的样式文件

  - 一些架构相关但现在用不到的配置

  4\. 需要自己新增的:

  - 新的pages页面组件

  - 自己的models数据模型 

  - 自己的services接口请求

  - 业务组件components

  - 路由配置等与业务相关的代码
  ```
