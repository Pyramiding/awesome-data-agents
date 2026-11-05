# 网页版维护

[打开网页版](https://pyramiding.github.io/awesome-data-agents/) · [返回资料总览](README.md)

网页是无后端、无外部脚本依赖的静态站点，由 GitHub Pages 从 `main` 分支根目录发布。资料继续维护在 `resources.json`；缺少摘要的旧条目使用 README 中已有的导读，不生成新的技术结论。

## 文件与数据

- `index.html`：页面结构、阅读路线和系统参考图入口。
- `assets/styles.css`：桌面与手机布局、键盘焦点和减少动画设置。
- `assets/app.js`：搜索、筛选、分页、条目详情与当前浏览器收藏。
- `assets/catalog.js`：数据选择、日期处理、URL 状态和 README 导读提取。
- `.nojekyll`：直接发布静态文件。

资料总数、分类数量、截止日期与“本轮补录”来自索引。更新资料无需维护第二份网页清单；提交后由 Pages 发布。阅读路线中的 Markdown 文档链接指向 GitHub 的渲染页面。

## 本地检查与预览

需要 Node.js 22+ 与 Python 3，不需要安装前端依赖：

```sh
npm test
npm run check
npm run preview
```

打开 `http://127.0.0.1:4173/`。不要直接用 `file://` 打开 HTML，浏览器需要通过 HTTP 读取索引与 README。

## 交互与状态

搜索、分类、语言、公开状态、主题、排序与条目详情保存在 URL 参数中，可以直接分享。收藏只存放在当前浏览器的本地存储中，不建立账号，也不上传收藏记录。

原始日期与收录时间分开排序；`agenda`、早期项目与归档项目保留明确标记。详情页展示原有日期依据、许可范围、阅读路线及使用边界。页面不宣称重新执行过项目或验证过所有产品能力。

## 发布配置

GitHub 仓库的 **Settings → Pages** 使用 **Deploy from a branch → main → /(root)**。仓库的 Website 地址和 README 顶部指向同一个 Pages URL。若后续增加自定义构建，应同步更新此说明与部署设置。
