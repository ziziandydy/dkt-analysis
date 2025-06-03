"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRelevance } from "@/contexts/relevance-context"
import { useTranslation } from "@/hooks/use-translation"

// Mock data for different relevance levels
const mockTopicsData = {
  top: [
    {
      id: "sports",
      name: "Sports",
      count: 86541,
      percentage: "67%",
      keywords: [
        "basketball",
        "NBA",
        "football",
        "league",
        "tournament",
        "championship",
        "team",
        "athlete",
        "fitness",
        "training",
      ],
      articles: [
        {
          title: "Top 10 Basketball Players of All Time",
          domain: "sports.example.com",
          url: "https://sports.example.com/top-10-basketball-players",
        },
        {
          title: "NFL Season Preview: What to Expect This Year",
          domain: "espn.example.com",
          url: "https://espn.example.com/nfl-preview",
        },
        {
          title: "How to Improve Your Basketball Skills",
          domain: "training.example.com",
          url: "https://training.example.com/basketball-skills",
        },
      ],
    },
    {
      id: "shopping",
      name: "Shopping",
      count: 27438,
      percentage: "18%",
      keywords: [
        "discount",
        "sale",
        "promotion",
        "shop",
        "online shopping",
        "retail",
        "fashion",
        "brand",
        "price",
        "deal",
      ],
      articles: [
        {
          title: "Best Online Shopping Deals This Weekend",
          domain: "shopping.example.com",
          url: "https://shopping.example.com/weekend-deals",
        },
        {
          title: "How to Find the Best Discounts Online",
          domain: "deals.example.com",
          url: "https://deals.example.com/find-discounts",
        },
        {
          title: "Top Fashion Trends This Season",
          domain: "fashion.example.com",
          url: "https://fashion.example.com/seasonal-trends",
        },
      ],
    },
    {
      id: "technology",
      name: "Technology",
      count: 15329,
      percentage: "15%",
      keywords: [
        "smartphone",
        "app",
        "software",
        "technology",
        "innovation",
        "gadget",
        "digital",
        "computer",
        "internet",
        "AI",
      ],
      articles: [
        {
          title: "Latest Smartphone Releases Review",
          domain: "tech.example.com",
          url: "https://tech.example.com/smartphone-reviews",
        },
        {
          title: "How AI is Changing the Future of Work",
          domain: "innovation.example.com",
          url: "https://innovation.example.com/ai-future",
        },
        {
          title: "Best Apps for Productivity in 2025",
          domain: "apps.example.com",
          url: "https://apps.example.com/productivity",
        },
      ],
    },
  ],
  medium: [
    {
      id: "entertainment",
      name: "Entertainment",
      count: 125000,
      percentage: "45%",
      keywords: [
        "movies",
        "TV shows",
        "streaming",
        "celebrities",
        "music",
        "concerts",
        "festivals",
        "awards",
        "performances",
        "theater",
      ],
      articles: [
        {
          title: "Top 10 Must-Watch Movies of 2025",
          domain: "movies.example.com",
          url: "https://movies.example.com/top-10-2025",
        },
        {
          title: "Upcoming Music Festivals You Can't Miss",
          domain: "music.example.com",
          url: "https://music.example.com/festivals-2025",
        },
        {
          title: "Streaming Wars: Which Platform Offers the Best Value?",
          domain: "streaming.example.com",
          url: "https://streaming.example.com/platform-comparison",
        },
      ],
    },
    {
      id: "travel",
      name: "Travel",
      count: 98000,
      percentage: "35%",
      keywords: [
        "vacation",
        "destination",
        "hotel",
        "flight",
        "tourism",
        "travel guide",
        "adventure",
        "sightseeing",
        "resort",
        "booking",
      ],
      articles: [
        {
          title: "Hidden Gems: Underrated Travel Destinations",
          domain: "travel.example.com",
          url: "https://travel.example.com/hidden-gems",
        },
        {
          title: "Budget Travel Tips for International Adventures",
          domain: "budget.example.com",
          url: "https://budget.example.com/travel-tips",
        },
        {
          title: "Luxury Resorts Worth the Splurge",
          domain: "luxury.example.com",
          url: "https://luxury.example.com/top-resorts",
        },
      ],
    },
    {
      id: "food",
      name: "Food & Dining",
      count: 56000,
      percentage: "20%",
      keywords: [
        "recipes",
        "cooking",
        "restaurants",
        "cuisine",
        "chef",
        "food review",
        "dining",
        "gourmet",
        "ingredients",
        "meal prep",
      ],
      articles: [
        {
          title: "Easy Weeknight Dinner Recipes",
          domain: "cooking.example.com",
          url: "https://cooking.example.com/weeknight-dinners",
        },
        {
          title: "Top-Rated Restaurants in Major Cities",
          domain: "dining.example.com",
          url: "https://dining.example.com/top-restaurants",
        },
        {
          title: "Food Trends to Watch in 2025",
          domain: "foodtrends.example.com",
          url: "https://foodtrends.example.com/2025-predictions",
        },
      ],
    },
  ],
  broad: [
    {
      id: "lifestyle",
      name: "Lifestyle",
      count: 250000,
      percentage: "40%",
      keywords: [
        "wellness",
        "self-care",
        "home decor",
        "fashion",
        "beauty",
        "relationships",
        "parenting",
        "hobbies",
        "personal development",
        "lifestyle trends",
      ],
      articles: [
        {
          title: "Self-Care Routines for Busy Professionals",
          domain: "wellness.example.com",
          url: "https://wellness.example.com/self-care-routines",
        },
        {
          title: "Home Decor Trends for Every Budget",
          domain: "decor.example.com",
          url: "https://decor.example.com/budget-trends",
        },
        {
          title: "Building Healthy Relationships: Expert Tips",
          domain: "relationships.example.com",
          url: "https://relationships.example.com/expert-tips",
        },
      ],
    },
    {
      id: "education",
      name: "Education",
      count: 180000,
      percentage: "30%",
      keywords: [
        "learning",
        "courses",
        "skills",
        "education",
        "training",
        "certification",
        "online learning",
        "career development",
        "knowledge",
        "academic",
      ],
      articles: [
        {
          title: "Top Online Courses to Boost Your Career",
          domain: "education.example.com",
          url: "https://education.example.com/career-courses",
        },
        {
          title: "How to Learn New Skills Effectively",
          domain: "learning.example.com",
          url: "https://learning.example.com/effective-methods",
        },
        {
          title: "The Future of Education: Trends and Predictions",
          domain: "future.example.com",
          url: "https://future.example.com/education-trends",
        },
      ],
    },
    {
      id: "health",
      name: "Health & Fitness",
      count: 150000,
      percentage: "25%",
      keywords: [
        "fitness",
        "health",
        "exercise",
        "nutrition",
        "diet",
        "wellness",
        "workout",
        "mental health",
        "medical",
        "healthcare",
      ],
      articles: [
        {
          title: "Effective Workout Routines for Busy Schedules",
          domain: "fitness.example.com",
          url: "https://fitness.example.com/busy-routines",
        },
        {
          title: "Nutrition Myths Debunked by Experts",
          domain: "nutrition.example.com",
          url: "https://nutrition.example.com/myths-debunked",
        },
        {
          title: "Mental Health Practices for Daily Wellness",
          domain: "mentalhealth.example.com",
          url: "https://mentalhealth.example.com/daily-practices",
        },
      ],
    },
  ],
}

