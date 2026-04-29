# 内容编辑说明

内容源文件在 `content/content.xlsx`。这个项目没有后端，Excel 不会在网页运行时自动读取；它用于本地维护内容，然后同步生成前端使用的数据。

## 编辑流程

1. 打开 `content/content.xlsx`
2. 修改三个 sheet：
   - `questions`：题目和选项
   - `achievements`：全部成就
   - `resultTypes`：结果人格
3. 保存 Excel
4. 在项目根目录运行：

```bash
npm run content:sync
```

这个命令会同步前端数据，并重新生成 `public/achievements` 下的成就图标。

5. 如果开发服务正在运行，页面会自动刷新；否则运行：

```bash
npm run dev
```

## 表格规则

`questions` 每道题必须有 4 行选项，同一个题目使用相同的 `questionId` 和 `questionTitle`。题目数量可以增加或减少，页面会自动读取当前题目总数。

`optionTags`、`tags`、`matchTags`、`achievementIds` 使用英文逗号或中文逗号分隔，例如：

```text
hardcore,planner
```

`achievements` 可以是 88 项、100 项或更多，页面会自动读取总数。`resultTypes` 里默认结果的 `isDefault` 填 `yes`。
