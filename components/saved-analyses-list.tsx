"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, Eye, MoreHorizontal, Pencil, RefreshCw, Search, Trash } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/hooks/use-translation"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReachAnalysis } from "@/components/reach-analysis"
import { TopicAnalysis } from "@/components/topic-analysis"
import { PersonaAnalysis } from "@/components/persona-analysis"
import { DemographicAnalysis } from "@/components/demographic-analysis"
import { RelevanceProvider } from "@/contexts/relevance-context"

// Mock data with full analysis results
const savedAnalyses = [
  {
    id: "1",
    name: "Infiniti QX60",
    keywords: "汽車, Turbo, 駕馭, SUV, Infiniti",
    excludeKeywords: "遊戲, 小說, 漫畫",
    date: "2025-04-01",
    updatedDate: "2025-04-10",
    savedTimestamp: "2025-04-10 14:32:45",
    reach: 2450000,
    topPersonas: ["科技愛好者", "數位行銷人士"],
    createdBy: "Jerry",
    settings: {
      url: "https://www.infiniti.com/qx60",
      country: "TW",
      analysisType: "Pre-targeting Analysis",
      relevanceThreshold: 85,
    },
    // This would contain all the analysis results data
    analysisResults: {
      relevance: "top",
      // Other analysis data would be here in a real implementation
    },
  },
  {
    id: "2",
    name: "Summer Promotion",
    keywords: "夏季, 促銷, 旅遊, 度假, 海灘",
    excludeKeywords: "冬天, 滑雪",
    date: "2025-03-15",
    updatedDate: "2025-03-15",
    savedTimestamp: "2025-03-15 09:17:22",
    reach: 1850000,
    topPersonas: ["數位行銷人士", "商業決策者"],
    createdBy: "Jerry",
    settings: {
      url: "https://www.example.com/summer-promo",
      country: "TW",
      analysisType: "Pre-targeting Analysis",
      relevanceThreshold: 80,
    },
    analysisResults: {
      relevance: "medium",
      // Other analysis data would be here
    },
  },
  {
    id: "3",
    name: "Tech Products",
    keywords: "科技, 電子, 智慧型手機, 電腦, 平板",
    excludeKeywords: "手錶, 智慧型眼鏡",
    date: "2025-03-05",
    updatedDate: "2025-04-08",
    savedTimestamp: "2025-04-08 16:45:33",
    reach: 1650000,
    topPersonas: ["健康關注者", "生活品味追求者"],
    createdBy: "John",
    settings: {
      url: "https://www.techstore.com/products",
      country: "TW",
      analysisType: "Pre-targeting Analysis",
      relevanceThreshold: 90,
    },
    analysisResults: {
      relevance: "broad",
      // Other analysis data would be here
    },
  },
]

