export type TranslationKey =
  | "pretargetingAnalysis"
  | "campaignAnalysis"
  | "siteAnalysis"
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
  // Site Analysis specific translations
  | "siteSettings"
  | "manageSiteInfo"
  | "siteName"
  | "domainUrl"
  | "trackingId"
  | "viewTrackingCode"
  | "trackingCode"
  | "addToHeadTag"
  | "copyCode"
  | "wordpressPlugin"
  | "active"
  | "inactive"
  | "verifyData"
  | "saveSettings"
  | "settingsSaved"
  | "siteSettingsUpdated"
  | "trackingCodeCopied"
  | "trackingCodeCopiedDesc"
  | "dataVerifying"
  | "dataVerifyingDesc"
  | "dataVerificationComplete"
  | "dataVerificationSuccess"
  | "overview"
  | "userInsights"
  | "behaviorAnalysis"
  | "marketingPersonas"
  | "totalUsers"
  | "newUsers"
  | "activeUsers"
  | "previousPeriod"
  | "trafficSources"
  | "mainTrafficChannels"
  | "directTraffic"
  | "searchEngine"
  | "socialMedia"
  | "emailMarketing"
  | "advertising"
  | "others"
  | "rfmSegmentation"
  | "rfmDescription"
  | "champions"
  | "loyalCustomers"
  | "potentialLoyalists"
  | "promising"
  | "needAttention"
  | "aboutToSleep"
  | "atRisk"
  | "cannotLoseThem"
  | "bestCustomers"
  | "loyalCustomersDesc"
  | "potentialLoyalCustomers"
  | "promisingCustomers"
  | "needAttentionDesc"
  | "aboutToSleepDesc"
  | "atRiskDesc"
  | "cannotLoseThemDesc"
  | "customerLifecycle"
  | "lifecycleDescription"
  | "awarenessStage"
  | "considerationStage"
  | "purchaseStage"
  | "retentionStage"
  | "loyaltyStage"
  | "percentage"
  | "userCount"
  | "interestedTopics"
  | "userInterestTopics"
  | "relatedKeywords"
  | "automotiveTech"
  | "carMaintenance"
  | "carBuyingGuide"
  | "characteristics"
  | "preferredChannels"
  | "techEnthusiast"
  | "pragmatist"
  | "familyOriented"
  | "techEnthusiastDesc"
  | "pragmatistDesc"
  | "familyOrientedDesc"
  | "age25to40"
  | "highIncome"
  | "earlyAdopter"
  | "valuesInnovation"
  | "age30to50"
  | "middleIncome"
  | "rationalConsumer"
  | "valuesQuality"
  | "age28to45"
  | "hasChildren"
  | "safetyFirst"
  | "needsSpace"
  | "socialMediaChannels"
  | "techWebsites"
  | "youtube"
  | "searchEngines"
  | "automotiveForums"
  | "wordOfMouth"
  | "familyWebsites"
  | "parentingCommunity"
  | "siteId"

