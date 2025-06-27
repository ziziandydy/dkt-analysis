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
import {
  Settings,
  Check,
  X,
  Copy,
  ExternalLink,
  Users,
  UserPlus,
  Activity,
  Globe,
  Code,
  WorkflowIcon as Wordpress,
  RefreshCw,
  Store,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SettingsSelectors } from "@/components/settings-selectors"
import { useTranslation } from "@/hooks/use-translation"
import { useToast } from "@/hooks/use-toast"

// Mock data with localized content
const getMockSiteData = (t: any) => ({
  siteName: "阿興買菜網",
  domain: "singmarket.com",
  siteAccountId: "YT-2024-001",
  trackingId: "GT-XXXXXXXX",
  wordpressPluginActive: true,
  dataVerified: true,
  insights: {
    totalUsers: 125842,
    newUsers: 8547,
    activeUsers: 42651,
    growth: {
      totalUsers: 5.2,
      newUsers: 12.8,
      activeUsers: 3.5,
    },
  },
  sourceDistribution: [
    { name: t("directTraffic"), value: 35, color: "#8884d8" },
    { name: t("searchEngine"), value: 25, color: "#82ca9d" },
    { name: t("socialMedia"), value: 20, color: "#ffc658" },
    { name: t("emailMarketing"), value: 10, color: "#ff7300" },
    { name: t("advertising"), value: 8, color: "#00ff88" },
    { name: t("others"), value: 2, color: "#ff0088" },
  ],
  rfmDistribution: [
    { segment: t("champions"), value: 15, description: t("bestCustomers") },
    { segment: t("loyalCustomers"), value: 20, description: t("loyalCustomersDesc") },
    { segment: t("potentialLoyalists"), value: 18, description: t("potentialLoyalCustomers") },
    { segment: t("newCustomers"), value: 12, description: t("newCustomers") },
    { segment: t("promising"), value: 10, description: t("promisingCustomers") },
    { segment: t("needAttention"), value: 8, description: t("needAttentionDesc") },
    { segment: t("aboutToSleep"), value: 7, description: t("aboutToSleepDesc") },
    { segment: t("atRisk"), value: 6, description: t("atRiskDesc") },
    { segment: t("cannotLoseThem"), value: 4, description: t("cannotLoseThemDesc") },
  ],
  lifeCycle: [
    { stage: t("awarenessStage"), value: 30, users: 37753 },
    { stage: t("considerationStage"), value: 25, users: 31461 },
    { stage: t("purchaseStage"), value: 20, users: 25168 },
    { stage: t("retentionStage"), value: 15, users: 18876 },
    { stage: t("loyaltyStage"), value: 10, users: 12584 },
  ],
  demographics: {
    gender: [
      { name: t("male"), value: 62 },
      { name: t("female"), value: 35 },
      { name: t("unknown"), value: 3 },
    ],
    age: [
      { name: "18-24", value: 18 },
      { name: "25-34", value: 32 },
      { name: "35-44", value: 24 },
      { name: "45-54", value: 14 },
      { name: "55-64", value: 8 },
      { name: "65+", value: 4 },
    ],
  },
  interestedTopics: [
    {
      topic: t("automotiveTech"),
      percentage: 45,
      keywords: ["電動車", "自動駕駛", "車聯網", "智能座艙", "充電技術"],
      articles: [
        { title: "2024年電動車技術趨勢", url: "https://example.com/ev-trends" },
        { title: "自動駕駛技術發展現況", url: "https://example.com/autonomous-driving" },
      ],
    },
    {
      topic: t("carMaintenance"),
      percentage: 30,
      keywords: ["定期保養", "輪胎更換", "機油", "煞車系統", "空調保養"],
      articles: [
        { title: "汽車保養完整指南", url: "https://example.com/car-maintenance" },
        { title: "如何延長汽車壽命", url: "https://example.com/car-longevity" },
      ],
    },
    {
      topic: t("carBuyingGuide"),
      percentage: 25,
      keywords: ["新車選購", "二手車", "車貸", "保險", "試駕"],
      articles: [
        { title: "首次購車完整攻略", url: "https://example.com/first-car-guide" },
        { title: "車貸利率比較分析", url: "https://example.com/car-loan-rates" },
      ],
    },
  ],
  marketingPersonas: [
    {
      name: t("techEnthusiast"),
      percentage: 35,
      description: t("techEnthusiastDesc"),
      characteristics: [t("age25to40"), t("highIncome"), t("earlyAdopter"), t("valuesInnovation")],
      preferredChannels: [t("socialMediaChannels"), t("techWebsites"), t("youtube")],
    },
    {
      name: t("pragmatist"),
      percentage: 40,
      description: t("pragmatistDesc"),
      characteristics: [t("age30to50"), t("middleIncome"), t("rationalConsumer"), t("valuesQuality")],
      preferredChannels: [t("searchEngines"), t("automotiveForums"), t("wordOfMouth")],
    },
    {
      name: t("familyOriented"),
      percentage: 25,
      description: t("familyOrientedDesc"),
      characteristics: [t("age28to45"), t("hasChildren"), t("safetyFirst"), t("needsSpace")],
      preferredChannels: [t("familyWebsites"), t("parentingCommunity"), t("emailMarketing")],
    },
  ],
  mbtiDistribution: [
    { name: 'INTJ', value: 12 },
    { name: 'INTP', value: 8 },
    { name: 'ENTJ', value: 10 },
    { name: 'ENTP', value: 7 },
    { name: 'INFJ', value: 6 },
    { name: 'INFP', value: 9 },
    { name: 'ENFJ', value: 5 },
    { name: 'ENFP', value: 8 },
    { name: 'ISTJ', value: 7 },
    { name: 'ISFJ', value: 6 },
    { name: 'ESTJ', value: 5 },
    { name: 'ESFJ', value: 4 },
    { name: 'ISTP', value: 4 },
    { name: 'ISFP', value: 3 },
    { name: 'ESTP', value: 3 },
    { name: 'ESFP', value: 3 },
  ],
  mbtiPreferences: [
    {
      group: 'Extroversion vs Introversion',
      left: { key: 'E', label: 'E (Extrovert)', value: 58 },
      right: { key: 'I', label: 'I (Introvert)', value: 42 },
    },
    {
      group: 'Sensing vs Intuition',
      left: { key: 'S', label: 'S (Sensing)', value: 46 },
      right: { key: 'N', label: 'N (Intuition)', value: 54 },
    },
    {
      group: 'Thinking vs Feeling',
      left: { key: 'T', label: 'T (Thinking)', value: 62 },
      right: { key: 'F', label: 'F (Feeling)', value: 38 },
    },
    {
      group: 'Judging vs Perceiving',
      left: { key: 'J', label: 'J (Judging)', value: 51 },
      right: { key: 'P', label: 'P (Perceiving)', value: 49 },
    },
  ],
})

