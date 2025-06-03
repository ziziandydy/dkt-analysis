import { AccountSettings } from "@/components/account-settings"

export default function AccountSettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b bg-background">
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your personal account settings</p>
      </div>

      <div className="flex-1 p-6">
        <AccountSettings />
      </div>
    </div>
  )
}
