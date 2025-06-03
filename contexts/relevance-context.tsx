"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type RelevanceLevel = "top" | "medium" | "broad"

interface RelevanceContextType {
  selectedRelevance: RelevanceLevel
  setSelectedRelevance: (level: RelevanceLevel) => void
}

const RelevanceContext = createContext<RelevanceContextType | undefined>(undefined)

export function RelevanceProvider({
  children,
  initialRelevance = "top",
}: {
  children: ReactNode
  initialRelevance?: RelevanceLevel
}) {
  const [selectedRelevance, setSelectedRelevance] = useState<RelevanceLevel>(initialRelevance)

  return (
    <RelevanceContext.Provider value={{ selectedRelevance, setSelectedRelevance }}>
      {children}
    </RelevanceContext.Provider>
  )
}

export function useRelevance() {
  const context = useContext(RelevanceContext)
  if (context === undefined) {
    throw new Error("useRelevance must be used within a RelevanceProvider")
  }
  return context
}
