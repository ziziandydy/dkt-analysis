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
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
              <rect width="200" height="200" fill="url('#gradient')"></rect>
              <defs>
                <linearGradient id="gradient" gradientTransform="rotate(63 0.5 0.5)">
                  <stop offset="0%" stopColor="#3c93b9"></stop>
                  <stop offset="100%" stopColor="#10beb5"></stop>
                </linearGradient>
              </defs>
              <g>
                <g
                  fill="#e8f3ed"
                  transform="matrix(3.573260145069594,0,0,3.573260145069594,7.165256376267422,125.40525497501211)"
                  stroke="#99e1de"
                  strokeWidth="0.7"
                >
                  <path d="M5.75 0L1.07 0L1.07-14.22L5.65-14.22Q7.54-14.22 9.04-13.36Q10.55-12.51 11.39-10.95Q12.24-9.39 12.25-7.46L12.25-7.46L12.25-6.81Q12.25-4.85 11.42-3.31Q10.60-1.76 9.10-0.88Q7.60-0.01 5.75 0L5.75 0ZM5.65-11.57L4.50-11.57L4.50-2.64L5.69-2.64Q7.17-2.64 7.96-3.69Q8.75-4.74 8.75-6.81L8.75-6.81L8.75-7.42Q8.75-9.48 7.96-10.53Q7.17-11.57 5.65-11.57L5.65-11.57ZM18.68 0L14.00 0L14.00-14.22L18.58-14.22Q20.47-14.22 21.97-13.36Q23.48-12.51 24.32-10.95Q25.17-9.39 25.18-7.46L25.18-7.46L25.18-6.81Q25.18-4.85 24.35-3.31Q23.53-1.76 22.03-0.88Q20.53-0.01 18.68 0L18.68 0ZM18.58-11.57L17.43-11.57L17.43-2.64L18.62-2.64Q20.10-2.64 20.89-3.69Q21.68-4.74 21.68-6.81L21.68-6.81L21.68-7.42Q21.68-9.48 20.89-10.53Q20.10-11.57 18.58-11.57L18.58-11.57ZM34.79 0L31.77-5.29L30.36-3.75L30.36 0L26.93 0L26.93-14.22L30.36-14.22L30.36-7.95L31.55-9.76L34.62-14.22L38.86-14.22L34.05-7.93L38.86 0L34.79 0ZM50.89-14.22L50.89-11.57L46.62-11.57L46.62 0L43.19 0L43.19-11.57L39.00-11.57L39.00-14.22L50.89-14.22Z"></path>
                </g>
              </g>
            </svg>
          </div>
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
