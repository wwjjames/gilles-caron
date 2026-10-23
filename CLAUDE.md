# Gilles Caron — 项目接手说明

## 项目与技术栈

为一家艺术家基金会制作的黑白摄影档案与版权授权网站。目前为英文静态演示版（v0.1 已发布，v0.2 / v0.3 在本地分支上进行中），用于合作伙伴和客户审阅，并非正式销售系统。计划 **2026 年 11 月初上线**。

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
- `src/data/`：模拟数据与类型，对应将来的文章类型和自定义字段。`navigation.ts` 主导航（含 `visible` 开关）、`gallery.ts` 照片库（Archive 本周 10 张、首页 4 张的勾选，以及 MPP 链接）、`photos.ts` 仅供 Contact 售卖演示的模拟商品、`univers.ts` Univers 分类及书籍 / 纪录片 / 媒体条目、`exhibitions.ts` 展览及状态推导、`legal.ts` 法律页面列表、`types.ts`。
- `src/components/`：`header.ts`、`footer.ts`、`photo-card.ts`（仅 Contact 售卖卡片）、`justified-gallery.ts`（Archive 与首页的等高行照片墙）、`editorial-detail.ts`（展览详情模板），对应将来的 `header.php`、`footer.php`、`template-parts/`。
- `src/pages/`：每个页面一个文件，导出 `render()`，需要交互的再导出 `mount()`。详情页找不到对应条目时返回 `undefined`，由路由回退到首页。
- `src/lib/justify.ts`：等高行排版算法，照片不裁切、每行填满宽度、各行均衡分配，避免最后一行只剩一两张。
- `src/lib/html.ts`：模板标签 `html`，去掉字面量中的换行和缩进，模板可以分行书写而输出紧凑 HTML。插值原样插入，不做转义。
- `src/style.css`：基础样式、字体、布局和响应式规则。
- `src/revision.css`：后续视觉修订，**在基础样式之后加载**；修改前检查最终生效的覆盖规则。
- `public/assets/`：网页尺寸素材。`photos/` 为照片库（长边 1600px，由原图压缩）；`brand/fgc-logo.png` 为基金会 Logo（已裁掉白边）；`press/` 为媒体 Logo；首页肖像 `gilles-caron-portrait-v2.png`、传记肖像 `gilles-caron-rtl-interview.jpg`；其余为早期模拟素材。
- `v0.3/`：客户提供的原始素材（原图、字体、Logo 源文件、书封、媒体 Logo、海报），已加入 `.gitignore`，不提交。需要上线的图片要先压缩到 `public/assets/`。
- `index.html`：Vite 页面入口，含 viewport meta（缺少它时手机会按桌面宽度缩放，移动端样式不生效）。
- `CLIENT_CONFIRMATION.md`：客户待确认事项，是业务边界的重要依据。
- `netlify.toml`：Netlify 构建配置。
- `.openai/hosting.json`：旧 OpenAI Sites 项目关联，仅作历史记录。
- `dist/`、`node_modules/`：生成目录，不提交、不直接修改。

## 代码约定

- 延续 camelCase 函数/变量、PascalCase 类型、kebab-case CSS 类名及资源名；小改动不引入框架迁移。
- 页面模板用 `html` 标签书写，按标签分行，文字内容不要跨行（换行会被删掉）。路由替换 `innerHTML` 后通过页面的 `mount()` 重新绑定交互事件。接入真实 CMS 数据时必须转义或使用 `textContent`，不可直接插入不可信文本。
- 全站字体为 Helvetica Neue，统一用 CSS 变量 `--font`；不要再引入其他字体。字体文件 `v0.3/POUR JING/Document fonts/HelveticaNeue.ttc` 是 macOS 系统字体，**没有网页嵌入授权，不要放进网站**；目前依赖访客系统已安装的字体，其他系统回退到 Helvetica / Arial。
- 页头高度由 `--logo-h` 与 `--logo-clear`（10mm 留白）计算为 `--header-h`，需要页头高度的地方都用这个变量，不要写死像素值。
- `photoCard(p)` 只用于 Contact 售卖列表。Archive 和首页照片用 `justifiedGallery()`，必须在数据中写明每张图的 `width` / `height`。
- 优先修改明确生效的样式，避免不断追加重复覆盖；同时检查桌面与移动端断点。
- 文档或纯样式修改不顺带重构路由、数据模型或交易流程。

## 已完成与尚未完成

已完成的演示（v0.3）：

- 全站字体 Helvetica Neue。页头左上为基金会 Logo + “Fondation Gilles Caron”，Logo 四周留 10mm 空白（手机端只显示 Logo）。
- 主导航五项 Archive、Biography、Collaboration、Univers、Exhibition；Collaboration 页面与路由已建，但 11 月上线时不显示（`navigation.ts` 中 `visible: false`），前台只显示四项。当前栏目在导航中带下划线。
- 页脚右侧三栏并列：Contact、Explore、Legal。Legal 栏链接五个法律页面（Legal notice、Terms of use、Privacy policy、Cookie policy、Copyright & image rights），页面留空，正文在 WordPress 中填写。
- 首页：肖像介绍（第一屏随内容增高，不溢出）、自动选取的展讯（正在进行 → 即将开始 → 最近一个）、照片库中勾选为首页的 4 张照片（桌面端一行等高，无箭头、无说明文字，点击进入 Archive）。
- Archive：左侧小字说明 + 右侧 MPP 查阅引导（链接 `https://mediatheque-patrimoine.culture.gouv.fr/`），下方为照片库中勾选的 10 张照片，等高行自适应排版（横竖混排、不裁切、无空缺），图下为日期和标题。不可点击放大，禁用右键和拖拽。
- Biography：RTL 采访照片 + 客户提供的法文介绍 + 维基百科链接。
- Univers：Edition 三个书籍占位（封面、标题、年份，出版社和作者可选，无详情页）；Production 为“剧院模式”，深色背景内嵌 YouTube 预告片（《Histoire d’un regard》，Mariana Otero），并链接全片网站和 France Culture 节目；Parution 为逐行列表，左侧媒体 Logo，右侧标题和年份，点击标题打开外部链接，目前为三个占位。
- Exhibition：索引式列表（标题字号已缩小），详情 `#exhibition/<slug>`。
- Contact 页面及售卖详情仍保留，但不在主导航中，只能从页脚 “Licensing enquiries” 进入。
- 切换页面时滚动回到顶部；旧地址 `#documentation` 跳转到 `#univers`；未知地址回到首页。

