"use client"

import { Globe } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSettings, type Country } from "@/contexts/settings-context"

export function SettingsSelectors() {
  const { country, setCountry } = useSettings()

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <Select value={country} onValueChange={(value) => setCountry(value as Country)}>
          <SelectTrigger className="h-8 w-[80px]">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TW">TW</SelectItem>
            <SelectItem value="ID">ID</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
