"use client"

import { useSettings } from "@/contexts/settings-context"
import { useTranslation as getTranslation, type TranslationKey } from "@/lib/translations"

export function useTranslation() {
  const { language } = useSettings()

  const t = (key: TranslationKey) => {
    return getTranslation(key, language)
  }

  return { t }
}
