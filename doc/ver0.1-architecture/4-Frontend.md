## 前端页面设计

1. **文档分类管理页面（Category Management Page）**
   - 页面布局：采用卡片式布局，每个卡片展示一个文档分类，包括分类名称、图标、文档数量等信息。
   - 交互设计：用户点击分类卡片，页面平滑过渡到对应的文档分类详情页面。
   - 在页面上提供"添加"操作按钮, 点击后弹出`dialog`, 可以输入名称添加一个文档分类
   - 在每个分类卡片上提供“编辑”、“删除”操作的按钮，允许用户进行相应的改名和删除操作。
      - 编辑按钮: 点击后弹出`dialog`, 可以输入名称
      - 删除按钮: 点击后弹出`dialog`, 其中包含确定和取消按钮

2. **文档分类详情页面（Category Details Page）**
   - 页面布局：以网格形式展示该分类下的所有文档，每个文档以缩略图和简短描述的形式呈现。
   - 交互设计：用户点击文档缩略图，弹出对应的`文档详细模态对话框`。

3. **上传文档页面（Upload Document Page）**
   - 页面布局：提供一个清晰的文件上传表单，用户可以上传文档。
   - 交互设计：上传后，系统自动进行OCR处理，并在页面上弹出`dialog`展示处理结果和自动分类结果。

4. **搜索文档页面（Search Document Page）**
   - 页面布局：顶部提供一个搜索框，用户可以输入关键词进行搜索。
   - 交互设计：搜索结果以列表形式展示，每个结果旁边有“查看详情”按钮。点击后，弹出对应的`文档详细模态对话框`。

5. **文档详情模态对话框（Document Details Modal dialog）**
   - 对话框内容：展示文档的图片预览、OCR识别结果、分类信息、上传日期等元数据。
   - 操作选项：提供下载文档、修改分类、改名、删除文档的操作按钮，以及关闭对话框的选项。
      - 编辑按钮: 点击后弹出`dialog`, 可以输入名称
      - 删除按钮: 点击后弹出`dialog`, 其中包含确定和取消按钮

6. **导航栏（Navigation Bar）**
   - 设计：导航栏固定在页面的左侧，垂直布局。
   - 内容：包含以下按钮：
     - 文档分类管理：跳转到文档分类管理页面。
     - 上传文档：跳转到上传文档页面。
     - 搜索文档：跳转到搜索文档页面。

## 前端项目架构

```markdown

\```text
.
├── .umi
│   └── .umi-production
├── mock // 模拟数据目录
│   └── services
│       └── api.ts
├── public
│   └── index.html
├── src
│   ├── layouts // 布局组件
│   │   ├── BasicLayout.tsx
│   │   └── index.less
│   ├── models // 状态管理
│   │   ├── global.ts
│   │   └── document.ts // 文档相关状态
│   │   └── category.ts // 分类相关状态
│   ├── pages // 页面组件
│   │   ├── CategoryManagement.tsx // 文档分类管理页面
│   │   ├── DocumentUpload.tsx // 上传文档页面
│   │   ├── SearchDocument.tsx // 搜索文档页面
│   │   ├── DocumentDetailsModal.tsx // 文档详情模态对话框
│   │   ├── Navigation.tsx // 导航栏组件
│   │   └── index.less
│   ├── services // API服务
│   │   └── api.ts
│   ├── utils // 工具函数
│   │   └── index.ts
│   ├── components // 通用组件
│   │   ├── Card.tsx // 卡片组件
│   │   ├── Dialog.tsx // 对话框组件
│   │   ├── Grid.tsx // 网格组件
│   │   └── Form.tsx // 表单组件
│   ├── styles // 全局样式
│   │   ├── global.less
│   │   └── variables.less
│   ├── utils // 其他工具函数
│   │   └── index.ts
│   ├── app.tsx // 应用入口
│   ├── global.tsx // 全局配置
│   ├── loading.tsx // 加载组件
│   └── index.tsx
├── .env
├── .umirc.ts
├── package.json
├── tsconfig.json
└── typings.d.ts
\```

1. **layouts**：包含应用的布局组件，如`BasicLayout.tsx`，它将作为应用的主布局，其他页面将嵌入其中。

2. **models**：状态管理目录，使用umijs的模型功能来管理应用的状态。例如，`global.ts`用于全局状态，`document.ts`和`category.ts`分别用于管理文档和分类的状态。

3. **pages**：页面组件目录，每个页面对应一个`.tsx`文件。例如，`CategoryManagement.tsx`用于文档分类管理页面，`DocumentUpload.tsx`用于上传文档页面等。

4. **services**：API服务目录，包含与后端交互的API调用。这里可以创建一个`api.ts`文件，用于封装所有API请求。

5. **utils**：工具函数目录，可以包含一些通用的函数，如日期处理、字符串操作等。

6. **components**：通用组件目录，包含应用中可能会重复使用的组件，如`Card.tsx`、`Dialog.tsx`等。

7. **styles**：全局样式目录，包含全局样式文件和变量定义。

8. **app.tsx**：应用的入口文件，初始化应用并渲染主布局。

9. **global.tsx**：全局配置文件，可以在这里设置全局的样式、国际化等。

10. **loading.tsx**：加载组件，用于在数据加载时显示加载状态。

11. **.env**：环境变量配置文件，用于不同环境下的配置。

12. **.umirc.ts**：umijs的配置文件，用于配置路由、构建等。

13. **package.json**：项目的依赖和脚本配置。

14. **tsconfig.json**：TypeScript的配置文件。

15. **typings.d.ts**：TypeScript的类型声明文件。

```