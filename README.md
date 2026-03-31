# Enhanced Element Plus

基於 Vue 3 + Element Plus 的增強型組件庫，通過 JSON Schema 配置快速構建表單和表格，大幅減少代碼量，提升開發效率和可維護性。

## 📖 線上文檔

[查看完整文檔和範例](https://yamapi0103.github.io/enhanced_element_plus/)

## ✨ 特性

- 🚀 **配置驅動** - 使用 JSON Schema 配置，無需編寫大量重複的模板代碼
- 🎯 **易於維護** - 集中管理表單/表格配置，代碼結構清晰
- 🔧 **高度可定制** - 支持 slot、render function、自定義樣式等
- 📝 **TypeScript 支持** - 完整的類型定義，開發體驗良好
- 🎨 **開箱即用** - 基於 Element Plus，保持一致的視覺風格
- ⚡️ **現代化工具鏈** - 使用 Vite + Vue 3 + TypeScript

## 💡 專案起源

在使用 [Element Plus](https://element-plus.org/) 開發時，我們經常會遇到：

- `el-form` 和 `el-table` 的模板代碼過於冗長
- 大量重複的 `el-form-item` 和 `el-table-column` 難以閱讀和維護
- 表單驗證規則分散在各處，不易統一管理

因此我們封裝了 `EnhancedElForm` 和 `EnhancedElTable`，將配置提取到外層，讓代碼更簡潔、更易維護。

## 📦 安裝

> 注意：本專案目前處於開發階段，尚未發布到 npm。

開發服務器啟動後，瀏覽器會自動打開文檔頁面，你可以查看所有組件範例和 API 說明。

## 📚 核心功能

### EnhancedElForm

#### 支援的表單類型

- `input` - 文字輸入框
- `textarea` - 多行文字
- `select` - 下拉選擇
- `radio` - 單選按鈕
- `checkbox` - 多選框
- `date-picker` - 日期選擇器
- `time-picker` - 時間選擇器
- `switch` - 開關
- 以及更多...

#### 進階功能

- **自動初始化** - 使用 `defaultValue` 自動初始化表單數據
- **編輯/檢視模式** - 支持點擊切換編輯和檢視模式
- **巢狀條件** - 使用 `nestedSchema` 實現條件式渲染
- **自定義渲染** - 支持 slot 和 render function
- **表單驗證** - 完整支持 Element Plus 驗證規則

#### Schema 配置項

```typescript
interface FormSchema {
  label: string          // 標籤文本
  prop: string          // 綁定的 model key
  type: string          // 表單項類型
  rules?: any           // 驗證規則
  options?: any[]       // 選項列表（select/radio/checkbox）
  attrs?: object        // 傳給元素的屬性
  defaultValue?: any    // 默認值
  render?: Function     // 自定義渲染函數
  nestedSchema?: FormSchema[]  // 嵌套子表單項
  change?: Function     // 值變化回調
  show?: boolean | Function    // 是否顯示
  // ...更多配置項
}
```

### EnhancedElTable

#### 支援的列類型

- 普通列 - 顯示數據
- `selection` - 多選框列
- `expand` - 可展開行
- `slot` - 自定義插槽列

#### Column 配置項

```typescript
interface TableColumn {
  prop: string           // 綁定的數據字段
  label: string         // 列標題
  type?: string         // 列類型
  width?: number | string  // 列寬
  minWidth?: string     // 最小寬度
  show?: boolean        // 是否顯示
  render?: Function     // 自定義渲染
  // ...更多配置項
}
```

### 專案結構

```
enhanced_element_plus/
├── .docs/              # VitePress 文檔
├── src/
│   ├── __docs__/
│   │   └── components/ # 核心組件和示例
│   └── index.ts       # 主入口
├── dist/              # 構建輸出
├── vite.config.ts     # Vite 配置
└── tsconfig.json      # TypeScript 配置
```

## 📦 使用 Ruabick 構建文檔

本專案使用 [Ruabick](https://github.com/dewfall123/ruabick) 快速構建 VitePress 文檔。

### 在 Markdown 中使用

```markdown
<!-- 組件演示 -->
<demo
  src="../components/form/basicForm.vue"
  title="基本表單"
  desc="展示各種表單類型">
</demo>

<!-- 自動生成 API 文檔 -->
<API src="../components/EnhancedElForm.vue" lang="zh"></API>
```

**效果：**
- `<demo>` - 自動渲染組件並顯示源碼
- `<API>` - 自動提取 props/events/slots 生成文檔

## 🔗 相關資源

- [Element Plus](https://element-plus.org/) - 基礎組件庫
- [Vue 3](https://vuejs.org/) - 漸進式 JavaScript 框架
- [VitePress](https://vitepress.dev/) - 文檔生成工具
- [Ruabick](https://github.com/dewfall123/ruabick) - 文檔構建工具套件
