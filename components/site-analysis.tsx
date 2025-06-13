"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Save, Edit, Check, X, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { SettingsSelectors } from "@/components/settings-selectors"
import { useTranslation } from "@/hooks/use-translation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#22B14C", "#6A21CB", "#E91E63", "#9C27B0"]

const data = [
  { name: "男性", value: 40 },
  { name: "女性", value: 30 },
  { name: "其他", value: 30 },
]

export function SiteAnalysis() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("data-import")

  const [selectedWebsite, setSelectedWebsite] = useState<any>(null)
  const [isEditingWebsite, setIsEditingWebsite] = useState(false)
  const [editedName, setEditedName] = useState("")
  const [editedUrl, setEditedUrl] = useState("")

  const [showTrackingCode, setShowTrackingCode] = useState(false)

  const [selectedTopic, setSelectedTopic] = useState<any>(null)
  const [selectedPersona, setSelectedPersona] = useState<any>(null)

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

  // Mock website data
  const websites = [
    {
      id: 1,
      name: "電商主站",
      url: "https://shop.example.com",
      description: "主要電商網站",
      status: "active",
      lastSync: "2024-01-15 14:30",
      visitors: "125,842",
    },
    {
      id: 2,
      name: "品牌官網",
      url: "https://brand.example.com",
      description: "品牌形象網站",
      status: "active",
      lastSync: "2024-01-15 12:15",
      visitors: "45,231",
    },
    {
      id: 3,
      name: "部落格",
      url: "https://blog.example.com",
      description: "內容行銷部落格",
      status: "inactive",
      lastSync: "2024-01-10 09:20",
      visitors: "18,567",
    },
  ]

  const handleEditWebsite = () => {
    setEditedName(selectedWebsite.name)
    setEditedUrl(selectedWebsite.url)
    setIsEditingWebsite(true)
  }

  const handleSaveWebsite = () => {
    setSelectedWebsite({
      ...selectedWebsite,
      name: editedName,
      url: editedUrl,
    })
    setIsEditingWebsite(false)
  }

  const handleCancelEdit = () => {
    setIsEditingWebsite(false)
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
                    ← 返回網站列表
                  </Button>
                </div>
                {isEditingWebsite ? (
                  <div className="space-y-2">
                    <Input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="text-2xl font-bold h-auto py-1"
                    />
                    <Input
                      value={editedUrl}
                      onChange={(e) => setEditedUrl(e.target.value)}
                      className="text-muted-foreground h-auto py-1"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSaveWebsite}>
                        <Check className="h-4 w-4 mr-1" /> 儲存
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-1" /> 取消
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-bold mb-1">{selectedWebsite.name}</h1>
                      <p className="text-muted-foreground">{selectedWebsite.url}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleEditWebsite}>
                      <Edit className="h-4 w-4 mr-1" /> 編輯
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-2">{t("customerAnalysis")}</h1>
                <p className="text-muted-foreground">選擇要分析的網站</p>
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
          <CardTitle>{selectedWebsite ? "Customer Analysis" : "網站列表"}</CardTitle>
          <CardDescription>
            {selectedWebsite ? "管理和分析您的客戶數據，實現個人化行銷" : "選擇要進行客戶分析的網站"}
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
                          {website.status === "active" ? "運行中" : "未啟用"}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{website.url}</p>
                      <p className="text-xs text-muted-foreground">{website.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{website.visitors}</p>
                      <p className="text-xs text-muted-foreground">總訪客數</p>
                      <p className="text-xs text-muted-foreground mt-1">最後同步: {website.lastSync}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Updated Tabs content with removed tabs
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="data-import">Data Import</TabsTrigger>
                <TabsTrigger value="customer-insights">Customer Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="data-import">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Data Import Settings</h3>
                    <Button variant="outline" size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      儲存設定
                    </Button>
                  </div>

                  <div className="grid gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">網站追蹤碼</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() => setShowTrackingCode(true)}
                          >
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <rect width="20" height="16" x="2" y="4" rx="2" />
                                  <path d="M22 7L13.03 12.27a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium">網站</p>
                                <p className="text-xs text-muted-foreground">收集網站訪客行為數據</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="h-4 w-8 rounded-full bg-primary mr-2"></div>
                              <span className="text-sm">已啟用</span>
                              <Code className="ml-2 h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="customer-insights">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">客戶洞察</h3>
                    <select className="px-3 py-1 border rounded-md">
                      <option>過去30天</option>
                      <option>過去90天</option>
                      <option>過去12個月</option>
                      <option>自訂時間範圍</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">總客戶數</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">125,842</div>
                        <p className="text-xs text-muted-foreground">較前期 +5.2%</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">新客戶數</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">8,547</div>
                        <p className="text-xs text-muted-foreground">較前期 +12.8%</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">活躍客戶數</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">42,651</div>
                        <p className="text-xs text-muted-foreground">較前期 +3.5%</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>客戶來源分布</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { source: "直接訪問", value: 35 },
                            { source: "搜尋引擎", value: 25 },
                            { source: "社群媒體", value: 20 },
                            { source: "電子郵件", value: 10 },
                            { source: "廣告", value: 8 },
                            { source: "其他", value: 2 },
                          ]}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="source" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" name="客戶數百分比" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>客戶生命週期階段</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { stage: "認知階段", value: 30 },
                            { stage: "考慮階段", value: 25 },
                            { stage: "購買階段", value: 20 },
                            { stage: "保留階段", value: 15 },
                            { stage: "忠誠階段", value: 10 },
                          ]}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="stage" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" name="客戶數百分比" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>客戶價值分析</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { segment: "高價值客戶", value: 15, ltv: 25000 },
                            { segment: "中高價值客戶", value: 25, ltv: 15000 },
                            { segment: "中價值客戶", value: 35, ltv: 8000 },
                            { segment: "低價值客戶", value: 25, ltv: 3000 },
                          ]}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="segment" />
                          <YAxis yAxisId="left" orientation="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Bar yAxisId="left" dataKey="value" name="客戶數百分比" fill="#8884d8" />
                          <Bar yAxisId="right" dataKey="ltv" name="平均終身價值" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Popular Topics Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">熱門主題</h3>
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
                              <CardDescription>{topic.count.toLocaleString()} 相關用戶</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">點擊查看詳情</span>
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
                            ← 返回主題列表
                          </Button>
                          <h4 className="text-lg font-medium">{selectedTopic.name}</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-base">熱門關鍵字</CardTitle>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  navigator.clipboard.writeText(selectedTopic.keywords.join(", "))
                                  // You could add a toast notification here
                                }}
                              >
                                複製所有關鍵字
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
                              <CardTitle className="text-base">熱門文章</CardTitle>
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
                    <h3 className="text-lg font-medium">市場人設</h3>
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
                              <CardDescription>{persona.size.toLocaleString()} 人</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">點擊查看詳情</span>
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
                            ← 返回人設列表
                          </Button>
                          <h4 className="text-lg font-medium">{selectedPersona.name}</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-base">關鍵字</CardTitle>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  navigator.clipboard.writeText(selectedPersona.keywords.join(", "))
                                  // You could add a toast notification here
                                }}
                              >
                                複製所有關鍵字
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
                              <CardTitle className="text-base">經常瀏覽的文章</CardTitle>
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

                  {/* Audience Demographics Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">訪客人種統計</h3>

                    {/* Age Distribution */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">年齡分佈</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { ageGroup: "18-24", value: 15 },
                              { ageGroup: "25-34", value: 25 },
                              { ageGroup: "35-44", value: 20 },
                              { ageGroup: "45-54", value: 15 },
                              { ageGroup: "55-64", value: 10 },
                              { ageGroup: "65+", value: 5 },
                            ]}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="ageGroup" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" name="訪客數百分比" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* Gender Distribution */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">性別分佈</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={data}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                            >
                              {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* MBTI Distribution */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">MBTI分佈</CardTitle>
                        <CardDescription>四個維度的人格偏好分析</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Extroversion vs Introversion */}
                          <div className="space-y-4">
                            <h4 className="font-medium text-center">外向型 vs 內向型</h4>
                            <ResponsiveContainer width="100%" height={200}>
                              <BarChart
                                data={[
                                  { type: "外向型 (E)", value: 58 },
                                  { type: "內向型 (I)", value: 42 },
                                ]}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="type" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>

                          {/* Sensing vs Intuition */}
                          <div className="space-y-4">
                            <h4 className="font-medium text-center">感覺型 vs 直覺型</h4>
                            <ResponsiveContainer width="100%" height={200}>
                              <BarChart
                                data={[
                                  { type: "感覺型 (S)", value: 46 },
                                  { type: "直覺型 (N)", value: 54 },
                                ]}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="type" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#00C49F" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>

                          {/* Thinking vs Feeling */}
                          <div className="space-y-4">
                            <h4 className="font-medium text-center">思考型 vs 情感型</h4>
                            <ResponsiveContainer width="100%" height={200}>
                              <BarChart
                                data={[
                                  { type: "思考型 (T)", value: 62 },
                                  { type: "情感型 (F)", value: 38 },
                                ]}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="type" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#FFBB28" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>

                          {/* Judging vs Perceiving */}
                          <div className="space-y-4">
                            <h4 className="font-medium text-center">判斷型 vs 感知型</h4>
                            <ResponsiveContainer width="100%" height={200}>
                              <BarChart
                                data={[
                                  { type: "判斷型 (J)", value: 51 },
                                  { type: "感知型 (P)", value: 49 },
                                ]}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="type" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#FF8042" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>

      {/* Tracking Code Dialog with Scroll */}
      <Dialog open={showTrackingCode} onOpenChange={setShowTrackingCode}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>網站追蹤碼</DialogTitle>
            <DialogDescription>將以下代碼添加到您的網站以啟用數據收集</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-2">基本追蹤碼</h4>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                  {`<!-- DKT Analytics Tracking Code -->
