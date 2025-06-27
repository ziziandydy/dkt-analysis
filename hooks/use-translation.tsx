"use client"

import { useSettings } from "@/contexts/settings-context"
import { getTranslation, type TranslationKey } from "@/lib/translations"

export function useTranslation() {
  const { language } = useSettings()

  const t = (key: TranslationKey) => {
    // 提供預設語言值，避免 SSR 錯誤
    const currentLanguage = language || "EN"
    return getTranslation(key, currentLanguage)
  }

  return { t }
}
