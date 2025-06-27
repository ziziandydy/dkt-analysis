"use client"

import { BrandManagement } from "@/components/admin/brand-management"
import { useTranslation } from "@/hooks/use-translation"

export default function BrandManagementPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b bg-background">
        <h1 className="text-2xl font-bold">{t("brandManagement")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("manageBrandsAndSettings")}</p>
      </div>

      <div className="flex-1 p-6">
        <BrandManagement />
      </div>
    </div>
  )
}
