"use client"

import { useState } from "react"
import { Edit, Check, X, Code, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SettingsSelectors } from "@/components/settings-selectors"
import { useTranslation } from "@/hooks/use-translation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#22B14C", "#6A21CB", "#E91E63", "#9C27B0"]

export function SiteAnalysis() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("customer-insights")

  const [selectedWebsite, setSelectedWebsite] = useState<any>(null)
  const [showWebsiteSettings, setShowWebsiteSettings] = useState(false)
  const [editedName, setEditedName] = useState("")
  const [editedUrl, setEditedUrl] = useState("")

  const [showTrackingManagement, setShowTrackingManagement] = useState(false)
  const [isEditingTrackingId, setIsEditingTrackingId] = useState(false)
  const [editedTrackingId, setEditedTrackingId] = useState("")
  const [currentTrackingId, setCurrentTrackingId] = useState("DKT-2024-TRK-001")

  const [showAddSite, setShowAddSite] = useState(false)
  const [newSiteName, setNewSiteName] = useState("")
  const [newSiteDomain, setNewSiteDomain] = useState("")
  const [newSiteTrackingId, setNewSiteTrackingId] = useState("")
  const [websites, setWebsites] = useState([
    {
      id: 1,
      name: "電商主站",
      url: "https://shop.example.com",
      description: "主要電商網站",
      status: "active",
      lastSync: "2024-01-15 14:30",
      visitors: "125,842",
      accountId: "SA-2024-001",
    },
    {
      id: 2,
      name: "品牌官網",
      url: "https://brand.example.com",
      description: "品牌形象網站",
      status: "active",
      lastSync: "2024-01-15 12:15",
      visitors: "45,231",
      accountId: "SA-2024-002",
    },
    {
      id: 3,
      name: "部落格",
      url: "https://blog.example.com",
      description: "內容行銷部落格",
      status: "inactive",
      lastSync: "2024-01-10 09:20",
      visitors: "18,567",
      accountId: "SA-2024-003",
    },
  ])

  const [selectedTopic, setSelectedTopic] = useState<any>(null)
  const [selectedPersona, setSelectedPersona] = useState<any>(null)

  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "listening" | "received" | "timeout">("idle")
  const [lastEvent, setLastEvent] = useState<any>(null)
  const [verificationTimer, setVerificationTimer] = useState<NodeJS.Timeout | null>(null)
  const [showWooCommerceManagement, setShowWooCommerceManagement] = useState(false)

  // Mock data with translations
  const genderData = [
    { name: t("male"), value: 40 },
    { name: t("female"), value: 30 },
    { name: t("other"), value: 30 },
  ]

  // Mock topics data
  const mockTopics = [
    {
      name: "科技與創新",
      count: 45230,
      percentage: "35.9",
      keywords: ["AI", "機器學習", "區塊鏈", "物聯網", "5G", "雲端運算", "大數據", "自動化", "智慧城市", "數位轉型"],
      articles: [
        { title: "2024年AI技術發展趨勢", source: "科技日報" },
        { title: "區塊鏈在金融業的應用", source: "財經週刊" },
        { title: "5G如何改變我們的生活", source: "通訊世界" },
      ],
    },
    {
      name: "健康與生活",
      count: 38750,
      percentage: "30.8",
      keywords: ["健康", "運動", "營養", "瑜伽", "冥想", "睡眠", "心理健康", "有機食品", "健身", "養生"],
      articles: [
        { title: "現代人的健康管理指南", source: "健康生活" },
        { title: "運動對心理健康的影響", source: "運動科學" },
        { title: "營養均衡的重要性", source: "營養師雜誌" },
      ],
    },
    {
      name: "旅遊與探索",
      count: 28940,
      percentage: "23.0",
      keywords: ["旅遊", "探險", "文化", "美食", "攝影", "背包客", "自由行", "度假", "景點", "住宿"],
      articles: [
        { title: "2024年最佳旅遊目的地", source: "旅遊雜誌" },
        { title: "背包客的省錢攻略", source: "自助旅行" },
        { title: "美食旅遊的新趨勢", source: "美食天下" },
      ],
    },
    {
      name: "教育與學習",
      count: 22180,
      percentage: "17.6",
      keywords: [
        "線上學習",
        "技能提升",
        "證照",
        "語言學習",
        "程式設計",
        "數據分析",
        "設計",
        "創業",
        "投資理財",
        "職涯發展",
      ],
      articles: [
        { title: "線上學習的有效方法", source: "教育科技" },
        { title: "程式設計入門指南", source: "程式設計師" },
        { title: "投資理財基礎知識", source: "理財週刊" },
      ],
    },
    {
      name: "時尚與美妝",
      count: 19650,
      percentage: "15.6",
      keywords: ["時尚", "美妝", "保養", "穿搭", "品牌", "潮流", "彩妝", "護膚", "香水", "配件"],
      articles: [
        { title: "2024年春夏時尚趨勢", source: "時尚雜誌" },
        { title: "護膚的正確步驟", source: "美容專家" },
        { title: "如何打造個人風格", source: "穿搭達人" },
      ],
    },
    {
      name: "娛樂與媒體",
      count: 16420,
      percentage: "13.0",
      keywords: ["電影", "音樂", "遊戲", "社群媒體", "網紅", "直播", "podcast", "動漫", "電視劇", "娛樂新聞"],
      articles: [
        { title: "2024年必看電影推薦", source: "電影評論" },
        { title: "Podcast的興起與影響", source: "媒體觀察" },
        { title: "社群媒體行銷策略", source: "數位行銷" },
      ],
    },
    {
      name: "環保與永續",
      count: 13280,
      percentage: "10.5",
      keywords: ["環保", "永續發展", "綠能", "回收", "減塑", "氣候變遷", "生態保護", "有機", "節能", "環境友善"],
      articles: [
        { title: "個人環保行動指南", source: "環保生活" },
        { title: "綠能科技的未來", source: "能源週刊" },
        { title: "減塑生活的實踐方法", source: "永續生活" },
      ],
    },
    {
      name: "家庭與親子",
      count: 11890,
      percentage: "9.4",
      keywords: [
        "育兒",
        "親子關係",
        "教養",
        "家庭活動",
        "兒童發展",
        "學前教育",
        "親子旅遊",
        "家庭理財",
        "居家生活",
        "親子共讀",
      ],
      articles: [
        { title: "現代育兒的挑戰與機會", source: "親子天下" },
        { title: "如何培養孩子的創造力", source: "教育專家" },
        { title: "親子共讀的重要性", source: "兒童發展" },
      ],
    },
  ]

  // Mock personas data
  const mockPersonas = [
    {
      name: "科技愛好者",
      size: 25430,
      percentage: "20.2",
      keywords: ["科技", "創新", "AI", "程式設計", "數據分析", "雲端", "區塊鏈", "物聯網", "自動化", "數位轉型"],
      articles: [
        { title: "最新AI技術突破", source: "科技新聞網" },
        { title: "程式設計師的職涯規劃", source: "開發者社群" },
        { title: "雲端服務比較分析", source: "IT專業雜誌" },
      ],
    },
    {
      name: "健康生活追求者",
      size: 22180,
      percentage: "17.6",
      keywords: ["健康", "運動", "營養", "瑜伽", "健身", "有機食品", "心理健康", "睡眠品質", "養生", "預防醫學"],
      articles: [
        { title: "運動與健康的科學關係", source: "健康醫學期刊" },
        { title: "營養師推薦的健康飲食", source: "營養健康網" },
        { title: "壓力管理與心理健康", source: "心理健康雜誌" },
      ],
    },
    {
      name: "時尚潮流達人",
      size: 19650,
      percentage: "15.6",
      keywords: ["時尚", "潮流", "穿搭", "美妝", "品牌", "設計", "配件", "護膚", "彩妝", "風格"],
      articles: [
        { title: "2024年春夏時尚趨勢", source: "時尚週刊" },
        { title: "個人風格養成指南", source: "穿搭部落格" },
        { title: "美妝產品評測與推薦", source: "美妝達人" },
      ],
    },
    {
      name: "旅遊探險家",
      size: 18920,
      percentage: "15.0",
      keywords: ["旅遊", "探險", "背包客", "文化體驗", "美食", "攝影", "自由行", "住宿", "交通", "景點"],
      articles: [
        { title: "亞洲最佳旅遊目的地", source: "旅遊指南" },
        { title: "背包客的省錢秘訣", source: "自助旅行網" },
        { title: "旅遊攝影技巧分享", source: "攝影愛好者" },
      ],
    },
    {
      name: "學習成長者",
      size: 16780,
      percentage: "13.3",
      keywords: [
        "學習",
        "技能提升",
        "線上課程",
        "證照",
        "語言",
        "職涯發展",
        "投資理財",
        "創業",
        "自我成長",
        "知識管理",
      ],
      articles: [
        { title: "有效學習方法大公開", source: "學習方法論" },
        { title: "職場技能提升指南", source: "職涯發展網" },
        { title: "投資理財入門教學", source: "理財教育平台" },
      ],
    },
    {
      name: "家庭生活者",
      size: 14560,
      percentage: "11.6",
      keywords: ["家庭", "育兒", "親子", "教養", "居家", "料理", "家庭理財", "親子活動", "兒童教育", "家庭旅遊"],
      articles: [
        { title: "現代父母的教養挑戰", source: "親子教育雜誌" },
        { title: "親子關係經營秘訣", source: "家庭生活網" },
        { title: "家庭理財規劃指南", source: "家庭理財顧問" },
      ],
    },
  ]

  const handleOpenSettings = () => {
    setEditedName(selectedWebsite.name)
    setEditedUrl(selectedWebsite.url)
    setShowWebsiteSettings(true)
  }

  const handleSaveSettings = () => {
    setSelectedWebsite({
      ...selectedWebsite,
      name: editedName,
      url: editedUrl,
    })
    setShowWebsiteSettings(false)
  }

  const handleCancelSettings = () => {
    setShowWebsiteSettings(false)
  }

  const handleEditTrackingId = () => {
    setEditedTrackingId(currentTrackingId)
    setIsEditingTrackingId(true)
  }

  const handleSaveTrackingId = () => {
    setCurrentTrackingId(editedTrackingId)
    setIsEditingTrackingId(false)
  }

  const handleCancelEditTrackingId = () => {
    setIsEditingTrackingId(false)
  }

  const handleAddSite = () => {
    if (!newSiteName.trim() || !newSiteDomain.trim()) {
      return
    }

    const newId = Math.max(...websites.map((w) => w.id)) + 1
    const newAccountId = `SA-2024-${String(newId).padStart(3, "0")}`

    // Ensure domain starts with https:// if not provided
    let formattedDomain = newSiteDomain.trim()
    if (!formattedDomain.startsWith("http://") && !formattedDomain.startsWith("https://")) {
      formattedDomain = `https://${formattedDomain}`
    }

    const newSite = {
      id: newId,
      name: newSiteName.trim(),
      url: formattedDomain,
      description: `${newSiteName.trim()} website`,
      status: "active",
      lastSync: new Date()
        .toLocaleString("sv-SE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace("T", " "),
      visitors: "0",
      accountId: newAccountId,
    }

    setWebsites([...websites, newSite])

    // Reset form
    setNewSiteName("")
    setNewSiteDomain("")
    setNewSiteTrackingId("")
    setShowAddSite(false)
  }

  const handleCancelAddSite = () => {
    setNewSiteName("")
    setNewSiteDomain("")
    setNewSiteTrackingId("")
    setShowAddSite(false)
  }

  const handleStartVerification = () => {
    setIsVerifying(true)
    setVerificationStatus("listening")
    setLastEvent(null)

    // Simulate receiving tracking events after a random delay
    const timer = setTimeout(
      () => {
        const mockEvents = [
          {
            type: "page_view",
            timestamp: new Date().toISOString(),
            details: { page: "/home", user_agent: "Mozilla/5.0..." },
          },
          {
            type: "button_click",
            timestamp: new Date().toISOString(),
            details: { button_id: "signup_button", button_text: "立即註冊" },
          },
          {
            type: "form_submit",
            timestamp: new Date().toISOString(),
            details: { form_id: "contact_form", form_name: "聯絡表單" },
          },
        ]

        const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)]
        setLastEvent(randomEvent)
        setVerificationStatus("received")
      },
      Math.random() * 5000 + 2000,
    ) // Random delay between 2-7 seconds

    setVerificationTimer(timer)

    // Set timeout after 15 seconds
    setTimeout(() => {
      if (verificationStatus === "listening") {
        setVerificationStatus("timeout")
      }
      setIsVerifying(false)
    }, 15000)
  }

  const handleStopVerification = () => {
    if (verificationTimer) {
      clearTimeout(verificationTimer)
      setVerificationTimer(null)
    }
    setIsVerifying(false)
    setVerificationStatus("idle")
    setLastEvent(null)
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="w-full">
            {selectedWebsite ? (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedWebsite(null)} className="p-0 h-auto">
                    {t("returnToWebsiteList")}
                  </Button>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h1 className="text-3xl font-bold">{selectedWebsite.name}</h1>
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                        {t("siteAccountId")}: {selectedWebsite.accountId}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{selectedWebsite.url}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setShowWebsiteSettings(true)}>
                    <Edit className="h-4 w-4 mr-1" /> {t("settings")}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{t("siteAnalysis")}</h1>
                    <p className="text-muted-foreground">{t("selectWebsiteToAnalyze")}</p>
                  </div>
                  <Button onClick={() => setShowAddSite(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    {t("addSite")}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        {selectedWebsite && (
          <div className="flex justify-between items-center">
            <SettingsSelectors />
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{selectedWebsite ? t("siteAnalysis") : t("websiteList")}</CardTitle>
          <CardDescription>
            {selectedWebsite ? "管理和分析您的客戶數據，實現個人化行銷" : t("selectWebsiteForAnalysis")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!selectedWebsite ? (
            <div className="space-y-4">
              {websites.map((website) => (
                <div
                  key={website.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedWebsite(website)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{website.name}</h3>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            website.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {website.status === "active" ? t("running") : t("inactive")}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{website.url}</p>
                      <p className="text-xs text-muted-foreground">{website.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{website.visitors}</p>
                      <p className="text-xs text-muted-foreground">{t("totalVisitors")}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("lastSync")}: {website.lastSync}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Simplified Hero Section */}
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">{selectedWebsite.name}</h1>
                    <p className="text-lg text-gray-600">{selectedWebsite.url}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">{t("siteAccountId")}:</span>
                      <span className="text-sm font-mono bg-white px-3 py-1 rounded border">
                        {selectedWebsite.accountId}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleOpenSettings}>
                    <Edit className="h-4 w-4 mr-1" /> {t("settings")}
                  </Button>
                </div>
              </div>

              {/* Customer Insights - Always Visible */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">{t("customerInsights")}</h2>
                    <p className="text-muted-foreground">{t("analyzeCustomerBehaviorAndDemographics")}</p>
                  </div>
                  <select className="px-3 py-2 border rounded-md bg-background">
                    <option>過去30天</option>
                    <option>過去90天</option>
                    <option>過去12個月</option>
                    <option>自訂時間範圍</option>
                  </select>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{t("totalCustomers")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">125,842</div>
                      <p className="text-xs text-muted-foreground">{t("comparedToPrevious")} +5.2%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{t("newCustomers")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">8,547</div>
                      <p className="text-xs text-muted-foreground">{t("comparedToPrevious")} +12.8%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{t("activeCustomers")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">42,651</div>
                      <p className="text-xs text-muted-foreground">{t("comparedToPrevious")} +3.5%</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Popular Topics Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t("popularTopics")}</h3>
                  {!selectedTopic ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mockTopics.map((topic, i) => (
                        <Card
                          key={i}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedTopic(topic)}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{topic.name}</CardTitle>
                            <CardDescription>
                              {topic.count.toLocaleString()} {t("relatedUsers")}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">{t("clickForDetails")}</span>
                              <div className="text-lg font-semibold text-primary">{topic.percentage}%</div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedTopic(null)}>
                          {t("returnToTopicList")}
                        </Button>
                        <h4 className="text-lg font-medium">{selectedTopic.name}</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-base">{t("popularKeywords")}</CardTitle>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                navigator.clipboard.writeText(selectedTopic.keywords.join(", "))
                              }}
                            >
                              {t("copyAllKeywords")}
                            </Button>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {selectedTopic.keywords.map((keyword, j) => (
                                <span key={j} className="bg-muted text-sm px-3 py-1.5 rounded-md">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">{t("popularArticles")}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {selectedTopic.articles.map((article, j) => (
                                <div key={j} className="border-b pb-2 last:border-0">
                                  <h5 className="font-medium text-sm">{article.title}</h5>
                                  <p className="text-xs text-muted-foreground">{article.source}</p>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>

                {/* Marketing Personas Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t("marketingPersonas")}</h3>
                  {!selectedPersona ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mockPersonas.map((persona, i) => (
                        <Card
                          key={i}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedPersona(persona)}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{persona.name}</CardTitle>
                            <CardDescription>
                              {persona.size.toLocaleString()} {t("people")}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">{t("clickForDetails")}</span>
                              <div className="text-lg font-semibold text-primary">{persona.percentage}%</div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedPersona(null)}>
                          {t("returnToPersonaList")}
                        </Button>
                        <h4 className="text-lg font-medium">{selectedPersona.name}</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-base">{t("keywords")}</CardTitle>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                navigator.clipboard.writeText(selectedPersona.keywords.join(", "))
                              }}
                            >
                              {t("copyAllKeywords")}
                            </Button>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {selectedPersona.keywords.map((keyword, j) => (
                                <span key={j} className="bg-muted text-sm px-3 py-1.5 rounded-md">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">{t("frequentlyViewedArticles")}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {selectedPersona.articles.map((article, j) => (
                                <div key={j} className="border-b pb-2 last:border-0">
                                  <h5 className="font-medium text-sm">{article.title}</h5>
                                  <p className="text-xs text-muted-foreground">{article.source}</p>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Site Dialog */}
      <Dialog open={showAddSite} onOpenChange={setShowAddSite}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("addNewSite")}</DialogTitle>
            <DialogDescription>{t("addSiteDescription")}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">{t("websiteName")}</Label>
              <Input
                id="siteName"
                value={newSiteName}
                onChange={(e) => setNewSiteName(e.target.value)}
                placeholder={t("siteNamePlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteDomain">{t("websiteDomain")}</Label>
              <Input
                id="siteDomain"
                value={newSiteDomain}
                onChange={(e) => setNewSiteDomain(e.target.value)}
                placeholder={t("domainPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteTrackingId">
                {t("trackingIdOptional")} <span className="text-muted-foreground">({t("optional")})</span>
              </Label>
              <Input
                id="siteTrackingId"
                value={newSiteTrackingId}
                onChange={(e) => setNewSiteTrackingId(e.target.value)}
                placeholder={t("trackingIdPlaceholder")}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleCancelAddSite}>
                {t("cancel")}
              </Button>
              <Button onClick={handleAddSite} disabled={!newSiteName.trim() || !newSiteDomain.trim()}>
                {t("addSite")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tracking Management Dialog */}
      <Dialog open={showTrackingManagement} onOpenChange={setShowTrackingManagement}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>{t("trackingCodeManagement")}</DialogTitle>
            <DialogDescription>{t("manageTrackingCode")}</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {/* Account and Tracking ID Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{t("accountIdLabel")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-mono">{selectedWebsite?.accountId}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-base">{t("trackingIdLabel")}</CardTitle>
                  {!isEditingTrackingId && (
                    <Button variant="outline" size="sm" onClick={handleEditTrackingId}>
                      <Edit className="h-4 w-4 mr-1" /> {t("edit")}
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {isEditingTrackingId ? (
                    <div className="space-y-2">
                      <Input
                        value={editedTrackingId}
                        onChange={(e) => setEditedTrackingId(e.target.value)}
                        className="font-mono"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSaveTrackingId}>
                          <Check className="h-4 w-4 mr-1" /> {t("save")}
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancelEditTrackingId}>
                          <X className="h-4 w-4 mr-1" /> {t("cancel")}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-lg font-mono">{currentTrackingId}</div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Basic Tracking Code */}
            <div>
              <h4 className="text-sm font-medium mb-2">{t("basicTrackingCode")}</h4>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                  {`<!-- DKT Analytics Tracking Code -->
<script>
(function(d,k,t){
  var s=d.createElement('script');
  s.async=true;
  s.src='https://cdn.dktanalytics.com/tracker.js?id=${currentTrackingId}';
  var f=d.getElementsByTagName('script')[0];
  f.parentNode.insertBefore(s,f);
})(document,window,'dkt');

window.dkt = window.dkt || function() {
  (window.dkt.q = window.dkt.q || []).push(arguments);
};
window.dkt('init', '${currentTrackingId}');
window.dkt('trackPageview');
</script>
<!-- End DKT Analytics Tracking Code -->`}
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    navigator.clipboard.writeText(`<!-- DKT Analytics Tracking Code -->
<script>
(function(d,k,t){
  var s=d.createElement('script');
  s.async=true;
  s.src='https://cdn.dktanalytics.com/tracker.js?id=${currentTrackingId}';
  var f=d.getElementsByTagName('script')[0];
  f.parentNode.insertBefore(s,f);
})(document,window,'dkt');

window.dkt = window.dkt || function() {
  (window.dkt.q = window.dkt.q || []).push(arguments);
};
window.dkt('init', '${currentTrackingId}');
window.dkt('trackPageview');
</script>
<!-- End DKT Analytics Tracking Code -->`)
                  }}
                >
                  {t("copy")}
                </Button>
              </div>
            </div>

            {/* Event Tracking Code */}
            <div>
              <h4 className="text-sm font-medium mb-2">{t("eventTrackingCode")}</h4>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                  {`// 追蹤按鈕點擊
window.dkt('trackEvent', 'button_click', {
button_id: 'signup_button',
button_text: '立即註冊'
});

// 追蹤表單提交
window.dkt('trackEvent', 'form_submit', {
form_id: 'contact_form',
form_name: '聯絡表單'
});

// 追蹤產品瀏覽
window.dkt('trackEvent', 'product_view', {
product_id: '12345',
product_name: '商品名稱',
price: 1000
});

// 追蹤購物車操作
window.dkt('trackEvent', 'add_to_cart', {
product_id: '12345',
product_name: '商品名稱',
price: 1000,
quantity: 1
});

// 追蹤購買完成
window.dkt('trackEvent', 'purchase', {
transaction_id: 'TXN123456',
value: 2500,
currency: 'TWD',
items: [
  {
    product_id: '12345',
    product_name: '商品A',
    price: 1000,
    quantity: 1
  },
  {
    product_id: '67890',
    product_name: '商品B',
    price: 1500,
    quantity: 1
  }
]
});

// 追蹤用戶註冊
window.dkt('trackEvent', 'user_signup', {
method: 'email',
user_id: 'user123'
});

// 追蹤頁面滾動
window.dkt('trackEvent', 'scroll', {
scroll_depth: 75,
page_url: window.location.href
});

// 追蹤檔案下載
window.dkt('trackEvent', 'file_download', {
file_name: 'product_catalog.pdf',
file_type: 'pdf',
file_size: '2.5MB'
});

// 追蹤影片播放
window.dkt('trackEvent', 'video_play', {
video_title: '產品介紹影片',
video_duration: 120,
video_position: 0
});

// 追蹤搜尋行為
window.dkt('trackEvent', 'search', {
search_term: '運動鞋',
search_results: 25
});`}
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    navigator.clipboard.writeText(`// 追蹤按鈕點擊
window.dkt('trackEvent', 'button_click', {
button_id: 'signup_button',
button_text: '立即註冊'
});

// 追蹤表單提交
window.dkt('trackEvent', 'form_submit', {
form_id: 'contact_form',
form_name: '聯絡表單'
});

// 追蹤產品瀏覽
window.dkt('trackEvent', 'product_view', {
product_id: '12345',
product_name: '商品名稱',
price: 1000
});

// 追蹤購物車操作
window.dkt('trackEvent', 'add_to_cart', {
product_id: '12345',
product_name: '商品名稱',
price: 1000,
quantity: 1
});

// 追蹤購買完成
window.dkt('trackEvent', 'purchase', {
transaction_id: 'TXN123456',
value: 2500,
currency: 'TWD',
items: [
  {
    product_id: '12345',
    product_name: '商品A',
    price: 1000,
    quantity: 1
  },
  {
    product_id: '67890',
    product_name: '商品B',
    price: 1500,
    quantity: 1
  }
]
});

// 追蹤用戶註冊
window.dkt('trackEvent', 'user_signup', {
method: 'email',
user_id: 'user123'
});

// 追蹤頁面滾動
window.dkt('trackEvent', 'scroll', {
scroll_depth: 75,
page_url: window.location.href
});

// 追蹤檔案下載
window.dkt('trackEvent', 'file_download', {
file_name: 'product_catalog.pdf',
file_type: 'pdf',
file_size: '2.5MB'
});

// 追蹤影片播放
window.dkt('trackEvent', 'video_play', {
video_title: '產品介紹影片',
video_duration: 120,
video_position: 0
});

// 追蹤搜尋行為
window.dkt('trackEvent', 'search', {
search_term: '運動鞋',
search_results: 25
});`)
                  }}
                >
                  {t("copy")}
                </Button>
              </div>
            </div>

            {/* Installation Instructions */}
            <div>
              <h4 className="text-sm font-medium mb-2">{t("installationInstructions")}</h4>
              <div className="bg-muted/30 p-4 rounded-md">
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>將基本追蹤碼複製並貼到您網站的 &lt;head&gt; 標籤中</li>
                  <li>確保追蹤碼在所有頁面都有載入</li>
                  <li>根據需要在適當的位置添加事件追蹤碼</li>
                  <li>測試追蹤碼是否正常運作</li>
                  <li>檢查數據是否正確收集到分析平台</li>
                </ol>
              </div>
            </div>

            {/* Common Event Types */}
            <div>
              <h4 className="text-sm font-medium mb-2">{t("commonEventTypes")}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-3 rounded-md">
                  <h5 className="font-medium text-sm mb-2">{t("ecommerceEvents")}</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• product_view - 產品瀏覽</li>
                    <li>• add_to_cart - 加入購物車</li>
                    <li>• purchase - 購買完成</li>
                    <li>• checkout_start - 開始結帳</li>
                  </ul>
                </div>
                <div className="bg-muted/30 p-3 rounded-md">
                  <h5 className="font-medium text-sm mb-2">{t("interactionEvents")}</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• button_click - 按鈕點擊</li>
                    <li>• form_submit - 表單提交</li>
                    <li>• scroll - 頁面滾動</li>
                    <li>• video_play - 影片播放</li>
                  </ul>
                </div>
                <div className="bg-muted/30 p-3 rounded-md">
                  <h5 className="font-medium text-sm mb-2">{t("userEvents")}</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• user_signup - 用戶註冊</li>
                    <li>• user_login - 用戶登入</li>
                    <li>• search - 搜尋行為</li>
                    <li>• share - 內容分享</li>
                  </ul>
                </div>
                <div className="bg-muted/30 p-3 rounded-md">
                  <h5 className="font-medium text-sm mb-2">{t("contentEvents")}</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• file_download - 檔案下載</li>
                    <li>• page_view - 頁面瀏覽</li>
                    <li>• content_view - 內容瀏覽</li>
                    <li>• newsletter_signup - 電子報訂閱</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tracking Status */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md bg-muted/30">
                <div>
                  <h5 className="font-medium">{t("trackingStatus")}</h5>
                  <p className="text-sm text-muted-foreground">{t("trackingCodeInstalledAndRunning")}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={isVerifying}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleStartVerification()
                      } else {
                        handleStopVerification()
                      }
                    }}
                  />
                  <span className="text-sm">{isVerifying ? t("listeningForEvents") : t("enabled")}</span>
                </div>
              </div>

              {/* Verification Status Display */}
              {verificationStatus !== "idle" && (
                <div className="p-3 rounded-md border-l-4 border-l-blue-500 bg-blue-50">
                  {verificationStatus === "listening" && (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                      <span className="text-sm font-medium text-blue-700">{t("listeningForEvents")}</span>
                    </div>
                  )}

                  {verificationStatus === "received" && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-green-700">{t("trackingDataReceived")}</span>
                      </div>
                      {lastEvent && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="font-medium">{t("eventType")}:</span> {lastEvent.type}
                            </div>
                            <div>
                              <span className="font-medium">{t("lastEventReceived")}:</span>{" "}
                              {new Date(lastEvent.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                          <div className="mt-1">
                            <span className="font-medium">{t("eventDetails")}:</span>{" "}
                            {JSON.stringify(lastEvent.details)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {verificationStatus === "timeout" && (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-yellow-500 rounded-full flex items-center justify-center">
                        <X className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-yellow-700">{t("noEventsDetected")}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* WooCommerce Management Dialog */}
      <Dialog open={showWooCommerceManagement} onOpenChange={setShowWooCommerceManagement}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>{t("wooCommercePluginManagement")}</DialogTitle>
            <DialogDescription>{t("manageWooCommerceIntegration")}</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {/* Plugin Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{t("pluginVersion")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-mono">v2.1.3</div>
                  <p className="text-xs text-muted-foreground mt-1">{t("latestVersion")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{t("installationStatus")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">{t("active")}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{t("pluginActiveAndRunning")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{t("lastSync")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg">2 {t("minutesAgo")}</div>
                  <p className="text-xs text-muted-foreground mt-1">{t("autoSyncEnabled")}</p>
                </CardContent>
              </Card>
            </div>

            {/* Installation Instructions */}
            <div>
              <h4 className="text-sm font-medium mb-2">{t("installationInstructions")}</h4>
              <div className="bg-muted/30 p-4 rounded-md">
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>{t("downloadPluginFromWordPress")}</li>
                  <li>{t("uploadAndActivatePlugin")}</li>
                  <li>{t("enterTrackingIdInSettings")}</li>
                  <li>{t("configureEventTracking")}</li>
                  <li>{t("testPluginFunctionality")}</li>
                </ol>
              </div>
            </div>

            {/* Plugin Configuration */}
            <div>
              <h4 className="text-sm font-medium mb-2">{t("pluginConfiguration")}</h4>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                  {`// WooCommerce DKT Analytics Plugin Settings
define('DKT_TRACKING_ID', '${currentTrackingId}');
define('DKT_AUTO_TRACK_PURCHASES', true);
define('DKT_AUTO_TRACK_ADD_TO_CART', true);
define('DKT_AUTO_TRACK_PRODUCT_VIEWS', true);
define('DKT_AUTO_TRACK_CHECKOUT_STEPS', true);

// Advanced Settings
define('DKT_TRACK_USER_ID', true);
define('DKT_TRACK_CUSTOMER_LTV', true);
define('DKT_ENHANCED_ECOMMERCE', true);`}
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    navigator.clipboard.writeText(`// WooCommerce DKT Analytics Plugin Settings
define('DKT_TRACKING_ID', '${currentTrackingId}');
define('DKT_AUTO_TRACK_PURCHASES', true);
define('DKT_AUTO_TRACK_ADD_TO_CART', true);
define('DKT_AUTO_TRACK_PRODUCT_VIEWS', true);
define('DKT_AUTO_TRACK_CHECKOUT_STEPS', true);

// Advanced Settings
define('DKT_TRACK_USER_ID', true);
define('DKT_TRACK_CUSTOMER_LTV', true);
define('DKT_ENHANCED_ECOMMERCE', true);`)
                  }}
                >
                  {t("copy")}
                </Button>
              </div>
            </div>

            {/* Tracked Events */}
            <div>
              <h4 className="text-sm font-medium mb-2">{t("automaticallyTrackedEvents")}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-3 rounded-md">
                  <h5 className="font-medium text-sm mb-2">{t("productEvents")}</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• product_view - {t("productPageViews")}</li>
                    <li>• add_to_cart - {t("addToCartActions")}</li>
                    <li>• remove_from_cart - {t("removeFromCartActions")}</li>
                    <li>• product_list_view - {t("categoryPageViews")}</li>
                  </ul>
                </div>
                <div className="bg-muted/30 p-3 rounded-md">
                  <h5 className="font-medium text-sm mb-2">{t("checkoutEvents")}</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• checkout_start - {t("checkoutInitiated")}</li>
                    <li>• checkout_progress - {t("checkoutSteps")}</li>
                    <li>• purchase - {t("orderCompleted")}</li>
                    <li>• refund - {t("orderRefunded")}</li>
                  </ul>
                </div>
                <div className="bg-muted/30 p-3 rounded-md">
                  <h5 className="font-medium text-sm mb-2">{t("userEvents")}</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• user_register - {t("customerRegistration")}</li>
                    <li>• user_login - {t("customerLogin")}</li>
                    <li>• wishlist_add - {t("addToWishlist")}</li>
                    <li>• review_submit - {t("productReviewSubmitted")}</li>
                  </ul>
                </div>
                <div className="bg-muted/30 p-3 rounded-md">
                  <h5 className="font-medium text-sm mb-2">{t("searchEvents")}</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• search - {t("productSearch")}</li>
                    <li>• search_results - {t("searchResultsViewed")}</li>
                    <li>• filter_apply - {t("productFiltersApplied")}</li>
                    <li>• sort_change - {t("productSortingChanged")}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Plugin Status */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md bg-green-50">
                <div>
                  <h5 className="font-medium text-green-800">{t("pluginStatus")}</h5>
                  <p className="text-sm text-green-600">{t("pluginActiveAndTracking")}</p>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-8 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-green-800">{t("active")}</span>
                </div>
              </div>

              {/* Recent Events */}
              <div className="p-4 border rounded-md bg-muted/30">
                <h5 className="font-medium mb-3">{t("recentEvents")}</h5>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>purchase - Order #12345</span>
                    <span className="text-muted-foreground">2 {t("minutesAgo")}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>add_to_cart - Product: 運動鞋</span>
                    <span className="text-muted-foreground">5 {t("minutesAgo")}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>product_view - Product: 背包</span>
                    <span className="text-muted-foreground">8 {t("minutesAgo")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Website Settings Dialog */}
      <Dialog open={showWebsiteSettings} onOpenChange={setShowWebsiteSettings}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>{t("websiteSettings")}</DialogTitle>
            <DialogDescription>{t("manageWebsiteConfiguration")}</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {/* Website Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">{t("websiteInformation")}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="websiteName">{t("websiteName")}</Label>
                  <Input id="websiteName" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">{t("websiteUrl")}</Label>
                  <Input id="websiteUrl" value={editedUrl} onChange={(e) => setEditedUrl(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Data Import Setup Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  {t("dataImportSetup")}
                </CardTitle>
                <CardDescription>{t("configureDataCollection")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Integration Status Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg bg-muted/30 border-muted">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium">{t("websiteTracking")}</span>
                      </div>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">{t("active")}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{t("collectingVisitorData")}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowTrackingManagement(true)}
                      className="mt-2"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      {t("manageCode")}
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg bg-muted/30 border-muted">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium">{t("wordpressIntegration")}</span>
                      </div>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">{t("active")}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{t("trackingEcommerceEvents")}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowWooCommerceManagement(true)}
                      className="mt-2"
                    >
                      <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {t("configure")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowWebsiteSettings(false)}>
              {t("cancel")}
            </Button>
            <Button
              onClick={() => {
                setSelectedWebsite({
                  ...selectedWebsite,
                  name: editedName,
                  url: editedUrl,
                })
                setShowWebsiteSettings(false)
              }}
            >
              {t("save")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
