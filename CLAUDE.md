# Gilles Caron — 项目接手说明

## 项目与技术栈

为一家艺术家基金会制作的黑白摄影档案与版权授权网站。目前为 **v0.1 英文静态演示版**，用于合作伙伴和客户审阅，并非正式销售系统。

正式站点将使用 **WordPress 管理，托管在 Kinsta**。本仓库是 demo；甲方确认后，需要据此产出 WordPress 主题和所需插件。因此结构上要便于迁移：数据按将来的文章类型/自定义字段组织，页面模板与组件对应将来的 PHP 模板文件（文件注释中以 `→ xxx.php` 标注对应关系，只是规划，并非已定）。

实际实现为 Vite 8 + TypeScript + 原生 DOM / HTML 模板字符串 + CSS，使用 hash 路由；不是 React 项目（虽安装了 React 插件，但未使用）。尚未接入 WordPress、WooCommerce 或任何业务后端。

## 常用命令与发布

建议 Node.js 22.12+，使用 npm 和现有 lockfile。

```sh
npm ci              # 按锁文件安装依赖
npm run dev         # 本地开发，地址以终端输出为准
npm run build       # 输出 dist/
npm run preview     # 本地预览构建产物，不是公网发布
npm run typecheck   # TypeScript 严格模式类型检查（tsconfig.json）
```

- 当前没有 test 或 lint 脚本。`vite build` 不做类型检查，提交前同时跑 `typecheck` 和 `build`。
- GitHub：`https://github.com/wwjjames/gilles-caron`，主分支 `main`，已有标签 `v0.1.0`。
- **Demo 托管已改为 Netlify**，与 GitHub 仓库相连，构建配置见 `netlify.toml`（`npm run build` → `dist`，Node 22）。推送到 GitHub 即触发 Netlify 部署，属于对外发布，推送前先征得用户同意。
- 旧演示地址 `https://gilles-caron.wwjjames.chatgpt.site`（OpenAI Sites，由 Codex 发布，对应 `.openai/hosting.json`）停留在 v0.1，Claude 无法更新它。

## 文件位置

- `src/main.ts`：入口，加载样式并启动路由。
- `src/router.ts`：hash 路由（代替将来的 WordPress 固定链接），渲染 header + 页面 + footer，再调用页面的 `mount()` 绑定交互。
- `src/data/`：模拟数据与类型（`types.ts`、`photos.ts`、`documentation.ts`、`exhibitions.ts`），对应将来的文章类型和自定义字段。
- `src/components/`：`header.ts`、`footer.ts`、`photo-card.ts`，对应将来的 `header.php`、`footer.php`、`template-parts/`。
- `src/pages/`：每个页面一个文件，导出 `render()`，需要交互的再导出 `mount()`。
- `src/lib/html.ts`：模板标签 `html`，去掉字面量中的换行和缩进，模板可以分行书写而输出紧凑 HTML。插值原样插入，不做转义。
- `src/style.css`：基础样式、字体、布局和响应式规则。
- `src/revision.css`：后续视觉修订，**在基础样式之后加载**；修改前检查最终生效的覆盖规则。
- `public/assets/`：模拟摄影素材及用户提供的肖像；当前首页使用 `gilles-caron-portrait-v2.png`。
- `index.html`：Vite 页面入口。
- `CLIENT_CONFIRMATION.md`：客户待确认事项，是业务边界的重要依据。
- `netlify.toml`：Netlify 构建配置。
- `.openai/hosting.json`：旧 OpenAI Sites 项目关联，仅作历史记录。
- `dist/`、`node_modules/`：生成目录，不提交、不直接修改。

## 代码约定

- 延续 camelCase 函数/变量、PascalCase 类型、kebab-case CSS 类名及资源名；小改动不引入框架迁移。
- 页面模板用 `html` 标签书写，按标签分行，文字内容不要跨行（换行会被删掉）。路由替换 `innerHTML` 后通过页面的 `mount()` 重新绑定交互事件。接入真实 CMS 数据时必须转义或使用 `textContent`，不可直接插入不可信文本。
- 卡片区分普通展示和售卖模式。使用 `.map(p => photoCard(p))` 这类显式回调，不要直接 `.map(photoCard)`：数组下标可能被误当成售卖参数，泄漏价格等信息。
- 优先修改明确生效的样式，避免不断追加重复覆盖；同时检查桌面与移动端断点。
- 文档或纯样式修改不顺带重构路由、数据模型或交易流程。

