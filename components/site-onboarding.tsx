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

    const verifyTracking = () => {
        setIsVerifying(true)
        setTimeout(() => {
            setIsVerifying(false)
            setIsVerified(true)
            toast({
                title: t("success"),
                description: t("tracking_verified_successfully"),
            })
        }, 2000)
    }

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

            <Tabs value={trackingMethod} onValueChange={setTrackingMethod} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="code" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        {t("trackingCode")}
                    </TabsTrigger>
                    <TabsTrigger value="wordpress" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        WordPress
                    </TabsTrigger>
                    <TabsTrigger value="shopify" className="flex items-center gap-2">
                        <Store className="h-4 w-4" />
                        Shopify
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="code" className="space-y-4">
                    <Card>
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
                                    <Input value={trackingId} readOnly />
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => copyToClipboard(trackingId)}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <Label>{t("trackingCode")}</Label>
                                <div className="mt-1 p-3 bg-muted rounded-md font-mono text-sm">
                                    {`<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://tracking.example.com/${trackingId}.js';
    script.async = true;
    document.head.appendChild(script);
  })();
</script>`}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => copyToClipboard(`<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://tracking.example.com/${trackingId}.js';
    script.async = true;
    document.head.appendChild(script);
  })();
</script>`)}
                                >
                                    <Copy className="h-4 w-4 mr-2" />
                                    {t("copy_code")}
                                </Button>
                            </div>

                            <Button
                                onClick={verifyTracking}
                                disabled={isVerifying}
                                className="w-full"
                            >
                                {isVerifying ? t("verifying") : t("verify_tracking")}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="wordpress" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                WordPress Plugin Setup
                            </CardTitle>
                            <CardDescription>{t("install_klaviyo_plugin_for_wordpress")}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">{t("wordpress_plugin_instructions")}</p>
                                <Button asChild className="w-full">
                                    <a href="https://wordpress.org/plugins/klaviyo/" target="_blank" rel="noopener noreferrer">
                                        <Download className="h-4 w-4 mr-2" />
                                        {t("download_klaviyo_plugin")}
                                        <ExternalLink className="h-4 w-4 ml-2" />
                                    </a>
                                </Button>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label>{t("trackingId")}</Label>
                                <div className="flex items-center gap-2">
                                    <Input value={trackingId} readOnly />
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => copyToClipboard(trackingId)}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">{t("use_this_id_in_plugin_settings")}</p>
                            </div>

                            <Button
                                onClick={verifyTracking}
                                disabled={isVerifying}
                                className="w-full"
                            >
                                {isVerifying ? t("verifying") : t("verify_tracking")}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="shopify" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Store className="h-5 w-5" />
                                Shopify App Setup
                            </CardTitle>
                            <CardDescription>{t("install_klaviyo_app_for_shopify")}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">{t("shopify_app_instructions")}</p>
                                <Button asChild className="w-full">
                                    <a href="https://apps.shopify.com/klaviyo" target="_blank" rel="noopener noreferrer">
                                        <Store className="h-4 w-4 mr-2" />
                                        {t("install_klaviyo_shopify_app")}
                                        <ExternalLink className="h-4 w-4 ml-2" />
                                    </a>
                                </Button>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label>{t("trackingId")}</Label>
                                <div className="flex items-center gap-2">
                                    <Input value={trackingId} readOnly />
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => copyToClipboard(trackingId)}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">{t("use_this_id_in_app_settings")}</p>
                            </div>

                            <Button
                                onClick={verifyTracking}
                                disabled={isVerifying}
                                className="w-full"
                            >
                                {isVerifying ? t("verifying") : t("verify_tracking")}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="flex gap-2">
                <Button variant="outline" onClick={handleBack} className="flex-1">
                    {t("back")}
                </Button>
                <Button
                    onClick={handleNext}
                    className="flex-1"
                    disabled={!trackingMethod}
                >
                    {t("next")}
                </Button>
            </div>
        </div>
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
                        <span className="font-mono text-sm">{trackingId}</span>
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
                    {step === 3 && renderStep3()}
                </CardContent>
            </Card>
        </div>
    )
} 