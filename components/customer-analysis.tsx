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
import { Save, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { SettingsSelectors } from "@/components/settings-selectors"
import { useTranslation } from "@/hooks/use-translation"

export function CustomerAnalysis() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("data-import")
  const [selectedIdKey, setSelectedIdKey] = useState("email")

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("customerAnalysis")}</h1>
            <p className="text-muted-foreground">{t("optimizeExperience")}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <SettingsSelectors />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Data Platform</CardTitle>
          <CardDescription>管理和分析您的客戶數據，實現個人化行銷</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="data-import">Data Import</TabsTrigger>
              <TabsTrigger value="id-mapping">ID Mapping</TabsTrigger>
              <TabsTrigger value="customer-insights">Customer Insights</TabsTrigger>
              <TabsTrigger value="personalization">Personalization</TabsTrigger>
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
                      <CardTitle className="text-base">網站與應用程式</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
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
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
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
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
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
                                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                                <path d="M12 18h.01" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">行動應用程式</p>
                              <p className="text-xs text-muted-foreground">收集應用程式使用數據</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-8 rounded-full bg-muted mr-2"></div>
                            <span className="text-sm">未啟用</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">社群媒體</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
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
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">Facebook</p>
                              <p className="text-xs text-muted-foreground">收集Facebook互動數據</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-8 rounded-full bg-primary mr-2"></div>
                            <span className="text-sm">已啟用</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500">
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
                                <rect width="20" height="20" x="2" y="2" rx="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="0.5" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">Instagram</p>
                              <p className="text-xs text-muted-foreground">收集Instagram互動數據</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-8 rounded-full bg-primary mr-2"></div>
                            <span className="text-sm">已啟用</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-black/20 flex items-center justify-center">
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
                                <path d="M15 11v4.5a2.5 2.5 0 0 1-5 0V11" />
                                <path d="M15 11V9a3 3 0 1 0-6 0v2" />
                                <path d="M9 12h6" />
                                <path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">TikTok</p>
                              <p className="text-xs text-muted-foreground">收集TikTok互動數據</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-8 rounded-full bg-muted mr-2"></div>
                            <span className="text-sm">未啟用</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">通訊平台</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
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
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">LINE</p>
                              <p className="text-xs text-muted-foreground">收集LINE互動數據</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-8 rounded-full bg-primary mr-2"></div>
                            <span className="text-sm">已啟用</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="id-mapping">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">ID Mapping 設定</h3>
                  <Button variant="outline" size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    儲存設定
                  </Button>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">主要識別鍵設定</CardTitle>
                    <CardDescription>選擇用於識別和連結客戶數據的主要識別鍵</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="email"
                          name="id-key"
                          className="h-4 w-4"
                          checked={selectedIdKey === "email"}
                          onChange={() => setSelectedIdKey("email")}
                        />
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="mobile"
                          name="id-key"
                          className="h-4 w-4"
                          checked={selectedIdKey === "mobile"}
                          onChange={() => setSelectedIdKey("mobile")}
                        />
                        <label htmlFor="mobile" className="text-sm font-medium">
                          手機號碼
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="user_id"
                          name="id-key"
                          className="h-4 w-4"
                          checked={selectedIdKey === "user_id"}
                          onChange={() => setSelectedIdKey("user_id")}
                        />
                        <label htmlFor="user_id" className="text-sm font-medium">
                          用戶ID
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="custom"
                          name="id-key"
                          className="h-4 w-4"
                          checked={selectedIdKey === "custom"}
                          onChange={() => setSelectedIdKey("custom")}
                        />
                        <label htmlFor="custom" className="text-sm font-medium">
                          自定義ID
                        </label>
                      </div>

                      <div className="pt-4">
                        <label htmlFor="custom-id-format" className="text-sm font-medium block mb-2">
                          自定義ID格式
                        </label>
                        <Input
                          id="custom-id-format"
                          placeholder="例如: CUS-{YYYYMMDD}-{SEQ}"
                          disabled={selectedIdKey !== "custom"}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">ID連結規則</CardTitle>
                    <CardDescription>設定如何連結不同來源的客戶識別碼</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">網站Cookie與Email連結</p>
                          <p className="text-xs text-muted-foreground">當用戶在網站登入或訂閱時連結Cookie與Email</p>
                        </div>
                        <div className="flex items-center">
                          <div className="h-4 w-8 rounded-full bg-primary mr-2"></div>
                          <span className="text-sm">已啟用</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">社群帳號與Email連結</p>
                          <p className="text-xs text-muted-foreground">連結用戶的社群帳號與Email</p>
                        </div>
                        <div className="flex items-center">
                          <div className="h-4 w-8 rounded-full bg-primary mr-2"></div>
                          <span className="text-sm">已啟用</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">裝置ID與用戶帳號連結</p>
                          <p className="text-xs text-muted-foreground">連結用戶的裝置ID與帳號</p>
                        </div>
                        <div className="flex items-center">
                          <div className="h-4 w-8 rounded-full bg-muted mr-2"></div>
                          <span className="text-sm">未啟用</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
              </div>
            </TabsContent>

            <TabsContent value="personalization">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">個人化行銷</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    建立新活動
                  </Button>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">活躍個人化活動</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium">購物車放棄提醒</h5>
                          <div className="bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded-full">
                            活躍中
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">當用戶放棄購物車時，自動發送提醒郵件</p>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>觸發次數: 1,245</span>
                          <span>轉換率: 23.5%</span>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium">生日特別優惠</h5>
                          <div className="bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded-full">
                            活躍中
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">在用戶生日當月發送特別優惠券</p>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>觸發次數: 856</span>
                          <span>轉換率: 31.2%</span>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium">產品推薦</h5>
                          <div className="bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded-full">
                            活躍中
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">根據用戶瀏覽和購買歷史推薦相關產品</p>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>觸發次數: 5,432</span>
                          <span>轉換率: 18.7%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>客戶細分</CardTitle>
                    <CardDescription>建立和管理客戶細分群組，用於個人化行銷</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <h5 className="font-medium">高價值客戶</h5>
                          <p className="text-xs text-muted-foreground">過去6個月消費金額超過NT$10,000的客戶</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">8,245</p>
                          <p className="text-xs text-muted-foreground">客戶數</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <h5 className="font-medium">流失風險客戶</h5>
                          <p className="text-xs text-muted-foreground">超過60天未互動的活躍客戶</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">3,127</p>
                          <p className="text-xs text-muted-foreground">客戶數</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <h5 className="font-medium">新客戶</h5>
                          <p className="text-xs text-muted-foreground">過去30天內首次購買的客戶</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">1,856</p>
                          <p className="text-xs text-muted-foreground">客戶數</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>個人化KPI監控</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: "1月", conversion: 15, engagement: 25, retention: 40 },
                          { month: "2月", conversion: 18, engagement: 28, retention: 42 },
                          { month: "3月", conversion: 20, engagement: 30, retention: 45 },
                          { month: "4月", conversion: 22, engagement: 32, retention: 48 },
                          { month: "5月", conversion: 25, engagement: 35, retention: 50 },
                          { month: "6月", conversion: 28, engagement: 38, retention: 52 },
                        ]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="conversion" name="轉換率" stroke="#8884d8" />
                        <Line type="monotone" dataKey="engagement" name="互動率" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="retention" name="留存率" stroke="#ffc658" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
