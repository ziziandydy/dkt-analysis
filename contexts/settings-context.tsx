"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Country = "TW" | "ID"
export type Language = "EN" | "ZH"

interface SettingsContextType {
  country: Country
  setCountry: (country: Country) => void
  language: Language
  setLanguage: (language: Language) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState<Country>("TW")
  const [language, setLanguage] = useState<Language>("EN")

  return (
    <SettingsContext.Provider value={{ country, setCountry, language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