export function SiteAnalysis() {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [trackingCodeOpen, setTrackingCodeOpen] = useState(false)
  const [siteSettings, setSiteSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      const s = localStorage.getItem('trackedSite')
      if (s) {
        const userSite = JSON.parse(s)
        return {
          siteName: userSite.name || '',
          domain: userSite.domain || '',
          trackingMethod: userSite.trackingMethod || '',
          trackingId: userSite.trackingId || '',
        }
      }
    }
    return {
      siteName: '',
      domain: '',
      trackingMethod: '',
      trackingId: '',
    }
  })
  const [activeTab, setActiveTab] = useState("overview")
  const [site, setSite] = useState(() => {
    if (typeof window !== 'undefined') {
      const s = localStorage.getItem('trackedSite')
      if (s) {
        const userSite = JSON.parse(s)
        // 合併 mock 結構，保留使用者輸入的 name/domain/method
        return { ...getMockSiteData(t), ...userSite }
      }
    }
    return null
  })

  // Get localized mock data
  const mockSiteData = getMockSiteData(t)

  const trackingCode = `<!-- DDKT Tracking Code -->
<script async src="https://www.ddkt-analytics.com/gtag/js?id=${mockSiteData.trackingId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${mockSiteData.trackingId}');
</script>`

  const handleSaveSettings = () => {
    // Mock save functionality
    // 同步 localStorage
    if (typeof window !== 'undefined') {
      const trackedSite = {
        name: siteSettings.siteName,
        domain: siteSettings.domain,
        trackingMethod: siteSettings.trackingMethod,
        trackingId: siteSettings.trackingId,
        verified: true,
      }
      localStorage.setItem('trackedSite', JSON.stringify(trackedSite))
    }
    toast({
      title: t("settingsSaved"),
      description: t("siteSettingsUpdated"),
    })
    setSettingsOpen(false)
  }

  const handleCopyTrackingCode = () => {
    navigator.clipboard.writeText(trackingCode)
    toast({
      title: t("trackingCodeCopied"),
      description: t("trackingCodeCopiedDesc"),
    })
  }

  const handleVerifyData = () => {
    toast({
      title: t("dataVerifying"),
      description: t("dataVerifyingDesc"),
    })
    // Mock verification
    setTimeout(() => {
      toast({
        title: t("dataVerificationComplete"),
        description: t("dataVerificationSuccess"),
      })
    }, 2000)
  }

  const handleDeleteSite = () => {
    localStorage.removeItem('trackedSite')
    window.location.reload() // 重新整理回到 onboarding
  }

  if (!site) return null

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("siteAnalysis")}</h1>
            <p className="text-muted-foreground">{t("optimizeExperience")}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <SettingsSelectors />
        </div>
      </div>

      {/* Site Info Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{site.name}</CardTitle>
              <CardDescription className="mt-2">
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    {site.domain}
                  </span>
                  <span>
                    {t("siteId")}: {site.siteAccountId}
                  </span>
                </div>
              </CardDescription>
            </div>
            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  {t("siteSettings")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{t("siteSettings")}</DialogTitle>
                  <DialogDescription>{t("manageSiteInfo")}</DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="siteName">{t("siteName")}</Label>
                      <Input
                        id="siteName"
                        value={siteSettings.siteName}
                        onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="domain">{t("domainUrl")}</Label>
                      <Input
                        id="domain"
                        value={siteSettings.domain}
                        onChange={(e) => setSiteSettings({ ...siteSettings, domain: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>{t("tracking_method")}</Label>
                      <div>
                        <Badge variant="secondary">
                          {siteSettings.trackingMethod === 'code' && t("trackingCode")}
                          {siteSettings.trackingMethod === 'wordpress' && 'WordPress'}
                          {siteSettings.trackingMethod === 'shopify' && 'Shopify'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Tracking Method Blocks */}
                  <div className="space-y-4">
                    {/* Tracking Code Block */}
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{t("trackingId")}</h4>
                        <p className="text-sm text-muted-foreground">{siteSettings.trackingId}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={siteSettings.trackingMethod === 'code' ? 'default' : 'secondary'}>
                            {siteSettings.trackingMethod === 'code' ? t('active') : t('inactive')}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Dialog open={trackingCodeOpen} onOpenChange={setTrackingCodeOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Code className="h-4 w-4 mr-2" />
                              {t("viewTrackingCode")}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>{t("trackingCode")}</DialogTitle>
                              <DialogDescription>{t("addToHeadTag")}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="bg-muted p-4 rounded-lg">
                                <pre className="text-sm overflow-x-auto">{trackingCode}</pre>
                              </div>
                              <Button onClick={handleCopyTrackingCode} className="w-full">
                                <Copy className="h-4 w-4 mr-2" />
                                {t("copyCode")}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm" onClick={handleVerifyData}>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          {t("verifyData")}
                        </Button>
                      </div>
                    </div>

                    {/* WordPress Plugin Block */}
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Wordpress className="h-8 w-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium">{t("wordpressPlugin")}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant={siteSettings.trackingMethod === 'wordpress' ? 'default' : 'secondary'}>
                              {siteSettings.trackingMethod === 'wordpress' ? t('active') : t('inactive')}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <a href="https://wordpress.org/plugins/klaviyo/" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleVerifyData}>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          {t("verifyData")}
                        </Button>
                      </div>
                    </div>

                    {/* Shopify App Block */}
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Store className="h-8 w-8 text-green-600" />
                        <div>
                          <h4 className="font-medium">Shopify App</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant={siteSettings.trackingMethod === 'shopify' ? 'default' : 'secondary'}>
                              {siteSettings.trackingMethod === 'shopify' ? t('active') : t('inactive')}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <a href="https://apps.shopify.com/klaviyo" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleVerifyData}>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          {t("verifyData")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSettingsOpen(false)}>
                    {t("cancel")}
                  </Button>
                  <Button onClick={handleSaveSettings}>{t("saveSettings")}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="denographic">Demographic</TabsTrigger>
          <TabsTrigger value="topic">Topic</TabsTrigger>
          <TabsTrigger value="persona">Persona</TabsTrigger>
          <TabsTrigger value="mbti">MBTI</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* User Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("totalUsers")}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{site.insights.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {t("previousPeriod")} +{site.insights.growth.totalUsers}%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("newUsers")}</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{site.insights.newUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {t("previousPeriod")} +{site.insights.growth.newUsers}%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("activeUsers")}</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{site.insights.activeUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {t("previousPeriod")} +{site.insights.growth.activeUsers}%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Source Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>{t("trafficSources")}</CardTitle>
              <CardDescription>{t("mainTrafficChannels")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={site.sourceDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name} ${value}%`}
                      >
                        {site.sourceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {site.sourceDistribution.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                        <span className="text-sm">{source.name}</span>
                      </div>
                      <span className="text-sm font-medium">{source.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer" className="space-y-6">
          {/* RFM Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>{t("rfmSegmentation")}</CardTitle>
              <CardDescription>{t("rfmDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {site.rfmDistribution.map((segment, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{segment.segment}</h4>
                      <Badge variant="secondary">{segment.value}%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{segment.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Life Cycle */}
          <Card>
            <CardHeader>
              <CardTitle>{t("customerLifecycle")}</CardTitle>
              <CardDescription>{t("lifecycleDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={site.lifeCycle}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "value" ? `${value}%` : value.toLocaleString(),
                      name === "value" ? t("percentage") : t("userCount"),
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="value" name={t("percentage")} fill="#8884d8" />
                  <Bar dataKey="users" name={t("userCount")} fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="denographic" className="space-y-6">
          {/* Demographic charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 年齡分布長條圖 */}
            <Card>
              <CardHeader>
                <CardTitle>{t("ageDistribution")}</CardTitle>
                <CardDescription>{t("ageBreakdown")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={site.demographics.age}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            {/* 性別分布圓餅圖 */}
            <Card>
              <CardHeader>
                <CardTitle>{t("genderDistribution")}</CardTitle>
                <CardDescription>{t("genderBreakdown")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={site.demographics.gender}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {site.demographics.gender.map((entry, index) => (
                        <Cell key={`cell-gender-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658"][index % 3]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="topic" className="space-y-6">
          {/* Interested Topics */}
          <Card>
            <CardHeader>
              <CardTitle>{t("interestedTopics")}</CardTitle>
              <CardDescription>{t("userInterestTopics")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {site.interestedTopics.map((topic, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-lg font-medium">{topic.topic}</h4>
                      <Badge>{topic.percentage}%</Badge>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">{t("relatedKeywords")}</h5>
                        <div className="flex flex-wrap gap-2">
                          {topic.keywords.map((keyword, kidx) => (
                            <Badge key={kidx} variant="secondary">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">{t("relatedArticles")}</h5>
                        <div className="space-y-2">
                          {topic.articles.map((article, aidx) => (
                            <a
                              key={aidx}
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                              {article.title}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="persona" className="space-y-6">
          {/* Marketing Personas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {site.marketingPersonas.map((persona, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{persona.name}</CardTitle>
                    <Badge variant="outline">{persona.percentage}%</Badge>
                  </div>
                  <CardDescription>{persona.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h5 className="font-medium mb-2">{t("characteristics")}</h5>
                    <div className="space-y-1">
                      {persona.characteristics.map((char, cidx) => (
                        <div key={cidx} className="text-sm text-muted-foreground">
                          • {char}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">{t("preferredChannels")}</h5>
                    <div className="flex flex-wrap gap-1">
                      {persona.preferredChannels.map((channel, chidx) => (
                        <Badge key={chidx} variant="secondary" className="text-xs">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mbti" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>MBTI Distribution</CardTitle>
              <CardDescription>MBTI preferences of your target audience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {site.mbtiPreferences.map((pair, idx) => (
                  <div key={pair.group} className="space-y-6">
                    <div className="text-center font-medium mb-2">{pair.group}</div>
                    <div className="flex items-center justify-between mb-1">
                      <span>{pair.left.label}</span>
                      <span className="bg-muted px-2 py-0.5 rounded text-xs font-semibold text-gray-700">{pair.left.value}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full mb-4">
                      <div className="h-3 bg-blue-500 rounded-full" style={{ width: `${pair.left.value}%` }}></div>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span>{pair.right.label}</span>
                      <span className="bg-muted px-2 py-0.5 rounded text-xs font-semibold text-gray-700">{pair.right.value}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full">
                      <div className="h-3 bg-blue-500 rounded-full" style={{ width: `${pair.right.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <button
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        onClick={handleDeleteSite}
      >
        刪除此網站並回到 Onboarding
      </button>
    </div>
  )
}
