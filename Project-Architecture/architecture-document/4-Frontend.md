## 4. 前端

### 页面设计

#### 注册登录页面

1. **注册页面：**
   
   - 提供用户注册的界面，包括用户名、密码等必要信息的输入。

2. **登录页面：**
   
   - 提供用户登录的界面，包括用户名和密码的输入。
   

#### **管理员页面:**

   - 查看所有用户列表
   - 为用户分配文档库访问权限
   - 查看用户的文档库访问权限


#### 文档相关页面

> ##### 内嵌菜单导航结构
> 
> - 该导航结构仅在除注册登录之外的页面显示。
> 1. **用户 (AppstoreOutlined) - 可展开选项:**
>    1.1 用户信息 (getItem)
>    1.2 用户管理 (getItem)
> 
> 2. **文档 (AppstoreOutlined) - 可展开选项:**
>    2.1 文档库 (getItem)
>    2.2 根据名称搜索文档 (getItem)

1. **文档库列表页面**
   
   - 展示当前用户有权限访问的所有文档库，包括文档库的名称、类型等信息。
   - **功能按钮和操作：**
     - 查看文档库详情
     - 添加文档库
     - 编辑文档库
     - 删除文档库

2. **文档分类列表页面**
   
   - 用户选择文档库后，显示该文档库下的所有文档分类，包括分类的名称、描述等。
   - **功能按钮和操作：**
     - 查看文档分类详情
     - 添加文档分类
     - 编辑文档分类
     - 删除文档分类

3. **文档列表页面**
   
   - 用户选择文档分类后，显示该分类下的所有文档。
   - **功能按钮和操作**
     - 查看文档详情
     - 上传新文档
     - 编辑文档分类
     - 删除文档分类

4. **根据名称搜索文档页面**
   
   - 允许用户输入文档名称，然后显示检索到的文档列表。
   

### React项目结构

#### 文件结构

```
/src
|-- /components
|   |-- /Common
|   |   |-- Header.js
|   |   |-- Footer.js
|   |   |-- Button.js
|   |-- /Document
|   |   |-- DocumentList.js
|   |   |-- DocumentDetail.js
|   |   |-- DocumentUpload.js
|   |-- /Category
|   |   |-- CategoryList.js
|   |   |-- CategoryDetail.js
|   |   |-- CategoryForm.js
|-- /containers
|   |-- /DocumentLibrary
|   |   |-- DocumentLibraryList.js
|   |   |-- DocumentLibraryDetail.js
|   |   |-- DocumentLibraryForm.js
|   |-- /DocumentCategory
|   |   |-- DocumentCategoryList.js
|   |   |-- DocumentCategoryDetail.js
|   |   |-- DocumentCategoryForm.js
|-- /services
|   |-- api.js
|   |-- documentService.js
|   |-- categoryService.js
|   |-- libraryService.js
|-- /utils
|   |-- helpers.js
|-- /styles
|   |-- main.scss
|-- App.js
|-- index.js
|-- /assets
    |-- /images
```

#### 讲解

- **components:** 这个目录包含所有可复用的React组件，按功能或类型进行组织。`Common`目录下存放通用组件，`Document`和`Category`目录下存放与文档和分类相关的组件。

- **containers:** 容器组件，负责管理数据和业务逻辑，与具体的页面结构解耦。`DocumentLibrary`和`DocumentCategory`目录下分别存放文档库和文档分类相关的容器组件。

- **services:** 包含与后端通信的服务文件，负责处理API请求。`api.js`定义通用的API请求方法，`documentService.js`和`categoryService.js`分别处理文档和分类的相关请求。

- **utils:** 存放一些通用的工具函数，比如帮助函数。

- **styles:** 存放样式文件，可以使用Sass或其他预处理器。

- **App.js:** 主应用组件，负责路由的定义和页面结构的组织。

- **index.js:** 项目入口文件。

- **assets:** 存放项目所需的静态资源，比如图片。
