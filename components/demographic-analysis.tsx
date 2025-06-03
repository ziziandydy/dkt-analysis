"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRelevance } from "@/contexts/relevance-context"
import { useTranslation } from "@/hooks/use-translation"

// Mock data for different relevance levels
const demographicData = {
  top: {
    gender: [
      { nameKey: "male", value: 62 },
      { nameKey: "female", value: 35 },
      { nameKey: "unknown", value: 3 },
    ],
    age: [
      { name: "18-24", value: 18 },
      { name: "25-34", value: 32 },
      { name: "35-44", value: 24 },
      { name: "45-54", value: 14 },
      { name: "55-64", value: 8 },
      { name: "65+", value: 2 },
      { nameKey: "unknown", value: 2 },
    ],
    mbti: {
      ei: [
        { name: "E (Extrovert)", value: 58 },
        { name: "I (Introvert)", value: 42 },
      ],
      sn: [
        { name: "S (Sensing)", value: 46 },
        { name: "N (Intuition)", value: 54 },
      ],
      tf: [
        { name: "T (Thinking)", value: 62 },
        { name: "F (Feeling)", value: 38 },
      ],
      jp: [
        { name: "J (Judging)", value: 51 },
        { name: "P (Perceiving)", value: 49 },
      ],
    },
  },
  medium: {
    gender: [
      { name: "Male", value: 55 },
      { name: "Female", value: 42 },
      { name: "Unknown", value: 3 },
    ],
    age: [
      { name: "18-24", value: 22 },
      { name: "25-34", value: 28 },
      { name: "35-44", value: 23 },
      { name: "45-54", value: 15 },
      { name: "55-64", value: 9 },
      { name: "65+", value: 2 },
      { name: "Unknown", value: 1 },
    ],
    mbti: {
      ei: [
        { name: "E (Extrovert)", value: 52 },
        { name: "I (Introvert)", value: 48 },
      ],
      sn: [
        { name: "S (Sensing)", value: 49 },
        { name: "N (Intuition)", value: 51 },
      ],
      tf: [
        { name: "T (Thinking)", value: 55 },
        { name: "F (Feeling)", value: 45 },
      ],
      jp: [
        { name: "J (Judging)", value: 48 },
        { name: "P (Perceiving)", value: 52 },
      ],
    },
  },
  broad: {
    gender: [
      { name: "Male", value: 51 },
      { name: "Female", value: 47 },
      { name: "Unknown", value: 2 },
    ],
    age: [
      { name: "18-24", value: 25 },
      { name: "25-34", value: 24 },
      { name: "35-44", value: 20 },
      { name: "45-54", value: 16 },
      { name: "55-64", value: 10 },
      { name: "65+", value: 4 },
      { name: "Unknown", value: 1 },
    ],
    mbti: {
      ei: [
        { name: "E (Extrovert)", value: 50 },
        { name: "I (Introvert)", value: 50 },
      ],
      sn: [
        { name: "S (Sensing)", value: 52 },
        { name: "N (Intuition)", value: 48 },
      ],
      tf: [
        { name: "T (Thinking)", value: 51 },
        { name: "F (Feeling)", value: 49 },
      ],
      jp: [
        { name: "J (Judging)", value: 50 },
        { name: "P (Perceiving)", value: 50 },
      ],
    },
  },
}

export function DemographicAnalysis() {
  const { selectedRelevance } = useRelevance()
  const { t } = useTranslation()
  const demographics = demographicData[selectedRelevance]

  const getBarColor = (index: number, isLast: boolean) => {
    if (isLast) return "bg-muted"
    return index % 2 === 0 ? "bg-primary" : "bg-primary/80"
  }

  const getName = (item: any) => {
    return item.nameKey ? t(item.nameKey as any) : item.name
  }

  return (
    <div className="space-y-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t("genderDistribution")}</CardTitle>
            <CardDescription>{t("genderBreakdown")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {demographics.gender.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{getName(item)}</span>
                    <span className="text-sm font-semibold bg-muted px-2 py-1 rounded-full">{item.value}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className={`rounded-full h-3 ${getBarColor(index, item.nameKey === "unknown")}`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t("ageDistribution")}</CardTitle>
            <CardDescription>{t("ageBreakdown")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {demographics.age.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{getName(item)}</span>
                    <span className="text-sm font-semibold bg-muted px-2 py-1 rounded-full">{item.value}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className={`rounded-full h-3 ${getBarColor(index, item.nameKey === "unknown")}`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t("mbtiDistribution")}</CardTitle>
          <CardDescription>{t("mbtiPreferences")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
            {Object.entries(demographics.mbti).map(([key, data]) => (
              <div key={key} className="space-y-4">
                <h3 className="font-medium text-center">
                  {key === "ei"
                    ? t("extroversionVsIntroversion")
                    : key === "sn"
                      ? t("sensingVsIntuition")
                      : key === "tf"
                        ? t("thinkingVsFeeling")
                        : t("judgingVsPerceiving")}
                </h3>
                <div className="space-y-4">
                  {data.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm font-semibold bg-muted px-2 py-1 rounded-full">{item.value}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div
                          className={`rounded-full h-3 ${index === 0 ? "bg-primary" : "bg-primary/80"}`}
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
