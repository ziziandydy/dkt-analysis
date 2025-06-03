export type TranslationKey =
  | "pretargetingAnalysis"
  | "campaignAnalysis"
  | "customerAnalysis"
  | "exploreAudiences"
  | "coreKeywords"
  | "coreKeywordsDescription"
  | "excludeKeywords"
  | "excludeKeywordsDescription"
  | "addKeywords"
  | "addExclusions"
  | "explore"
  | "analyzing"
  | "analysisResults"
  | "saveAnalysis"
  | "export"
  | "audienceReach"
  | "topicAnalysis"
  | "personaAnalysis"
  | "demographicAnalysis"
  | "rankAndEstimatedReach"
  | "exploreRelevanceLevels"
  | "topRelevance"
  | "highRelevance"
  | "broadRelevance"
  | "highlyRelevant"
  | "moderatelyRelevant"
  | "broaderLessRelevant"
  | "estimatedReach"
  | "averageScore"
  | "rank"
  | "popularTopics"
  | "topicDistribution"
  | "users"
  | "keywordsFor"
  | "useKeywords"
  | "relatedArticles"
  | "popularContent"
  | "copyAllKeywords"
  | "copied"
  | "genderDistribution"
  | "genderBreakdown"
  | "ageDistribution"
  | "ageBreakdown"
  | "mbtiDistribution"
  | "mbtiPreferences"
  | "extroversionVsIntroversion"
  | "sensingVsIntuition"
  | "thinkingVsFeeling"
  | "judgingVsPerceiving"
  | "male"
  | "female"
  | "unknown"
  | "campaignPerformance"
  | "campaignMetrics"
  | "impressions"
  | "clicks"
  | "ctr"
  | "conversions"
  | "conversionRate"
  | "budgetUtilization"
  | "budgetSpent"
  | "totalBudget"
  | "spent"
  | "remaining"
  | "costPerClick"
  | "costPerConversion"
  | "campaignTimeline"
  | "performanceOverTime"
  | "optimizeStrategy"
  | "customerSegments"
  | "customerBreakdown"
  | "newCustomers"
  | "returningCustomers"
  | "loyalCustomers"
  | "customerLifetimeValue"
  | "averageValuePerSegment"
  | "averageClv"
  | "customerSatisfaction"
  | "feedbackMetrics"
  | "npsScore"
  | "csat"
  | "retentionRate"
  | "churnRate"
  | "optimizeExperience"
  | "analysisDashboard"
  | "analysis"
  | "savedAnalyses"
  | "administration"
  | "brandManagement"
  | "roleManagement"
  | "accountManagement"
  | "accountSettings"
  | "logout"
  | "analysisSaved"
  | "saveAnalysisDescription"
  | "name"
  | "myAnalysis"
  | "keywords"
  | "core"
  | "exclude"
  | "cancel"
  | "save"
  | "saving"
  | "exportingData"
  | "yourFileIsBeingPrepared"
  | "exportComplete"
  | "yourFileIsReady"
  | "exportData"
  | "exportDescription"
  | "pngImage"
  | "exportAsScreenshots"
  | "csvData"
  | "exportRawData"
  | "login"
  | "loginDescription"
  | "email"
  | "password"
  | "loggingIn"
  | "analysisDeleted"
  | "analysisDeletedDescription"
  | "created"
  | "updated"
  | "createdBy"
  | "openMenu"
  | "view"
  | "delete"
  | "areYouSure"
  | "deleteConfirmation"
  | "viewAndManageAnalyses"
  | "searchAnalyses"
  | "newAnalysis"
  | "reach"
  | "topPersonas"
  | "savedAnalysis"
  | "analysisDetails"
  | "savedTimestamp"
  | "lastUpdated"
  | "analysisSettings"
  | "analysisType"
  | "country"
  | "targetUrl"
  | "relevanceThreshold"
  | "updateAnalysis"
  | "adjustSettings"
  | "analysisUpdated"
  | "analysisUpdatedDescription"
  | "hasBeenSaved"
  | "systemSettings"

