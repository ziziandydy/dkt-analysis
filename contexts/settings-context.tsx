"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

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
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // 從 localStorage 讀取設定（如果有的話）
    const savedLanguage = localStorage.getItem("language") as Language
    const savedCountry = localStorage.getItem("country") as Country

    if (savedLanguage) setLanguage(savedLanguage)
    if (savedCountry) setCountry(savedCountry)
  }, [])

  // 在伺服器端渲染時提供預設值
  if (!isClient) {
    return (
      <SettingsContext.Provider value={{
        country: "TW",
        setCountry: () => { },
        language: "EN",
        setLanguage: () => { }
      }}>
        {children}
      </SettingsContext.Provider>
    )
  }

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
