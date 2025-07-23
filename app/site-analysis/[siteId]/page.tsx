"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { SiteAnalysis } from "@/components/site-analysis"
import Link from "next/link"

export default function SiteAnalysisByIdPage() {
    const { siteId } = useParams() as { siteId: string }
    const [site, setSite] = useState<any>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const arr = localStorage.getItem('trackedSites')
            if (arr) {
                const sites = JSON.parse(arr)
                const found = sites.find((s: any) => s.id === siteId)
                setSite(found)
            }
        }
    }, [siteId])

    if (!site) return <div className="p-8 text-center">找不到此站點</div>

    return (
        <div className="container mx-auto p-6">
            <Link href="/site-analysis">
                <button className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">← 回列表</button>
            </Link>
            <SiteAnalysis site={site} />
        </div>
    )
} 