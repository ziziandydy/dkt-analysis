"use client"
import { useRouter } from "next/navigation"
import { SiteOnboarding } from "@/components/site-onboarding"

export default function SiteAnalysisNewPage() {
    const router = useRouter()

    return (
        <SiteOnboarding
            onComplete={() => {
                // 取得新 site
                if (typeof window !== 'undefined') {
                    const site = JSON.parse(localStorage.getItem('trackedSite') || '{}')
                    if (site && site.trackingId) {
                        // 取得現有陣列
                        const arr = localStorage.getItem('trackedSites')
                        let sites = arr ? JSON.parse(arr) : []
                        // 產生唯一 id
                        const id = site.trackingId
                        // 避免重複
                        if (!sites.find((s: any) => s.id === id)) {
                            sites.push({ ...site, id })
                            localStorage.setItem('trackedSites', JSON.stringify(sites))
                        }
                        router.replace(`/site-analysis/${id}`)
                    } else {
                        router.replace('/site-analysis')
                    }
                }
            }}
        />
    )
} 