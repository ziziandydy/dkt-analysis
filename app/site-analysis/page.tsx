import { SiteAnalysis } from "@/components/site-analysis"
import { SettingsProvider } from "@/contexts/settings-context"

export default function SiteAnalysisPage() {
  return (
    <SettingsProvider>
      <SiteAnalysis />
    </SettingsProvider>
  )
}
