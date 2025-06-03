"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRelevance } from "@/contexts/relevance-context"
import { useTranslation } from "@/hooks/use-translation"

// Mock data for different relevance levels
const mockPersonasData = {
  top: [
    {
      id: "fitness",
      name: "Fitness Enthusiast",
      count: 4987,
      percentage: "45%",
      keywords: [
        "workout",
        "gym",
        "protein",
        "muscle",
        "nutrition",
        "fitness",
        "training",
        "health",
        "strength",
        "cardio",
      ],
      articles: [
        {
          title: "Best Home Workouts for Beginners",
          domain: "fitness.example.com",
          url: "https://fitness.example.com/home-workouts",
        },
        {
          title: "Nutrition Guide for Muscle Building",
          domain: "health.example.com",
          url: "https://health.example.com/muscle-nutrition",
        },
        {
          title: "How to Stay Motivated with Your Fitness Journey",
          domain: "motivation.example.com",
          url: "https://motivation.example.com/fitness-journey",
        },
      ],
    },
    {
      id: "traveler",
      name: "Backpacker",
      count: 3495,
      percentage: "32%",
      keywords: [
        "travel",
        "backpack",
        "adventure",
        "hostel",
        "budget",
        "destination",
        "hiking",
        "explore",
        "passport",
        "trip",
      ],
      articles: [
        {
          title: "Top Budget-Friendly Destinations in Asia",
          domain: "travel.example.com",
          url: "https://travel.example.com/budget-asia",
        },
        {
          title: "Essential Packing Guide for Backpackers",
          domain: "backpacking.example.com",
          url: "https://backpacking.example.com/packing-guide",
        },
        {
          title: "How to Find the Best Hostels Around",
          domain: "hostel.example.com",
          url: "https://hostel.example.com/find-best-hostels",
        },
      ],
    },
    {
      id: "foodie",
      name: "Food Enthusiast",
      count: 2548,
      percentage: "23%",
      keywords: [
        "cooking",
        "recipe",
        "restaurant",
        "cuisine",
        "ingredient",
        "food",
        "chef",
        "kitchen",
        "meal",
        "taste",
      ],
      articles: [
        {
          title: "The Best Street Food Around the World",
          domain: "food.example.com",
          url: "https://food.example.com/street-food-guide",
        },
        {
          title: "Easy Gourmet Recipes to Try at Home",
          domain: "cooking.example.com",
          url: "https://cooking.example.com/easy-gourmet",
        },
        {
          title: "How to Pair Wine with Different Cuisines",
          domain: "wine.example.com",
          url: "https://wine.example.com/food-pairing",
        },
      ],
    },
  ],
  medium: [
    {
      id: "professional",
      name: "Business Professional",
      count: 8750,
      percentage: "40%",
      keywords: [
        "business",
        "career",
        "professional",
        "corporate",
        "management",
        "leadership",
        "networking",
        "strategy",
        "productivity",
        "success",
      ],
      articles: [
        {
          title: "Leadership Strategies for the Modern Workplace",
          domain: "business.example.com",
          url: "https://business.example.com/leadership-strategies",
        },
        {
          title: "Networking Tips for Career Advancement",
          domain: "career.example.com",
          url: "https://career.example.com/networking-tips",
        },
        {
          title: "Productivity Hacks for Busy Professionals",
          domain: "productivity.example.com",
          url: "https://productivity.example.com/business-hacks",
        },
      ],
    },
    {
      id: "parent",
      name: "Parent",
      count: 6500,
      percentage: "30%",
      keywords: [
        "parenting",
        "children",
        "family",
        "education",
        "kids",
        "childcare",
        "activities",
        "development",
        "school",
        "toys",
      ],
      articles: [
        {
          title: "Educational Activities for Children of All Ages",
          domain: "parenting.example.com",
          url: "https://parenting.example.com/educational-activities",
        },
        {
          title: "Balancing Work and Family Life",
          domain: "family.example.com",
          url: "https://family.example.com/work-life-balance",
        },
        {
          title: "Child Development Milestones: What to Expect",
          domain: "development.example.com",
          url: "https://development.example.com/child-milestones",
        },
      ],
    },
    {
      id: "techie",
      name: "Tech Enthusiast",
      count: 6500,
      percentage: "30%",
      keywords: [
        "technology",
        "gadgets",
        "innovation",
        "software",
        "hardware",
        "digital",
        "tech news",
        "electronics",
        "computing",
        "AI",
      ],
      articles: [
        {
          title: "Latest Tech Gadgets Worth Your Attention",
          domain: "tech.example.com",
          url: "https://tech.example.com/latest-gadgets",
        },
        {
          title: "How AI is Transforming Everyday Technology",
          domain: "ai.example.com",
          url: "https://ai.example.com/everyday-tech",
        },
        {
          title: "Future Tech Trends to Watch",
          domain: "future.example.com",
          url: "https://future.example.com/tech-trends",
        },
      ],
    },
  ],
  broad: [
    {
      id: "student",
      name: "Student",
      count: 12000,
      percentage: "35%",
      keywords: [
        "education",
        "study",
        "learning",
        "college",
        "university",
        "courses",
        "academic",
        "research",
        "exams",
        "student life",
      ],
      articles: [
        {
          title: "Effective Study Techniques for Better Grades",
          domain: "study.example.com",
          url: "https://study.example.com/effective-techniques",
        },
        {
          title: "Balancing Social Life and Academics",
          domain: "college.example.com",
          url: "https://college.example.com/balance-guide",
        },
        {
          title: "Scholarship Opportunities You Should Know About",
          domain: "scholarships.example.com",
          url: "https://scholarships.example.com/opportunities",
        },
      ],
    },
    {
      id: "homeowner",
      name: "Homeowner",
      count: 10500,
      percentage: "30%",
      keywords: [
        "home improvement",
        "real estate",
        "interior design",
        "gardening",
        "DIY",
        "renovation",
        "decoration",
        "furniture",
        "property",
        "maintenance",
      ],
      articles: [
        {
          title: "Budget-Friendly Home Improvement Projects",
          domain: "homeimprovement.example.com",
          url: "https://homeimprovement.example.com/budget-projects",
        },
        {
          title: "Essential Maintenance Tips for Homeowners",
          domain: "maintenance.example.com",
          url: "https://maintenance.example.com/homeowner-tips",
        },
        {
          title: "Interior Design Trends for Every Room",
          domain: "design.example.com",
          url: "https://design.example.com/interior-trends",
        },
      ],
    },
    {
      id: "shopper",
      name: "Online Shopper",
      count: 8500,
      percentage: "25%",
      keywords: [
        "shopping",
        "e-commerce",
        "deals",
        "discounts",
        "online stores",
        "products",
        "reviews",
        "comparison",
        "brands",
        "retail",
      ],
      articles: [
        {
          title: "How to Find the Best Deals Online",
          domain: "shopping.example.com",
          url: "https://shopping.example.com/best-deals",
        },
        {
          title: "Avoiding Scams While Shopping Online",
          domain: "security.example.com",
          url: "https://security.example.com/shopping-safety",
        },
        {
          title: "Top-Rated Products Worth Your Money",
          domain: "reviews.example.com",
          url: "https://reviews.example.com/top-products",
        },
      ],
    },
    {
      id: "retiree",
      name: "Retiree",
      count: 3500,
      percentage: "10%",
      keywords: [
        "retirement",
        "senior living",
        "travel",
        "hobbies",
        "health",
        "finance",
        "leisure",
        "community",
        "wellness",
        "lifestyle",
      ],
      articles: [
        {
          title: "Best Travel Destinations for Retirees",
          domain: "retirement.example.com",
          url: "https://retirement.example.com/travel-destinations",
        },
        {
          title: "Financial Planning Tips for a Secure Retirement",
          domain: "finance.example.com",
          url: "https://finance.example.com/retirement-planning",
        },
        {
          title: "Hobbies That Keep Your Mind Sharp in Retirement",
          domain: "hobbies.example.com",
          url: "https://hobbies.example.com/mind-sharp",
        },
      ],
    },
  ],
}

