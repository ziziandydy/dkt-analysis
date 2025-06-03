"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/hooks/use-translation"

interface ExportDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function ExportDialog({ open, setOpen }: ExportDialogProps) {
  const { toast } = useToast()
  const { t } = useTranslation()

  const handleExport = (format: "png" | "csv") => {
    // Simulate export process
    toast({
      title: t("exportingData"),
      description: `${t("yourFileIsBeingPrepared").replace("{format}", format.toUpperCase())}`,
    })

    setTimeout(() => {
      setOpen(false)
      toast({
        title: t("exportComplete"),
        description: `${t("yourFileIsReady").replace("{format}", format.toUpperCase())}`,
      })
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("exportData")}</DialogTitle>
          <DialogDescription>{t("exportDescription")}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button variant="outline" className="h-24 flex flex-col gap-2" onClick={() => handleExport("png")}>
            <Download className="h-6 w-6" />
            <div className="flex flex-col">
              <span className="font-medium">{t("pngImage")}</span>
              <span className="text-xs text-muted-foreground">{t("exportAsScreenshots")}</span>
            </div>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-2" onClick={() => handleExport("csv")}>
            <Download className="h-6 w-6" />
            <div className="flex flex-col">
              <span className="font-medium">{t("csvData")}</span>
              <span className="text-xs text-muted-foreground">{t("exportRawData")}</span>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
