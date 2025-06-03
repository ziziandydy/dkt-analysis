import { AccountManagement } from "@/components/admin/account-management"

export default function AccountManagementPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b bg-background">
        <h1 className="text-2xl font-bold">Account Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage user accounts and access</p>
      </div>

      <div className="flex-1 p-6">
        <AccountManagement />
      </div>
    </div>
  )
}
