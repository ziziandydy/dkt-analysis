"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  Settings,
  Users,
  LogOut,
  Building,
  UserCog,
  BarChart4,
  Target,
  LineChart,
  UserRound,
  ChevronDown,
  Languages,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"
import { useSettings, type Language } from "@/contexts/settings-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock user data - In a real app, this would come from authentication
const mockUser = {
  name: "Jason Cheny",
  email: "jason@ghtinc.com",
  role: "root", // Changed from 'user' to 'root'
  avatarUrl: "/placeholder.svg?height=32&width=32",
}

const analysisTypes = [
  {
    id: "pre-targeting",
    nameKey: "pretargetingAnalysis",
    icon: Target,
    path: "/dashboard",
  },
  {
    id: "campaign",
    nameKey: "campaignAnalysis",
    icon: LineChart,
    path: "/campaign-analysis",
  },
  {
    id: "customer",
    nameKey: "customerAnalysis",
    icon: UserRound,
    path: "/customer-analysis",
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation()
  const { language, setLanguage } = useSettings()
  const [user, setUser] = useState(mockUser)

  const isActive = (path: string) => pathname === path

  const currentAnalysisType =
    analysisTypes.find((type) => pathname === type.path || (type.id === "pre-targeting" && pathname === "/")) ||
    analysisTypes[0]

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    console.log("Logging out...")
  }

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-4 py-4">
        <div className="flex items-center gap-2">
          <BarChart4 className="h-6 w-6" />
          <div className="font-semibold">{t("analysisDashboard")}</div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("analysis")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="w-full justify-between">
                      <div className="flex items-center gap-2">
                        <currentAnalysisType.icon className="h-5 w-5" />
                        <span>{t(currentAnalysisType.nameKey as any)}</span>
                      </div>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" className="w-56">
                    {analysisTypes.map((type) => (
                      <DropdownMenuItem
                        key={type.id}
                        className={cn(
                          "flex items-center gap-2 cursor-pointer",
                          currentAnalysisType.id === type.id && "bg-primary/10 text-primary font-medium",
                        )}
                        onClick={() => router.push(type.path)}
                      >
                        <type.icon className="h-4 w-4" />
                        <span>{t(type.nameKey as any)}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/analyses")}>
                  <Link href="/analyses">
                    <BarChart3 className="h-5 w-5" />
                    <span>{t("savedAnalysis")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user.role === "root" && (
          <SidebarGroup>
            <SidebarGroupLabel>{t("administration")}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/admin/brands")}>
                    <Link href="/admin/brands">
                      <Building className="h-5 w-5" />
                      <span>{t("brandManagement")}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/admin/roles")}>
                    <Link href="/admin/roles">
                      <UserCog className="h-5 w-5" />
                      <span>{t("roleManagement")}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/admin/accounts")}>
                    <Link href="/admin/accounts">
                      <Users className="h-5 w-5" />
                      <span>{t("accountManagement")}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>{t("systemSettings")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <Languages className="h-5 w-5 text-muted-foreground" />
                  <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                    <SelectTrigger className="h-8 w-[120px] border-none shadow-none focus:ring-0">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EN">English</SelectItem>
                      <SelectItem value="ZH">繁體中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/account/settings">{t("accountSettings")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t("logout")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
