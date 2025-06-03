import { CampaignAnalysis } from "@/components/campaign-analysis"
import { SettingsProvider } from "@/contexts/settings-context"

export default function CampaignAnalysisPage() {
  return (
    <SettingsProvider>
      <CampaignAnalysis />
    </SettingsProvider>
  )
}
