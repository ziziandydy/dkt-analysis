# DKT-Analysis Snapshot (AI Only)

## app/
- layout.tsx: 全域佈局
- globals.css: 全域樣式
- page.tsx: 首頁
- login/page.tsx: 登入頁
- dashboard/page.tsx: 儀表板
- analyses/page.tsx: 分析總覽
- campaign-analysis/page.tsx: 活動分析
- site-analysis/
  - page.tsx: Site 列表頁（多站點管理，進入自動產生 mock data，含新增/刪除/查看分析）
  - new/page.tsx: 新增 Site Analysis（onboarding 流程，完成後自動導向分析頁）
  - [siteId]/page.tsx: 單一 Site 分析頁（根據 siteId 顯示對應數據，含回列表按鈕）
- account/settings/page.tsx: 帳號設定
- admin/
  - accounts/page.tsx: 帳號管理
  - brands/page.tsx: 品牌管理
  - roles/page.tsx: 角色管理

## components/
- 各分析元件：site-analysis.tsx, campaign-analysis.tsx, persona-analysis.tsx, topic-analysis.tsx, demographic-analysis.tsx, reach-analysis.tsx
- 儀表板：dashboard.tsx
- 側邊欄：app-sidebar.tsx
- 登入表單：login-form.tsx
- 儲存/匯出對話框：save-analysis-dialog.tsx, export-dialog.tsx
- 設定元件：account-settings.tsx, settings-selectors.tsx
- 列表：saved-analyses-list.tsx
- onboarding：site-onboarding.tsx（多站點支援，onComplete 寫入 trackedSites 陣列）
- admin/
  - account-management.tsx: 帳號管理（CRUD）
  - brand-management.tsx: 品牌管理
  - role-management.tsx: 角色管理
- ui/: 共用 UI 元件（Button, Table, Dialog, ...）

## contexts/
- settings-context.tsx: 設定狀態
- relevance-context.tsx: 相關性狀態

## hooks/
- use-translation.tsx: 多語
- use-toast.ts: 通知
- use-mobile.tsx: 行動裝置偵測

## lib/
- translations.ts: 多語資料
- utils.ts: 工具

## styles/
- globals.css: 全域樣式

## 主要功能
- 使用者登入/登出
- 儀表板數據總覽
- 多種分析（網站、活動、受眾、主題、人口、觸及）
- 分析儲存/匯出
- 管理後台（帳號、品牌、角色）CRUD
- 帳號設定
- 多語系支援
- 通知提示
- 行動裝置適應
- Site Analysis 多站點管理（列表、新增、刪除、mock data 自動產生、回列表）

# END 