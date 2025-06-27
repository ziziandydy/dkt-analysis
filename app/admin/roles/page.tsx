"use client"

import { RoleManagement } from "@/components/admin/role-management"
import { useTranslation } from "@/hooks/use-translation"

export default function RoleManagementPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b bg-background">
        <h1 className="text-2xl font-bold">{t("roleManagement")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("manageUserRolesAndPermissions")}</p>
      </div>

      <div className="flex-1 p-6">
        <RoleManagement />
      </div>
    </div>
  )
}
