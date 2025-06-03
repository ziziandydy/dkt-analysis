import { RoleManagement } from "@/components/admin/role-management"

export default function RoleManagementPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b bg-background">
        <h1 className="text-2xl font-bold">Role Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage user roles and permissions</p>
      </div>

      <div className="flex-1 p-6">
        <RoleManagement />
      </div>
    </div>
  )
}
