"use client"
import { SiteAnalysis } from "@/components/site-analysis"
import { SettingsProvider } from "@/contexts/settings-context"
import { useEffect, useState } from "react"
import { SiteOnboarding } from "@/components/site-onboarding"

export default function SiteAnalysisPage() {
  const [hasSite, setHasSite] = useState<boolean | null>(null)

  useEffect(() => {
    // 假設 localStorage key: 'trackedSite'，未來可改 API
    setHasSite(!!localStorage.getItem('trackedSite'))
  }, [])

  if (hasSite === null) return null // loading

  return (
    <SettingsProvider>
      {hasSite ? <SiteAnalysis /> : <SiteOnboarding onComplete={() => setHasSite(true)} />}
    </SettingsProvider>
  )
}