export const translations: Record<TranslationKey, { en: string; zh: string }> = {
  pretargetingAnalysis: {
    en: "Pre-targeting Analysis",
    zh: "預先定位分析",
  },
  campaignAnalysis: {
    en: "Campaign Analysis",
    zh: "廣告活動分析",
  },
  customerAnalysis: {
    en: "Customer Analysis",
    zh: "客戶分析",
  },
  exploreAudiences: {
    en: "Explore potential audiences based on keywords",
    zh: "根據關鍵字探索潛在受眾",
  },
  coreKeywords: {
    en: "Core Keywords",
    zh: "核心關鍵字",
  },
  coreKeywordsDescription: {
    en: "Enter keywords to describe your product, service, brand or audience",
    zh: "輸入關鍵字來描述您的產品、服務、品牌或受眾",
  },
  excludeKeywords: {
    en: "Exclude Keywords",
    zh: "排除關鍵字",
  },
  excludeKeywordsDescription: {
    en: "Enter keywords to exclude from your search",
    zh: "輸入要從搜索中排除的關鍵字",
  },
  addKeywords: {
    en: "Add keywords (press space after each keyword)",
    zh: "添加關鍵字（每個關鍵字後按空格）",
  },
  addExclusions: {
    en: "Add exclusions (press space after each keyword)",
    zh: "添加排除項（每個關鍵字後按空格）",
  },
  explore: {
    en: "Explore",
    zh: "探索",
  },
  analyzing: {
    en: "Analyzing...",
    zh: "分析中...",
  },
  analysisResults: {
    en: "Analysis Results",
    zh: "分析結果",
  },
  saveAnalysis: {
    en: "Save Analysis",
    zh: "保存分析",
  },
  export: {
    en: "Export",
    zh: "導出",
  },
  audienceReach: {
    en: "Audience Reach",
    zh: "受眾覆蓋",
  },
  topicAnalysis: {
    en: "Topic Analysis",
    zh: "主題分析",
  },
  personaAnalysis: {
    en: "Persona Analysis",
    zh: "人物角色分析",
  },
  demographicAnalysis: {
    en: "Demographic Analysis",
    zh: "人口統計分析",
  },
  rankAndEstimatedReach: {
    en: "Rank and Estimated Reach",
    zh: "排名和預估覆蓋",
  },
  exploreRelevanceLevels: {
    en: "Explore different relevance levels for your audience",
    zh: "探索不同相關性級別的受眾",
  },
  topRelevance: {
    en: "Top Relevance",
    zh: "最高相關性",
  },
  highRelevance: {
    en: "High Relevance",
    zh: "高相關性",
  },
  broadRelevance: {
    en: "Broad Relevance",
    zh: "廣泛相關性",
  },
  highlyRelevant: {
    en: "Highly relevant audience",
    zh: "高度相關的受眾",
  },
  moderatelyRelevant: {
    en: "Moderately relevant audience",
    zh: "中度相關的受眾",
  },
  broaderLessRelevant: {
    en: "Broader but less relevant audience",
    zh: "更廣泛但相關性較低的受眾",
  },
  estimatedReach: {
    en: "Estimated Reach",
    zh: "預估覆蓋",
  },
  averageScore: {
    en: "Average Score",
    zh: "平均分數",
  },
  rank: {
    en: "Rank",
    zh: "排名",
  },
  popularTopics: {
    en: "Popular Topics",
    zh: "熱門主題",
  },
  topicDistribution: {
    en: "Distribution of topics among your target audience",
    zh: "目標受眾中的主題分佈",
  },
  users: {
    en: "users",
    zh: "用戶",
  },
  keywordsFor: {
    en: "Keywords for",
    zh: "關鍵字：",
  },
  useKeywords: {
    en: "Use these keywords for your next analysis",
    zh: "在下一次分析中使用這些關鍵字",
  },
  relatedArticles: {
    en: "Related Articles",
    zh: "相關文章",
  },
  popularContent: {
    en: "Popular content for this topic",
    zh: "此主題的熱門內容",
  },
  copyAllKeywords: {
    en: "Copy All Keywords",
    zh: "複製所有關鍵字",
  },
  copied: {
    en: "Copied!",
    zh: "已複製！",
  },
  genderDistribution: {
    en: "Gender Distribution",
    zh: "性別分佈",
  },
  genderBreakdown: {
    en: "Gender breakdown of your target audience",
    zh: "目標受眾的性別分佈",
  },
  ageDistribution: {
    en: "Age Distribution",
    zh: "年齡分佈",
  },
  ageBreakdown: {
    en: "Age breakdown of your target audience",
    zh: "目標受眾的年齡分佈",
  },
  mbtiDistribution: {
    en: "MBTI Distribution",
    zh: "MBTI 分佈",
  },
  mbtiPreferences: {
    en: "MBTI preferences of your target audience",
    zh: "目標受眾的 MBTI 偏好",
  },
  extroversionVsIntroversion: {
    en: "Extroversion vs Introversion",
    zh: "外向型 vs 內向型",
  },
  sensingVsIntuition: {
    en: "Sensing vs Intuition",
    zh: "感覺型 vs 直覺型",
  },
  thinkingVsFeeling: {
    en: "Thinking vs Feeling",
    zh: "思考型 vs 情感型",
  },
  judgingVsPerceiving: {
    en: "Judging vs Perceiving",
    zh: "判斷型 vs 感知型",
  },
  male: {
    en: "Male",
    zh: "男性",
  },
  female: {
    en: "Female",
    zh: "女性",
  },
  unknown: {
    en: "Unknown",
    zh: "未知",
  },
  campaignPerformance: {
    en: "Campaign Performance",
    zh: "廣告活動表現",
  },
  campaignMetrics: {
    en: "Overview of your campaign metrics",
    zh: "廣告活動指標概覽",
  },
  impressions: {
    en: "Impressions",
    zh: "曝光次數",
  },
  clicks: {
    en: "Clicks",
    zh: "點擊次數",
  },
  ctr: {
    en: "CTR",
    zh: "點擊率",
  },
  conversions: {
    en: "Conversions",
    zh: "轉換次數",
  },
  conversionRate: {
    en: "Conversion Rate",
    zh: "轉換率",
  },
  budgetUtilization: {
    en: "Budget Utilization",
    zh: "預算使用情況",
  },
  budgetSpent: {
    en: "How your budget is being spent",
    zh: "您的預算使用情況",
  },
  totalBudget: {
    en: "Total Budget",
    zh: "總預算",
  },
  spent: {
    en: "Spent",
    zh: "已花費",
  },
  remaining: {
    en: "Remaining",
    zh: "剩餘",
  },
  costPerClick: {
    en: "Cost per Click",
    zh: "每次點擊成本",
  },
  costPerConversion: {
    en: "Cost per Conversion",
    zh: "每次轉換成本",
  },
  campaignTimeline: {
    en: "Campaign Timeline",
    zh: "廣告活動時間軸",
  },
  performanceOverTime: {
    en: "Performance over time",
    zh: "隨時間的表現",
  },
  optimizeStrategy: {
    en: "Analyze campaign performance and optimize your marketing strategy",
    zh: "分析廣告活動表現並優化您的營銷策略",
  },
  customerSegments: {
    en: "Customer Segments",
    zh: "客戶細分",
  },
  customerBreakdown: {
    en: "Breakdown of your customer base",
    zh: "客戶群體細分",
  },
  newCustomers: {
    en: "New Customers",
    zh: "新客戶",
  },
  returningCustomers: {
    en: "Returning Customers",
    zh: "回頭客",
  },
  loyalCustomers: {
    en: "Loyal Customers",
    zh: "忠誠客戶",
  },
  customerLifetimeValue: {
    en: "Customer Lifetime Value",
    zh: "客戶終身價值",
  },
  averageValuePerSegment: {
    en: "Average value per customer segment",
    zh: "每個客戶細分的平均價值",
  },
  averageClv: {
    en: "Average CLV",
    zh: "平均客戶終身價值",
  },
  customerSatisfaction: {
    en: "Customer Satisfaction",
    zh: "客戶滿意度",
  },
  feedbackMetrics: {
    en: "Customer feedback metrics",
    zh: "客戶反饋指標",
  },
  npsScore: {
    en: "NPS Score",
    zh: "NPS 分數",
  },
  csat: {
    en: "CSAT",
    zh: "客戶滿意度評分",
  },
  retentionRate: {
    en: "Retention Rate",
    zh: "留存率",
  },
  churnRate: {
    en: "Churn Rate",
    zh: "流失率",
  },
  optimizeExperience: {
    en: "Analyze customer behavior and optimize your customer experience",
    zh: "分析客戶行為並優化您的客戶體驗",
  },
  analysisDashboard: {
    en: "Analysis Dashboard",
    zh: "分析儀表板",
  },
  analysis: {
    en: "Analysis",
    zh: "分析",
  },
  savedAnalyses: {
    en: "Saved Analyses",
    zh: "已保存的分析",
  },
  administration: {
    en: "Administration",
    zh: "管理",
  },
  brandManagement: {
    en: "Brand Management",
    zh: "品牌管理",
  },
  roleManagement: {
    en: "Role Management",
    zh: "角色管理",
  },
  accountManagement: {
    en: "Account Management",
    zh: "帳戶管理",
  },
  accountSettings: {
    en: "Account Settings",
    zh: "帳戶設置",
  },
  logout: {
    en: "Log out",
    zh: "登出",
  },
  analysisSaved: {
    en: "Analysis saved",
    zh: "分析已保存",
  },
  saveAnalysisDescription: {
    en: "Save this analysis for future reference. You can access it from the Saved Analyses page.",
    zh: "保存此分析以供將來參考。您可以從已保存的分析頁面訪問它。",
  },
  name: {
    en: "Name",
    zh: "名稱",
  },
  myAnalysis: {
    en: "My Analysis",
    zh: "我的分析",
  },
  keywords: {
    en: "Keywords",
    zh: "關鍵字",
  },
  core: {
    en: "Core",
    zh: "核心",
  },
  exclude: {
    en: "Exclude",
    zh: "排除",
  },
  cancel: {
    en: "Cancel",
    zh: "取消",
  },
  save: {
    en: "Save",
    zh: "保存",
  },
  saving: {
    en: "Saving...",
    zh: "保存中...",
  },
  exportingData: {
    en: "Exporting data",
    zh: "導出數據",
  },
  yourFileIsBeingPrepared: {
    en: "Your {format} file is being prepared",
    zh: "您的 {format} 文件正在準備中",
  },
  exportComplete: {
    en: "Export complete",
    zh: "導出完成",
  },
  yourFileIsReady: {
    en: "Your {format} file is ready",
    zh: "您的 {format} 文件已準備好",
  },
  exportData: {
    en: "Export Data",
    zh: "導出數據",
  },
  exportDescription: {
    en: "Export your analysis data in different formats",
    zh: "以不同格式導出您的分析數據",
  },
  pngImage: {
    en: "PNG Image",
    zh: "PNG 圖像",
  },
  exportAsScreenshots: {
    en: "Export as screenshots",
    zh: "導出為截圖",
  },
  csvData: {
    en: "CSV Data",
    zh: "CSV 數據",
  },
  exportRawData: {
    en: "Export raw data",
    zh: "導出原始數據",
  },
  login: {
    en: "Login",
    zh: "登錄",
  },
  loginDescription: {
    en: "Enter your credentials to access the dashboard",
    zh: "輸入您的憑據以訪問儀表板",
  },
  email: {
    en: "Email",
    zh: "電子郵件",
  },
  password: {
    en: "Password",
    zh: "密碼",
  },
  loggingIn: {
    en: "Logging in...",
    zh: "登錄中...",
  },
  analysisDeleted: {
    en: "Analysis deleted",
    zh: "分析已刪除",
  },
  analysisDeletedDescription: {
    en: "The analysis has been deleted successfully",
    zh: "分析已成功刪除",
  },
  created: {
    en: "Created",
    zh: "創建時間",
  },
  updated: {
    en: "Updated",
    zh: "更新時間",
  },
  createdBy: {
    en: "Created By",
    zh: "創建者",
  },
  openMenu: {
    en: "Open menu",
    zh: "打開菜單",
  },
  view: {
    en: "View",
    zh: "查看",
  },
  delete: {
    en: "Delete",
    zh: "刪除",
  },
  areYouSure: {
    en: "Are you sure?",
    zh: "您確定嗎？",
  },
  deleteConfirmation: {
    en: "This action cannot be undone. This will permanently delete this analysis.",
    zh: "此操作無法撤消。這將永久刪除此分析。",
  },
  viewAndManageAnalyses: {
    en: "View and manage your saved analyses",
    zh: "查看和管理您保存的分析",
  },
  searchAnalyses: {
    en: "Search analyses",
    zh: "搜尋分析",
  },
  newAnalysis: {
    en: "New Analysis",
    zh: "新增分析",
  },
  reach: {
    en: "Reach",
    zh: "觸及人數",
  },
  topPersonas: {
    en: "Top Personas",
    zh: "主要人物角色",
  },
  savedAnalysis: {
    en: "Saved Analysis",
    zh: "已保存的分析",
  },
  analysisDetails: {
    en: "Analysis Details",
    zh: "分析詳情",
  },
  savedTimestamp: {
    en: "Saved Timestamp",
    zh: "保存時間戳",
  },
  lastUpdated: {
    en: "Last Updated",
    zh: "上次更新",
  },
  analysisSettings: {
    en: "Analysis Settings",
    zh: "分析設定",
  },
  analysisType: {
    en: "Analysis Type",
    zh: "分析類型",
  },
  country: {
    en: "Country",
    zh: "國家",
  },
  targetUrl: {
    en: "Target URL",
    zh: "目標網址",
  },
  relevanceThreshold: {
    en: "Relevance Threshold",
    zh: "關聯性閾值",
  },
  updateAnalysis: {
    en: "Update Analysis",
    zh: "更新分析",
  },
  adjustSettings: {
    en: "Adjust Settings",
    zh: "調整設定",
  },
  analysisUpdated: {
    en: "Analysis Updated",
    zh: "分析已更新",
  },
  analysisUpdatedDescription: {
    en: "The analysis has been successfully updated with the latest data.",
    zh: "分析已成功使用最新數據更新。",
  },
  hasBeenSaved: {
    en: "has been saved to your list",
    zh: "已保存到您的列表",
  },
  systemSettings: {
    en: "System Settings",
    zh: "系統設置",
  },
}

export function useTranslation(key: TranslationKey, language: "EN" | "ZH"): string {
  return translations[key][language.toLowerCase() as "en" | "zh"]
}
