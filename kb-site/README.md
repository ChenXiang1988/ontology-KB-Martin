# KB Site

这个目录存放由 `ontology-kb/` 生成的静态知识库网站。

## 说明

- `build-site.mjs` 会扫描 `ontology-kb/` 下的所有 Markdown 文件
- 每个 `.md` 文件都会生成一个对应的 `.html` 页面
- `index.html` 是生成出来的首页，不是手写的静态页
- 生成结果会输出到 `kb-site/pages/`

## 生成方式

```bash
node kb-site/build-site.mjs
```

## 打开方式

直接打开 `kb-site/index.html` 即可预览生成后的知识库网站。

## GitHub Pages

如果要用 GitHub Pages 发布这套站点：

1. 在仓库的 `Settings > Pages` 里，把 Source 设为 `GitHub Actions`
2. 推送到 `main`
3. 工作流会自动执行：
   - 运行 `node kb-site/build-site.mjs`
   - 生成 `kb-site/index.html` 和 `kb-site/pages/`
   - 把生成后的静态文件发布到 GitHub Pages

发布内容只包含生成产物，不会把 Markdown 源文件和构建脚本直接暴露成站点页面。
