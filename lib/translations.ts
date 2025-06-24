export type Language = "EN" | "ZH"

/**
 * Add new keys here as your UI grows.
 * NOTE: the keys MUST match exactly what you pass to `t("…")`
 */
export type TranslationKey =
  | "analysisDashboard"
  | "pretargetingAnalysis"
  | "campaignAnalysis"
  | "siteAnalysis"
  | "savedAnalysis"
  | "analysis"
  | "brandManagement"
  | "roleManagement"
  | "accountManagement"
  | "systemSettings"
  | "accountSettings"
  | "logout"
  | "dataImportSetup"
  | "configureDataCollection"
  | "hideSetup"
  | "showSetup"
  | "wordpressIntegration"
  | "trackingEcommerceEvents"
  | "siteAnalysisDescription" // add more as needed
  | "settings"
  | "openSettings"
  | "saveSettings"
  | "cancelSettings"
  | "websiteSettings"
  | "manageWebsiteConfiguration"
  | "websiteInformation"
  | "websiteName"
  | "websiteUrl"
  | "siteAccountId"
  | "trackingId"
  | "popularTopics"
  | "relatedUsers"
  | "clickForDetails"
  | "returnToTopicList"
  | "popularKeywords"
  | "copyAllKeywords"
  | "popularArticles"
  | "marketingPersonas"
  | "people"
  | "returnToPersonaList"
  | "keywords"
  | "frequentlyViewedArticles"
  | (string & {}) // allow forward-compat keys

/**
 * Central translation table.
 * Only include strings you actually display in the UI.
 */
export const translations: Record<TranslationKey, { en: string; zh: string }> = {
  analysisDashboard: { en: "Analysis Dashboard", zh: "分析儀表板" },
  pretargetingAnalysis: { en: "Pretargeting Analysis", zh: "受眾預測分析" },
  campaignAnalysis: { en: "Campaign Analysis", zh: "活動分析" },
  siteAnalysis: { en: "Site Analysis", zh: "網站分析" },
  savedAnalysis: { en: "Saved Analyses", zh: "已儲存分析" },
  analysis: { en: "Analysis", zh: "分析" },
  brandManagement: { en: "Brand Management", zh: "品牌管理" },
  roleManagement: { en: "Role Management", zh: "角色管理" },
  accountManagement: { en: "Account Management", zh: "帳號管理" },
  systemSettings: { en: "System Settings", zh: "系統設定" },
  accountSettings: { en: "Account Settings", zh: "帳戶設定" },
  logout: { en: "Logout", zh: "登出" },
  dataImportSetup: { en: "Data Import Setup", zh: "數據匯入設定" },
  configureDataCollection: { en: "Configure data collection and tracking", zh: "設定數據收集和追蹤" },
  hideSetup: { en: "Hide Setup", zh: "隱藏設定" },
  showSetup: { en: "Show Setup", zh: "顯示設定" },
  wordpressIntegration: { en: "WordPress Integration", zh: "WordPress 整合" },
  trackingEcommerceEvents: { en: "Tracking e-commerce events", zh: "追蹤電商事件" },
  siteAnalysisDescription: { en: "Select a website to analyze", zh: "選擇網站進行分析" },
  settings: { en: "Settings", zh: "設定" },
  openSettings: { en: "Open Settings", zh: "開啟設定" },
  saveSettings: { en: "Save Settings", zh: "儲存設定" },
  cancelSettings: { en: "Cancel", zh: "取消" },
  websiteSettings: { en: "Website Settings", zh: "網站設定" },
  manageWebsiteConfiguration: { en: "Manage website configuration and data collection", zh: "管理網站設定和數據收集" },
  websiteInformation: { en: "Website Information", zh: "網站資訊" },
  websiteName: { en: "Website Name", zh: "網站名稱" },
  websiteUrl: { en: "Website URL", zh: "網站網址" },
  siteAccountId: { en: "Site Account ID", zh: "網站帳號ID" },
  trackingId: { en: "Tracking ID", zh: "追蹤ID" },
  popularTopics: { en: "Popular Topics", zh: "熱門主題" },
  relatedUsers: { en: "related users", zh: "相關用戶" },
  clickForDetails: { en: "Click for details", zh: "點擊查看詳情" },
  returnToTopicList: { en: "← Back to topics", zh: "← 返回主題列表" },
  popularKeywords: { en: "Popular Keywords", zh: "熱門關鍵字" },
  copyAllKeywords: { en: "Copy All", zh: "複製全部" },
  popularArticles: { en: "Popular Articles", zh: "熱門文章" },
  marketingPersonas: { en: "Marketing Personas", zh: "行銷人設" },
  people: { en: "people", zh: "人" },
  returnToPersonaList: { en: "← Back to personas", zh: "← 返回人設列表" },
  keywords: { en: "Keywords", zh: "關鍵字" },
  frequentlyViewedArticles: { en: "Frequently Viewed Articles", zh: "常閱讀文章" },
} as const

/**
 * Core utility – returns the translated string.
 * Falls back to English, then to the key itself.
 */
export function useTranslation(key: TranslationKey, language: Language = "EN"): string {
  const entry = translations[key as TranslationKey]
  if (entry) {
    return language === "ZH" ? entry.zh : entry.en
  }
  // fallback – useful while developing when a key
  // hasn’t been added to `translations` yet
  return key
}
