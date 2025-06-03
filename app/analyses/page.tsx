"use client"

import { SavedAnalysesList } from "@/components/saved-analyses-list"
import { useTranslation } from "@/hooks/use-translation"

export default function AnalysesPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b bg-background">
        <h1 className="text-2xl font-bold">{t("savedAnalysis")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("viewAndManageAnalyses")}</p>
      </div>

      <div className="flex-1 p-6">
        <SavedAnalysesList />
      </div>
    </div>
  )
}
