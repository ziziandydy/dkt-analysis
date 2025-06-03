"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRelevance } from "@/contexts/relevance-context"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"

// Mock data
const mockReachData = [
  {
    id: "top",
    labelKey: "topRelevance",
    rank: "1%",
    estimatedReach: "85,430",
    averageScore: "0.92",
    descriptionKey: "highlyRelevant",
  },
  {
    id: "medium", // ID remains the same for consistency
    labelKey: "highRelevance", // Changed from mediumRelevance to highRelevance
    rank: "5%",
    estimatedReach: "427,150",
    averageScore: "0.76",
    descriptionKey: "moderatelyRelevant",
  },
  {
    id: "broad",
    labelKey: "broadRelevance",
    rank: "10%",
    estimatedReach: "854,300",
    averageScore: "0.63",
    descriptionKey: "broaderLessRelevant",
  },
]

export function ReachAnalysis() {
  const { t } = useTranslation()
  const { selectedRelevance, setSelectedRelevance } = useRelevance()

  return (
    <Card className="mb-8 w-full">
      <CardHeader>
        <CardTitle>{t("rankAndEstimatedReach")}</CardTitle>
        <CardDescription>{t("exploreRelevanceLevels")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockReachData.map((reach) => (
              <div
                key={reach.id}
                className={cn(
                  "border rounded-lg p-4 transition-colors cursor-pointer w-full",
                  selectedRelevance === reach.id ? "border-primary bg-primary/5" : "hover:border-primary/50",
                )}
                onClick={() => setSelectedRelevance(reach.id as "top" | "medium" | "broad")}
              >
                <div className="font-medium mb-2">{t(reach.labelKey as any)}</div>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <div className="text-sm text-muted-foreground">{t("rank")}</div>
                    <div className="text-lg font-medium">{reach.rank}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{t("estimatedReach")}</div>
                    <div className="text-lg font-medium">{reach.estimatedReach}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{t("averageScore")}</div>
                    <div className="text-lg font-medium">{reach.averageScore}</div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-muted-foreground">{t(reach.descriptionKey as any)}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