<script>
  (function(d,k,t){
    var s=d.createElement('script');
    s.async=true;
    s.src='https://cdn.dktanalytics.com/tracker.js?id=${selectedWebsite?.id || "YOUR_SITE_ID"}';
    var f=d.getElementsByTagName('script')[0];
    f.parentNode.insertBefore(s,f);
  })(document,window,'dkt');
  
  dkt('init', '${selectedWebsite?.id || "YOUR_SITE_ID"}');
  dkt('trackPageview');
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
    s.src='https://cdn.dktanalytics.com/tracker.js?id=${selectedWebsite?.id || "YOUR_SITE_ID"}';
    var f=d.getElementsByTagName('script')[0];
    f.parentNode.insertBefore(s,f);
  })(document,window,'dkt');
  
  dkt('init', '${selectedWebsite?.id || "YOUR_SITE_ID"}');
  dkt('trackPageview');
</script>
<!-- End DKT Analytics Tracking Code -->`)
                  }}
                >
                  複製
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">事件追蹤碼</h4>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                  {`// 追蹤按鈕點擊
dkt('trackEvent', 'button_click', {
  button_id: 'signup_button',
  button_text: '立即註冊'
});

// 追蹤表單提交
dkt('trackEvent', 'form_submit', {
  form_id: 'contact_form',
  form_name: '聯絡表單'
});

