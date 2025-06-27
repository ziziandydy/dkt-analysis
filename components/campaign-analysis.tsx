"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SettingsSelectors } from "@/components/settings-selectors"
import { useTranslation } from "@/hooks/use-translation"

export function CampaignAnalysis() {
  const { t } = useTranslation()
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState("last-30-days")

  const campaigns = [
    {
      id: "camp1",
      name: "2023 Q4 Brand Awareness",
      platform: "DKT",
      status: "Active",
      spend: 450000,
      impressions: 2500000,
      clicks: 75000,
    },
    {
      id: "camp2",
      name: "Summer Sale Promotion",
      platform: "ADGP",
      status: "Completed",
      spend: 320000,
      impressions: 1800000,
      clicks: 62000,
    },
    {
      id: "camp3",
      name: "New Product Launch",
      platform: "DKT",
      status: "Active",
      spend: 580000,
      impressions: 3200000,
      clicks: 96000,
    },
    {
      id: "camp4",
      name: "Holiday Special",
      platform: "ADGP",
      status: "Scheduled",
      spend: 400000,
      impressions: 0,
      clicks: 0,
    },
  ]

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("campaignAnalysis")}</h1>
            <p className="text-muted-foreground">{t("optimizeStrategy")}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <SettingsSelectors />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("campaignAnalysis")}</CardTitle>
          <CardDescription>{t("optimizeStrategy")}</CardDescription>
        </CardHeader>
        <CardContent>
          {!selectedCampaign ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{t("campaignPerformance")}</h3>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  {t("searchAnalyses")}
                </Button>
              </div>
              <div className="grid gap-4">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{campaign.name}</CardTitle>
                        <Badge
                          variant={
                            campaign.status === "Active"
                              ? "default"
                              : campaign.status === "Completed"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        {t("platform")}: {campaign.platform} • {t("budgetSpent")}: NT${campaign.spend.toLocaleString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">{t("impressions")}</p>
                          <p className="text-2xl font-bold">{campaign.impressions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{t("clicks")}</p>
                          <p className="text-2xl font-bold">{campaign.clicks.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end pt-0">
                      <Button variant="default" size="sm" onClick={() => setSelectedCampaign(campaign.id)}>
                        {t("view")}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{campaigns.find((c) => c.id === selectedCampaign)?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("platform")}: {campaigns.find((c) => c.id === selectedCampaign)?.platform}
                  </p>
                </div>
                <Button variant="outline" onClick={() => setSelectedCampaign(null)}>
                  {t("back")}
                </Button>
              </div>

              <div className="flex justify-between items-center">
                <h4 className="text-lg font-medium">{t("campaignMetrics")}</h4>
                <select
                  className="px-3 py-1 border rounded-md"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                >
                  <option value="last-7-days">{t("last7Days")}</option>
                  <option value="last-30-days">{t("last30Days")}</option>
                  <option value="last-90-days">{t("last90Days")}</option>
                  <option value="custom">{t("customRange")}</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{t("impressions")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2.5M</div>
                    <p className="text-xs text-muted-foreground">{t("previousPeriod")} +12.4%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{t("clicks")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">75K</div>
                    <p className="text-xs text-muted-foreground">{t("previousPeriod")} +8.7%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{t("ctr")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.0%</div>
                    <p className="text-xs text-muted-foreground">{t("previousPeriod")} -0.3%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{t("conversions")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1.2K</div>
                    <p className="text-xs text-muted-foreground">{t("previousPeriod")} +15.2%</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>效能趨勢</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { date: "2023-01-01", impressions: 1500000, clicks: 45000 },
                        { date: "2023-01-08", impressions: 1800000, clicks: 54000 },
                        { date: "2023-01-15", impressions: 2000000, clicks: 60000 },
                        { date: "2023-01-22", impressions: 2200000, clicks: 66000 },
                        { date: "2023-01-29", impressions: 2500000, clicks: 75000 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="impressions" stroke="#8884d8" name="曝光數" />
                      <Line yAxisId="right" type="monotone" dataKey="clicks" stroke="#82ca9d" name="點擊數" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>受眾輪廓分析</CardTitle>
                  <CardDescription>查看不同時期的受眾特徵變化</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { age: "18-24歲", current: 15, previous: 12 },
                        { age: "25-34歲", current: 42, previous: 38 },
                        { age: "35-44歲", current: 28, previous: 32 },
                        { age: "45-54歲", current: 12, previous: 15 },
                        { age: "55歲以上", current: 3, previous: 3 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="current" name="當前期間" fill="#8884d8" />
                      <Bar dataKey="previous" name="前一期間" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>優化建議</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2">提高轉換率</h5>
                      <p className="text-sm text-muted-foreground">
                        根據當前受眾行為分析，建議調整著陸頁設計，簡化轉換流程，預計可提升轉換率15-20%。
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2">優化受眾定位</h5>
                      <p className="text-sm text-muted-foreground">
                        目前廣告觸及的受眾中，25-34歲族群互動率最高，建議增加此族群的預算分配。
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium mb-2">創意優化</h5>
                      <p className="text-sm text-muted-foreground">
                        A/B測試結果顯示，強調產品功能的廣告創意比強調價格優惠的創意表現更佳，建議調整創意方向。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