export function SavedAnalysesList() {
  const { toast } = useToast()
  const [analyses, setAnalyses] = useState(savedAnalyses)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAnalysis, setSelectedAnalysis] = useState<(typeof savedAnalyses)[0] | null>(null)
  const { t } = useTranslation()

  const handleDelete = () => {
    if (!deleteId) return

    setAnalyses(analyses.filter((analysis) => analysis.id !== deleteId))

    toast({
      title: t("analysisDeleted"),
      description: t("analysisDeletedDescription"),
    })

    setDeleteId(null)
  }

  const handleUpdate = () => {
    toast({
      title: t("analysisUpdated"),
      description: t("analysisUpdatedDescription"),
    })
  }

  const filteredAnalyses = analyses.filter(
    (analysis) =>
      analysis.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      analysis.keywords.toLowerCase().includes(searchQuery.toLowerCase()) ||
      analysis.createdBy.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (selectedAnalysis) {
    // Create a component that uses the RelevanceProvider
    const AnalysisDetail = () => {
      // Set the initial relevance based on the saved analysis
      const initialRelevance = selectedAnalysis.analysisResults?.relevance || "top"

      return (
        <RelevanceProvider initialRelevance={initialRelevance}>
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setSelectedAnalysis(null)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">{selectedAnalysis.name}</h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t("analysisDetails")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">{t("savedTimestamp")}</h3>
                    <p>{selectedAnalysis.savedTimestamp}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">{t("createdBy")}</h3>
                    <p>{selectedAnalysis.createdBy}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">{t("created")}</h3>
                    <p>{selectedAnalysis.date}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">{t("lastUpdated")}</h3>
                    <p>{selectedAnalysis.updatedDate}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-base font-medium mb-3">{t("analysisSettings")}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">{t("analysisType")}</h4>
                      <p>{selectedAnalysis.settings.analysisType}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">{t("country")}</h4>
                      <p>{selectedAnalysis.settings.country}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">{t("targetUrl")}</h4>
                      <p className="truncate">{selectedAnalysis.settings.url}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">{t("relevanceThreshold")}</h4>
                      <p>{selectedAnalysis.settings.relevanceThreshold}%</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-base font-medium mb-3">{t("keywords")}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">{t("coreKeywords")}</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedAnalysis.keywords.split(", ").map((keyword) => (
                          <Badge key={keyword} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">{t("excludeKeywords")}</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedAnalysis.excludeKeywords.split(", ").map((keyword) => (
                          <Badge key={keyword} variant="destructive" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => handleUpdate()}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {t("updateAnalysis")}
                </Button>
                <Button>
                  <Pencil className="mr-2 h-4 w-4" />
                  {t("adjustSettings")}
                </Button>
              </CardFooter>
            </Card>

            {/* Analysis Results Section - Read-only view of the full analysis */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{t("analysisResults")}</h2>

              <section>
                <h2 className="text-xl font-semibold mb-4">{t("audienceReach")}</h2>
                <ReachAnalysis />
              </section>

              <Tabs defaultValue="topic" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="topic">{t("topicAnalysis")}</TabsTrigger>
                  <TabsTrigger value="persona">{t("personaAnalysis")}</TabsTrigger>
                  <TabsTrigger value="demographic">{t("demographicAnalysis")}</TabsTrigger>
                </TabsList>

                <TabsContent value="topic">
                  <TopicAnalysis />
                </TabsContent>

                <TabsContent value="persona">
                  <PersonaAnalysis />
                </TabsContent>

                <TabsContent value="demographic">
                  <DemographicAnalysis />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </RelevanceProvider>
      )
    }

    return <AnalysisDetail />
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{t("savedAnalysis")}</h2>
          <div className="flex gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("searchAnalyses")}
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>{t("newAnalysis")}</Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("name")}</TableHead>
                  <TableHead>{t("coreKeywords")}</TableHead>
                  <TableHead>{t("excludeKeywords")}</TableHead>
                  <TableHead>{t("created")}</TableHead>
                  <TableHead>{t("updated")}</TableHead>
                  <TableHead>{t("reach")}</TableHead>
                  <TableHead>{t("topPersonas")}</TableHead>
                  <TableHead>{t("createdBy")}</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAnalyses.map((analysis) => (
                  <TableRow
                    key={analysis.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedAnalysis(analysis)}
                  >
                    <TableCell className="font-medium">{analysis.name}</TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate">{analysis.keywords}</div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate">{analysis.excludeKeywords}</div>
                    </TableCell>
                    <TableCell>{analysis.date}</TableCell>
                    <TableCell>{analysis.updatedDate}</TableCell>
                    <TableCell>{analysis.reach.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {analysis.topPersonas.map((persona) => (
                          <Badge key={persona} variant="outline" className="text-xs">
                            {persona}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{analysis.createdBy}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">{t("openMenu")}</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedAnalysis(analysis)}>
                            <Eye className="mr-2 h-4 w-4" />
                            {t("view")}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setDeleteId(analysis.id)}>
                            <Trash className="mr-2 h-4 w-4" />
                            {t("delete")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(isOpen) => !isOpen && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("areYouSure")}</AlertDialogTitle>
            <AlertDialogDescription>{t("deleteConfirmation")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>{t("delete")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