// 追蹤產品瀏覽
dkt('trackEvent', 'product_view', {
  product_id: '12345',
  product_name: '商品名稱',
  price: 1000
});

// 追蹤購物車操作
dkt('trackEvent', 'add_to_cart', {
  product_id: '12345',
  product_name: '商品名稱',
  price: 1000,
  quantity: 1
});

// 追蹤購買完成
dkt('trackEvent', 'purchase', {
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
dkt('trackEvent', 'user_signup', {
  method: 'email',
  user_id: 'user123'
});

// 追蹤頁面滾動
dkt('trackEvent', 'scroll', {
  scroll_depth: 75,
  page_url: window.location.href
});

// 追蹤檔案下載
dkt('trackEvent', 'file_download', {
  file_name: 'product_catalog.pdf',
  file_type: 'pdf',
  file_size: '2.5MB'
});

// 追蹤影片播放
dkt('trackEvent', 'video_play', {
  video_title: '產品介紹影片',
  video_duration: 120,
  video_position: 0
});

// 追蹤搜尋行為
dkt('trackEvent', 'search', {
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
dkt('trackEvent', 'button_click', {
  button_id: 'signup_button',
  button_text: '立即註冊'
});

// 追蹤表單提交
dkt('trackEvent', 'form_submit', {
  form_id: 'contact_form',
  form_name: '聯絡表單'
});

// 追蹤產品瀏覽
dkt('trackEvent', 'product_view', {
  product_id: '12345',
  product_name: '商品名稱',
  price: 1000
});

// 追蹤購物車操作
dkt('trackEvent', 'add_to_cart', {
  product_id: '12345',
  product_name: '商品名稱',
  price: 1000,
  quantity: 1
});

// 追蹤購買完成
dkt('trackEvent', 'purchase', {
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
dkt('trackEvent', 'user_signup', {
  method: 'email',
  user_id: 'user123'
});

// 追蹤頁面滾動
dkt('trackEvent', 'scroll', {
  scroll_depth: 75,
  page_url: window.location.href
});

// 追蹤檔案下載
dkt('trackEvent', 'file_download', {
  file_name: 'product_catalog.pdf',
  file_type: 'pdf',
  file_size: '2.5MB'
});

// 追蹤影片播放
dkt('trackEvent', 'video_play', {
  video_title: '產品介紹影片',
  video_duration: 120,
  video_position: 0
});

// 追蹤搜尋行為
dkt('trackEvent', 'search', {
  search_term: '運動鞋',
  search_results: 25
});`)
                  }}
                >
                  複製
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">安裝說明</h4>
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

            <div>
              <h4 className="text-sm font-medium mb-2">常見事件類型</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-3 rounded-md">
                  <h5 className="font-medium text-sm mb-2">電商事件</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• product_view - 產品瀏覽</li>
                    <li>• add_to_cart - 加入購物車</li>
                    <li>• purchase - 購買完成</li>
                    <li>• checkout_start - 開始結帳</li>
                  </ul>
                </div>
                <div className="bg-muted/30 p-3 rounded-md">
                  <h5 className="font-medium text-sm mb-2">互動事件</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• button_click - 按鈕點擊</li>
                    <li>• form_submit - 表單提交</li>
                    <li>• scroll - 頁面滾動</li>
                    <li>• video_play - 影片播放</li>
                  </ul>
                </div>
                <div className="bg-muted/30 p-3 rounded-md">
                  <h5 className="font-medium text-sm mb-2">用戶事件</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• user_signup - 用戶註冊</li>
                    <li>• user_login - 用戶登入</li>
                    <li>• search - 搜尋行為</li>
                    <li>• share - 內容分享</li>
                  </ul>
                </div>
                <div className="bg-muted/30 p-3 rounded-md">
                  <h5 className="font-medium text-sm mb-2">內容事件</h5>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• file_download - 檔案下載</li>
                    <li>• page_view - 頁面瀏覽</li>
                    <li>• content_view - 內容瀏覽</li>
                    <li>• newsletter_signup - 電子報訂閱</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-md bg-muted/30">
              <div>
                <h5 className="font-medium">追蹤狀態</h5>
                <p className="text-sm text-muted-foreground">網站追蹤碼已正確安裝並運行中</p>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-8 rounded-full bg-primary mr-2"></div>
                <span className="text-sm">已啟用</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
