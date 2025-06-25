"use client"
import { useSettings } from "@/contexts/settings-context"

export function SettingsSelectors() {
  const { country, setCountry } = useSettings()

  return <div className="flex items-center gap-3"></div>
}