仍是占位或未接入：

- 展览、书籍、媒体条目均为占位或模拟数据；Contact 售卖照片仍为早期模拟素材。
- Archive / 首页的照片勾选目前写在 `gallery.ts` 中，每周随机或手动轮换需在 WordPress 端实现。“不可下载”只是禁用右键和拖拽，无法阻止截图；真正的保护是只上传低分辨率预览。
- FR/ZH 不会翻译内容；联系表单仅显示演示反馈，Newsletter 与 Purchase 未接入发送或支付。网站界面为英文，Biography 正文为客户提供的法文。
- 尚无 CMS、批量导入、订单、授权条款或高分辨率文件交付；后台调整首页前两块顺序尚未实现。
- 手机端页头导航较拥挤，需要单独设计（如折叠菜单）。HTML 元信息、SEO、无障碍与正式上线检查待补齐。

## 必须保留的设计与业务边界

- **不要修改参考项目** `/Users/james/Documents/ChatGPT/artist_website`。仅参考其交互、信息架构和页脚；不得沿用 Bachelot & Caron 的品牌、客户内容、作品数量、价格或交易决定。
- 首页第一屏桌面端为左黑底文字、右肖像，约 36% / 64%，高度扣除导航后占满视窗。肖像铺满、上下不留灰空，允许适当裁切但保留人物主体。此决定取代早期的严格对半布局；不要据此改动第二屏。
- 第二屏为左展览图、右说明，桌面端仍为全屏高度。首页不得重新加入生卒年月、edit pending 等标记；保留用户指定的现有英文介绍原文。
- 首页四图区只放 4 张（从 Archive 照片库中勾选），不要标题、图下注释、View All 或左右箭头，与上一屏间距紧凑；点击照片进入 Archive。
- 主导航五项顺序固定：Archive、Biography、Collaboration、Univers、Exhibition。Collaboration 在 11 月上线时隐藏，不要删除它的页面和路由。
- Archive：原作由政府机构 **MPP（Médiathèque du patrimoine et de la photographie）** 保管，网站不上线全部照片。页面**每周展示 10 张不可下载的照片**，原搜索位置改为引导研究人员、艺术史学者和机构联系 MPP 查阅（左侧说明用小字号）。没有搜索、Archive 大标题、价格、Available、购买入口、商品详情或点击放大。**不再用 WooCommerce 管理**：改为照片库（gallery），基金会上传照片（例如 50 张）后，每周勾选哪 10 张出现在 Archive、哪 4 张出现在首页。排版为等高行自适应：横竖混排、不裁切、每行填满、不留空缺，图下为日期和标题。
- Biography 使用客户提供的法文介绍原文和 RTL 采访照片，不要改写原文。
- Univers 取代 Documentation，子导航为 **Edition**（专题书籍）、**Production**（纪录片）、**Parution**（报纸、杂志、文章、访谈等，客户文档中也称 Press）。Edition 保持卡片布局，字段为封面、标题、年份、出版社（可选）、作者（可选）；Production 为剧院模式内嵌 YouTube；Parution 为逐行条目（媒体 Logo、标题、年份、外部链接、作者可选）。
- Exhibition：包含展览预告、正在进行和往期回顾，状态由日期自动推导，排序为预告 → 进行中 → 往期。参照 `https://stg-bachelotcaron-staging.kinsta.cloud/en/projects/` 的 Index 视图：左侧编号标题列表，悬停时标题由灰变黑，右侧图片随之切换；**不要子标题栏或筛选栏**。手机端无悬停，每条直接显示缩略图。
- Contact 使用同一份照片数据，但只列出 available 作品；由此进入的详情才有价格和 Purchase。上方表单紧凑，作品区引导语保持小字号单句。
- 各页标题简洁、窄，不恢复大面积黑色标题区和装饰小字。
- 页脚必须保留法律条款链接；对应页面在 demo 中留空，由 WordPress 手动填写。
- 正式站点确定使用 WordPress，托管在 Kinsta。WooCommerce 与批量导入仍是计划：公开展示与可授权状态需要独立控制；首页人物与展讯模块需支持后台换序。
- 规模预期首期数千张，未来约 **13 万张**。讨论过搭配外部对象存储/CDN，但存储供应商、私有原图与公开预览策略、费用和备份都未最终确认；不要将原图库提交 Git。
- 正式发布前需确认权利主体、素材使用许可、真实传记、授权范围与价格、支付/询价流程及隐私政策，详见 `CLIENT_CONFIRMATION.md`。当前公开链接用于 mockup 审阅，不代表已具备交易能力。

本次检查未发现项目或上级目录的 `AGENTS.md`；若后续新增，接手时一并阅读。