## 已完成与尚未完成

已完成的演示：

- 五项导航：Archive、Biography、Contact、Documentation、Exhibition；黑白灰视觉系统、黑色左右分栏页脚。
- 首页肖像介绍、展讯、四图横向浏览；照片搜索、人物介绍、联系表单界面、可授权照片列表及购买详情界面。
- Documentation 的 Film / Book / Price 分类栏及一本书的详情示例；展览列表及一个展览详情示例。
- 导航右侧有分隔线和 EN / FR / ZH 链接，EN 默认选中。

仍是占位或未接入：

- FR/ZH 不会翻译内容；联系表单仅显示演示反馈，Newsletter 与 Purchase 未接入发送或支付。
- 照片列表为模拟数据，部分图片重复；拍摄日期、标题、地点、价格及展讯不能视为真实档案。用户提供的肖像与生成的占位作品要明确区分。
- 多个书影音条目共用一个书籍详情，多条展讯共用一个展览详情。分类初始高亮 Film，但初始显示所有条目，尚需统一。
- 尚无 CMS、批量导入、真实搜索索引、订单、授权条款或高分辨率文件交付；后台调整首页前两块顺序尚未实现。
- 路由与移动端仍需 QA：无统一滚动复位，非法照片 ID 有回退逻辑；授权状态不能仅靠前端过滤保障。HTML 元信息、SEO、无障碍与正式上线检查也待补齐。

## 必须保留的设计与业务边界

- **不要修改参考项目** `/Users/james/Documents/ChatGPT/artist_website`。仅参考其交互、信息架构和页脚；不得沿用 Bachelot & Caron 的品牌、客户内容、作品数量、价格或交易决定。
- 首页第一屏桌面端为左黑底文字、右肖像，约 36% / 64%，高度扣除导航后占满视窗。肖像铺满、上下不留灰空，允许适当裁切但保留人物主体。此决定取代早期的严格对半布局；不要据此改动第二屏。
- 第二屏为左展览图、右说明，桌面端仍为全屏高度。首页不得重新加入生卒年月、edit pending 等标记；保留用户指定的现有英文介绍原文。
- 首页四图区不要标题、图下注释或 View All。箭头在左右两侧，与上一屏间距紧凑；右箭头第一次切换图片，第二次进入 Archive，左箭头重置计数。
- Archive 保留导航名称，但页面正文无 Archive 大标题；参考截图做四列独立图文卡片、留白分隔，不做表格边框或无缝拼贴。顺序为图片、日期、标题；**无价格、Available、购买入口，也不进入商品详情**。旧的“双详情页”构想以这一最新要求为准。
- Contact 使用同一份照片数据，但只列出 available 作品；由此进入的详情才有价格和 Purchase。上方表单紧凑，作品区引导语保持小字号单句。
- Documentation 分类暂按客户要求保留 **Film / Book / Price**，不要擅自将 Price 改为 Press。各页标题简洁、窄，不恢复大面积黑色标题区和装饰小字。
- 正式站点确定使用 WordPress，托管在 Kinsta。WooCommerce 与批量导入仍是计划：公开展示与可授权状态需要独立控制；首页人物与展讯模块需支持后台换序。
- 规模预期首期数千张，未来约 **13 万张**。讨论过搭配外部对象存储/CDN，但存储供应商、私有原图与公开预览策略、费用和备份都未最终确认；不要将原图库提交 Git。
- 正式发布前需确认权利主体、素材使用许可、真实传记、授权范围与价格、支付/询价流程及隐私政策，详见 `CLIENT_CONFIRMATION.md`。当前公开链接用于 mockup 审阅，不代表已具备交易能力。

本次检查未发现项目或上级目录的 `AGENTS.md`；若后续新增，接手时一并阅读。
