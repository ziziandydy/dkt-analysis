"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Site type 定義
interface Site {
  id: string
  name: string
  domain: string
  trackingMethod?: string
  trackingId?: string
  verified?: boolean
  status: 'active' | 'inactive' | 'pending' | 'failed'
  updatedAt: string // ISO 字串
}

export default function SiteListPage() {
  const [sites, setSites] = useState<Site[]>([])

  useEffect(() => {
    // 取得所有站點，localStorage key: 'trackedSites'（陣列）
    if (typeof window !== 'undefined') {
      let arr = localStorage.getItem('trackedSites')
      if (!arr) {
        const now = new Date()
        const mockSites = [
          { id: 'MOCK1', name: '優兔電商', domain: 'youtubuy.com', trackingMethod: 'code', trackingId: 'MOCK1', verified: true, status: 'active', updatedAt: new Date(now.getTime() - 3600 * 1000 * 2).toISOString() }, // 2小時前
          { id: 'MOCK2', name: 'Infiniti 汽車', domain: 'infiniti.com', trackingMethod: 'wordpress', trackingId: 'MOCK2', verified: true, status: 'active', updatedAt: new Date(now.getTime() - 3600 * 1000 * 24).toISOString() }, // 1天前
          { id: 'MOCK3', name: 'Nissan 官方', domain: 'nissan.com', trackingMethod: 'shopify', trackingId: 'MOCK3', verified: true, status: 'inactive', updatedAt: new Date(now.getTime() - 3600 * 1000 * 48).toISOString() }, // 2天前
          { id: 'MOCK4', name: 'Toyota 生活館', domain: 'toyota.com', trackingMethod: 'code', trackingId: 'MOCK4', verified: false, status: 'active', updatedAt: new Date(now.getTime() - 3600 * 1000 * 5).toISOString() }, // 5小時前
          { id: 'MOCK5', name: 'Demo 失敗站', domain: 'fail.com', trackingMethod: 'code', trackingId: 'MOCK5', verified: false, status: 'failed', updatedAt: new Date(now.getTime() - 3600 * 1000 * 12).toISOString() }, // 12小時前
          { id: 'MOCK6', name: 'Demo Inactive 站', domain: 'inactive-demo.com', trackingMethod: 'code', trackingId: 'MOCK6', verified: false, status: 'inactive', updatedAt: new Date(now.getTime() - 3600 * 1000 * 3).toISOString() },
        ]
        localStorage.setItem('trackedSites', JSON.stringify(mockSites))
        arr = localStorage.getItem('trackedSites')
      }
      if (arr) {
        // 兼容舊資料，補齊 status/updatedAt 欄位
        let sites = JSON.parse(arr)
        const now = new Date().toISOString()
        sites = sites.map((site: any) => ({
          ...site,
          status: site.status || 'active',
          updatedAt: site.updatedAt || now,
        }))
        setSites(sites)
        localStorage.setItem('trackedSites', JSON.stringify(sites))
      }
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
          {sites.map(site => {
            const date = new Date(site.updatedAt)
            const isValid = !isNaN(date.getTime())
            return (
              <div key={site.id} className="flex items-center justify-between border rounded p-4">
                <div>
                  <div className="font-medium">{site.name}</div>
                  <div className="text-sm text-muted-foreground">{site.domain}</div>
                </div>
                <div className="flex items-center gap-4">
                  {/* 狀態 Badge */}
                  <StatusBadge status={site.status} updatedAt={site.updatedAt} />
                  {/* 最後更新時間 */}
                  <span className="text-xs text-muted-foreground" title={isValid ? date.toISOString() : ''}>{isValid ? date.toLocaleString() : '—'}</span>
                  <Link href={`/site-analysis/${site.id}`}><Button variant="outline">查看分析</Button></Link>
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
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// 新增 StatusBadge 元件
function StatusBadge({ status, updatedAt }: { status: Site['status'], updatedAt: string }) {
  let color: any = 'default', text = '', desc = ''
  switch (status) {
    case 'active': color = 'default'; text = '啟用'; desc = '資料已成功更新'; break
    case 'inactive': color = 'destructive'; text = '未啟用'; desc = '資料更新失敗，請檢查追蹤碼'; break
    case 'pending': color = 'secondary'; text = '驗證中'; desc = '等待驗證完成'; break
    case 'failed': color = 'outline'; text = '失敗'; desc = '驗證失敗，請重新安裝'; break
    default: color = 'outline'; text = status; desc = ''
  }
  const date = new Date(updatedAt)
  const isValid = !isNaN(date.getTime())
  const hoverText = `${desc}\n最近更新：${isValid ? date.toLocaleString() : '—'}`
  return (
    <span title={hoverText} style={{ cursor: 'pointer' }}>
      <Badge variant={color}>{text}</Badge>
    </span>
  )
}
