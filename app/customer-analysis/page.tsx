import { CustomerAnalysis } from "@/components/customer-analysis"
import { SettingsProvider } from "@/contexts/settings-context"

export default function CustomerAnalysisPage() {
  return (
    <SettingsProvider>
      <CustomerAnalysis />
    </SettingsProvider>
  )
}
