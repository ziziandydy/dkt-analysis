"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Site type 定義
interface Site {
  id: string
  name: string
  domain: string
}

export default function SiteListPage() {
  const [sites, setSites] = useState<Site[]>([])

  useEffect(() => {
    // 取得所有站點，localStorage key: 'trackedSites'（陣列）
    if (typeof window !== 'undefined') {
      let arr = localStorage.getItem('trackedSites')
      if (!arr) {
        const mockSites = [
          { id: 'MOCK1', name: '優兔電商', domain: 'youtubuy.com', trackingMethod: 'code', trackingId: 'MOCK1', verified: true },
          { id: 'MOCK2', name: 'Infiniti 汽車', domain: 'infiniti.com', trackingMethod: 'wordpress', trackingId: 'MOCK2', verified: true },
          { id: 'MOCK3', name: 'Nissan 官方', domain: 'nissan.com', trackingMethod: 'shopify', trackingId: 'MOCK3', verified: true },
          { id: 'MOCK4', name: 'Toyota 生活館', domain: 'toyota.com', trackingMethod: 'code', trackingId: 'MOCK4', verified: true },
        ]
        localStorage.setItem('trackedSites', JSON.stringify(mockSites))
        arr = localStorage.getItem('trackedSites')
      }
      if (arr) setSites(JSON.parse(arr))
    }
  }, [])

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Site Analysis 列表</h1>
        <div className="flex gap-2">
          <Link href="/site-analysis/new">
            <Button>新增 Site Analysis</Button>
          </Link>
        </div>
      </div>
      {sites.length === 0 ? (
        <div className="text-center text-muted-foreground">尚無任何 Site，請先新增。</div>
      ) : (
        <div className="grid gap-4">
          {sites.map(site => (
            <div key={site.id} className="flex items-center justify-between border rounded p-4">
              <div>
                <div className="font-medium">{site.name}</div>
                <div className="text-sm text-muted-foreground">{site.domain}</div>
              </div>
              <Link href={`/site-analysis/${site.id}`}>
                <Button variant="outline">查看分析</Button>
              </Link>
              <Button variant="destructive" onClick={() => {
                if (typeof window !== 'undefined') {
                  const arr = localStorage.getItem('trackedSites')
                  let sites = arr ? JSON.parse(arr) : []
                  sites = sites.filter((s: any) => s.id !== site.id)
                  localStorage.setItem('trackedSites', JSON.stringify(sites))
                  // 若刪除的是目前 trackedSite 也一併移除
                  const tracked = localStorage.getItem('trackedSite')
                  if (tracked) {
                    const trackedSite = JSON.parse(tracked)
                    if (trackedSite.trackingId === site.id) {
                      localStorage.removeItem('trackedSite')
                    }
                  }
                  window.location.reload()
                }
              }}>刪除</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