export function PersonaAnalysis() {
  const { toast } = useToast()
  const { t } = useTranslation()
  const { selectedRelevance } = useRelevance()
  const mockPersonas = mockPersonasData[selectedRelevance]
  const [selectedPersona, setSelectedPersona] = useState(mockPersonas[0])
  const [copyingKeywords, setCopyingKeywords] = useState(false)

  // Update selected persona when relevance changes
  useEffect(() => {
    setSelectedPersona(mockPersonas[0])
  }, [selectedRelevance, mockPersonas])

  const handleCopyAllKeywords = () => {
    const keywordsText = selectedPersona.keywords.join(", ")
    navigator.clipboard.writeText(keywordsText)
    setCopyingKeywords(true)

    toast({
      title: t("copied"),
      description: `${t("keywordsFor")} "${selectedPersona.name}" ${t("copied").toLowerCase()}`,
    })

    setTimeout(() => {
      setCopyingKeywords(false)
    }, 2000)
  }

  return (
    <div className="space-y-8 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
        {mockPersonas.map((persona) => (
          <Card
            key={persona.id}
            className={`cursor-pointer transition-all w-full ${
              selectedPersona.id === persona.id ? "ring-2 ring-primary" : "hover:border-primary/50"
            }`}
            onClick={() => setSelectedPersona(persona)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{persona.name}</CardTitle>
              <CardDescription className="flex justify-between">
                <span>
                  {persona.count.toLocaleString()} {t("users")}
                </span>
                <span className="font-medium">{persona.percentage}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted rounded-full h-2.5 mb-4">
                <div
                  className="bg-primary rounded-full h-2.5"
                  style={{ width: `${Number.parseFloat(persona.percentage)}%` }}
                ></div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {persona.keywords.slice(0, 5).map((keyword) => (
                  <span key={keyword} className="text-xs bg-muted px-2 py-1 rounded-full">
                    {keyword}
                  </span>
                ))}
                {persona.keywords.length > 5 && (
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">+{persona.keywords.length - 5} more</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>
                {t("keywordsFor")} {selectedPersona.name}
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
              {selectedPersona.keywords.map((keyword) => (
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
              {selectedPersona.articles.map((article, index) => (
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