export const translations: Record<TranslationKey, { en: string; zh: string }> = {
  pretargetingAnalysis: {
    en: "Pre-targeting Analysis",
    zh: "預先定位分析",
  },
  campaignAnalysis: {
    en: "Campaign Analysis",
    zh: "廣告活動分析",
  },
  siteAnalysis: {
    en: "Site Analysis",
    zh: "網站分析",
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
  // Site Analysis specific translations
  siteSettings: {
    en: "Site Settings",
    zh: "網站設定",
  },
  manageSiteInfo: {
    en: "Manage your site basic information and tracking settings",
    zh: "管理您的網站基本資訊和追蹤設定",
  },
  siteName: {
    en: "Site Name",
    zh: "網站名稱",
  },
  domainUrl: {
    en: "Domain URL",
    zh: "網域 URL",
  },
  trackingId: {
    en: "Tracking ID",
    zh: "追蹤 ID",
  },
  viewTrackingCode: {
    en: "View Tracking Code",
    zh: "查看追蹤代碼",
  },
  trackingCode: {
    en: "Tracking Code",
    zh: "追蹤代碼",
  },
  addToHeadTag: {
    en: "Add this code to your website's <head> tag",
    zh: "將此代碼添加到您網站的 <head> 標籤中",
  },
  copyCode: {
    en: "Copy Code",
    zh: "複製代碼",
  },
  wordpressPlugin: {
    en: "WordPress Plugin",
    zh: "WordPress 外掛",
  },
  active: {
    en: "Active",
    zh: "已啟用",
  },
  inactive: {
    en: "Inactive",
    zh: "未啟用",
  },
  verifyData: {
    en: "Verify Data",
    zh: "驗證數據",
  },
  saveSettings: {
    en: "Save Settings",
    zh: "儲存設定",
  },
  settingsSaved: {
    en: "Settings Saved",
    zh: "設定已儲存",
  },
  siteSettingsUpdated: {
    en: "Site settings have been successfully updated",
    zh: "網站設定已成功更新",
  },
  trackingCodeCopied: {
    en: "Tracking Code Copied",
    zh: "追蹤代碼已複製",
  },
  trackingCodeCopiedDesc: {
    en: "Tracking code has been copied to clipboard",
    zh: "追蹤代碼已複製到剪貼板",
  },
  dataVerifying: {
    en: "Data Verification",
    zh: "數據驗證中",
  },
  dataVerifyingDesc: {
    en: "Verifying website data...",
    zh: "正在驗證網站數據...",
  },
  dataVerificationComplete: {
    en: "Data Verification Complete",
    zh: "數據驗證完成",
  },
  dataVerificationSuccess: {
    en: "Website data verification successful",
    zh: "網站數據驗證成功",
  },
  overview: {
    en: "Overview",
    zh: "總覽",
  },
  userInsights: {
    en: "User Insights",
    zh: "用戶洞察",
  },
  behaviorAnalysis: {
    en: "Behavior Analysis",
    zh: "行為分析",
  },
  marketingPersonas: {
    en: "Marketing Personas",
    zh: "營銷人物角色",
  },
  totalUsers: {
    en: "Total Users",
    zh: "總用戶數",
  },
  newUsers: {
    en: "New Users",
    zh: "新用戶數",
  },
  activeUsers: {
    en: "Active Users",
    zh: "活躍用戶數",
  },
  previousPeriod: {
    en: "vs previous period",
    zh: "較前期",
  },
  trafficSources: {
    en: "Traffic Sources",
    zh: "流量來源分布",
  },
  mainTrafficChannels: {
    en: "Main traffic channels to your website",
    zh: "用戶訪問網站的主要來源渠道",
  },
  directTraffic: {
    en: "Direct Traffic",
    zh: "直接訪問",
  },
  searchEngine: {
    en: "Search Engine",
    zh: "搜尋引擎",
  },
  socialMedia: {
    en: "Social Media",
    zh: "社群媒體",
  },
  emailMarketing: {
    en: "Email Marketing",
    zh: "電子郵件",
  },
  advertising: {
    en: "Advertising",
    zh: "廣告",
  },
  others: {
    en: "Others",
    zh: "其他",
  },
  rfmSegmentation: {
    en: "RFM Customer Segmentation",
    zh: "RFM 客戶分群",
  },
  rfmDescription: {
    en: "Customer segmentation based on Recency, Frequency, and Monetary value",
    zh: "基於最近購買時間、頻率和金額的客戶分群",
  },
  champions: {
    en: "Champions",
    zh: "Champions",
  },
  loyalCustomers: {
    en: "Loyal Customers",
    zh: "Loyal Customers",
  },
  potentialLoyalists: {
    en: "Potential Loyalists",
    zh: "Potential Loyalists",
  },
  promising: {
    en: "Promising",
    zh: "Promising",
  },
  needAttention: {
    en: "Need Attention",
    zh: "Need Attention",
  },
  aboutToSleep: {
    en: "About to Sleep",
    zh: "About to Sleep",
  },
  atRisk: {
    en: "At Risk",
    zh: "At Risk",
  },
  cannotLoseThem: {
    en: "Cannot Lose Them",
    zh: "Cannot Lose Them",
  },
  bestCustomers: {
    en: "Best customers",
    zh: "最佳客戶",
  },
  loyalCustomersDesc: {
    en: "Loyal customers",
    zh: "忠誠客戶",
  },
  potentialLoyalCustomers: {
    en: "Potential loyal customers",
    zh: "潛在忠誠客戶",
  },
  newCustomers: {
    en: "New customers",
    zh: "新客戶",
  },
  promisingCustomers: {
    en: "Promising customers",
    zh: "有潛力客戶",
  },
  needAttentionDesc: {
    en: "Need attention",
    zh: "需要關注",
  },
  aboutToSleepDesc: {
    en: "About to sleep",
    zh: "即將流失",
  },
  atRiskDesc: {
    en: "At risk",
    zh: "流失風險",
  },
  cannotLoseThemDesc: {
    en: "Cannot lose them",
    zh: "不能失去",
  },
  customerLifecycle: {
    en: "Customer Lifecycle",
    zh: "客戶生命週期",
  },
  lifecycleDescription: {
    en: "Distribution of users across different purchase stages",
    zh: "用戶在不同購買階段的分布情況",
  },
  awarenessStage: {
    en: "Awareness Stage",
    zh: "認知階段",
  },
  considerationStage: {
    en: "Consideration Stage",
    zh: "考慮階段",
  },
  purchaseStage: {
    en: "Purchase Stage",
    zh: "購買階段",
  },
  retentionStage: {
    en: "Retention Stage",
    zh: "保留階段",
  },
  loyaltyStage: {
    en: "Loyalty Stage",
    zh: "忠誠階段",
  },
  percentage: {
    en: "Percentage",
    zh: "百分比",
  },
  userCount: {
    en: "User Count",
    zh: "用戶數",
  },
  interestedTopics: {
    en: "Interested Topics",
    zh: "用戶興趣主題",
  },
  userInterestTopics: {
    en: "Topics and keywords that users are most interested in",
    zh: "用戶最感興趣的內容主題和相關關鍵字",
  },
  relatedKeywords: {
    en: "Related Keywords",
    zh: "相關關鍵字",
  },
  automotiveTech: {
    en: "Automotive Technology",
    zh: "汽車科技",
  },
  carMaintenance: {
    en: "Car Maintenance",
    zh: "汽車保養",
  },
  carBuyingGuide: {
    en: "Car Buying Guide",
    zh: "購車指南",
  },
  characteristics: {
    en: "Characteristics",
    zh: "特徵",
  },
  preferredChannels: {
    en: "Preferred Channels",
    zh: "偏好渠道",
  },
  techEnthusiast: {
    en: "Tech Enthusiast",
    zh: "科技愛好者",
  },
  pragmatist: {
    en: "Pragmatist",
    zh: "實用主義者",
  },
  familyOriented: {
    en: "Family Oriented",
    zh: "家庭導向",
  },
  techEnthusiastDesc: {
    en: "Interested in latest automotive technology, focuses on electric vehicles and smart features",
    zh: "對最新汽車科技感興趣，關注電動車和智能功能",
  },
  pragmatistDesc: {
    en: "Values practicality and cost-effectiveness, cares about maintenance and repairs",
    zh: "注重汽車的實用性和性價比，關心保養和維修",
  },
  familyOrientedDesc: {
    en: "Family-focused needs, prioritizes safety and space",
    zh: "以家庭需求為主，關注安全性和空間",
  },
  age25to40: {
    en: "Age 25-40",
    zh: "年齡25-40歲",
  },
  highIncome: {
    en: "High Income",
    zh: "高收入",
  },
  earlyAdopter: {
    en: "Early Adopter",
    zh: "早期採用者",
  },
  valuesInnovation: {
    en: "Values Innovation",
    zh: "重視創新",
  },
  age30to50: {
    en: "Age 30-50",
    zh: "年齡30-50歲",
  },
  middleIncome: {
    en: "Middle Income",
    zh: "中等收入",
  },
  rationalConsumer: {
    en: "Rational Consumer",
    zh: "理性消費",
  },
  valuesQuality: {
    en: "Values Quality",
    zh: "重視品質",
  },
  age28to45: {
    en: "Age 28-45",
    zh: "年齡28-45歲",
  },
  hasChildren: {
    en: "Has Children",
    zh: "有子女",
  },
  safetyFirst: {
    en: "Safety First",
    zh: "安全第一",
  },
  needsSpace: {
    en: "Needs Space",
    zh: "空間需求大",
  },
  socialMediaChannels: {
    en: "Social Media",
    zh: "社群媒體",
  },
  techWebsites: {
    en: "Tech Websites",
    zh: "科技網站",
  },
  youtube: {
    en: "YouTube",
    zh: "YouTube",
  },
  searchEngines: {
    en: "Search Engines",
    zh: "搜尋引擎",
  },
  automotiveForums: {
    en: "Automotive Forums",
    zh: "汽車論壇",
  },
  wordOfMouth: {
    en: "Word of Mouth",
    zh: "口碑推薦",
  },
  familyWebsites: {
    en: "Family Websites",
    zh: "家庭網站",
  },
  parentingCommunity: {
    en: "Parenting Community",
    zh: "親子社群",
  },
  siteId: {
    en: "Site ID",
    zh: "Site ID",
  },
}

export function useTranslation(key: TranslationKey, language: "EN" | "ZH"): string {
  return translations[key][language.toLowerCase() as "en" | "zh"]
}
