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

    // 權限控管：非 active 狀態顯示提示
    if (site.status !== 'active') {
        let msg = '網站未啟用，請重新驗證或安裝追蹤碼。'
        // Demo: 重新驗證/安裝
        const handleReverify = () => {
            if (typeof window !== 'undefined') {
                const arr = localStorage.getItem('trackedSites')
                if (arr) {
                    let sites = JSON.parse(arr)
                    sites = sites.map((s: any) => s.id === site.id ? { ...s, status: 'active', updatedAt: new Date().toISOString() } : s)
                    localStorage.setItem('trackedSites', JSON.stringify(sites))
                    setTimeout(() => {
                        setSite({ ...site, status: 'active', updatedAt: new Date().toISOString() })
                        alert('驗證成功，網站已啟用！')
                    }, 2000)
                }
            }
        }
        const handleReinstall = () => {
            if (typeof window !== 'undefined') {
                const arr = localStorage.getItem('trackedSites')
                if (arr) {
                    let sites = JSON.parse(arr)
                    sites = sites.map((s: any) => s.id === site.id ? { ...s, status: 'inactive', updatedAt: new Date().toISOString() } : s)
                    localStorage.setItem('trackedSites', JSON.stringify(sites))
                    setSite({ ...site, status: 'inactive', updatedAt: new Date().toISOString() })
                    alert('已切換為未啟用狀態，請重新驗證。')
                }
            }
        }
        return (
            <div className="p-8 text-center space-y-4">
                <div className="text-xl font-bold">{msg}</div>
                <div className="flex flex-col items-center gap-2 mt-4">
                    <button onClick={handleReverify} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">重新驗證</button>
                    <button onClick={handleReinstall} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">重新安裝追蹤碼</button>
                </div>
                <Link href="/site-analysis">
                    <button className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">← 回列表</button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6">
            <Link href="/site-analysis">
                <button className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">← 回列表</button>
            </Link>
            <SiteAnalysis site={site} />
        </div>
    )
} 