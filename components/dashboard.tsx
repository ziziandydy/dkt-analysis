"use client"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { AnalysisTypeSwitcher } from "@/components/analysis-type-switcher"
import { SettingsSelectors } from "@/components/settings-selectors"
import { SettingsProvider } from "@/contexts/settings-context"
import { RelevanceProvider, useRelevance } from "@/contexts/relevance-context"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { TagInput } from "@/components/ui/tag-input"
import { ExportDialog } from "@/components/export-dialog"
import { SaveAnalysisDialog } from "@/components/save-analysis-dialog"
import { ReachAnalysis } from "@/components/reach-analysis"
import { TopicAnalysis } from "@/components/topic-analysis"
import { PersonaAnalysis } from "@/components/persona-analysis"
import { DemographicAnalysis } from "@/components/demographic-analysis"

interface Tag {
  id: string
  text: string
}

export function Dashboard() {
  const { t } = useTranslation()
  const [coreTags, setCoreTags] = useState<Tag[]>([])
  const [excludeTags, setExcludeTags] = useState<Tag[]>([])
  const [analyzing, setAnalyzing] = useState(false)
  const [resultsVisible, setResultsVisible] = useState(false)
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [exportDialogOpen, setExportDialogOpen] = useState(false)

  const handleExploreClick = () => {
    if (coreTags.length === 0) return

    setAnalyzing(true)
    // Simulate API call
    setTimeout(() => {
      setAnalyzing(false)
      setResultsVisible(true)
    }, 1500)
  }

  // For demo purposes, let's set some initial tags
  useState(() => {
    // Only set initial tags if there are none
    if (coreTags.length === 0) {
      setCoreTags([
        { id: "1", text: "basketball" },
        { id: "2", text: "NBA" },
        { id: "3", text: "sports" },
      ])
    }
  })

  // Create a separate component for the analysis results that uses useRelevance
  const AnalysisResults = () => {
    const { selectedRelevance } = useRelevance()

    return (
      <div className="space-y-6 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold">{t("analysisResults")}</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSaveDialogOpen(true)}>
              {t("saveAnalysis")}
            </Button>
            <Button variant="outline" onClick={() => setExportDialogOpen(true)}>
              {t("export")}
            </Button>
          </div>
        </div>

        <div className="space-y-8 md:space-y-10 w-full">
          <section>
            <h2 className="text-xl font-semibold mb-4">{t("audienceReach")}</h2>
            <ReachAnalysis />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">{t("topicAnalysis")}</h2>
            <TopicAnalysis />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">{t("personaAnalysis")}</h2>
            <PersonaAnalysis />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">{t("demographicAnalysis")}</h2>
            <DemographicAnalysis />
          </section>
        </div>

        <SaveAnalysisDialog
          open={saveDialogOpen}
          setOpen={setSaveDialogOpen}
          coreKeywords={coreTags.map((tag) => tag.text)}
          excludeKeywords={excludeTags.map((tag) => tag.text)}
          analysisData={
            resultsVisible
              ? {
                  // This would include all the analysis results data
                  relevance: selectedRelevance,
                  // Other analysis data would be here in a real implementation
                }
              : undefined
          }
        />
      </div>
    )
  }

  return (
    <SettingsProvider>
      <div className="flex flex-col h-full">
        <div className="p-6 border-b bg-background">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold">{t("pretargetingAnalysis")}</h1>
              <p className="text-sm text-muted-foreground mt-1">{t("exploreAudiences")}</p>
            </div>
            <AnalysisTypeSwitcher />
          </div>
          <div className="flex justify-between items-center">
            <SettingsSelectors />
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6 w-full max-w-full">
          <Card className="mb-8 w-full">
            <CardContent className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
              <div className="space-y-3">
                <div className="text-lg font-medium">{t("coreKeywords")}</div>
                <p className="text-sm text-muted-foreground">{t("coreKeywordsDescription")}</p>
                <TagInput tags={coreTags} setTags={setCoreTags} placeholder={t("addKeywords")} className="min-h-16" />
              </div>

              <div className="space-y-3">
                <div className="text-lg font-medium">{t("excludeKeywords")}</div>
                <p className="text-sm text-muted-foreground">{t("excludeKeywordsDescription")}</p>
                <TagInput
                  tags={excludeTags}
                  setTags={setExcludeTags}
                  placeholder={t("addExclusions")}
                  className="min-h-16"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleExploreClick}
                  disabled={analyzing || coreTags.length === 0}
                  size="lg"
                  className="px-8"
                >
                  {analyzing ? t("analyzing") : t("explore")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {resultsVisible && (
            <RelevanceProvider>
              <AnalysisResults />
            </RelevanceProvider>
          )}
        </div>

        <ExportDialog open={exportDialogOpen} setOpen={setExportDialogOpen} />
      </div>
    </SettingsProvider>
  )
}
