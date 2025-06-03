import { BrandManagement } from "@/components/admin/brand-management"

export default function BrandManagementPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b bg-background">
        <h1 className="text-2xl font-bold">Brand Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage brands and their settings</p>
      </div>

      <div className="flex-1 p-6">
        <BrandManagement />
      </div>
    </div>
  )
}
