"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { BarChart4, LineChart, UserRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"

const analysisTypes = [
  {
    id: "pre-targeting",
    nameKey: "pretargetingAnalysis",
    icon: BarChart4,
    path: "/dashboard",
  },
  {
    id: "site",
    nameKey: "siteAnalysis",
    icon: UserRound,
    path: "/site-analysis",
  },
  {
    id: "campaign",
    nameKey: "campaignAnalysis",
    icon: LineChart,
    path: "/campaign-analysis",
  },
]

export function AnalysisTypeSwitcher() {
  const { t } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()

  const currentAnalysisType = React.useMemo(() => {
    if (pathname.includes("site-analysis")) return analysisTypes[1]
    if (pathname.includes("campaign-analysis")) return analysisTypes[2]
    return analysisTypes[0]
  }, [pathname])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 w-full md:w-auto justify-between">
          <div className="flex items-center gap-2">
            <currentAnalysisType.icon className="h-4 w-4" />
            <span className="truncate">{t(currentAnalysisType.nameKey as any)}</span>
          </div>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {analysisTypes.map((type) => (
          <DropdownMenuItem
            key={type.id}
            className={cn(
              "flex items-center gap-2 cursor-pointer",
              currentAnalysisType.id === type.id && "bg-primary/10 text-primary font-medium",
            )}
            onClick={() => router.push(type.path)}
          >
            <type.icon className="h-4 w-4" />
            <span>{t(type.nameKey as any)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
