"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Copy, Download, ExternalLink, Globe, Settings, Store } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/hooks/use-translation"

interface SiteOnboardingProps {
    onComplete: () => void
}

export function SiteOnboarding({ onComplete }: SiteOnboardingProps) {
    const [step, setStep] = useState(1)
    const [siteName, setSiteName] = useState("")
    const [domain, setDomain] = useState("")
    const [trackingMethod, setTrackingMethod] = useState<string>("")
    const [isVerifying, setIsVerifying] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const { toast } = useToast()
    const { t } = useTranslation()

    const trackingId = `TRK_${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // 新增 tracking code 狀態
    const [customTrackingId, setCustomTrackingId] = useState("")
    const [generatedTrackingId, setGeneratedTrackingId] = useState(trackingId)
    const [showVerifyHint, setShowVerifyHint] = useState(false)

    const handleNext = () => {
        if (step === 1 && (!siteName.trim() || !domain.trim())) {
            toast({
                title: t("error"),
                description: t("please_fill_all_fields"),
                variant: "destructive",
            })
            return
        }
        if (step === 2 && !trackingMethod) {
            toast({
                title: t("error"),
                description: t("please_select_tracking_method"),
                variant: "destructive",
            })
            return
        }
        setStep(step + 1)
    }

    const handleBack = () => {
        setStep(step - 1)
    }

    const handleComplete = () => {
        const siteData = {
            name: siteName,
            domain: domain,
            trackingMethod: trackingMethod,
            trackingId: trackingId,
            verified: true,
        }
        localStorage.setItem('trackedSite', JSON.stringify(siteData))
        onComplete()
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast({
            title: t("copied"),
            description: t("tracking_code_copied"),
        })
    }

    // 產生新的 tracking code
    const handleGenerateTrackingId = () => {
        const newId = `TRK_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        setGeneratedTrackingId(newId)
        setCustomTrackingId(newId)
    }

    // 驗證 tracking
    const verifyTracking = () => {
        setIsVerifying(true)
        setShowVerifyHint(true)
        setTimeout(() => {
            setIsVerifying(false)
            setShowVerifyHint(false)
            setIsVerified(true)
            toast({
                title: t("success"),
                description: t("tracking_verified_successfully"),
            })
        }, 2000)
    }

    // Step 2: 三張卡片選擇
    const trackingOptions = [
        {
            key: "code",
            icon: <Globe className="h-6 w-6 mb-2" />,
            label: t("trackingCode"),
            desc: t("tracking_code_setup"),
        },
        {
            key: "wordpress",
            icon: <Settings className="h-6 w-6 mb-2" />,
            label: "WordPress",
            desc: t("install_klaviyo_plugin_for_wordpress"),
        },
        {
            key: "shopify",
            icon: <Store className="h-6 w-6 mb-2" />,
            label: "Shopify",
            desc: t("install_klaviyo_app_for_shopify"),
        },
    ]

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">{t("welcome_to_site_analysis")}</h2>
                <p className="text-muted-foreground">{t("add_your_first_website_to_start_tracking")}</p>
            </div>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="siteName">{t("siteName")}</Label>
                    <Input
                        id="siteName"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        placeholder={t("enter_site_name")}
                    />
                </div>
                <div>
                    <Label htmlFor="domain">{t("domainUrl")}</Label>
                    <Input
                        id="domain"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="example.com"
                    />
                </div>
            </div>

            <Button onClick={handleNext} className="w-full">
                {t("next")}
            </Button>
        </div>
    )

    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">{t("select_tracking_method")}</h2>
                <p className="text-muted-foreground">{t("choose_how_to_track_your_website")}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trackingOptions.map(opt => (
                    <div
                        key={opt.key}
                        className={`cursor-pointer border rounded-lg p-6 text-center transition-all ${trackingMethod === opt.key ? "border-primary bg-primary/10" : "hover:border-primary/50"}`}
                        onClick={() => {
                            setTrackingMethod(opt.key)
                            setStep(3)
                        }}
                        tabIndex={0}
                        role="button"
                        aria-pressed={trackingMethod === opt.key}
                    >
                        {opt.icon}
                        <div className="font-semibold text-lg mb-1">{opt.label}</div>
                        <div className="text-xs text-muted-foreground">{opt.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    )

    // Step 3: 根據 trackingMethod 顯示不同內容，並加上下/完成按鈕
    const renderTrackingCodeSetup = () => (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    {t("tracking_code_setup")}
                </CardTitle>
                <CardDescription>{t("add_this_code_to_your_website")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label>{t("trackingId")}</Label>
                    <div className="flex items-center gap-2 mt-1">
                        <Input
                            value={customTrackingId}
                            onChange={e => setCustomTrackingId(e.target.value)}
                            placeholder="TRK_XXXXXXX"
                        />
                        <Button variant="outline" size="sm" onClick={handleGenerateTrackingId}>{t("generate")}</Button>
                    </div>
                </div>
                <div>
                    <Label>{t("trackingCode")}</Label>
                    <div className="mt-1 p-3 bg-muted rounded-md font-mono text-sm">
                        {`<script>\n  (function() {\n    var script = document.createElement('script');\n    script.src = 'https://tracking.example.com/${customTrackingId}.js';\n    script.async = true;\n    document.head.appendChild(script);\n  })();\n</script>`}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(`<script>\n  (function() {\n    var script = document.createElement('script');\n    script.src = 'https://tracking.example.com/${customTrackingId}.js';\n    script.async = true;\n    document.head.appendChild(script);\n  })();\n</script>`)}
                    >
                        <Copy className="h-4 w-4 mr-2" />
                        {t("copy_code")}
                    </Button>
                </div>
                <Button onClick={verifyTracking} disabled={isVerifying} className="w-full mt-2">
                    {isVerifying ? t("verifying") : t("verify_tracking")}
                </Button>
                {showVerifyHint && (
                    <div className="text-sm text-blue-600 mt-2 text-center">
                        {t("verify_hint")}
                    </div>
                )}
                {isVerified && (
                    <div className="text-green-600 text-center mt-2">{t("tracking_verified_successfully")}</div>
                )}
                <div className="flex gap-2 mt-6">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">{t("back")}</Button>
                    <Button onClick={handleComplete} className="flex-1">{t("start_analysis")}</Button>
                </div>
            </CardContent>
        </Card>
    )

    const renderWordPressSetup = () => (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    WordPress Plugin Setup
                </CardTitle>
                <CardDescription>{t("install_klaviyo_plugin_for_wordpress")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <ol className="list-decimal pl-5 space-y-1 text-left">
                    <li>前往 <a href="https://wordpress.org/plugins/klaviyo/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">官方 WordPress Plugin 頁面</a> 下載 Plugin</li>
                    <li>安裝並啟用 Plugin</li>
                    <li>回到本頁點擊「Verify Tracking」</li>
                </ol>
                <Button onClick={verifyTracking} disabled={isVerifying} className="w-full mt-2">
                    {isVerifying ? t("verifying") : t("verify_tracking")}
                </Button>
                {showVerifyHint && (
                    <div className="text-sm text-blue-600 mt-2 text-center">
                        {t("verify_hint")}
                    </div>
                )}
                {isVerified && (
                    <div className="text-green-600 text-center mt-2">{t("tracking_verified_successfully")}</div>
                )}
                <div className="flex gap-2 mt-6">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">{t("back")}</Button>
                    <Button onClick={handleComplete} className="flex-1">{t("start_analysis")}</Button>
                </div>
            </CardContent>
        </Card>
    )

    const renderShopifySetup = () => (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    Shopify App Setup
                </CardTitle>
                <CardDescription>{t("install_klaviyo_app_for_shopify")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <ol className="list-decimal pl-5 space-y-1 text-left">
                    <li>前往 <a href="https://apps.shopify.com/klaviyo" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Shopify App Store</a> 下載官方 App</li>
                    <li>安裝並啟用 App</li>
                    <li>回到本頁點擊「Verify Tracking」</li>
                </ol>
                <Button onClick={verifyTracking} disabled={isVerifying} className="w-full mt-2">
                    {isVerifying ? t("verifying") : t("verify_tracking")}
                </Button>
                {showVerifyHint && (
                    <div className="text-sm text-blue-600 mt-2 text-center">
                        {t("verify_hint")}
                    </div>
                )}
                {isVerified && (
                    <div className="text-green-600 text-center mt-2">{t("tracking_verified_successfully")}</div>
                )}
                <div className="flex gap-2 mt-6">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">{t("back")}</Button>
                    <Button onClick={handleComplete} className="flex-1">{t("start_analysis")}</Button>
                </div>
            </CardContent>
        </Card>
    )

    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                <h2 className="text-2xl font-bold">{t("setup_complete")}</h2>
                <p className="text-muted-foreground">{t("your_website_is_now_ready_for_analysis")}</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>{t("site_details")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("siteName")}:</span>
                        <span className="font-medium">{siteName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("domainUrl")}:</span>
                        <span className="font-medium">{domain}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("tracking_method")}:</span>
                        <Badge variant="secondary">
                            {trackingMethod === 'code' && t("trackingCode")}
                            {trackingMethod === 'wordpress' && 'WordPress'}
                            {trackingMethod === 'shopify' && 'Shopify'}
                        </Badge>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("trackingId")}:</span>
                        <span className="font-mono text-sm">{customTrackingId || generatedTrackingId}</span>
                    </div>
                </CardContent>
            </Card>
            <Button onClick={handleComplete} className="w-full">
                {t("start_analysis")}
            </Button>
        </div>
    )

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">{t("siteAnalysis")}</CardTitle>
                    <CardDescription>{t("step")} {step} {t("of")} 3</CardDescription>
                </CardHeader>
                <CardContent>
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && (
                        trackingMethod === 'code' ? renderTrackingCodeSetup() :
                            trackingMethod === 'wordpress' ? renderWordPressSetup() :
                                trackingMethod === 'shopify' ? renderShopifySetup() :
                                    renderStep3()
                    )}
                </CardContent>
            </Card>
        </div>
    )
} 