export function TopicAnalysis() {
  const { toast } = useToast()
  const { t } = useTranslation()
  const { selectedRelevance } = useRelevance()
  const mockTopics = mockTopicsData[selectedRelevance]
  const [selectedTopic, setSelectedTopic] = useState(mockTopics[0])
  const [copyingKeywords, setCopyingKeywords] = useState(false)

  // Update selected topic when relevance changes
  useState(() => {
    setSelectedTopic(mockTopics[0])
  }, [selectedRelevance])

  const handleCopyAllKeywords = () => {
    const keywordsText = selectedTopic.keywords.join(", ")
    navigator.clipboard.writeText(keywordsText)
    setCopyingKeywords(true)

    toast({
      title: t("copied"),
      description: `${t("keywordsFor")} "${selectedTopic.name}" ${t("copied").toLowerCase()}`,
    })

    setTimeout(() => {
      setCopyingKeywords(false)
    }, 2000)
  }

  return (
    <div className="space-y-8 w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t("popularTopics")}</CardTitle>
          <CardDescription>{t("topicDistribution")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 w-full">
            {mockTopics.map((topic) => (
              <div
                key={topic.id}
                className={`group p-4 border rounded-lg transition-all cursor-pointer w-full ${
                  selectedTopic.id === topic.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedTopic(topic)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-base">{topic.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {topic.count.toLocaleString()} {t("users")}
                    </span>
                    <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {topic.percentage}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary rounded-full h-3 transition-all"
                    style={{ width: `${Number.parseFloat(topic.percentage)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>
                {t("keywordsFor")} {selectedTopic.name}
              </CardTitle>
              <CardDescription>{t("useKeywords")}</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-1.5" onClick={handleCopyAllKeywords}>
              {copyingKeywords ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  <span>{t("copied")}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>{t("copyAllKeywords")}</span>
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedTopic.keywords.map((keyword) => (
                <div key={keyword} className="bg-muted text-sm px-3 py-1.5 rounded-md">
                  {keyword}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t("relatedArticles")}</CardTitle>
            <CardDescription>{t("popularContent")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedTopic.articles.map((article, index) => (
                <div key={index} className="border-b pb-3 last:border-0">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline flex items-center gap-1"
                  >
                    {article.title}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <div className="text-sm text-muted-foreground mt-1">{article.domain}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
